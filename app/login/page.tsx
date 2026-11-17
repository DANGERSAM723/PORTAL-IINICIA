'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, CheckCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [step, setStep] = useState<'credentials' | 'waiting'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  // PASO 1: Validar credenciales y enviar el Magic Link al correo
  const handleVerifyCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error('Correo o contraseña incorrectos.');

      // Cerramos sesión temporal para forzar el flujo seguro hacia el dashboard mediante enlace
      await supabase.auth.signOut();

      // Enviamos el Magic Link oficial de Supabase
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (otpError) throw otpError;

      setSuccessMessage('¡Credenciales correctas! Hemos enviado un enlace de acceso directo a tu bandeja de entrada.');
      setStep('waiting');
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al validar tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-sm relative">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>

        <div className="flex items-center justify-center gap-2.5 mb-2">
          <ShieldCheck className="w-7 h-7 text-[#0066FF]" />
          <h2 className="text-2xl font-black text-slate-900">Iniciar Sesión</h2>
        </div>
        <p className="text-slate-500 text-center text-xs mb-6">
          {step === 'credentials' ? 'Paso 1: Acceso con contraseña' : 'Paso 2: Verificación de seguridad en correo'}
        </p>

        {errorMessage && (
          <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-2xl text-center font-medium">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold leading-relaxed">{successMessage}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleVerifyCredentials} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#0066FF] hover:bg-blue-600 text-white font-bold rounded-2xl text-xs transition shadow-md shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Validando...' : 'Continuar y Enviar Enlace'}
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center py-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-slate-700 leading-relaxed">
              Hemos enviado un correo a <strong className="text-slate-900">{email}</strong>. Abre tu bandeja y haz clic en el botón <strong className="text-[#0066FF]">"Sign in"</strong> para entrar directamente a tu panel.
            </div>

            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Abrir Bandeja de Entrada (Gmail)
            </a>

            <button
              type="button"
              onClick={() => setStep('credentials')}
              className="text-xs text-slate-500 hover:text-[#0066FF] underline cursor-pointer"
            >
              ← Usar otro correo o contraseña
            </button>
          </div>
        )}

        <p className="text-center text-xs text-slate-500 mt-6">
          ¿Aún no tienes una cuenta?{' '}
          <Link href="/register" className="text-[#0066FF] font-bold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
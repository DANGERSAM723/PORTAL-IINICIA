'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;

      if (data.session) {
        await supabase.auth.signOut();
      }

      setSuccessMessage('¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || 'No se pudo completar el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>

        {/* LOGO IINICIA */}
        <div className="flex justify-center mb-5">
          <Link href="/">
            <img
              src="/logo-iinicia.jpg"
              alt="IINICIA - Instituto de Innovación y Ciencias Aplicadas"
              className="h-16 w-auto object-contain"
            />
          </Link>
        </div>

        <h2 className="text-3xl font-black text-slate-900 text-center mb-1">Crear Cuenta</h2>
        <p className="text-slate-500 text-center text-xs mb-6">Regístrate en el portal académico IINICIA</p>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-600 mb-1">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ej. Samuel Martínez"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-wider uppercase text-slate-600 mb-1">
              Contraseña (mínimo 6 caracteres)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0066FF] hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition shadow-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-[#0066FF] font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
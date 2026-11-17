'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LicenciaturasPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Licenciaturas</h1>
        <p className="text-slate-600 mb-8">Formación profesional completa adaptada a la era digital.</p>
        <div className="p-6 border border-slate-200 rounded-2xl shadow-sm">
          <h3 className="font-bold text-slate-900 mb-2">Licenciatura en Desarrollo de Software</h3>
          <p className="text-xs text-slate-500 mb-4">240 Horas de arquitectura moderna.</p>
          <a href="http://localhost/moodle/" target="_blank" className="px-4 py-2 bg-[#0066FF] text-white text-xs font-bold rounded-xl inline-block">Acceder a Moodle</a>
        </div>
      </div>
    </div>
  );
}
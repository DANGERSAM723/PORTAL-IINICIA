'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Catálogo de Cursos</h1>
        <p className="text-slate-600 mb-8">Explora todos nuestros programas de formación tecnológica avanzada.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-slate-200 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Inteligencia Artificial</h3>
            <p className="text-xs text-slate-500 mb-4">Domina redes neuronales y modelos LLM.</p>
            <a href="http://localhost/moodle/" target="_blank" className="text-xs text-[#0066FF] font-bold hover:underline">Ir a Moodle &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
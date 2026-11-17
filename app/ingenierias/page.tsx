'use client';
import Link from 'next/link';
import { ArrowLeft, Server, Clock, Users, Star } from 'lucide-react';

export default function IngenieriasPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans p-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#0066FF] mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <h1 className="text-4xl font-black text-slate-900 mb-4">Ingenierías Universitarias</h1>
        <p className="text-slate-600 mb-12">Programas de alta especialización técnica con integración directa a Moodle LMS.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0066FF]" /> 180 Horas</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-amber-500" /> 4.9</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Inteligencia Artificial y Aprendizaje Profundo</h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Programa académico avanzado enfocado en la Industria 4.0. Diseña, entrena e implementa arquitecturas de redes neuronales y modelos de lenguaje (LLM).
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#0066FF] uppercase bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Servidor Local Moodle
              </span>
              <a 
                href="http://localhost/moodle/course/view.php?id=2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <Server className="w-4 h-4" /> Acceder al Curso en Moodle
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
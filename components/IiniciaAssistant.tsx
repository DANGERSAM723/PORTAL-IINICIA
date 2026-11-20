'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react';

const getMoodleBaseUrl = () => {
  const raw = (
    process.env.NEXT_PUBLIC_MOODLE_URL ||
    'https://numerator-finished-backshift.ngrok-free.dev/moodle'
  )
    .trim()
    .replace(/^\[|\]$/g, '')
    .replace(/\/+$/, '');

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw;
  }
  return `https://${raw}`;
};

const MOODLE_BASE_URL = getMoodleBaseUrl();

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  linkHref?: string;
  linkLabel?: string;
  external?: boolean;
}

export default function IiniciaAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: '¡Hola! Soy el asistente de Universidad IINICIA. ¿En qué te ayudo hoy?'
    }
  ]);

  const buildReply = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    if (q.includes('moodle') || q.includes('curso') || q.includes('clase')) {
      return {
        sender: 'bot',
        text: 'Puedes entrar directamente a tus cursos en Moodle LMS o revisar tu panel estudiantil.',
        linkHref: `${MOODLE_BASE_URL}/`,
        linkLabel: 'Abrir Campus Moodle',
        external: true
      };
    }

    if (q.includes('historial') || q.includes('calific') || q.includes('promedio') || q.includes('panel')) {
      return {
        sender: 'bot',
        text: 'Consulta tus cursos inscritos, calificaciones e historial académico desde tu panel.',
        linkHref: '/dashboard',
        linkLabel: 'Ir a Mi Panel',
        external: false
      };
    }

    if (q.includes('cuenta') || q.includes('registro') || q.includes('sesion') || q.includes('login')) {
      return {
        sender: 'bot',
        text: 'Si aún no tienes cuenta o necesitas entrar al sistema, ve a acceso o registro.',
        linkHref: '/login',
        linkLabel: 'Iniciar Sesión',
        external: false
      };
    }

    return {
      sender: 'bot',
      text: 'Puedes consultar la oferta académica, entrar a tu panel o abrir Moodle. Para soporte escribe a contacto@iinicia.org.'
    };
  };

  const handleSendText = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    const userMsg: ChatMessage = { sender: 'user', text: clean };
    const botMsg = buildReply(clean);

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendText(input);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-80 sm:w-96 max-w-[calc(100vw-2.5rem)] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden text-slate-800">
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-black tracking-wide">ASISTENTE IINICIA</p>
              <p className="text-[11px] text-blue-200">Portal Académico & Moodle LMS</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente"
              className="p-1 text-slate-300 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 h-64 overflow-y-auto bg-slate-50 space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0066FF] text-white font-medium'
                      : 'bg-white border border-slate-200 text-slate-700 shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.linkHref && msg.linkLabel && (
                  msg.external ? (
                    <a
                      href={msg.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 rounded-xl text-[11px] font-bold transition"
                    >
                      {msg.linkLabel} <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={msg.linkHref}
                      onClick={() => setIsOpen(false)}
                      className="mt-1.5 inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 rounded-xl text-[11px] font-bold transition"
                    >
                      {msg.linkLabel}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>

          <div className="px-3 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleSendText('Ir a Moodle')}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 rounded-full text-[11px] font-semibold cursor-pointer"
            >
              Ir a Moodle
            </button>
            <button
              type="button"
              onClick={() => handleSendText('Historial académico')}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 rounded-full text-[11px] font-semibold cursor-pointer"
            >
              Historial
            </button>
            <button
              type="button"
              onClick={() => handleSendText('Iniciar sesión')}
              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#0066FF] border border-blue-200 rounded-full text-[11px] font-semibold cursor-pointer"
            >
              Acceso
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex border-t border-slate-200 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu duda..."
              className="flex-1 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Enviar mensaje"
              className="px-4 bg-[#0066FF] hover:bg-blue-600 text-white flex items-center justify-center transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-5 z-50 px-4 py-3 bg-[#0066FF] hover:bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-2 text-xs font-bold transition cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Asistente IINICIA</span>
      </button>
    </>
  );
}
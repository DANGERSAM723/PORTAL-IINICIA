'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  PlayCircle,
  PlusCircle,
  LogOut,
  Server,
  UserCheck,
  GraduationCap,
  BarChart3,
  BookMarked,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const availableCoursesCatalog = [
  {
    id: 1,
    title: 'Ingeniería en Inteligencia Artificial & Deep Learning',
    category: 'Ingeniería',
    duration: '180 Horas',
    moodleUrl: 'http://localhost/moodle/course/view.php?id=2',
    instructor: 'Dr. Alejandro Gómez',
    description: 'Domina redes neuronales, PyTorch y modelos de lenguaje avanzados.'
  },
  {
    id: 2,
    title: 'Diplomado en Arquitectura Cloud Native & DevOps',
    category: 'Diplomado',
    duration: '120 Horas',
    moodleUrl: 'http://localhost/moodle/',
    instructor: 'Mtra. Sofía Ramírez',
    description: 'Construye sistemas con Kubernetes, Docker y pipelines CI/CD.'
  },
  {
    id: 3,
    title: 'Certificación Internacional en UI/UX & Design Systems',
    category: 'Certificación',
    duration: '90 Horas',
    moodleUrl: 'http://localhost/moodle/',
    instructor: 'Lic. Carlos Mendoza',
    description: 'Diseña interfaces escalables con metodologías de investigación.'
  },
  {
    id: 4,
    title: 'Certificación en Ciberseguridad & Ethical Hacking',
    category: 'Certificación',
    duration: '110 Horas',
    moodleUrl: 'http://localhost/moodle/',
    instructor: 'Ing. Roberto Morales',
    description: 'Auditoría de sistemas, pentesting y análisis de vulnerabilidades.'
  }
];

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mis-cursos' | 'disponibles' | 'historial'>('mis-cursos');

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  const academicHistory = [
    { code: 'IIN-101', subject: 'Fundamentos de Programación y Lógica', period: '2025-2', grade: '9.5', status: 'Aprobado' },
    { code: 'IIN-104', subject: 'Bases de Datos Relacionales y SQL', period: '2026-1', grade: '9.8', status: 'Aprobado' }
  ];

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        setLoading(false);
        if (window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleEnroll = (course: any) => {
    const alreadyEnrolled = enrolledCourses.some((c) => c.id === course.id);
    if (!alreadyEnrolled) {
      setEnrolledCourses([
        ...enrolledCourses,
        {
          id: course.id,
          title: course.title,
          progress: 0,
          status: 'Iniciado',
          lastAccess: 'Recién inscrito',
          moodleUrl: course.moodleUrl
        }
      ]);
      setActiveTab('mis-cursos');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-600">
        Cargando Panel Académico...
      </div>
    );
  }

  const studentName = user?.user_metadata?.full_name || user?.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-800 font-sans">
      {/* BARRA SUPERIOR */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo-iinicia.jpg"
                alt="IINICIA - Instituto de Innovación y Ciencias Aplicadas"
                className="h-11 w-auto object-contain"
              />
              <span className="text-xs px-2.5 py-0.5 bg-blue-50 text-[#0066FF] border border-blue-200 rounded-lg font-bold">
                PANEL
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
              <UserCheck className="w-4 h-4 text-[#0066FF]" />
              <span className="max-w-[180px] truncate">{user?.email}</span>
            </div>
            <a
              href="http://localhost/moodle/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-600 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Server className="w-4 h-4" /> Campus Moodle
            </a>
            <button
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* HERO BANNER ESTUDIANTIL */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-[#0066FF] rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Portal de Estudiante Activo
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Hola, {studentName}
              </h1>
              <p className="text-sm text-slate-300 max-w-xl">
                Bienvenido al sistema académico centralizado. Monitorea tus materias en curso, inscríbete a nuevos programas y accede al LMS Moodle en un solo lugar.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center min-w-[110px]">
                <div className="text-3xl font-black text-white">{enrolledCourses.length}</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-blue-200 mt-1">Cursos Activos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center min-w-[110px]">
                <div className="text-3xl font-black text-emerald-400">9.6</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-blue-200 mt-1">Promedio</div>
              </div>
            </div>
          </div>
        </div>

        {/* PESTAÑAS DE NAVEGACIÓN */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('mis-cursos')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'mis-cursos'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Mis Cursos ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('disponibles')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'disponibles'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <PlusCircle className="w-4 h-4" /> Catálogo de Inscripción
          </button>

          <button
            onClick={() => setActiveTab('historial')}
            className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'historial'
                ? 'bg-[#0066FF] text-white shadow-lg shadow-blue-500/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Historial Académico
          </button>
        </div>

        {/* CONTENIDO 1: MIS CURSOS */}
        {activeTab === 'mis-cursos' && (
          <div>
            {enrolledCourses.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 bg-blue-50 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto">
                  <BookMarked className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Aún no estás inscrito en ningún curso</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Explora nuestro catálogo académico y selecciona las materias o diplomados en los que deseas participar este semestre.
                </p>
                <button
                  onClick={() => setActiveTab('disponibles')}
                  className="px-6 py-3 bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" /> Ver Cursos Disponibles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase border border-emerald-200">
                          {course.status}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#0066FF]" /> {course.lastAccess}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-6">{course.title}</h3>

                      <div className="mb-6 space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-500 flex items-center gap-1">
                            <BarChart3 className="w-3.5 h-3.5 text-[#0066FF]" /> Progreso del programa
                          </span>
                          <span className="text-[#0066FF]">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0066FF] rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <a
                      href={course.moodleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-slate-900 hover:bg-[#0066FF] text-white text-xs font-bold rounded-2xl transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <PlayCircle className="w-4 h-4" /> Continuar en Moodle LMS
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO 2: CURSOS DISPONIBLES */}
        {activeTab === 'disponibles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCoursesCatalog.map((course) => {
              const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
              return (
                <div key={course.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-semibold">
                      <span className="px-3 py-1 bg-blue-50 text-[#0066FF] rounded-lg border border-blue-200 uppercase text-[10px]">
                        {course.category}
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">{course.description}</p>
                    <p className="text-[11px] text-slate-400 font-medium mb-6">Docente: {course.instructor}</p>
                  </div>

                  {isEnrolled ? (
                    <button
                      disabled
                      className="w-full py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ya estás inscrito
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="w-full py-3 bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                    >
                      <PlusCircle className="w-4 h-4" /> Inscribirme Ahora
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CONTENIDO 3: HISTORIAL ACADÉMICO */}
        {activeTab === 'historial' && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Historial Académico y Calificaciones</h3>
                <p className="text-xs text-slate-500 mt-0.5">Registro oficial de asignaturas aprobadas en IINICIA TECH</p>
              </div>
              <div className="p-3 bg-blue-50 text-[#0066FF] rounded-2xl">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-6">Clave</th>
                    <th className="py-4 px-6">Asignatura</th>
                    <th className="py-4 px-6">Periodo</th>
                    <th className="py-4 px-6">Calificación</th>
                    <th className="py-4 px-6">Estatus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {academicHistory.map((item) => (
                    <tr key={item.code} className="hover:bg-slate-50/50 transition">
                      <td className="py-4 px-6 font-bold text-slate-700">{item.code}</td>
                      <td className="py-4 px-6 font-semibold text-slate-900">{item.subject}</td>
                      <td className="py-4 px-6 text-slate-500">{item.period}</td>
                      <td className="py-4 px-6 font-black text-[#0066FF] text-sm">{item.grade}</td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px] border border-emerald-200">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
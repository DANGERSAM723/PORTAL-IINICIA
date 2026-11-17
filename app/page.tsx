'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  Users, 
  Clock, 
  ArrowRight, 
  Server, 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Check,
  Menu,
  LogOut,
  UserCheck
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const initialPrograms = [
  {
    id: 1,
    title: "Ingeniería en Inteligencia Artificial & Deep Learning",
    category: "ingenierias",
    moodleUrl: "http://localhost/moodle/course/view.php?id=2",
    level: "Avanzado",
    duration: "180 Horas",
    students: "1,420",
    rating: "4.9",
    description: "Diseña, entrena e implementa arquitecturas de redes neuronales, modelos LLM y visión por computadora para la industria 4.0.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    features: ["Redes Neuronales Convolucionales", "PyTorch y TensorFlow", "Proyectos de Visión Artificial"]
  },
  {
    id: 2,
    title: "Diplomado en Arquitectura Cloud Native & DevOps",
    category: "diplomados",
    moodleUrl: "http://localhost/moodle/",
    level: "Avanzado",
    duration: "120 Horas",
    students: "980",
    rating: "4.8",
    description: "Construye infraestructuras de alta disponibilidad con Kubernetes, Terraform, AWS, Azure y Pipelines de CI/CD automatizados.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    features: ["Docker & Kubernetes", "Infrastructure as Code", "Integración Moodle API"]
  },
  {
    id: 3,
    title: "Certificación Internacional en UI/UX & Design Systems",
    category: "certificaciones",
    moodleUrl: "http://localhost/moodle/",
    level: "Principiante",
    duration: "90 Horas",
    students: "1,890",
    rating: "4.7",
    description: "Crea experiencias de usuario excepcionales, metodologías de investigación cualitativa y sistemas de diseño escalables.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
    features: ["Figma Design Systems", "User Research Strategy", "Prototipado Interactivo"]
  },
  {
    id: 4,
    title: "Licenciatura en Desarrollo de Software & Sistemas Distribuidos",
    category: "licenciaturas",
    moodleUrl: "http://localhost/moodle/",
    level: "Intermedio",
    duration: "240 Horas",
    students: "2,100",
    rating: "4.9",
    description: "Formación profesional completa enfocada en desarrollo web moderno, microservicios y bases de datos relacionales y NoSQL.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    features: ["Arquitectura Hexagonal", "Next.js & Node.js", "Seguridad e Identidad Digital"]
  },
  {
    id: 5,
    title: "Certificación en Ciberseguridad & Ethical Hacking",
    category: "certificaciones",
    moodleUrl: "http://localhost/moodle/",
    level: "Avanzado",
    duration: "110 Horas",
    students: "850",
    rating: "4.8",
    description: "Aprende auditoría de sistemas, pruebas de penetración, respuesta a incidentes y análisis forense digital.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    features: ["Pentesting Web", "Análisis de Vulnerabilidades", "Cumplimiento ISO 27001"]
  },
  {
    id: 6,
    title: "Diplomado en Big Data & Business Analytics",
    category: "diplomados",
    moodleUrl: "http://localhost/moodle/",
    level: "Intermedio",
    duration: "130 Horas",
    students: "1,150",
    rating: "4.7",
    description: "Transforma grandes volúmenes de datos en decisiones estratégicas de negocio utilizando Python, SQL y PowerBI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    features: ["Análisis Predictivo", "Pipelines de Datos ETL", "Dashboards Ejecutivos"]
  }
];

const testimonials = [
  {
    id: 1,
    name: "Emma Hart",
    role: "Egresada de Arquitectura Cloud",
    quote: "Estudiar en IINICIA ha sido una excelente decisión. La flexibilidad y el apoyo constante hacen que realmente valga la pena.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    stars: 5
  },
  {
    id: 2,
    name: "Eddie Johnson",
    role: "Estudiante de Ciberseguridad",
    quote: "El contenido está 100% alineado con lo que pide la industria actual. Poder ingresar al campus virtual las 24 horas facilitó mi aprendizaje.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    stars: 5
  },
  {
    id: 3,
    name: "Jonathan Doe",
    role: "Especialista en IA",
    quote: "IINICIA me abrió las puertas al estudio flexible con un nivel académico altísimo. Es una universidad confiable y muy profesional.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    stars: 5
  }
];

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Capturar sesión y tokens de Supabase automáticamente al cargar
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session && window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session && window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const filteredPrograms = initialPrograms.filter(program => {
    const matchesCategory = activeCategory === 'todos' || program.category === activeCategory;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navigateToCategory = (category: string) => {
    setActiveCategory(category);
    scrollToSection('programas');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmailInput('');
      }, 4000);
    }
  };

  return (
    <div id="inicio" className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#0066FF] selection:text-white">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <button 
            onClick={() => scrollToSection('inicio')} 
            className="flex items-center gap-3 cursor-pointer text-left"
          >
            <div className="flex items-center justify-center">
              <svg className="w-10 h-10 text-[#0066FF]" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 10C18.9543 10 10 18.9543 10 30C10 41.0457 18.9543 50 30 50C40 50 46 41 50 30C54 19 60 10 70 10C81.0457 10 90 18.9543 90 30C90 41.0457 81.0457 50 70 50C60 50 54 41 50 30C46 19 40 10 30 10Z" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                <circle cx="50" cy="30" r="5" fill="#00D2FF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-slate-900 flex items-center gap-1">
                ÍNÍCÍÁ <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-[#0066FF] border border-blue-200 font-bold">TECH</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight -mt-1">
                Instituto de Innovación y Ciencias Aplicadas
              </span>
            </div>
          </button>

          {/* MENÚ DE ESCRITORIO ONE-PAGE */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => navigateToCategory('todos')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Cursos</button>
            <button onClick={() => navigateToCategory('certificaciones')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Certificaciones</button>
            <button onClick={() => navigateToCategory('diplomados')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Diplomados</button>
            <button onClick={() => navigateToCategory('ingenierias')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Ingenierías</button>
            <button onClick={() => navigateToCategory('licenciaturas')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Licenciaturas</button>
            <button onClick={() => scrollToSection('nosotros')} className="hover:text-[#0066FF] transition-colors cursor-pointer">¿Por qué elegirnos?</button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Testimonios</button>
            <button onClick={() => scrollToSection('contacto')} className="hover:text-[#0066FF] transition-colors cursor-pointer">Contacto</button>
          </div>

          {/* ESTADO DE AUTENTICACIÓN DINÁMICO */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span className="max-w-[160px] truncate">{user.email}</span>
                </div>
                <a
                  href="http://localhost/moodle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-600 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Server className="w-3.5 h-3.5" /> Ir a Moodle
                </a>
                <button
                  onClick={handleLogout}
                  title="Cerrar Sesión"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/register" 
                  className="hidden sm:flex items-center px-3.5 py-2 text-xs font-semibold text-[#0066FF] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all"
                >
                  Crear Cuenta
                </Link>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0066FF] hover:bg-blue-600 rounded-lg shadow-md transition-all"
                >
                  Iniciar Sesión
                </Link>
              </>
            )}

            {/* Botón hamburguesa móvil */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="xl:hidden p-2 text-slate-600 hover:text-[#0066FF] rounded-lg cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 text-sm font-medium text-slate-700">
            {user && (
              <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                <span>Conectado: {user.email}</span>
                <button onClick={handleLogout} className="text-red-600 underline cursor-pointer">Salir</button>
              </div>
            )}
            <button onClick={() => navigateToCategory('todos')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Cursos</button>
            <button onClick={() => navigateToCategory('certificaciones')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Certificaciones</button>
            <button onClick={() => navigateToCategory('diplomados')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Diplomados</button>
            <button onClick={() => navigateToCategory('ingenierias')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Ingenierías</button>
            <button onClick={() => navigateToCategory('licenciaturas')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Licenciaturas</button>
            <button onClick={() => scrollToSection('nosotros')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">¿Por qué elegirnos?</button>
            <button onClick={() => scrollToSection('testimonios')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Testimonios</button>
            <button onClick={() => scrollToSection('contacto')} className="block w-full text-left py-1.5 hover:text-[#0066FF] cursor-pointer">Contacto</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {user && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold mb-6">
              ¡Bienvenido de vuelta, {user.email}!
            </div>
          )}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            UNIVERSIDAD <span className="text-[#0066FF]">iINICIA</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 mb-10 leading-relaxed font-normal">
            Tu educación comienza hoy. Accede a tu campus en Moodle LMS 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button 
              onClick={() => navigateToCategory('todos')}
              className="w-full sm:w-auto px-8 py-4 bg-[#0066FF] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              COMIENZA AHORA <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="http://localhost/moodle/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <Server className="w-4 h-4 text-[#0066FF]" /> Explorar Moodle
            </a>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE PROGRAMAS */}
      <section id="programas" className="py-20 bg-white relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Oferta Académica</h2>
              <p className="text-sm text-slate-500 mt-1">Impulsa tu futuro con aprendizaje de excelencia y confianza en los expertos.</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar programa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-100">
            {[
              { id: 'todos', label: 'Todos los Programas' },
              { id: 'ingenierias', label: 'Ingenierías' },
              { id: 'licenciaturas', label: 'Licenciaturas' },
              { id: 'diplomados', label: 'Diplomados' },
              { id: 'certificaciones', label: 'Certificaciones' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0066FF] text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <div 
                  key={program.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-[#0066FF] text-[10px] font-bold rounded-full border border-slate-200 uppercase shadow-sm">
                      {program.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0066FF]" /> {program.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#0066FF]" /> {program.students}</span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold"><Star className="w-3.5 h-3.5 fill-amber-500" /> {program.rating}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#0066FF] transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-xs text-slate-600 mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {program.description}
                    </p>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedProgram(program)}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                      >
                        Ver Detalle
                      </button>
                      <a 
                        href={program.moodleUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all text-center"
                      >
                        Inscribirse
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400 text-sm">
                No se encontraron programas que coincidan con tu búsqueda.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ¿POR QUÉ ELEGIRNOS? */}
      <section id="nosotros" className="py-20 bg-slate-50 border-y border-slate-200 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-[#0066FF] uppercase tracking-widest">Ventajas Competitivas</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-6">¿POR QUÉ ELEGIRNOS?</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                En IINICIA, tu aprendizaje se adapta a tu vida. Diseñamos una experiencia flexible para que puedas estudiar sin dejar de lado tus responsabilidades diarias.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Carreras Universitarias", desc: "Formación profesional completa con planes oficiales diseñados para el mundo digital." },
                  { title: "Certificaciones Reconocidas", desc: "Valida tus habilidades con certificaciones reconocidas por la industria tecnológica." },
                  { title: "Diplomados Online", desc: "Programas especializados para profundizar en áreas clave de alta demanda." },
                  { title: "Profesores y Tutores 24/7", desc: "Soporte personalizado para acompañarte durante todo tu camino de aprendizaje." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="p-2 bg-blue-50 text-[#0066FF] rounded-lg h-fit">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{feature.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-8 bg-white border border-slate-200 rounded-3xl text-center shadow-md">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Confianza Comprobada</h3>
              <p className="text-xs text-slate-500 mb-8">Miles de alumnos capacitados en toda la región.</p>
              <div className="inline-flex items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
                <span className="text-5xl font-black text-slate-900 mr-4">4.8</span>
                <div className="text-left">
                  <div className="flex text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Google Reviews • 2,394 valoraciones</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-[#0066FF]">+5,000</div>
                  <div className="text-[11px] text-slate-500 font-medium">Estudiantes Activos</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-blue-600">99%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Empleabilidad Directa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#0066FF] uppercase tracking-widest">Opiniones</span>
          <h2 className="text-3xl font-black text-slate-900 mt-1 mb-12">Lo Que Dicen Nuestros Estudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex text-amber-500 mb-4">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <span className="text-[10px] text-slate-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSCRIPCIÓN */}
      <section id="suscripcion" className="py-16 bg-gradient-to-r from-blue-50 via-slate-50 to-cyan-50 border-t border-slate-200 text-center scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Únete a nuestra comunidad</h2>
          <p className="text-xs text-slate-600 mb-6">Introduzca su dirección de correo electrónico para recibir noticias y ofertas académicas.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              required
              placeholder="Tu correo electrónico" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0066FF] shadow-sm"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              {subscribed ? '¡Suscrito!' : 'SUSCRIBIRSE'}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER / CONTACTO */}
      <footer id="contacto" className="bg-slate-900 text-slate-300 py-12 text-xs scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-black text-white">ÍNÍCÍÁ TECH</span>
            </div>
            <p className="text-slate-400 leading-relaxed pr-4">
              Tu educación comienza hoy, estés donde estés. El conocimiento que transforma tu vida está a tu alcance en todo momento.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0066FF]" /> Av. Universidad Tech 101, CDMX</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#0066FF]" /> +52 (55) 8000-4321</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#0066FF]" /> contacto@iinicia.org</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Plataforma</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="http://localhost/moodle/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Campus Moodle LMS</a></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Acceso a Estudiantes</Link></li>
              <li><button onClick={() => navigateToCategory('todos')} className="hover:text-white transition-colors cursor-pointer">Oferta Académica</button></li>
              <li><button onClick={() => scrollToSection('nosotros')} className="hover:text-white transition-colors cursor-pointer">¿Por qué elegirnos?</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500">
          <p>© 2026 UNIVERSIDAD IINICIA. Todos los derechos reservados.</p>
          <p>Powered by IINICIA LMS Engine</p>
        </div>
      </footer>

      {/* MODAL DETALLE DEL PROGRAMA */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button onClick={() => setSelectedProgram(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedProgram.title}</h3>
            <p className="text-xs text-slate-600 mb-4">{selectedProgram.description}</p>
            <div className="space-y-2 mb-6">
              <div className="text-xs font-bold text-[#0066FF]">Temas Clave:</div>
              {selectedProgram.features.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></div> {f}
                </div>
              ))}
            </div>
            <a 
              href={selectedProgram.moodleUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0066FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md transition-all block text-center"
            >
              Ir a este Curso en Moodle
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
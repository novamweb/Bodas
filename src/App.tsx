import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  Twitter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";


const imgFiles = import.meta.glob<string>('./img/*', { 
  eager: true, 
  query: '?url', 
  import: 'default' 
});

const img = (name: string): string => imgFiles[`./img/${name}`] ?? '';

const portfolioImages = [
  { src: img('decora1.jpg'),    cat: 'campo',    sub: 'decoracion' },
  { src: img('decora2.jpg'),    cat: 'campo',    sub: 'decoracion' },
  { src: img('1.jpg'),          cat: 'castillo', sub: 'paisaje' },
  { src: img('decora3.jpg'),    cat: 'campo',    sub: 'decoracion' },
  { src: img('1decora.jpg'),    cat: 'castillo', sub: 'decoracion' },
  { src: img('castillopaisa.jpg'), cat: 'castillo', sub: 'paisaje' },
  { src: img('2decora.jpg'),    cat: 'castillo', sub: 'decoracion' },
  { src: img('3decora.jpg'),    cat: 'castillo', sub: 'decoracion' },
  { src: img('p.png'),          cat: 'campo',    sub: 'novios'     },
  { src: img('p2.png'),         cat: 'campo',    sub: 'novios'     },
  { src: img('pdecora.png'),    cat: 'campo',    sub: 'decoracion' },
  { src: img('novios2.jpg'),    cat: 'castillo', sub: 'novios' },
  { src: img('3.jpg'),          cat: 'castillo', sub: 'paisaje' },
  { src: img('p3.png'),         cat: 'campo',    sub: 'novios'     },
  { src: img('pdecora2.png'),   cat: 'campo',    sub: 'decoracion' },
  { src: img('novios3.jpg'),    cat: 'castillo', sub: 'novios' },
  { src: img('castillodecora.jpg'), cat: 'castillo', sub: 'paisaje' },
  { src: img('pdetalles.png'),  cat: 'campo',    sub: 'detalles'   },
  { src: img('2.jpg'),          cat: 'castillo', sub: 'paisaje' },
  { src: img('pdetalles2.png'), cat: 'campo',    sub: 'detalles'   },
  { src: img('catillopaisa2.jpg'), cat: 'castillo', sub: 'paisaje' },
  { src: img('pdetalles3.png'), cat: 'campo',    sub: 'detalles'   },
  { src: img('novioscatillo.jpg'), cat: 'castillo', sub: 'novios' },
  { src: img('detalles1.jpg'),  cat: 'campo',    sub: 'detalles'   },
  { src: img('tarta2.jpg'),     cat: 'campo',    sub: 'detalles' },
  { src: img('catillopaisa3.jpg'), cat: 'castillo', sub: 'paisaje' },
  { src: img('decora5.jpg'),    cat: 'campo',    sub: 'decoracion' },
  { src: img('detalles6.jpg'),  cat: 'campo',    sub: 'paisaje' },
  { src: img('catillopaisa1.jpg'), cat: 'castillo', sub: 'paisaje' },
  { src: img('pdetalle4.png'),  cat: 'campo',    sub: 'detalles' },
  { src: img('novios1.jpg'),    cat: 'castillo', sub: 'novios' },
  { src: img('tarta.jpg'),      cat: 'campo',    sub: 'detalles' },
  { src: img('4.jpg'),          cat: 'castillo', sub: 'paisaje' },
];

// Fotos seleccionadas para el carrusel (las más variadas y representativas)
const carouselImages = [
  img('1.jpg'),
  img('castillopaisa.jpg'),
  img('novios2.jpg'),
  img('3.jpg'),
  img('castillodecora.jpg'),
  img('2.jpg'),
  img('novios1.jpg'),
  img('catillopaisa1.jpg'),
  img('decora1.jpg'),
  img('novios3.jpg'),
];

type Language = 'ES' | 'EN' | 'FR' | 'IT' | 'DE';

const content = {
  ES: {
    nav: [
      { name: "Inicio", path: "/" },
      { name: "Sobre Mí", path: "/sobre-mi" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Contacto", path: "/contacto" }
    ],
    hero: "Elegance Mariages",
    heroSubtitle: "Planificación de Bodas de Lujo & Destinos Exclusivos",
    about: "La Visionaria",
    aboutQuote: "La elegancia es la única belleza que nunca se desvanece",
    aboutText: "Con más de una década dedicándome a la creación de momentos inolvidables, mi enfoque se centra en la exclusividad, el detalle y la elegancia atemporal. Especializada en bodas de destino internacionales, cada boda es una obra de arte única, diseñada para reflejar la esencia de quienes confían en mi visión en cualquier rincón del mundo.",
    philosophyTitle: "Nuestra Filosofía",
    philosophyText: "Cada detalle cuenta. Desde la elección del lugar más recóndito hasta el último pétalo de flor, mi objetivo es crear una atmósfera internacional que cuente su historia personal de la manera más sofisticada posible.",
    services: "Servicios Exclusivos",
    servicesTitle: "Experiencias a Medida",
    service1: "Planificación Integral",
    service1Desc: "Desde la concepción hasta la ejecución, cuidamos cada detalle de su gran día.",
    service2: "Bodas de Destino",
    service2Desc: "Expertos en coordinar eventos exclusivos en los lugares más bellos del mundo.",
    service3: "Diseño & Estilismo",
    service3Desc: "Creación de conceptos visuales únicos que reflejan su estilo personal.",
    portfolio: "La Colección",
    portfolioTitle: "Colección de Momentos",
    carouselLabel: "Momentos Inolvidables",
    viewDetail: "Ver Detalle",
    contact: "Contacto",
    contactTitle: "Hablemos de su gran día",
    locations: "Madrid · París · Londres · Roma",
    formName: "Nombre",
    formEmail: "Email",
    formDate: "Fecha del Evento",
    formMessage: "Mensaje",
    formSubmit: "Enviar Solicitud",
    footer: "Planificación de Bodas de Lujo & Destino",
    rights: "Todos los derechos reservados"
  },
  EN: {
    nav: [
      { name: "Home", path: "/" },
      { name: "The Visionary", path: "/sobre-mi" },
      { name: "The Collection", path: "/portfolio" },
      { name: "Contact", path: "/contacto" }
    ],
    hero: "Elegance Mariages",
    heroSubtitle: "Luxury Wedding Planning & Exclusive Destinations",
    about: "The Visionary",
    aboutQuote: "Elegance is the only beauty that never fades",
    aboutText: "With over a decade dedicated to creating unforgettable moments, my focus is on exclusivity, detail, and timeless elegance. Specializing in international destination weddings, each wedding is a unique work of art, designed to reflect the essence of those who trust in my vision across the globe.",
    philosophyTitle: "Our Philosophy",
    philosophyText: "Every detail matters. From the choice of the most remote venue to the last flower petal, my goal is to create an international atmosphere that tells your personal story in the most sophisticated way possible.",
    services: "Exclusive Services",
    servicesTitle: "Tailored Experiences",
    service1: "Full Planning",
    service1Desc: "From conception to execution, we take care of every detail of your big day.",
    service2: "Destination Weddings",
    service2Desc: "Experts in coordinating exclusive events in the world's most beautiful locations.",
    service3: "Design & Styling",
    service3Desc: "Creation of unique visual concepts that reflect your personal style.",
    portfolio: "The Collection",
    portfolioTitle: "Collection of Moments",
    carouselLabel: "Unforgettable Moments",
    viewDetail: "View Detail",
    contact: "Contact",
    contactTitle: "Let's talk about your big day",
    locations: "Madrid · Paris · London · Rome",
    formName: "Name",
    formEmail: "Email",
    formDate: "Event Date",
    formMessage: "Message",
    formSubmit: "Send Request",
    footer: "Luxury & Destination Wedding Planning",
    rights: "All rights reserved"
  },
  FR: {
    nav: [
      { name: "Accueil", path: "/" },
      { name: "À Propos", path: "/sobre-mi" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Contact", path: "/contacto" }
    ],
    hero: "Elegance Mariages",
    heroSubtitle: "Planification de Mariages de Luxe & Destinations Exclusives",
    about: "À Propos",
    aboutQuote: "L'élégance est la seule beauté qui ne se fane jamais",
    aboutText: "Avec plus d'une décennie consacrée à la création de moments inoubliables, mon approche se concentre sur l'exclusivité, le détail et l'élégance intemporelle. Spécialisée dans les mariages de destination internationaux, chaque mariage est une œuvre d'art unique, conçue pour refléter l'essence de ceux qui font confiance à ma vision partout dans le monde.",
    philosophyTitle: "Ma Philosophie",
    philosophyText: "Chaque détail compte. Du choix du lieu le plus reculé au dernier pétale de fleur, mon objectif est de créer une atmosphère internationale qui raconte votre histoire personnelle de la manière la plus sophistiquée possible.",
    services: "Services Exclusifs",
    servicesTitle: "Expériences Sur Mesure",
    service1: "Planification Complète",
    service1Desc: "De la conception à l'exécution, nous prenons soin de chaque détail de votre grand jour.",
    service2: "Mariages de Destination",
    service2Desc: "Experts dans la coordination d'événements exclusifs dans les plus beaux endroits du monde.",
    service3: "Design & Stylisme",
    service3Desc: "Création de concepts visuels uniques qui reflètent votre style personnel.",
    portfolio: "Portfolio",
    portfolioTitle: "Collection de Moments",
    carouselLabel: "Moments Inoubliables",
    viewDetail: "Voir Détails",
    contact: "Contact",
    contactTitle: "Parlons de votre grand jour",
    locations: "Madrid · Paris · Londres · Rome",
    formName: "Nom",
    formEmail: "Email",
    formDate: "Date de l'événement",
    formMessage: "Message",
    formSubmit: "Envoyer la demande",
    footer: "Planification de Mariages de Luxe & Destination",
    rights: "Tous droits réservés"
  },
  IT: {
    nav: [
      { name: "Home", path: "/" },
      { name: "Chi Sono", path: "/sobre-mi" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Contatti", path: "/contacto" }
    ],
    hero: "Elegance Mariages",
    heroSubtitle: "Pianificazione Matrimoni di Lusso & Destinazioni Esclusive",
    about: "Chi Sono",
    aboutQuote: "L'eleganza è l'unica bellezza che non svanisce mai",
    aboutText: "Con oltre un decennio dedicato alla creazione di momenti indimenticabili, il mio focus è sull'esclusività, il dettaglio e l'eleganza senza tempo. Specializzata in matrimoni di destinazione internazionali, ogni matrimonio è un'opera d'arte unica, progettata per riflettere l'essenza di chi si affida alla mia visione in tutto il mondo.",
    philosophyTitle: "La Mia Filosofia",
    philosophyText: "Ogni dettaglio conta. Dalla scelta della location più remota all'ultimo petalo di fiore, il mio obiettivo è creare un'atmosfera internazionale che racconti la vostra storia personale nel modo più sofisticato possibile.",
    services: "Servizi Esclusivi",
    servicesTitle: "Esperienze Su Misura",
    service1: "Pianificazione Completa",
    service1Desc: "Dalla concezione all'esecuzione, ci prendiamo cura di ogni dettaglio del vostro grande giorno.",
    service2: "Matrimoni di Destinazione",
    service2Desc: "Esperti nel coordinare eventi esclusivi nelle location più belle del mondo.",
    service3: "Design & Styling",
    service3Desc: "Creazione di concetti visivi unici che riflettono il vostro stile personale.",
    portfolio: "Portfolio",
    portfolioTitle: "Collezione di Momenti",
    carouselLabel: "Momenti Indimenticabili",
    viewDetail: "Vedi Dettaglio",
    contact: "Contatti",
    contactTitle: "Parliamo del vostro grande giorno",
    locations: "Madrid · Parigi · Londra · Roma",
    formName: "Nome",
    formEmail: "Email",
    formDate: "Data dell'Evento",
    formMessage: "Messaggio",
    formSubmit: "Invia Richiesta",
    footer: "Pianificazione Matrimoni di Lusso & Destinazione",
    rights: "Tutti i diritti riservati"
  },
  DE: {
    nav: [
      { name: "Startseite", path: "/" },
      { name: "Über Mich", path: "/sobre-mi" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Kontakt", path: "/contacto" }
    ],
    hero: "Elegance Mariages",
    heroSubtitle: "Luxus-Hochzeitsplanung & Exklusive Destinationen",
    about: "Über Mich",
    aboutQuote: "Eleganz ist die einzige Schönheit, die niemals vergeht",
    aboutText: "Mit über einem Jahrzehnt Erfahrung in der Gestaltung unvergesslicher Momente liegt mein Fokus auf Exklusivität, Detailtreue und zeitloser Eleganz. Spezialisiert auf internationale Destination-Weddings, ist jede Hochzeit ein einzigartiges Kunstwerk, das die Essenz derer widerspiegelt, die meiner Vision weltweit vertrauen.",
    philosophyTitle: "Meine Philosophie",
    philosophyText: "Jedes Detail zählt. Von der Wahl des entlegensten Ortes bis zum letzten Blütenblatt ist es mein Ziel, eine internationale Atmosphäre zu schaffen, die Ihre persönliche Geschichte auf die anspruchsvollste Weise erzählt.",
    services: "Exklusive Dienstleistungen",
    servicesTitle: "Maßgeschneiderte Erlebnisse",
    service1: "Vollständige Planung",
    service1Desc: "Von der Konzeption bis zur Ausführung kümmern wir uns um jedes Detail Ihres großen Tages.",
    service2: "Destination-Hochzeiten",
    service2Desc: "Experten für die Koordination exklusiver Events an den schönsten Orten der Welt.",
    service3: "Design & Styling",
    service3Desc: "Erstellung einzigartiger visueller Konzepte, die Ihren persönlichen Stil widerspiegeln.",
    portfolio: "Portfolio",
    portfolioTitle: "Sammlung von Momenten",
    carouselLabel: "Unvergessliche Momente",
    viewDetail: "Details Anzeigen",
    contact: "Kontakt",
    contactTitle: "Lassen Sie uns über Ihren großen Tag sprechen",
    locations: "Madrid · Paris · London · Rom",
    formName: "Name",
    formEmail: "E-Mail",
    formDate: "Veranstaltungsdatum",
    formMessage: "Nachricht",
    formSubmit: "Anfrage Senden",
    footer: "Luxus- & Destination-Hochzeitsplanung",
    rights: "Alle Rechte vorbehalten"
  }
};

const flags = {
  ES: "🇪🇸",
  EN: "🇬🇧",
  FR: "🇫🇷",
  IT: "🇮🇹",
  DE: "🇩🇪"
};

// ── CARRUSEL ────────────────────────────────────────────────────────────────
const Carousel = memo(({ label }: { label: string }) => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRef = useRef(current);
  currentRef.current = current;
  const total = carouselImages.length;

  const go = useCallback((idx: number) => {
    setPrev(currentRef.current);
    setCurrent((idx + total) % total);
  }, [total]);

  useEffect(() => {
    timerRef.current = setTimeout(() => go(current + 1), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, go]);

  return (
    <section className="py-32 bg-champagne overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-4 block font-medium">
            {label}
          </span>
          <div className="w-12 h-[1px] bg-gold/40 mx-auto" />
        </motion.div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl bg-zinc-900">
          {prev !== null && (
            <img
              key={`prev-${prev}`}
              src={carouselImages[prev]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              decoding="async"
            />
          )}
          <motion.img
            key={current}
            src={carouselImages[current]}
            alt={`Slide ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none z-10" />

          <button
            onClick={() => go(current - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/60 transition-all duration-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/60 transition-all duration-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 right-8 z-20 text-white/70 text-[10px] uppercase tracking-[0.4em]">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>

      </div>
    </section>
  );
});
// ────────────────────────────────────────────────────────────────────────────

const Navbar = memo(({ lang, setLang, t }: { lang: Language, setLang: (l: Language) => void, t: any }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md py-4 shadow-lg border-b border-gold/20' 
          : isHome 
            ? 'bg-transparent py-8' 
            : 'bg-white py-6 border-b border-gold/10'
      }`}>
        <div className="max-w-[1800px] mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
              <Menu className={`w-6 h-6 ${!scrolled && isHome ? 'text-white' : 'text-zinc-900'}`} />
            </button>
            <div className={`hidden md:flex gap-12 text-[11px] uppercase tracking-[0.5em] font-light ${
              !scrolled && isHome ? 'text-white' : 'text-zinc-500'
            }`}>
              {t.nav.map((item: any, i: number) => (
                <Link 
                  key={i} 
                  to={item.path} 
                  className={`relative hover:text-gold transition-all duration-300 group ${
                    location.pathname === item.path ? 'text-gold' : ''
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-2 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover:w-full ${
                    location.pathname === item.path ? 'w-full' : ''
                  }`} />
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase hover:text-gold transition-all duration-500 ${
                !scrolled && isHome ? 'text-white' : 'text-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{flags[lang]}</span>
                <span className="font-light">{lang}</span>
              </div>
              <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-6 bg-white border border-gold/10 shadow-2xl p-4 min-w-[160px] rounded-xl overflow-hidden"
                >
                  {(['ES', 'EN', 'FR', 'IT', 'DE'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setIsLangOpen(false); }}
                      className={`flex items-center gap-4 w-full px-4 py-3 text-[10px] tracking-widest transition-all duration-300 rounded-lg ${
                        lang === l ? 'bg-zinc-50 text-gold' : 'hover:bg-zinc-50 text-zinc-500'
                      }`}
                    >
                      <span className="text-xl">{flags[l]}</span>
                      <span>{l}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-[60] bg-champagne p-8 flex flex-col border-r border-gold/10"
          >
            <button onClick={() => setIsMenuOpen(false)} className="self-end mb-12 hover:text-gold transition-colors">
              <X className="w-8 h-8 font-light" />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-serif italic">
              {t.nav.map((item: any, i: number) => (
                <Link key={i} to={item.path} onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

const Footer = memo(({ t }: { t: any }) => (
  <footer className="py-24 border-t border-gold/10 bg-champagne">
    <div className="max-w-7xl mx-auto px-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-serif text-3xl tracking-[0.4em] uppercase font-light mb-6 luxury-text">{t.hero}</h2>
        <div className="w-12 h-[2px] bg-gold mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-12 mb-20 text-[10px] uppercase tracking-[0.3em] font-light text-zinc-500">
          <div className="flex flex-col gap-4">
            <span className="text-zinc-900 font-medium">Contact</span>
            <p>info@elegancemariages.com</p>
            <p>+34 600 000 000</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-zinc-900 font-medium">Locations</span>
            <p className="luxury-text">{t.locations}</p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-zinc-900 font-medium">Social</span>
            <div className="flex justify-center gap-6">
              <Instagram className="w-4 h-4 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="w-4 h-4 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-[0.5em] text-gold mb-8 font-medium">{t.footer}</p>
        <p className="text-[9px] uppercase tracking-widest text-zinc-300">
          © 2026 {t.hero}. {t.rights}.
        </p>
      </div>
    </div>
  </footer>
));

const Home = memo(({ t }: { t: any }) => (
  <div className="page-transition">
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Wedding"
          className="w-full h-full object-cover premium-image"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6 max-w-5xl"
      >
        <h2 className="font-serif text-6xl md:text-[10vw] font-light uppercase mb-16 editorial-title">
          {t.hero}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Link 
            to="/portfolio"
            className="inline-block border border-white/20 px-12 py-5 text-[10px] uppercase tracking-[0.5em] text-white hover:bg-white hover:text-ink transition-all duration-700 luxury-text backdrop-blur-sm"
          >
            {t.portfolio}
          </Link>
          <Link 
            to="/contacto"
            className="inline-block bg-gold text-white px-12 py-5 text-[10px] uppercase tracking-[0.5em] hover:bg-white hover:text-ink transition-all duration-700 luxury-text shadow-2xl shadow-gold/20"
          >
            {t.contact}
          </Link>
        </div>
      </motion.div>
    </section>

    <section className="py-40 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-32">
          <span className="text-[10px] uppercase tracking-[0.6em] text-gold mb-6 block">{t.services}</span>
          <h3 className="font-serif text-5xl md:text-6xl font-light editorial-title italic-serif">{t.servicesTitle}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {[
            { title: t.service1, desc: t.service1Desc, img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" },
            { title: t.service2, desc: t.service2Desc, img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
            { title: t.service3, desc: t.service3Desc, img: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop" }
          ].map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="aspect-[3/4] overflow-hidden mb-12 shadow-2xl transition-all duration-1000">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover premium-image"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h4 className="font-serif text-2xl mb-6 luxury-text italic-serif">{service.title}</h4>
              <p className="text-zinc-400 font-light leading-relaxed text-sm max-w-[280px] mx-auto">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CARRUSEL ── */}
    <Carousel label={t.carouselLabel} />

  </div>
));

const About = memo(({ t }: { t: any }) => (
  <div className="page-transition pt-32 bg-champagne min-h-screen">
    <section className="py-40 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-12 block font-medium">{t.about}</span>
        <h3 className="font-serif text-5xl md:text-7xl italic-serif font-light mb-16 editorial-title">
          "{t.aboutQuote}"
        </h3>
        <p className="text-zinc-500 leading-relaxed text-xl font-light max-w-3xl mx-auto italic">
          {t.aboutText}
        </p>
      </div>
    </section>
    <section className="py-40 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="aspect-[4/5] overflow-hidden shadow-[40px_40px_0px_0px_rgba(197,160,89,0.05)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
            alt="Planner" 
            className="w-full h-full object-cover premium-image"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <h4 className="font-serif text-4xl mb-12 italic-serif text-taupe luxury-text gold-underline inline-block">{t.philosophyTitle}</h4>
          <p className="text-zinc-500 font-light leading-relaxed text-lg mb-12">
            {t.philosophyText}
          </p>
          <div className="flex gap-12 items-center">
            <div className="w-24 h-[1px] bg-gold/30" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold italic">Elegance Mariages</span>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
));

const Portfolio = memo(({ t }: { t: any }) => {
  const [activeCat, setActiveCat] = useState<string>('todos');
  const [activeSub, setActiveSub] = useState<string>('todo');

  const mainFilters = useMemo(() => [
    { key: 'todos',    label: { ES: 'Todos',         EN: 'All',         FR: 'Tous',    IT: 'Tutti',    DE: 'Alle'    } },
    { key: 'playa',    label: { ES: 'Playa',          EN: 'Beach',       FR: 'Plage',   IT: 'Spiaggia', DE: 'Strand'  } },
    { key: 'castillo', label: { ES: 'Castillo',       EN: 'Castle',      FR: 'Château', IT: 'Castello', DE: 'Schloss' } },
    { key: 'campo',    label: { ES: 'Campo & Viñedo', EN: 'Countryside', FR: 'Campagne',IT: 'Campagna', DE: 'Landgut' } },
  ], []);

  const subFilters = useMemo(() => [
    { key: 'todo',       label: { ES: 'Todo',       EN: 'All',     FR: 'Tout',       IT: 'Tutto',       DE: 'Alle'       } },
    { key: 'decoracion', label: { ES: 'Decoración', EN: 'Décor',   FR: 'Décoration', IT: 'Decorazione', DE: 'Dekoration' } },
    { key: 'paisaje',    label: { ES: 'Paisajes',   EN: 'Scenery', FR: 'Paysages',   IT: 'Paesaggi',    DE: 'Landschaft' } },
    { key: 'novios',     label: { ES: 'Novios',     EN: 'Couple',  FR: 'Mariés',     IT: 'Sposi',       DE: 'Brautpaar'  } },
    { key: 'detalles',   label: { ES: 'Detalles',   EN: 'Details', FR: 'Détails',    IT: 'Dettagli',    DE: 'Details'    } },
  ], []);

  const filtered = useMemo(() => portfolioImages.filter(item => {
    const catMatch = activeCat === 'todos' || 
      (Array.isArray(item.cat) ? item.cat.includes(activeCat) : item.cat === activeCat);
    const subMatch = activeSub === 'todo'  || 
      (Array.isArray(item.sub) ? item.sub.includes(activeSub) : item.sub === activeSub);
    return catMatch && subMatch;
  }), [activeCat, activeSub]);

  const handleCat = useCallback((key: string) => {
    setActiveCat(key);
    setActiveSub('todo');
  }, []);

  return (
    <div className="page-transition pt-32 bg-champagne">
      <section className="py-40">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-6 block font-medium">{t.portfolio}</span>
            <h3 className="font-serif text-5xl md:text-7xl font-light editorial-title italic-serif gold-underline inline-block">{t.portfolioTitle}</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {mainFilters.map(f => (
              <button
                key={f.key}
                onClick={() => handleCat(f.key)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.4em] border transition-all duration-500 ${
                  activeCat === f.key
                    ? 'bg-ink text-gold border-ink'
                    : 'bg-white text-zinc-400 border-zinc-200 hover:border-gold hover:text-zinc-700'
                }`}
              >
                {f.label['ES']}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {activeCat !== 'todos' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-2 mb-10 pt-4">
                  {subFilters.map(s => (
                    <button
                      key={s.key}
                      onClick={() => setActiveSub(s.key)}
                      className={`px-6 py-2 text-[9px] uppercase tracking-[0.35em] border transition-all duration-300 ${
                        activeSub === s.key
                          ? 'bg-gold text-white border-gold'
                          : 'bg-transparent text-zinc-400 border-gold/40 hover:bg-gold hover:text-white hover:border-gold'
                      }`}
                    >
                      {s.label['ES']}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gold mb-12">
            {filtered.length} {filtered.length === 1 ? 'imagen' : 'imágenes'}
          </p>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src + JSON.stringify(item.cat) + JSON.stringify(item.sub)}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04, duration: 0.5 }}
                  className="break-inside-avoid overflow-hidden group cursor-pointer relative"
                >
                  <img
                    src={item.src}
                    alt={`Wedding ${i + 1}`}
                    className="w-full h-auto "
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
});

const Contact = memo(({ t }: { t: any }) => (
  <div className="page-transition pt-32 bg-champagne min-h-screen">
    <section className="py-40 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div>
          <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-8 block font-medium">{t.contact}</span>
          <h3 className="font-serif text-5xl md:text-7xl font-light mb-16 editorial-title italic-serif">{t.contactTitle}</h3>
          <div className="space-y-12">
            <div className="flex items-center gap-8 group cursor-pointer">
              <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 backdrop-blur-sm rounded-full">
                <Mail className="w-6 h-6 font-light text-gold" />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Email</p>
                <span className="text-sm tracking-[0.2em] uppercase font-light">info@elegancemariages.com</span>
              </div>
            </div>
            <div className="flex items-center gap-8 group cursor-pointer">
              <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 backdrop-blur-sm rounded-full">
                <Phone className="w-6 h-6 font-light text-gold" />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Phone</p>
                <span className="text-sm tracking-[0.2em] uppercase font-light">+34 600 000 000</span>
              </div>
            </div>
            <div className="flex items-center gap-8 group cursor-pointer">
              <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 backdrop-blur-sm rounded-full">
                <MapPin className="w-6 h-6 font-light text-gold" />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Locations</p>
                <span className="text-sm tracking-[0.2em] uppercase font-light luxury-text">{t.locations}</span>
              </div>
            </div>
          </div>
        </div>
        
        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-12 bg-white p-16 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(197,160,89,0.15)] border border-gold/5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-[0.4em] text-gold font-medium ml-1">{t.formName}</label>
              <input type="text" className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-gold outline-none transition-all duration-500 font-light" />
            </div>
            <div className="space-y-2">
              <label className="text-[8px] uppercase tracking-[0.4em] text-gold font-medium ml-1">{t.formEmail}</label>
              <input type="email" className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-gold outline-none transition-all duration-500 font-light" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-[0.4em] text-gold font-medium ml-1">{t.formDate}</label>
            <input type="text" className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-gold outline-none transition-all duration-500 font-light" />
          </div>
          <div className="space-y-2">
            <label className="text-[8px] uppercase tracking-[0.4em] text-gold font-medium ml-1">{t.formMessage}</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-zinc-100 py-4 text-sm focus:border-gold outline-none transition-all duration-500 font-light resize-none" />
          </div>
          <button className="w-full bg-ink text-white px-12 py-6 text-[10px] uppercase tracking-[0.5em] hover:bg-gold transition-all duration-700 luxury-text shadow-2xl shadow-ink/20 group overflow-hidden relative">
            <span className="relative z-10">{t.formSubmit}</span>
            <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          </button>
        </motion.form>
      </div>
    </section>
  </div>
));

export default function App() {
  const [lang, setLang] = useState<Language>('ES');
  const t = content[lang];

  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-gold/20">
        <Navbar lang={lang} setLang={setLang} t={t} />
        
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/sobre-mi" element={<About t={t} />} />
          <Route path="/portfolio" element={<Portfolio t={t} />} />
          <Route path="/contacto" element={<Contact t={t} />} />
        </Routes>

        <Footer t={t} />

        <a 
          href="https://wa.me/34683511200" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-gold text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
    </Router>
  );
}
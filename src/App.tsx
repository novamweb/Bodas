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
  { src: img('decora1.jpg'), cat: 'campo' },
  { src: img('1.1.jpg'), cat: 'castillo' },

  { src: img('decora2.jpg'), cat: 'campo' },
  { src: img('1.jpg'), cat: 'castillo' },

  { src: img('decora3.jpg'), cat: 'campo' },
  { src: img('2.1.jpg'), cat: 'castillo' },

  { src: img('1decora.jpg'), cat: 'castillo' },
  { src: img('p.png'), cat: 'campo' },

  { src: img('3.1.jpg'), cat: 'castillo' },
  { src: img('p2.png'), cat: 'campo' },

  { src: img('castillopaisa.jpg'), cat: 'castillo' },
  { src: img('pdecora.png'), cat: 'campo' },

  { src: img('4.1.jpg'), cat: 'castillo' },
  { src: img('novios2.jpg'), cat: 'castillo' },

  { src: img('p3.png'), cat: 'campo' },
  { src: img('novios3.jpg'), cat: 'castillo' },

  { src: img('5.jpg'), cat: 'castillo' },
  { src: img('pdecora2.png'), cat: 'campo' },

  { src: img('castillodecora.jpg'), cat: 'castillo' },
  { src: img('pdetalles.png'), cat: 'campo' },

  { src: img('6.jpg'), cat: 'castillo' },
  { src: img('detalles1.jpg'), cat: 'campo' },

  { src: img('tarta2.jpg'), cat: 'campo' },
  { src: img('7.jpg'), cat: 'castillo' },

  { src: img('catillopaisa3.jpg'), cat: 'castillo' },
  { src: img('decora5.jpg'), cat: 'campo' },

  { src: img('8.jpg'), cat: 'castillo' },
  { src: img('detalles6.jpg'), cat: 'campo' },

  { src: img('catillopaisa1.jpg'), cat: 'castillo' },
  { src: img('9.jpg'), cat: 'castillo' },

  { src: img('pdetalle4.png'), cat: 'campo' },
  { src: img('novios1.jpg'), cat: 'castillo' },

  { src: img('10.jpg'), cat: 'castillo' },
  { src: img('tarta.jpg'), cat: 'campo' },

  { src: img('2.jpg'), cat: 'castillo' },
  { src: img('3.jpg'), cat: 'castillo' },

  { src: img('pdetalles2.png'), cat: 'campo' },
  { src: img('catillopaisa2.jpg'), cat: 'castillo' },

  { src: img('pdetalles3.png'), cat: 'campo' },
  { src: img('novioscatillo.jpg'), cat: 'castillo' },

  { src: img('4.jpg'), cat: 'castillo' },
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
      { name: "Mis Servicios", path: "/servicios" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Premium", path: "/premium", premium: true },
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
    servicesPageIntro: "Diseñamos y coordinamos cada celebración con una atención absoluta al detalle, desde la primera idea hasta el último momento.",
    premiumLabel: "Servicio Privado", premiumTitle: "Experiencias Premium",
    premiumIntro: "Una propuesta exclusiva para quienes buscan llevar su celebración a un nivel superior, con un servicio completamente personalizado.",
    premiumMainTitle: "Bridal Styling Experience",
    premiumMainSubtitle: "Dirección estética luxury para una novia única.",
    premiumMainDesc: "Una experiencia exclusiva de dirección estética y acompañamiento bridal para crear una imagen coherente, sofisticada y totalmente personalizada.",
    premiumIncludesTitle: "Incluye",
    premiumIncludes: ["Test de personalidad", "Asesoramiento de imagen", "Dirección Beauty", "Coordinación de vestido y complementos", "Acompañamiento durante el proceso"],
    premiumMainPrice: "Desde 1.500 €",
    
    premiumCeremonyTitle: "Maestra de Ceremonias",
    premiumCeremonySubtitle: "Una ceremonia que habla de vosotros, no se olvida.",
    premiumCeremonyWhatTitle: "Qué es una Maestra de Ceremonias",
    premiumCeremonyWhat: "Una Maestra de Ceremonias no solo conduce un “sí, quiero”. Cuenta la historia que os ha llevado hasta él. Es la persona que crea, escribe y guía la ceremonia, convirtiéndola en un momento único y personal para cada pareja.",
    premiumCeremonyWorkTitle: "El trabajo de la Maestra de Ceremonias",
    premiumCeremonyWork: "Su trabajo va mucho más allá de hablar delante de los invitados. Se encarga de dar forma al relato que ofrecen, estructura cada parte de la ceremonia, coordina las intervenciones y conduce todo con naturalidad, emoción y elegancia. Marcándolo dentro de un tiempo y permitiendo que pareja y asistentes vivan y sientan la historia con sentimiento.",
    premiumCeremonyWhoTitle: "Quién es Raquel Rodríguez",
    premiumCeremonyWho: "Fundadora de La Novia de los Labios Rojos, es wedding planner y maestra de ceremonias. Ella entiende las bodas como una experiencia que debe sentirse, no simplemente organizarse. La apasiona contar historias y encontrar la emoción que existe detrás de cada pareja para convertirla en palabras. Crea ceremonias con personalidad, alejadas de los discursos impersonales y de los textos vacíos. Cada ceremonia empieza escuchándoos y termina convirtiéndose en un momento que habla de vosotros.",
    premiumCeremonyQuote: "Porque una ceremonia que habla de vosotros, no se olvida.",
    premium1: "Concierge Privado", premium1Desc: "Acompañamiento personalizado durante todo el proceso, con atención directa y coordinación de cada necesidad especial.",
    premium2: "Diseño Signature", premium2Desc: "Una experiencia estética creada desde cero, con una identidad única y una selección cuidada de cada detalle.",
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
      { name: "My Services", path: "/servicios" },
      { name: "The Collection", path: "/portfolio" },
      { name: "Premium", path: "/premium", premium: true },
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
    servicesPageIntro: "We design and coordinate every celebration with absolute attention to detail, from the first idea to the final moment.",
    premiumLabel: "Private Service", premiumTitle: "Premium Experiences",
    premiumIntro: "An exclusive proposal for those who want to take their celebration to the next level, with a completely personalized service.",
    premiumMainTitle: "Bridal Styling Experience",
    premiumMainSubtitle: "Luxury aesthetic direction for a unique bride.",
    premiumMainDesc: "An exclusive aesthetic direction and bridal support experience designed to create a coherent, sophisticated and fully personalized bridal image.",
    premiumIncludesTitle: "Includes",
    premiumIncludes: ["Personality test", "Image consulting", "Beauty direction", "Dress and accessories coordination", "Support throughout the process"],
    premiumMainPrice: "From €1,500",
    premiumQuote: "The Wedding Planner designs the wedding. The Bridal Stylist designs the couple's presence.",
    premiumCeremonyTitle: "Ceremony Master",
    premiumCeremonySubtitle: "A ceremony that speaks about you is never forgotten.",
    premiumCeremonyWhatTitle: "What is a Ceremony Master?",
    premiumCeremonyWhat: "A Ceremony Master does not simply lead the “I do”. They tell the story that brought you there. They are the person who creates, writes and guides the ceremony, turning it into a unique and personal moment for each couple.",
    premiumCeremonyWorkTitle: "The work of the Ceremony Master",
    premiumCeremonyWork: "Their work goes far beyond speaking in front of guests. They shape the story, structure every part of the ceremony, coordinate the interventions and guide everything with naturalness, emotion and elegance, allowing the couple and their guests to truly live and feel the story.",
    premiumCeremonyWhoTitle: "Who is Raquel Rodríguez",
    premiumCeremonyWho: "Founder of La Novia de los Labios Rojos, she is a wedding planner and ceremony master. She understands weddings as an experience that must be felt, not simply organized. She is passionate about telling stories and finding the emotion behind each couple to turn it into words. She creates personal ceremonies, far from impersonal speeches and empty texts. Every ceremony begins by listening to you and ends as a moment that speaks about you.",
    premiumCeremonyQuote: "Because a ceremony that speaks about you is never forgotten.",
    premium1: "Private Concierge", premium1Desc: "Personalized support throughout the entire process, with direct attention and coordination of every special request.",
    premium2: "Signature Design", premium2Desc: "A bespoke aesthetic experience created from scratch, with a unique identity and carefully selected details.",
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
      { name: "Mes Services", path: "/servicios" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Premium", path: "/premium", premium: true },
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
    servicesPageIntro: "Nous concevons et coordonnons chaque célébration avec une attention absolue aux détails, de la première idée au dernier moment.",
    premiumLabel: "Service Privé", premiumTitle: "Expériences Premium",
    premiumIntro: "Une proposition exclusive pour ceux qui souhaitent élever leur célébration à un niveau supérieur, avec un service entièrement personnalisé.",
    premiumMainTitle: "Bridal Styling Experience",
    premiumMainSubtitle: "Direction esthétique luxury pour une mariée unique.",
    premiumMainDesc: "Une expérience exclusive de direction esthétique et d'accompagnement bridal pour créer une image cohérente, sophistiquée et entièrement personnalisée.",
    premiumIncludesTitle: "Comprend",
    premiumIncludes: ["Test de personnalité", "Conseil en image", "Direction Beauty", "Coordination de la robe et des accessoires", "Accompagnement tout au long du processus"],
    premiumMainPrice: "À partir de 1 500 €",
    premiumQuote: "La Wedding Planner imagine le mariage. La Bridal Stylist imagine la présence des mariés.",
    premiumCeremonyTitle: "Maîtresse de Cérémonie",
    premiumCeremonySubtitle: "Une cérémonie qui parle de vous ne s'oublie pas.",
    premiumCeremonyWhatTitle: "Qu'est-ce qu'une Maîtresse de Cérémonie ?",
    premiumCeremonyWhat: "Une Maîtresse de Cérémonie ne se contente pas de conduire le “oui, je le veux”. Elle raconte l'histoire qui vous a menés jusqu'à cet instant. Elle crée, écrit et guide la cérémonie pour en faire un moment unique et personnel pour chaque couple.",
    premiumCeremonyWorkTitle: "Le travail de la Maîtresse de Cérémonie",
    premiumCeremonyWork: "Son travail va bien au-delà de parler devant les invités. Elle donne forme au récit, structure chaque partie de la cérémonie, coordonne les interventions et guide l'ensemble avec naturel, émotion et élégance, afin que les mariés et leurs invités vivent et ressentent pleinement leur histoire.",
    premiumCeremonyWhoTitle: "Qui est Raquel Rodríguez",
    premiumCeremonyWho: "Fondatrice de La Novia de los Labios Rojos, elle est wedding planner et maîtresse de cérémonie. Elle considère le mariage comme une expérience qui doit être vécue, et non simplement organisée. Passionnée par les histoires, elle cherche l'émotion qui se cache derrière chaque couple pour la transformer en mots. Elle crée des cérémonies personnelles, loin des discours impersonnels et des textes vides. Chaque cérémonie commence par vous écouter et se termine par un moment qui parle de vous.",
    premiumCeremonyQuote: "Parce qu'une cérémonie qui parle de vous ne s'oublie pas.",
    premium1: "Conciergerie Privée", premium1Desc: "Un accompagnement personnalisé tout au long du processus, avec une attention directe et la coordination de chaque demande spéciale.",
    premium2: "Design Signature", premium2Desc: "Une expérience esthétique créée sur mesure, avec une identité unique et une sélection minutieuse de chaque détail.",
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
      { name: "I Miei Servizi", path: "/servicios" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Premium", path: "/premium", premium: true },
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
    servicesPageIntro: "Progettiamo e coordiniamo ogni celebrazione con un'attenzione assoluta ai dettagli, dalla prima idea all'ultimo momento.",
    premiumLabel: "Servizio Privato", premiumTitle: "Esperienze Premium",
    premiumIntro: "Una proposta esclusiva per chi desidera portare la propria celebrazione a un livello superiore, con un servizio completamente personalizzato.",
    premiumMainTitle: "Bridal Styling Experience",
    premiumMainSubtitle: "Direzione estetica luxury per una sposa unica.",
    premiumMainDesc: "Un'esperienza esclusiva di direzione estetica e accompagnamento bridal per creare un'immagine coerente, sofisticata e completamente personalizzata.",
    premiumIncludesTitle: "Include",
    premiumIncludes: ["Test della personalità", "Consulenza d'immagine", "Direzione Beauty", "Coordinamento abito e accessori", "Accompagnamento durante il percorso"],
    premiumMainPrice: "A partire da 1.500 €",
    premiumQuote: "La Wedding Planner progetta il matrimonio. La Bridal Stylist progetta la presenza degli sposi.",
    premiumCeremonyTitle: "Maestra di Cerimonie",
    premiumCeremonySubtitle: "Una cerimonia che parla di voi non si dimentica.",
    premiumCeremonyWhatTitle: "Cos'è una Maestra di Cerimonie?",
    premiumCeremonyWhat: "Una Maestra di Cerimonie non si limita a guidare il “sì, lo voglio”. Racconta la storia che vi ha portati fino a quel momento. È la persona che crea, scrive e guida la cerimonia, trasformandola in un momento unico e personale per ogni coppia.",
    premiumCeremonyWorkTitle: "Il lavoro della Maestra di Cerimonie",
    premiumCeremonyWork: "Il suo lavoro va ben oltre il parlare davanti agli invitati. Dà forma al racconto, struttura ogni parte della cerimonia, coordina gli interventi e guida tutto con naturalezza, emozione ed eleganza, permettendo agli sposi e agli invitati di vivere e sentire davvero la loro storia.",
    premiumCeremonyWhoTitle: "Chi è Raquel Rodríguez",
    premiumCeremonyWho: "Fondatrice de La Novia de los Labios Rojos, è wedding planner e maestra di cerimonie. Considera il matrimonio un'esperienza che deve essere vissuta, non semplicemente organizzata. Ama raccontare storie e trovare l'emozione che si cela dietro ogni coppia per trasformarla in parole. Crea cerimonie personali, lontane dai discorsi impersonali e dai testi vuoti. Ogni cerimonia inizia ascoltandovi e termina diventando un momento che parla di voi.",
    premiumCeremonyQuote: "Perché una cerimonia che parla di voi non si dimentica.",
    premium1: "Concierge Privato", premium1Desc: "Assistenza personalizzata durante tutto il processo, con attenzione diretta e coordinamento di ogni richiesta speciale.",
    premium2: "Design Signature", premium2Desc: "Un'esperienza estetica creata su misura, con un'identità unica e una selezione accurata di ogni dettaglio.",
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
      { name: "Meine Leistungen", path: "/servicios" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Premium", path: "/premium", premium: true },
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
    servicesPageIntro: "Wir gestalten und koordinieren jede Feier mit absoluter Liebe zum Detail – von der ersten Idee bis zum letzten Moment.",
    premiumLabel: "Privater Service", premiumTitle: "Premium-Erlebnisse",
    premiumIntro: "Ein exklusives Angebot für alle, die ihre Feier auf ein höheres Niveau heben möchten – mit einem vollständig personalisierten Service.",
    premiumMainTitle: "Bridal Styling Experience",
    premiumMainSubtitle: "Luxuriöse ästhetische Beratung für eine einzigartige Braut.",
    premiumMainDesc: "Eine exklusive Erfahrung aus ästhetischer Beratung und Bridal-Begleitung, die ein stimmiges, elegantes und vollständig persönliches Erscheinungsbild schafft.",
    premiumIncludesTitle: "Enthält",
    premiumIncludes: ["Persönlichkeitstest", "Imageberatung", "Beauty-Direktion", "Koordination von Kleid und Accessoires", "Begleitung während des gesamten Prozesses"],
    premiumMainPrice: "Ab 1.500 €",
    premiumQuote: "Der Wedding Planner gestaltet die Hochzeit. Die Bridal Stylist gestaltet die Präsenz des Brautpaares.",
    premiumCeremonyTitle: "Zeremonienmeisterin",
    premiumCeremonySubtitle: "Eine Zeremonie, die von Ihnen erzählt, bleibt unvergessen.",
    premiumCeremonyWhatTitle: "Was ist eine Zeremonienmeisterin?",
    premiumCeremonyWhat: "Eine Zeremonienmeisterin führt nicht einfach durch das „Ja, ich will“. Sie erzählt die Geschichte, die Sie bis zu diesem Moment geführt hat. Sie gestaltet, schreibt und begleitet die Zeremonie und macht sie zu einem einzigartigen und persönlichen Moment für jedes Paar.",
    premiumCeremonyWorkTitle: "Die Arbeit der Zeremonienmeisterin",
    premiumCeremonyWork: "Ihre Arbeit geht weit über das Sprechen vor den Gästen hinaus. Sie gibt der Geschichte Form, strukturiert jeden Teil der Zeremonie, koordiniert die Beiträge und führt alles mit Natürlichkeit, Emotion und Eleganz, damit das Paar und seine Gäste die Geschichte wirklich erleben und fühlen können.",
    premiumCeremonyWhoTitle: "Wer ist Raquel Rodríguez",
    premiumCeremonyWho: "Gründerin von La Novia de los Labios Rojos, ist sie Wedding Planner und Zeremonienmeisterin. Sie versteht Hochzeiten als ein Erlebnis, das gefühlt und nicht einfach nur organisiert werden soll. Sie liebt es, Geschichten zu erzählen und die Emotion hinter jedem Paar in Worte zu fassen. Sie gestaltet persönliche Zeremonien, fern von unpersönlichen Reden und leeren Texten. Jede Zeremonie beginnt damit, Ihnen zuzuhören, und endet als ein Moment, der von Ihnen erzählt.",
    premiumCeremonyQuote: "Denn eine Zeremonie, die von Ihnen erzählt, bleibt unvergessen.",
    premium1: "Privater Concierge", premium1Desc: "Persönliche Begleitung während des gesamten Prozesses, mit direkter Betreuung und Koordination jedes besonderen Wunsches.",
    premium2: "Signature Design", premium2Desc: "Ein individuell gestaltetes ästhetisches Erlebnis mit einzigartiger Identität und sorgfältig ausgewählten Details.",
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

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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
                  className={`relative transition-all duration-300 group ${
                    item.premium ? 'text-gold font-medium' : 'hover:text-gold'
                  } ${location.pathname === item.path ? 'text-gold' : ''}`}
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
            <p>info@unasimpleboda.com</p>
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          {[
            {
              title: t.services,
              desc: t.servicesPageIntro,
              img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
              path: "/servicios"
            },
            {
              title: t.premiumTitle,
              desc: t.premiumIntro,
              img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
              path: "/premium",
              premium: true
            },
            {
              title: t.portfolio,
              desc: t.portfolioTitle,
              img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
              path: "/portfolio"
            }
          ].map((item, i) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <Link to={item.path} className="block">
                <div className={`relative aspect-[3/4] overflow-hidden mb-10 shadow-2xl transition-all duration-700 ${item.premium ? 'ring-1 ring-gold/40' : ''}`}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover premium-image transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-700" />
                  {item.premium && (
                    <span className="absolute top-6 right-6 bg-gold text-white px-4 py-2 text-[8px] uppercase tracking-[0.35em]">
                      Premium
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-left bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <span className="text-[9px] uppercase tracking-[0.5em] text-gold">0{i + 1}</span>
                  </div>
                </div>
                <h4 className={`font-serif text-3xl mb-5 luxury-text italic-serif transition-colors duration-500 ${item.premium ? 'text-gold' : 'group-hover:text-gold'}`}>
                  {item.title}
                </h4>
                <p className="text-zinc-400 font-light leading-relaxed text-sm max-w-[300px] mx-auto">
                  {item.desc}
                </p>
                <span className="inline-block mt-8 text-[9px] uppercase tracking-[0.5em] text-zinc-400 group-hover:text-gold transition-colors duration-500">
                  {t.viewDetail} →
                </span>
              </Link>
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

  const mainFilters = [
    { key: 'todos', label: 'Todos' },
    { key: 'castillo', label: 'Castillo' },
    { key: 'campo', label: 'Campo & Viñedo' },
  ];

  const filtered = useMemo(() => portfolioImages.filter(item =>
    activeCat === 'todos' || item.cat === activeCat
  ), [activeCat]);

  return (
    <div className="page-transition pt-32 bg-champagne">
      <section className="py-40">
        <div className="max-w-[1800px] mx-auto px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-6 block font-medium">{t.portfolio}</span>
            <h3 className="font-serif text-5xl md:text-7xl font-light editorial-title italic-serif gold-underline inline-block">{t.portfolioTitle}</h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {mainFilters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveCat(f.key)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.4em] border transition-all duration-500 ${
                  activeCat === f.key
                    ? 'bg-ink text-gold border-ink'
                    : 'bg-white text-zinc-400 border-zinc-200 hover:border-gold hover:text-zinc-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-gold mb-12">
            {filtered.length} {filtered.length === 1 ? 'imagen' : 'imágenes'}
          </p>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src + item.cat}
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

const Services = memo(({ t }: { t: any }) => {
  const services = [
    {
      number: "01",
      title: "Organización de principio a fin",
      desc: "Acompañamiento integral para dar forma a vuestro sueño desde el inicio, con búsqueda, gestión y asesoramiento de proveedores, visitas a espacios y planificación de cada etapa.",
      img: img('decora1.jpg')
    },
    {
      number: "02",
      title: "Coordinación del día de la boda",
      desc: "Coordinación integral del Día B, gestionando proveedores, montajes, entregas, sorpresas y momentos especiales para que vosotros podáis disfrutar de vuestra celebración.",
      img: img('novios2.jpg')
    },
    {
      number: "03",
      title: "Organización a vuestra medida",
      desc: "Un servicio pensado para parejas que ya tienen espacio y varios proveedores contratados, pero necesitan acompañamiento, planificación y coordinación para continuar con seguridad.",
      img: img('3.jpg')
    },
    {
      number: "04",
      title: "Decoración de bodas y espacios",
      desc: "Diseño y cuidado de cada rincón para que la decoración cuente vuestra historia y cree una atmósfera única, coherente y especial para vuestros invitados.",
      img: img('castillodecora.jpg')
    },
    {
      number: "05",
      title: "Tartas nupciales",
      desc: "Tartas artesanales elaboradas con ingredientes de calidad y diseños personalizados que se adaptan al estilo de vuestra boda, desde propuestas clásicas hasta opciones más modernas.",
      img: img('tarta2.jpg')
    },
    {
      number: "06",
      title: "Events Kids",
      desc: "Espacios y celebraciones para los más pequeños durante bautizos, comuniones, cumpleaños y bodas, con mesas dulces, decoración y actividades pensadas para disfrutar.",
      img: img('pdetalles.png')
    }
  ];

  const providerGroups = [
    "Fotógrafos",
    "Localizaciones",
    "Maestros de ceremonias",
    "Decoración",
    "Floristería",
    "Tramitación de expediente",
    "Invitaciones y papelería",
    "Catering",
    "Pastelerías",
    "Hoteles y transporte",
    "Música",
    "Entretenimiento y animación infantil",
    "Joyería",
    "Peluquería y maquillaje",
    "Spa y tratamientos de belleza",
    "Diseñadores y atelier de vestidos de novia",
    "Regalitos y detalles",
    "Despedidas de solteros",
    "Agencias de viajes de novios"
  ];

  return (
    <div className="page-transition pt-32 bg-champagne min-h-screen">
      <section className="py-28 md:py-40 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-6 block font-medium">
              {t.services}
            </span>

            <h1 className="font-serif text-5xl md:text-7xl font-light editorial-title italic-serif gold-underline inline-block">
              {t.servicesTitle}
            </h1>

            <p className="max-w-2xl mx-auto mt-10 text-zinc-500 font-light leading-relaxed text-lg">
              {t.servicesPageIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, i) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.8
                }}
                viewport={{ once: true }}
                className="bg-white group overflow-hidden shadow-xl"
              >

                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-9 md:p-10">
                  <span className="text-[9px] uppercase tracking-[0.5em] text-gold">
                    {service.number}
                  </span>

                  <h2 className="font-serif text-2xl md:text-3xl mt-4 mb-5 italic-serif luxury-text">
                    {service.title}
                  </h2>

                  <p className="text-zinc-500 font-light leading-relaxed text-sm">
                    {service.desc}
                  </p>
                </div>

              </motion.article>
            ))}
          </div>

          <div className="mt-24 md:mt-32 bg-white px-8 py-12 md:px-16 md:py-16 shadow-xl">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-5 block">
                Proveedores
              </span>

              <h2 className="font-serif text-4xl md:text-5xl font-light italic-serif editorial-title">
                Una red de confianza
              </h2>

              <p className="max-w-2xl mx-auto mt-6 text-zinc-500 font-light leading-relaxed">
                Contamos con un abanico de proveedores de confianza que se
                adaptan a vuestras necesidades, estilo y presupuesto.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
              {providerGroups.map((provider) => (
                <div
                  key={provider}
                  className="flex items-center gap-3 text-sm text-zinc-500 font-light"
                >
                  <span className="text-gold">✦</span>
                  <span>{provider}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <p className="font-serif text-2xl md:text-3xl italic-serif text-zinc-700 mb-10">
              Cada detalle cuenta. Vosotros vivís el momento; nosotros cuidamos el camino.
            </p>

            <Link
              to="/contacto"
              className="inline-block bg-ink text-white px-12 py-5 text-[10px] uppercase tracking-[0.5em] hover:bg-gold transition-all duration-700 luxury-text shadow-2xl"
            >
              {t.contact}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
});

const Premium = memo(({ t }: { t: any }) => {
  const bridalStylingUrl = "#";

  const premiumServices = [
    {
      number: "01",
      image: img('bridal-styling.png'),
      title: t.premiumMainTitle,
      subtitle: t.premiumMainSubtitle,
      desc: t.premiumMainDesc,
      includesTitle: t.premiumIncludesTitle,
      includes: t.premiumIncludes,
      cta: "Descubrir experiencia",
      link: bridalStylingUrl,
    },
    {
      number: "02",
      image: img('novios1.jpg'),
      title: t.premiumCeremonyTitle,
      subtitle: t.premiumCeremonySubtitle,
      desc: t.premiumCeremonyWhat,
      sections: [
        { title: t.premiumCeremonyWorkTitle, text: t.premiumCeremonyWork },
        { title: t.premiumCeremonyWhoTitle, text: t.premiumCeremonyWho },
      ],
      quote: t.premiumCeremonyQuote,
    },
  ];

  return (
    <div className="page-transition pt-32 bg-champagne min-h-screen text-zinc-900">
      <section className="relative overflow-hidden py-28 md:py-40 px-6 bg-ink text-white">
        <div className="absolute inset-0 opacity-35">
          <img
            src={img('novios1.jpg')}
            alt="Experiencias Premium"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-ink/55" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.9em] text-gold mb-8 block">
            {t.premiumLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-light italic-serif editorial-title mb-8">
            {t.premiumTitle}
          </h1>
          <p className="max-w-2xl mx-auto text-white/75 font-light leading-relaxed text-lg md:text-xl">
            {t.premiumIntro}
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-6 block">
              {t.premiumLabel}
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light italic-serif editorial-title">
              {t.premiumTitle}
            </h2>
          </div>

          <div className="space-y-16 md:space-y-24">
            {premiumServices.map((service) => (
              <motion.article
                key={service.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 bg-champagne shadow-2xl overflow-hidden border border-gold/10"
              >
                <div className="overflow-hidden min-h-[420px] lg:min-h-[620px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1400ms]"
                    loading="lazy"
                  />
                </div>

                <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
                  <span className="text-[9px] uppercase tracking-[0.6em] text-gold mb-6">
                    {service.number} · {t.premiumLabel}
                  </span>

                  <h3 className="font-serif text-4xl md:text-5xl font-light italic-serif mb-5">
                    {service.title}
                  </h3>

                  <p className="font-serif italic text-xl text-zinc-600 mb-7">
                    {service.subtitle}
                  </p>

                  <p className="text-zinc-500 font-light leading-relaxed text-base md:text-lg mb-8">
                    {service.desc}
                  </p>

                  {service.includes && (
                    <div className="border-t border-gold/20 pt-7 mb-9">
                      <h4 className="text-[10px] uppercase tracking-[0.5em] text-gold mb-5">
                        {service.includesTitle}
                      </h4>
                      <ul className="space-y-3">
                        {service.includes.map((item: string) => (
                          <li key={item} className="flex gap-3 text-sm text-zinc-600 font-light">
                            <span className="text-gold">✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.sections && (
                    <div className="space-y-7 mb-9">
                      {service.sections.map((section: any, index: number) => (
                        <div
                          key={`${service.number}-${index}`}
                          className="border-t border-gold/20 pt-6"
                        >
                          <h4 className="text-[10px] uppercase tracking-[0.45em] text-gold mb-4">
                            {section.title}
                          </h4>
                          <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
                            {section.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.quote && (
                    <p className="font-serif text-xl italic-serif leading-relaxed text-zinc-700 border-l-2 border-gold pl-6 mb-9">
                      “{service.quote}”
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    {service.link && (
                      <a
                        href={service.link}
                        className="inline-flex items-center justify-center bg-ink text-white px-8 py-5 text-[10px] uppercase tracking-[0.4em] hover:bg-gold transition-all duration-700 shadow-xl"
                      >
                        {service.cta}
                      </a>
                    )}
                    <Link
                      to="/contacto"
                      className="inline-flex items-center justify-center border border-gold/30 text-zinc-700 px-8 py-5 text-[10px] uppercase tracking-[0.4em] hover:bg-gold hover:text-white transition-all duration-700"
                    >
                      Si estás interesado, contáctanos
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          
        </div>
      </section>
    </div>
  );
});

const Contact = memo(({ t }: { t: any }) => (
  <div className="page-transition pt-32 bg-champagne min-h-screen">
    <section className="py-40 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[10px] uppercase tracking-[0.8em] text-gold mb-8 block font-medium">{t.contact}</span>
        <h3 className="font-serif text-5xl md:text-7xl font-light mb-24 editorial-title italic-serif">{t.contactTitle}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Email */}
          <a href="mailto:info@unasimpleboda.com" className="flex items-center gap-8 group cursor-pointer bg-white/50 backdrop-blur-sm rounded-full p-4 border border-gold/10 hover:border-gold transition-all duration-500 overflow-hidden">
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 rounded-full shrink-0">
              <Mail className="w-6 h-6 font-light text-gold" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Email</p>
              <span className="text-sm tracking-[0.1em] font-light break-all">info@unasimpleboda.com</span>
            </div>
          </a>

          {/* Phone */}
          <a href="tel:+34600000000" className="flex items-center gap-8 group cursor-pointer bg-white/50 backdrop-blur-sm rounded-full p-4 border border-gold/10 hover:border-gold transition-all duration-500">
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 rounded-full shrink-0">
              <Phone className="w-6 h-6 font-light text-gold" />
            </div>
            <div className="text-left">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Phone</p>
              <span className="text-sm tracking-[0.2em] uppercase font-light">+34 600 000 000</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/34600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group cursor-pointer bg-white/50 backdrop-blur-sm rounded-full p-4 border border-gold/10 hover:border-gold transition-all duration-500">
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 rounded-full shrink-0">
              <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.5 1.34 5.02L2 22l5.13-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.86 14.2c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.62-2.97-1.28-4.91-4.26-5.06-4.46-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.47.27-.29.6-.36.8-.36.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.76 1.26 1.63 2.04 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.18 1.38z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">WhatsApp</p>
              <span className="text-sm tracking-[0.2em] uppercase font-light">Escríbenos</span>
            </div>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com/unasimpleboda" target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group cursor-pointer bg-white/50 backdrop-blur-sm rounded-full p-4 border border-gold/10 hover:border-gold transition-all duration-500">
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 rounded-full shrink-0">
              <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Instagram</p>
              <span className="text-sm tracking-[0.2em] uppercase font-light">@unasimpleboda</span>
            </div>
          </a>

          {/* Facebook */}
          <a href="https://facebook.com/elegancemariages" target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group cursor-pointer bg-white/50 backdrop-blur-sm rounded-full p-4 border border-gold/10 hover:border-gold transition-all duration-500 md:col-span-2">
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center group-hover:border-gold transition-all duration-500 bg-white/50 rounded-full shrink-0">
              <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33V22c4.78-.756 8.438-4.92 8.438-9.94z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 mb-1">Facebook</p>
              <span className="text-sm tracking-[0.2em] uppercase font-light">Una Simple Boda</span>
            </div>
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <MapPin className="w-4 h-4 text-gold" />
          <span className="text-sm tracking-[0.2em] uppercase font-light luxury-text">{t.locations}</span>
        </div>
      </div>
    </section>
  </div>
));
export default function App() {
  const [lang, setLang] = useState<Language>('ES');
  const t = content[lang];

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-gold/20">
        <Navbar lang={lang} setLang={setLang} t={t} />
        
        <Routes>
          <Route path="/" element={<Home t={t} />} />
          <Route path="/sobre-mi" element={<About t={t} />} />
          <Route path="/servicios" element={<Services t={t} />} />
          <Route path="/portfolio" element={<Portfolio t={t} />} />
          <Route path="/premium" element={<Premium t={t} />} />
          <Route path="/contacto" element={<Contact t={t} />} />
        </Routes>

        <Footer t={t} />

        <a 
          href="https://wa.me/34685384756" 
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
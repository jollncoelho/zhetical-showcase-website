import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Shield,
  Search,
  Eye,
  Globe,
  AlertTriangle,
  ExternalLink,
  Mail,
  ChevronDown,
  Crosshair,
  Users,
  Zap,
  Database,
  Radio,
  Activity,
  Send,
  BadgeCheck,
  MapPin,
  BookOpen,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Lang = 'FR' | 'EN' | 'ES' | 'PT';

// ── Translations ──────────────────────────────────────────────────────────────

const t = {
  FR: {
    nav: {
      links: ['Enquêtes', 'Prévention', 'Tracker', 'Contact'],
      tracker: 'Tracker',
    },
    hero: {
      badge: 'Expert OSINT · Opérationnel',
      typingWords: ['Protection & Investigation', 'Expert OSINT', 'Cyber Intelligence', 'Digital Forensics'],
      description: "Intelligence numérique de pointe. Investigations OSINT, protection contre les prédateurs en ligne et sécurisation des communautés digitales.",
      ctaTracker: 'Lancer le Tracker',
      ctaGhostint: 'Découvrir Ghostint',
      stats: [
        { label: 'Enquêtes OSINT réussies', value: '50+' },
        { label: 'Taux de réussite', value: '97%' },
        { label: "Années d'expérience", value: '2+' },
      ],
      scroll: 'Défiler',
    },
    enquetes: {
      sectionLabel: 'Investigations',
      title: 'Ghostint',
      titleAccent: 'OSINT avancé',
      p1: "Ghostint est notre service d'enquête OSINT de premier rang. Nous traquons les individus malveillants, identifions les prédateurs en ligne et documentons les preuves numériques avec une précision chirurgicale.",
      p2: "Chaque enquête est menée avec discrétion absolue. Nos méthodes combinent intelligence artificielle, techniques forensiques et veille multi-sources pour des résultats irréfutables.",
      cta: 'Demander une enquête',
      features: [
        { title: "Recherche d'identité", desc: 'Retrouver des pseudos, avatars, historiques et connexions entre comptes sur toutes les plateformes.' },
        { title: 'Géolocalisation digitale', desc: "Analyse de métadonnées, adresses IP et empreintes numériques pour localiser avec précision." },
        { title: 'Analyse de données', desc: 'Croisement de bases de données publiques, réseaux sociaux et sources open-source.' },
        { title: 'Surveillance discrète', desc: "Monitoring passif et collecte de renseignements sans alerter la cible." },
      ],
    },
    prevention: {
      sectionLabel: 'Protection',
      title: 'Prévention &',
      titleAccent: 'Sécurité',
      description: "Nous protégeons les communautés en ligne contre les menaces numériques, en particulier les plus jeunes utilisateurs.",
      activeBadge: 'Protection active',
      threatsLabel: 'Menaces identifiées',
      processTitle: "Notre processus d'intervention",
      platforms: [
        {
          name: 'Roblox',
          desc: "Les grooming, harcèlement et manipulation de mineurs sur Roblox sont en forte hausse. Nous identifions et exposons ces individus.",
          threats: ['Grooming de mineurs', 'Harcèlement ciblé', 'Vol de comptes', 'Arnaques Robux'],
        },
        {
          name: 'Discord',
          desc: "Serveurs malveillants, bots d'espionnage et réseaux de manipulation. Nous sécurisons vos communautés Discord.",
          threats: ['Raids de serveurs', 'Doxxing', 'Phishing ciblé', 'Bot malveillants'],
        },
      ],
      steps: [
        { title: 'Détection', desc: 'Identification des comportements suspects' },
        { title: 'Investigation', desc: 'Collecte de preuves numériques' },
        { title: 'Documentation', desc: 'Rapport légal complet et certifié' },
        { title: 'Signalement', desc: 'Transmission aux autorités compétentes' },
      ],
    },
    tracker: {
      sectionLabel: 'Outil Exclusif',
      title: 'Tracker',
      titleAccent: 'Intelligence',
      titleSuffix: 'en temps réel',
      description: "Notre outil propriétaire de tracking OSINT permet une collecte d'informations en temps réel sur des cibles définies.",
      cta: 'Lancer le Tracker',
      accessNote: 'tracker.prohacking77.me · Accès professionnel uniquement',
      pills: ['Tracking IP', 'Geo-intelligence', 'Device fingerprint', 'Session analysis', 'Cross-platform', 'Temps réel'],
    },
    bio: {
      passportLabel: 'PASSEPORT CYBER · N° ZHT-2026-BE',
      statsLabels: ['Certif.', 'Ans', 'Badges'],
      operatorProfile: 'Profil Opérateur',
      certRegistry: 'Registre des Certifications',
      bio1: (
        <>Expert en cybersécurité basé en <span className="text-emerald-400 font-semibold">Belgique</span>, avec une expérience technique très solide acquise sur le terrain depuis plus de <span className="text-emerald-400 font-semibold">20 ans</span>, dans les domaines du renseignement en sources ouvertes (OSINT), de la sécurité offensive et de l'investigation numérique. Opérateur actif intervenant aussi bien sur des enquêtes civiles que sur des contextes à enjeux élevés.</>
      ),
      bio2: (
        <><span className="text-emerald-400 font-semibold">Instructeur</span> de groupes techniques spécialisés — formation de la prochaine génération d'analystes OSINT et de professionnels de la cybersécurité. Transmission des techniques avancées de collecte, d'analyse et de corrélation de données issues de sources ouvertes, réseaux sociaux, registres publics et infrastructures numériques.</>
      ),
      bio3: (
        <>Spécialisé dans la <span className="text-white font-medium">protection des mineurs en ligne</span>, la traque des prédateurs numériques et la documentation légale de preuves numériques. Collaboration régulière avec des plateformes communautaires (Roblox, Discord) pour l'identification et l'exposition d'acteurs malveillants. Chaque intervention est conduite avec une méthodologie rigoureuse, une discrétion absolue et une traçabilité complète.</>
      ),
      bio4: (
        <>Titulaire de <span className="text-emerald-400 font-semibold">30+ certifications professionnelles</span> vérifiables publiquement via le registre CanCred. Chaque accréditation représente une validation formelle d'une compétence opérationnelle dans le domaine de la cybersécurité, du renseignement ou de l'investigation numérique.</>
      ),
      certHeaders: ['Domaine', 'Niveau', 'Preuve'],
      certRows: [
        { domain: 'Offensive Security (PenTesting)', level: 'Professionnel Avancé', proof: 'Certifié ExorciseThat' },
        { domain: 'OSINT & Digital Forensics', level: 'Expert Enquêteur', proof: "Permis d'Osinter / CanCred" },
        { domain: 'Threat Intelligence', level: 'Spécialiste Groupes', proof: '30+ Diplômes Pro' },
      ],
      pills: ["20+ Ans d'Expérience", 'Instructeur OSINT', 'Belgique', 'Offensive Security', 'Trace Labs GOSP'],
      verifyCta: 'Vérifier mon Passeport CanCred',
      contactCta: 'Contact',
    },
    footer: {
      tagline: "Expert OSINT spécialisé dans l'investigation numérique, la protection des mineurs et la sécurité des communautés en ligne.",
      servicesTitle: 'Services',
      services: ['Ghostint OSINT', 'Protection mineurs', 'Tracker Intelligence'],
      contactTitle: 'Contact',
      copyright: '© 2026 Zhétical · Tous droits réservés',
      status: 'Systèmes opérationnels',
      disclaimer: { label: 'Avertissement', text: "Ce site est strictement réservé à un usage éducatif et à la sensibilisation en cybersécurité. L'auteur décline toute responsabilité pour tout usage malveillant ou illégal des informations présentées." },
    },
  },
  EN: {
    nav: {
      links: ['Investigations', 'Prevention', 'Tracker', 'Contact'],
      tracker: 'Tracker',
    },
    hero: {
      badge: 'OSINT Expert · Operational',
      typingWords: ['Protection & Investigation', 'OSINT Expert', 'Cyber Intelligence', 'Digital Forensics'],
      description: "Cutting-edge digital intelligence. OSINT investigations, protection against online predators and securing digital communities.",
      ctaTracker: 'Launch Tracker',
      ctaGhostint: 'Discover Ghostint',
      stats: [
        { label: 'Successful OSINT Investigations', value: '50+' },
        { label: 'Success Rate', value: '97%' },
        { label: 'Years of Experience', value: '2+' },
      ],
      scroll: 'Scroll',
    },
    enquetes: {
      sectionLabel: 'Investigations',
      title: 'Ghostint',
      titleAccent: 'Advanced OSINT',
      p1: "Ghostint is our premier OSINT investigation service. We track malicious individuals, identify online predators, and document digital evidence with surgical precision.",
      p2: "Every investigation is conducted with absolute discretion. Our methods combine artificial intelligence, forensic techniques, and multi-source intelligence for irrefutable results.",
      cta: 'Request an investigation',
      features: [
        { title: 'Identity Research', desc: 'Trace pseudonyms, avatars, histories and account connections across all platforms.' },
        { title: 'Digital Geolocation', desc: 'Metadata analysis, IP addresses and digital fingerprints for precise location.' },
        { title: 'Data Analysis', desc: 'Cross-referencing public databases, social networks and open-source information.' },
        { title: 'Covert Surveillance', desc: 'Passive monitoring and intelligence gathering without alerting the target.' },
      ],
    },
    prevention: {
      sectionLabel: 'Protection',
      title: 'Prevention &',
      titleAccent: 'Security',
      description: "We protect online communities against digital threats, especially the youngest users.",
      activeBadge: 'Active protection',
      threatsLabel: 'Identified threats',
      processTitle: 'Our intervention process',
      platforms: [
        {
          name: 'Roblox',
          desc: "Grooming, harassment and manipulation of minors on Roblox are rising sharply. We identify and expose these individuals.",
          threats: ['Minor grooming', 'Targeted harassment', 'Account theft', 'Robux scams'],
        },
        {
          name: 'Discord',
          desc: "Malicious servers, spy bots and manipulation networks. We secure your Discord communities.",
          threats: ['Server raids', 'Doxxing', 'Targeted phishing', 'Malicious bots'],
        },
      ],
      steps: [
        { title: 'Detection', desc: 'Identification of suspicious behaviour' },
        { title: 'Investigation', desc: 'Digital evidence collection' },
        { title: 'Documentation', desc: 'Full certified legal report' },
        { title: 'Reporting', desc: 'Submission to competent authorities' },
      ],
    },
    tracker: {
      sectionLabel: 'Exclusive Tool',
      title: 'Tracker',
      titleAccent: 'Intelligence',
      titleSuffix: 'in real time',
      description: "Our proprietary OSINT tracking tool enables real-time information gathering on defined targets.",
      cta: 'Launch Tracker',
      accessNote: 'tracker.prohacking77.me · Professional access only',
      pills: ['IP Tracking', 'Geo-intelligence', 'Device fingerprint', 'Session analysis', 'Cross-platform', 'Real-time'],
    },
    bio: {
      passportLabel: 'CYBER PASSPORT · N° ZHT-2026-BE',
      statsLabels: ['Certif.', 'Yrs', 'Badges'],
      operatorProfile: 'Operator Profile',
      certRegistry: 'Certification Registry',
      bio1: (
        <>Cybersecurity expert based in <span className="text-emerald-400 font-semibold">Belgium</span>, with solid technical field experience spanning over <span className="text-emerald-400 font-semibold">20 years</span> in open-source intelligence (OSINT), offensive security and digital investigation. Active operator engaging in both civil inquiries and high-stakes contexts.</>
      ),
      bio2: (
        <><span className="text-emerald-400 font-semibold">Instructor</span> for specialised technical groups — training the next generation of OSINT analysts and cybersecurity professionals. Teaching advanced collection, analysis and data-correlation techniques from open sources, social networks, public registries and digital infrastructure.</>
      ),
      bio3: (
        <>Specialised in <span className="text-white font-medium">protection of minors online</span>, tracking digital predators, and legally documenting digital evidence. Regular collaboration with online communities (Roblox, Discord) to identify and expose malicious actors. Every intervention is conducted with rigorous methodology, absolute discretion and full traceability.</>
      ),
      bio4: (
        <>Holder of <span className="text-emerald-400 font-semibold">30+ professional certifications</span> publicly verifiable via the CanCred registry. Each accreditation is a formal validation of an operational competency in cybersecurity, intelligence, or digital investigation.</>
      ),
      certHeaders: ['Domain', 'Level', 'Proof'],
      certRows: [
        { domain: 'Offensive Security (PenTesting)', level: 'Advanced Professional', proof: 'ExorciseThat Certified' },
        { domain: 'OSINT & Digital Forensics', level: 'Expert Investigator', proof: "Osinter Licence / CanCred" },
        { domain: 'Threat Intelligence', level: 'Group Specialist', proof: '30+ Pro Diplomas' },
      ],
      pills: ['20+ Years Experience', 'OSINT Instructor', 'Belgium', 'Offensive Security', 'Trace Labs GOSP'],
      verifyCta: 'Verify my CanCred Passport',
      contactCta: 'Contact',
    },
    footer: {
      tagline: "OSINT expert specialised in digital investigation, protection of minors and online community security.",
      servicesTitle: 'Services',
      services: ['Ghostint OSINT', 'Minor protection', 'Tracker Intelligence'],
      contactTitle: 'Contact',
      copyright: '© 2026 Zhétical · All rights reserved',
      status: 'Systems operational',
      disclaimer: { label: 'Disclaimer', text: 'This site is strictly reserved for educational purposes and cybersecurity awareness. The author disclaims all responsibility for any malicious or illegal use of the information presented.' },
    },
  },
  ES: {
    nav: {
      links: ['Investigaciones', 'Prevención', 'Tracker', 'Contacto'],
      tracker: 'Tracker',
    },
    hero: {
      badge: 'Experto OSINT · Operacional',
      typingWords: ['Protección & Investigación', 'Experto OSINT', 'Cyber Intelligence', 'Forense Digital'],
      description: "Inteligencia digital de vanguardia. Investigaciones OSINT, protección contra depredadores en línea y seguridad de comunidades digitales.",
      ctaTracker: 'Iniciar Tracker',
      ctaGhostint: 'Descubrir Ghostint',
      stats: [
        { label: 'Investigaciones OSINT exitosas', value: '50+' },
        { label: 'Tasa de éxito', value: '97%' },
        { label: 'Años de experiencia', value: '2+' },
      ],
      scroll: 'Desplazar',
    },
    enquetes: {
      sectionLabel: 'Investigaciones',
      title: 'Ghostint',
      titleAccent: 'OSINT avanzado',
      p1: "Ghostint es nuestro servicio de investigación OSINT de primer nivel. Rastreamos individuos maliciosos, identificamos depredadores en línea y documentamos evidencia digital con precisión quirúrgica.",
      p2: "Cada investigación se lleva a cabo con discreción absoluta. Nuestros métodos combinan inteligencia artificial, técnicas forenses y vigilancia multifuente para obtener resultados irrefutables.",
      cta: 'Solicitar una investigación',
      features: [
        { title: 'Búsqueda de identidad', desc: 'Rastrear seudónimos, avatares, historiales y conexiones entre cuentas en todas las plataformas.' },
        { title: 'Geolocalización digital', desc: 'Análisis de metadatos, direcciones IP y huellas digitales para localizar con precisión.' },
        { title: 'Análisis de datos', desc: 'Cruce de bases de datos públicas, redes sociales y fuentes de código abierto.' },
        { title: 'Vigilancia discreta', desc: 'Monitoreo pasivo y recopilación de inteligencia sin alertar al objetivo.' },
      ],
    },
    prevention: {
      sectionLabel: 'Protección',
      title: 'Prevención &',
      titleAccent: 'Seguridad',
      description: "Protegemos las comunidades en línea contra amenazas digitales, especialmente a los usuarios más jóvenes.",
      activeBadge: 'Protección activa',
      threatsLabel: 'Amenazas identificadas',
      processTitle: 'Nuestro proceso de intervención',
      platforms: [
        {
          name: 'Roblox',
          desc: "El grooming, el acoso y la manipulación de menores en Roblox están en fuerte aumento. Identificamos y exponemos a estos individuos.",
          threats: ['Grooming de menores', 'Acoso dirigido', 'Robo de cuentas', 'Estafas Robux'],
        },
        {
          name: 'Discord',
          desc: "Servidores maliciosos, bots espía y redes de manipulación. Aseguramos tus comunidades de Discord.",
          threats: ['Raids de servidores', 'Doxxing', 'Phishing dirigido', 'Bots maliciosos'],
        },
      ],
      steps: [
        { title: 'Detección', desc: 'Identificación de comportamientos sospechosos' },
        { title: 'Investigación', desc: 'Recopilación de evidencia digital' },
        { title: 'Documentación', desc: 'Informe legal completo y certificado' },
        { title: 'Reporte', desc: 'Transmisión a las autoridades competentes' },
      ],
    },
    tracker: {
      sectionLabel: 'Herramienta Exclusiva',
      title: 'Tracker',
      titleAccent: 'Intelligence',
      titleSuffix: 'en tiempo real',
      description: "Nuestra herramienta de seguimiento OSINT propietaria permite la recopilación de información en tiempo real sobre objetivos definidos.",
      cta: 'Iniciar Tracker',
      accessNote: 'tracker.prohacking77.me · Acceso profesional únicamente',
      pills: ['Tracking IP', 'Geo-intelligence', 'Huella de dispositivo', 'Análisis de sesión', 'Cross-platform', 'Tiempo real'],
    },
    bio: {
      passportLabel: 'PASAPORTE CYBER · N° ZHT-2026-BE',
      statsLabels: ['Certif.', 'Años', 'Badges'],
      operatorProfile: 'Perfil del Operador',
      certRegistry: 'Registro de Certificaciones',
      bio1: (
        <>Experto en ciberseguridad con sede en <span className="text-emerald-400 font-semibold">Bélgica</span>, con una sólida experiencia técnica de campo durante más de <span className="text-emerald-400 font-semibold">20 años</span> en inteligencia de fuentes abiertas (OSINT), seguridad ofensiva e investigación digital. Operador activo que interviene tanto en investigaciones civiles como en contextos de alto riesgo.</>
      ),
      bio2: (
        <><span className="text-emerald-400 font-semibold">Instructor</span> de grupos técnicos especializados — formando a la próxima generación de analistas OSINT y profesionales de ciberseguridad. Transmisión de técnicas avanzadas de recopilación, análisis y correlación de datos de fuentes abiertas, redes sociales, registros públicos e infraestructuras digitales.</>
      ),
      bio3: (
        <>Especializado en la <span className="text-white font-medium">protección de menores en línea</span>, el rastreo de depredadores digitales y la documentación legal de evidencia digital. Colaboración habitual con plataformas comunitarias (Roblox, Discord) para identificar y exponer a actores maliciosos. Cada intervención se realiza con metodología rigurosa, discreción absoluta y trazabilidad completa.</>
      ),
      bio4: (
        <>Titular de <span className="text-emerald-400 font-semibold">30+ certificaciones profesionales</span> verificables públicamente a través del registro CanCred. Cada acreditación representa una validación formal de una competencia operacional en ciberseguridad, inteligencia o investigación digital.</>
      ),
      certHeaders: ['Dominio', 'Nivel', 'Prueba'],
      certRows: [
        { domain: 'Seguridad Ofensiva (PenTesting)', level: 'Profesional Avanzado', proof: 'Certificado ExorciseThat' },
        { domain: 'OSINT & Forense Digital', level: 'Investigador Experto', proof: "Licencia Osinter / CanCred" },
        { domain: 'Threat Intelligence', level: 'Especialista en Grupos', proof: '30+ Diplomas Pro' },
      ],
      pills: ['20+ Años de Experiencia', 'Instructor OSINT', 'Bélgica', 'Seguridad Ofensiva', 'Trace Labs GOSP'],
      verifyCta: 'Verificar mi Pasaporte CanCred',
      contactCta: 'Contacto',
    },
    footer: {
      tagline: "Experto OSINT especializado en investigación digital, protección de menores y seguridad de comunidades en línea.",
      servicesTitle: 'Servicios',
      services: ['Ghostint OSINT', 'Protección de menores', 'Tracker Intelligence'],
      contactTitle: 'Contacto',
      copyright: '© 2026 Zhétical · Todos los derechos reservados',
      status: 'Sistemas operacionales',
      disclaimer: { label: 'Aviso', text: 'Este sitio está estrictamente reservado para fines educativos y de concienciación sobre ciberseguridad. El autor declina toda responsabilidad por cualquier uso malicioso o ilegal de la información presentada.' },
    },
  },
  PT: {
    nav: {
      links: ['Investigações', 'Prevenção', 'Tracker', 'Contacto'],
      tracker: 'Tracker',
    },
    hero: {
      badge: 'Especialista OSINT · Operacional',
      typingWords: ['Proteção & Investigação', 'Especialista OSINT', 'Cyber Intelligence', 'Forense Digital'],
      description: "Inteligência digital de ponta. Investigações OSINT, proteção contra predadores online e segurança de comunidades digitais.",
      ctaTracker: 'Iniciar Tracker',
      ctaGhostint: 'Descobrir Ghostint',
      stats: [
        { label: 'Investigações OSINT bem-sucedidas', value: '50+' },
        { label: 'Taxa de sucesso', value: '97%' },
        { label: 'Anos de experiência', value: '2+' },
      ],
      scroll: 'Rolar',
    },
    enquetes: {
      sectionLabel: 'Investigações',
      title: 'Ghostint',
      titleAccent: 'OSINT avançado',
      p1: "O Ghostint é o nosso serviço de investigação OSINT de primeiro nível. Rastreamos indivíduos maliciosos, identificamos predadores online e documentamos provas digitais com precisão cirúrgica.",
      p2: "Cada investigação é conduzida com discrição absoluta. Os nossos métodos combinam inteligência artificial, técnicas forenses e vigilância multi-fonte para resultados irrefutáveis.",
      cta: 'Solicitar uma investigação',
      features: [
        { title: 'Pesquisa de identidade', desc: 'Rastrear pseudónimos, avatares, históricos e ligações entre contas em todas as plataformas.' },
        { title: 'Geolocalização digital', desc: 'Análise de metadados, endereços IP e impressões digitais para localizar com precisão.' },
        { title: 'Análise de dados', desc: 'Cruzamento de bases de dados públicas, redes sociais e fontes de código aberto.' },
        { title: 'Vigilância discreta', desc: 'Monitorização passiva e recolha de informações sem alertar o alvo.' },
      ],
    },
    prevention: {
      sectionLabel: 'Proteção',
      title: 'Prevenção &',
      titleAccent: 'Segurança',
      description: "Protegemos as comunidades online contra ameaças digitais, especialmente os utilizadores mais jovens.",
      activeBadge: 'Proteção ativa',
      threatsLabel: 'Ameaças identificadas',
      processTitle: 'O nosso processo de intervenção',
      platforms: [
        {
          name: 'Roblox',
          desc: "O grooming, assédio e manipulação de menores no Roblox estão a aumentar fortemente. Identificamos e expossamos esses indivíduos.",
          threats: ['Grooming de menores', 'Assédio dirigido', 'Roubo de contas', 'Fraudes Robux'],
        },
        {
          name: 'Discord',
          desc: "Servidores maliciosos, bots espiões e redes de manipulação. Protegemos as suas comunidades Discord.",
          threats: ['Raids de servidores', 'Doxxing', 'Phishing dirigido', 'Bots maliciosos'],
        },
      ],
      steps: [
        { title: 'Deteção', desc: 'Identificação de comportamentos suspeitos' },
        { title: 'Investigação', desc: 'Recolha de provas digitais' },
        { title: 'Documentação', desc: 'Relatório legal completo e certificado' },
        { title: 'Denúncia', desc: 'Transmissão às autoridades competentes' },
      ],
    },
    tracker: {
      sectionLabel: 'Ferramenta Exclusiva',
      title: 'Tracker',
      titleAccent: 'Intelligence',
      titleSuffix: 'em tempo real',
      description: "A nossa ferramenta proprietária de tracking OSINT permite a recolha de informações em tempo real sobre alvos definidos.",
      cta: 'Iniciar Tracker',
      accessNote: 'tracker.prohacking77.me · Acesso profissional apenas',
      pills: ['Tracking IP', 'Geo-intelligence', 'Impressão digital do dispositivo', 'Análise de sessão', 'Cross-platform', 'Tempo real'],
    },
    bio: {
      passportLabel: 'PASSAPORTE CYBER · N° ZHT-2026-BE',
      statsLabels: ['Certif.', 'Anos', 'Badges'],
      operatorProfile: 'Perfil do Operador',
      certRegistry: 'Registo de Certificações',
      bio1: (
        <>Especialista em cibersegurança sediado na <span className="text-emerald-400 font-semibold">Bélgica</span>, com uma sólida experiência técnica de campo de mais de <span className="text-emerald-400 font-semibold">20 anos</span> nos domínios da inteligência em fontes abertas (OSINT), segurança ofensiva e investigação digital. Operador ativo que intervém tanto em investigações civis como em contextos de alto risco.</>
      ),
      bio2: (
        <><span className="text-emerald-400 font-semibold">Instrutor</span> de grupos técnicos especializados — formando a próxima geração de analistas OSINT e profissionais de cibersegurança. Transmissão de técnicas avançadas de recolha, análise e correlação de dados de fontes abertas, redes sociais, registos públicos e infraestruturas digitais.</>
      ),
      bio3: (
        <>Especializado na <span className="text-white font-medium">proteção de menores online</span>, rastreio de predadores digitais e documentação legal de provas digitais. Colaboração regular com plataformas comunitárias (Roblox, Discord) para identificar e expor atores maliciosos. Cada intervenção é conduzida com metodologia rigorosa, discrição absoluta e rastreabilidade completa.</>
      ),
      bio4: (
        <>Titular de <span className="text-emerald-400 font-semibold">mais de 30 certificações profissionais</span> verificáveis publicamente através do registo CanCred. Cada acreditação representa uma validação formal de uma competência operacional no domínio da cibersegurança, inteligência ou investigação digital.</>
      ),
      certHeaders: ['Domínio', 'Nível', 'Prova'],
      certRows: [
        { domain: 'Segurança Ofensiva (PenTesting)', level: 'Profissional Avançado', proof: 'Certificado ExorciseThat' },
        { domain: 'OSINT & Forense Digital', level: 'Investigador Especialista', proof: "Licença Osinter / CanCred" },
        { domain: 'Threat Intelligence', level: 'Especialista em Grupos', proof: '30+ Diplomas Pro' },
      ],
      pills: ['20+ Anos de Experiência', 'Instrutor OSINT', 'Bélgica', 'Segurança Ofensiva', 'Trace Labs GOSP'],
      verifyCta: 'Verificar o meu Passaporte CanCred',
      contactCta: 'Contacto',
    },
    footer: {
      tagline: "Especialista OSINT em investigação digital, proteção de menores e segurança de comunidades online.",
      servicesTitle: 'Serviços',
      services: ['Ghostint OSINT', 'Proteção de menores', 'Tracker Intelligence'],
      contactTitle: 'Contacto',
      copyright: '© 2026 Zhétical · Todos os direitos reservados',
      status: 'Sistemas operacionais',
      disclaimer: { label: 'Aviso', text: 'Este site destina-se exclusivamente a fins educativos e à sensibilização para a cibersegurança. O autor declina qualquer responsabilidade pelo uso indevido ou ilegal das informações apresentadas.' },
    },
  },
} as const;

// ── SEO ───────────────────────────────────────────────────────────────────────

const seoMeta: Record<Lang, { htmlLang: string; title: string; description: string; ogLocale: string }> = {
  FR: {
    htmlLang: 'fr',
    title: 'Zhétical · Expert OSINT & Cybersécurité | Belgique',
    description: "Zhétical — Expert OSINT basé en Belgique. Investigation numérique, Pentesting, protection des mineurs en ligne, Cyber-segurança, Threat Intelligence. 30+ certifications.",
    ogLocale: 'fr_FR',
  },
  EN: {
    htmlLang: 'en',
    title: 'Zhétical · OSINT Expert & Cybersecurity | Belgium',
    description: "Zhétical — OSINT Expert based in Belgium. Digital investigation, Pentesting, online child protection, Cyber-segurança, Threat Intelligence. 30+ certifications.",
    ogLocale: 'en_GB',
  },
  ES: {
    htmlLang: 'es',
    title: 'Zhétical · Experto OSINT & Ciberseguridad | Bélgica',
    description: "Zhétical — Experto OSINT con sede en Bélgica. Investigación digital, Pentesting, protección de menores en línea, Cyber-segurança, Threat Intelligence. 30+ certificaciones.",
    ogLocale: 'es_ES',
  },
  PT: {
    htmlLang: 'pt',
    title: 'Zhétical · Especialista em OSINT & Cyber-segurança | Bélgica',
    description: "Zhétical — Especialista em OSINT sediado na Bélgica. Investigação digital, Pentesting, proteção de menores online, Cyber-segurança, Threat Intelligence. 30+ certificações.",
    ogLocale: 'pt_PT',
  },
};

function useSEO(lang: Lang) {
  useEffect(() => {
    const meta = seoMeta[lang];
    document.documentElement.lang = meta.htmlLang;
    document.title = meta.title;

    const setMeta = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:locale"]', 'content', meta.ogLocale);
    setMeta('meta[name="twitter:title"]', 'content', meta.title);
    setMeta('meta[name="twitter:description"]', 'content', meta.description);
  }, [lang]);
}

// ── helpers ───────────────────────────────────────────────────────────────────

function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setWordIdx((w) => (w + 1) % words.length);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── sub-components ────────────────────────────────────────────────────────────

function LanguageSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {(['FR', 'EN', 'ES', 'PT'] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-700">|</span>}
          <button
            onClick={() => setLang(l)}
            className={`px-1 py-0.5 rounded transition-colors ${
              lang === l ? 'text-emerald-400 font-bold' : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const tr = t[lang].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cyber-darker/95 backdrop-blur-md border-b border-cyber-border' : 'bg-transparent'
      }`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono font-bold tracking-widest text-lg">
          <span className="text-white">ZH</span><span className="text-emerald-400 emerald-glow">É</span><span className="text-white">TICAL</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {tr.links.map((item, i) => (
            <a
              key={item}
              href={`#${['enquetes', 'prévention', 'tracker', 'contact'][i]}`}
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} setLang={setLang} />
          <a
            href="https://tracker.prohacking77.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded text-sm font-mono hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
          >
            <Radio size={14} />
            {tr.tracker}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection({ lang }: { lang: Lang }) {
  const tr = t[lang].hero;
  const typed = useTypingEffect(tr.typingWords as unknown as string[]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <motion.section
      style={{ opacity }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg noise-bg"
    >
      <div className="scanline fixed inset-x-0 h-32 z-10 pointer-events-none" />

      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-500/20 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}

      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[20vw] font-black text-emerald-500/[0.02] tracking-tighter font-mono">OSINT</span>
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">{tr.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-6 emerald-glow font-mono"
        >
          <span className="text-white">ZH</span><span className="text-emerald-400">É</span><span className="text-white">TICAL</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-emerald-400 font-mono mb-6 h-8"
        >
          {typed}<span className="typing-cursor ml-0.5">&nbsp;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {tr.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="https://tracker.prohacking77.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-3 rounded font-semibold hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95"
          >
            <Zap size={18} />
            {tr.ctaTracker}
          </a>
          <a
            href="#enquetes"
            className="flex items-center justify-center gap-2 border border-emerald-500/30 text-emerald-400 px-8 py-3 rounded font-semibold hover:bg-emerald-500/10 transition-all"
          >
            <Search size={18} />
            {tr.ctaGhostint}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-8 justify-center"
        >
          {tr.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-emerald-400 font-mono emerald-glow">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs font-mono tracking-widest uppercase">{tr.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded px-3 py-1 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">{children}</span>
    </div>
  );
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ExpertiseBioSection({ lang }: { lang: Lang }) {
  const tr = t[lang].bio;

  return (
    <section id="expertise" className="py-12 px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="relative rounded-xl border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.06)] bg-[#080b08] overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/10 bg-emerald-500/3">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-emerald-400/40 text-[10px] font-mono tracking-[0.3em] uppercase leading-none mb-0.5">
                    {tr.passportLabel}
                  </p>
                  <h2 className="text-2xl font-black font-mono leading-none">
                    <span className="text-white">ZH</span><span className="text-emerald-400" style={{ textShadow: '0 0 12px rgba(16,185,129,0.5)' }}>É</span><span className="text-white">TICAL</span>
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-1 ml-4">
                  {[{ v: '30+', l: tr.statsLabels[0] }, { v: '20', l: tr.statsLabels[1] }, { v: '9', l: tr.statsLabels[2] }].map((s, i) => (
                    <div key={s.l} className={`px-3 py-1.5 ${i < 2 ? 'border-r border-emerald-500/10' : ''}`}>
                      <p className="text-emerald-400 font-black text-base font-mono leading-none">{s.v}</p>
                      <p className="text-gray-600 text-[10px]">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://i.postimg.cc/14t7v4k2/03-photo-2026-02-23-03-15-49.jpg" alt="Trace Labs CTF" className="h-10 w-10 object-contain rounded opacity-80 hover:opacity-100 transition-opacity" title="Trace Labs CTF Participant" />
                <img src="https://i.postimg.cc/PNxVSNgV/00openbadge-OZ-2026-VLAMZF.png" alt="Oscar Zulu" className="h-10 w-10 object-contain rounded-full opacity-80 hover:opacity-100 transition-opacity" title="Oscar Zulu — Permis d'Osinter" />
                <img src="https://i.postimg.cc/JtnYptfS/06-photo-2024-08-16-13-55-19.jpg" alt="ExorciseThat" className="h-10 w-10 object-contain rounded-full opacity-80 hover:opacity-100 transition-opacity" title="ExorciseThat Cybersecurity" />
                <div className="w-12 h-12 rounded-full border border-emerald-500/25 flex flex-col items-center justify-center text-center ml-1">
                  <span className="text-emerald-400/50 text-[6px] font-mono font-black leading-tight tracking-widest">VERIF.</span>
                  <span className="text-emerald-400/50 text-[6px] font-mono font-black leading-tight tracking-widest">2026</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-1.5 border-b border-emerald-500/8 font-mono text-[9px] text-emerald-500/20 tracking-widest overflow-hidden whitespace-nowrap">
              P&lt;BEL&lt;ZHETICAL&lt;&lt;OPERATOR&lt;OSINT&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;ZHT2026BE&lt;&lt;CANCRED13165
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="px-6 py-5 border-b lg:border-b-0 lg:border-r border-emerald-500/10 space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-0.5 h-4 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400/60 text-[10px] font-mono tracking-[0.3em] uppercase">{tr.operatorProfile}</span>
                </div>
                <div className="border-l-2 border-emerald-500/60 pl-3">
                  <p className="text-gray-300 leading-relaxed text-xs">{tr.bio1}</p>
                </div>
                <div className="border-l-2 border-emerald-500/30 pl-3">
                  <p className="text-gray-400 leading-relaxed text-xs">{tr.bio2}</p>
                </div>
                <div className="border-l-2 border-emerald-500/15 pl-3">
                  <p className="text-gray-400 leading-relaxed text-xs">{tr.bio3}</p>
                </div>
                <div className="border-l-2 border-emerald-500/8 pl-3">
                  <p className="text-gray-400 leading-relaxed text-xs">{tr.bio4}</p>
                </div>
              </div>

              <div className="px-6 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-0.5 h-4 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400/60 text-[10px] font-mono tracking-[0.3em] uppercase">{tr.certRegistry}</span>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-emerald-500/15">
                      {tr.certHeaders.map((h) => (
                        <th key={h} className="text-left text-emerald-400/60 font-mono text-[10px] tracking-wider pb-2 pr-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tr.certRows.map((row, i) => (
                      <motion.tr
                        key={row.domain}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="border-b border-emerald-500/5"
                      >
                        <td className="py-2 pr-4 text-gray-200">{row.domain}</td>
                        <td className="py-2 pr-4 text-gray-400">{row.level}</td>
                        <td className="py-2 text-emerald-400 font-mono text-[10px]">{row.proof}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { icon: <Zap size={10} />, label: tr.pills[0] },
                    { icon: <BookOpen size={10} />, label: tr.pills[1] },
                    { icon: <MapPin size={10} />, label: tr.pills[2] },
                    { icon: <Crosshair size={10} />, label: tr.pills[3] },
                    { icon: <Globe size={10} />, label: tr.pills[4] },
                  ].map((p) => (
                    <span key={p.label} className="inline-flex items-center gap-1 bg-emerald-500/5 border border-emerald-500/15 text-emerald-400/60 text-[10px] font-mono px-2 py-0.5 rounded-full">
                      {p.icon}{p.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-around gap-4 pt-1 border-t border-emerald-500/10">
                  <img src="https://i.postimg.cc/PNxVSNgV/00openbadge-OZ-2026-VLAMZF.png" alt="Oscar Zulu" className="h-20 w-20 object-contain rounded-full hover:scale-105 transition-transform duration-200" />
                  <img src="https://i.postimg.cc/14t7v4k2/03-photo-2026-02-23-03-15-49.jpg" alt="Trace Labs CTF" className="h-20 w-20 object-contain rounded hover:scale-105 transition-transform duration-200" />
                  <img src="https://i.postimg.cc/JtnYptfS/06-photo-2024-08-16-13-55-19.jpg" alt="ExorciseThat" className="h-20 w-20 object-contain rounded-full hover:scale-105 transition-transform duration-200" />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-500/10">
                  <a
                    href="https://passport.cancred.ca/app/profile/13165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-500 text-black px-4 py-2 rounded font-black text-xs hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  >
                    <BadgeCheck size={12} />
                    {tr.verifyCta}
                    <ExternalLink size={10} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jose-luis-c-a57a782b1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#0a66c2]/15 border border-[#0a66c2]/30 text-[#5ba4f5] px-3 py-2 rounded font-semibold text-xs hover:bg-[#0a66c2]/25 transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    href="mailto:jose@prohacking77.me"
                    className="inline-flex items-center gap-1.5 border border-emerald-500/20 text-emerald-400/60 px-3 py-2 rounded text-xs hover:bg-emerald-500/8 transition-all"
                  >
                    <Mail size={11} />
                    {tr.contactCta}
                  </a>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function EnquetesSection({ lang }: { lang: Lang }) {
  const tr = t[lang].enquetes;

  const featureIcons = [
    <Search className="text-emerald-400" size={20} />,
    <Globe className="text-emerald-400" size={20} />,
    <Database className="text-emerald-400" size={20} />,
    <Activity className="text-emerald-400" size={20} />,
  ];

  return (
    <section id="enquetes" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-emerald-500" />
            <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">{tr.sectionLabel}</span>
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            {tr.title}<br />
            <span className="text-emerald-400">{tr.titleAccent}</span>
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-5">{tr.p1}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-10">{tr.p2}</p>
          <a
            href="mailto:jose@prohacking77.me"
            className="inline-flex items-center gap-2 border border-emerald-500/40 text-emerald-400 px-6 py-3 rounded font-mono text-sm hover:bg-emerald-500/10 transition-all"
          >
            <Mail size={15} />
            {tr.cta}
          </a>
        </AnimatedSection>

        <div className="flex flex-col gap-3">
          {tr.features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-cyber-card border border-cyber-border rounded-lg p-5"
            >
              <div className="w-10 h-10 flex-shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                {featureIcons[i]}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreventionSection({ lang }: { lang: Lang }) {
  const tr = t[lang].prevention;

  const platformMeta = [
    { icon: <Shield className="text-red-400" size={24} />, color: 'from-red-900/20 to-transparent', border: 'border-red-500/20', accent: 'text-red-400', badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
    { icon: <Users className="text-blue-400" size={24} />, color: 'from-blue-900/20 to-transparent', border: 'border-blue-500/20', accent: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  ];

  const stepIcons = [<Search size={20} />, <Eye size={20} />, <Database size={20} />, <Send size={20} />];

  return (
    <section id="prévention" className="py-32 px-6 bg-cyber-darker/50">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionLabel>{tr.sectionLabel}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            {tr.title}{' '}
            <span className="text-emerald-400">{tr.titleAccent}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-16 leading-relaxed">{tr.description}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {tr.platforms.map((p, i) => {
            const meta = platformMeta[i];
            return (
              <AnimatedSection key={p.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-gradient-to-b ${meta.color} border ${meta.border} rounded-xl p-8`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-cyber-card border border-cyber-border rounded-lg flex items-center justify-center">
                      {meta.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${meta.accent}`}>{p.name}</h3>
                      <span className={`text-xs border rounded-full px-2 py-0.5 ${meta.badge}`}>{tr.activeBadge}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-widest mb-3 font-mono">{tr.threatsLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.threats.map((threat) => (
                        <span key={threat} className="flex items-center gap-1.5 text-xs text-gray-400 bg-cyber-card border border-cyber-border rounded px-2 py-1">
                          <AlertTriangle size={10} className="text-yellow-500" />
                          {threat}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">{tr.processTitle}</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-0 relative">
            {tr.steps.map((item, i) => (
              <div key={item.title} className="flex flex-col md:flex-row items-center flex-1">
                <div className="flex flex-col items-center text-center px-4 py-4 flex-1">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-3">
                    {stepIcons[i]}
                  </div>
                  <span className="text-emerald-500/50 text-xs font-mono mb-1">{String(i + 1).padStart(2, '0')}</span>
                  <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block w-8 h-px bg-emerald-500/20 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function TrackerSection({ lang }: { lang: Lang }) {
  const tr = t[lang].tracker;

  return (
    <section id="tracker" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <SectionLabel>{tr.sectionLabel}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {tr.title} <span className="text-emerald-400">{tr.titleAccent}</span> {tr.titleSuffix}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{tr.description}</p>

          <a
            href="https://tracker.prohacking77.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-500 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 mb-4"
          >
            <Activity size={22} />
            {tr.cta}
            <ExternalLink size={16} />
          </a>

          <p className="text-gray-600 text-sm font-mono mb-12">{tr.accessNote}</p>

          <div className="flex flex-wrap gap-3 justify-center">
            {tr.pills.map((pill) => (
              <span key={pill} className="bg-cyber-card border border-emerald-500/20 text-emerald-400/80 px-4 py-2 rounded-full text-sm font-mono">
                {pill}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const socialLinks = [
  {
    label: 'Telegram',
    href: 'https://t.me/prohacking7',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.932z" />
      </svg>
    ),
  },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/zhetikal.bsky.social',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/zhetikal77?s=09',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jose-luis-c-a57a782b1/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer;

  return (
    <footer id="contact" className="border-t border-cyber-border bg-cyber-darker py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="font-mono font-bold tracking-widest text-xl block mb-4">
              <span className="text-white">ZH</span><span className="text-emerald-400">É</span><span className="text-white">TICAL</span>
            </span>
            <p className="text-gray-500 text-sm leading-relaxed">{tr.tagline}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{tr.servicesTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#enquetes" className="hover:text-emerald-400 transition-colors">{tr.services[0]}</a></li>
              <li><a href="#prévention" className="hover:text-emerald-400 transition-colors">{tr.services[1]}</a></li>
              <li>
                <a href="https://tracker.prohacking77.me" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  {tr.services[2]} <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{tr.contactTitle}</h4>
            <a href="mailto:jose@prohacking77.me" className="flex items-center gap-2 text-gray-500 hover:text-emerald-400 transition-colors text-sm mb-6">
              <Mail size={14} />
              jose@prohacking77.me
            </a>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 bg-cyber-card border border-cyber-border rounded flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cyber-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-mono">{tr.copyright}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {tr.status}
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-cyber-border/50">
          <div className="flex items-start gap-2.5 text-gray-600 text-xs leading-relaxed max-w-3xl mx-auto text-center justify-center">
            <Shield size={13} className="flex-shrink-0 mt-0.5 text-gray-600/70" />
            <p>
              <span className="text-gray-500 font-medium">{tr.disclaimer.label}</span>
              {' — '}
              {tr.disclaimer.text}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('FR');
  useSEO(lang);

  return (
    <div className="bg-cyber-dark min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <HeroSection lang={lang} />
      <EnquetesSection lang={lang} />
      <PreventionSection lang={lang} />
      <TrackerSection lang={lang} />
      <ExpertiseBioSection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

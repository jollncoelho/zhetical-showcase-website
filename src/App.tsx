import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Zap,
  ExternalLink,
  ChevronDown,
  Crosshair,
  Shield,
  Lock,
  Cpu,
  Sparkles,
  Wrench,
  MousePointerClick,
  MapPin,
  Bug,
  FileJson,
  PlayCircle,
  BookOpen,
  Radio,
  Activity,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Lang = 'FR' | 'EN' | 'ES' | 'PT';

// ── Translations ──────────────────────────────────────────────────────────────

const t = {
  FR: {
    nav: {
      links: ['Tracker', 'Vidéo', 'Analyse IA', 'Fonctionnalités', 'Guide'],
      tracker: 'Ouvrir le Tracker',
    },
    hero: {
      badge: 'OSINT · Threat Intelligence · Open Source',
      titleLine1: 'GHOSTINT',
      titleLine2: 'TRACKER',
      tagline: "L'investigation OSINT poussée à son maximum.",
      description:
        "Centralisez vos indices sur un graphe dynamique, cartographiez vos cibles instantanément et activez l'analyse par Intelligence Artificielle en un clic. Un outil puissant, fluide et open source conçu pour les analystes et la Threat Intelligence.",
      ctaTracker: 'Ouvrir le Tracker',
      ctaGuide: 'Voir le Guide',
      stats: [
        { label: 'Outils OSINT intégrés', value: '450+' },
        { label: 'Modes IA', value: '2' },
        { label: 'Open Source', value: '100%' },
      ],
      scroll: 'Défiler',
    },
    video: {
      sectionLabel: 'Tutoriel',
      title: 'Découvrez Ghostint Tracker en Action',
      description:
        "Apprenez à maîtriser la plateforme en 30 minutes : de la création visuelle de votre premier graphe relationnel à la configuration ultra-simple de vos agents IA locaux et avancés.",
      watchLabel: 'Lecture recommandée',
      duration: '30 min',
    },
    hybrid: {
      sectionLabel: 'Analyse Hybride',
      title: 'La double puissance',
      titleAccent: 'IA',
      subtitle: 'Deux modes, un même graphe. Choisissez votre niveau OPSEC.',
      cards: [
        {
          icon: 'local',
          tag: 'Mode Local',
          title: 'Confidentialité Absolue',
          desc: "Ne laissez aucune trace sur le réseau. En connectant Ghostint à Ollama (Gemma 2), vous profitez d'une puissance d'analyse textuelle et de reconnaissance directement sur votre machine, sans aucune connexion internet. Idéal pour préserver un anonymat total et respecter une charte OPSEC stricte.",
          pills: ['Ollama', 'Gemma 2', 'Offline', 'OPSEC'],
        },
        {
          icon: 'advanced',
          tag: 'Mode Avancé',
          title: 'Renseignement Immédiat',
          desc: "Libérez la puissance des agents autonomes Hermes. Plus besoin de configurations complexes ou de serveurs locaux en ligne de commande : entrez simplement votre clé API Nous Portal directement dans l'interface du tracker. L'IA prend le relais pour explorer le web, croiser les données en temps réel et générer de nouvelles entités prêtes à être injectées.",
          pills: ['Hermes', 'Nous Portal API', 'Web Live', 'Auto-Gen'],
        },
      ],
    },
    features: {
      sectionLabel: 'Fonctionnalités d’Élite',
      title: 'Tout ce qu’il faut pour',
      titleAccent: 'investiguer plus vite',
      subtitle: 'Une boîte à outils complète, pensée pour le terrain.',
      items: [
        {
          icon: 'wrench',
          title: '450+ Outils Experts',
          tag: 'Ghostint Tools',
          desc: "Un panneau complet intégré pour pivoter en un instant vers les meilleures ressources OSINT du web (réseaux sociaux, reverse image, emails).",
        },
        {
          icon: 'cursor',
          title: 'Interface Épurée',
          tag: 'Actions au Survol',
          desc: "Les boutons d'action et les outils d'analyse apparaissent uniquement au survol du nœud par la souris pour vous laisser 100% d'espace lisible sur vos entités.",
        },
        {
          icon: 'map',
          title: 'Entité Adresse Automatique',
          tag: 'Géo-Sync',
          desc: "Saisissez une adresse, le nœud se met à jour tout seul et se synchronise directement avec la carte interactive pour placer le marqueur sans aucune manipulation manuelle.",
        },
        {
          icon: 'bug',
          title: 'Nouvelles Entités Cyber',
          tag: 'Threat Intel',
          desc: "Support natif des menaces avancées avec des nœuds dédiés pour les ASN, les Hashs de malwares, les Certificats SSL, les Hostnames et les TTP.",
        },
        {
          icon: 'report',
          title: 'Rapports & Sauvegardes',
          tag: 'Export',
          desc: "Exportez votre progression en JSON pour la reprendre plus tard, ou générez instantanément des rapports officiels en PNG ou PDF.",
        },
      ],
    },
    footer: {
      tagline:
        "Ghostint Tracker — Graphe OSINT dynamique, analyse IA hybride et 450+ outils experts. Open source, conçu pour les analystes et la Threat Intelligence.",
      productTitle: 'Produit',
      product: ['Le Tracker', 'Tutoriel Vidéo', 'Analyse IA', 'Fonctionnalités'],
      resourcesTitle: 'Ressources',
      resources: ['Guide', 'Code Source', 'Documentation'],
      copyright: '© 2026 Ghostint Tracker · Open Source',
      status: 'Systèmes opérationnels',
      disclaimer: {
        label: 'Avertissement',
        text: "Outil dédié à l'investigation OSINT légale, à la Threat Intelligence et à la sensibilisation en cybersécurité. L'auteur décline toute responsabilité pour tout usage malveillant ou illégal.",
      },
    },
  },
  EN: {
    nav: {
      links: ['Tracker', 'Video', 'AI Analysis', 'Features', 'Guide'],
      tracker: 'Open Tracker',
    },
    hero: {
      badge: 'OSINT · Threat Intelligence · Open Source',
      titleLine1: 'GHOSTINT',
      titleLine2: 'TRACKER',
      tagline: 'OSINT investigation taken to the maximum.',
      description:
        "Centralize your leads on a dynamic graph, map your targets instantly and activate AI analysis in one click. A powerful, fluid and open source tool built for analysts and Threat Intelligence.",
      ctaTracker: 'Open the Tracker',
      ctaGuide: 'View the Guide',
      stats: [
        { label: 'Integrated OSINT tools', value: '450+' },
        { label: 'AI modes', value: '2' },
        { label: 'Open Source', value: '100%' },
      ],
      scroll: 'Scroll',
    },
    video: {
      sectionLabel: 'Tutorial',
      title: 'Discover Ghostint Tracker in Action',
      description:
        'Learn to master the platform in 30 minutes: from visually building your first relationship graph to the ultra-simple setup of your local and advanced AI agents.',
      watchLabel: 'Recommended viewing',
      duration: '30 min',
    },
    hybrid: {
      sectionLabel: 'Hybrid Analysis',
      title: 'The dual power of',
      titleAccent: 'AI',
      subtitle: 'Two modes, one graph. Pick your OPSEC level.',
      cards: [
        {
          icon: 'local',
          tag: 'Local Mode',
          title: 'Absolute Confidentiality',
          desc: "Leave no trace on the network. By connecting Ghostint to Ollama (Gemma 2), you get textual analysis and recognition power right on your machine, with no internet connection. Ideal for total anonymity and strict OPSEC compliance.",
          pills: ['Ollama', 'Gemma 2', 'Offline', 'OPSEC'],
        },
        {
          icon: 'advanced',
          tag: 'Advanced Mode',
          title: 'Immediate Intelligence',
          desc: "Unleash the power of autonomous Hermes agents. No complex configs or local CLI servers: simply enter your Nous Portal API key directly in the tracker interface. The AI takes over to explore the web, cross-reference data in real time and generate new entities ready to be injected.",
          pills: ['Hermes', 'Nous Portal API', 'Web Live', 'Auto-Gen'],
        },
      ],
    },
    features: {
      sectionLabel: 'Elite Features',
      title: 'Everything you need to',
      titleAccent: 'investigate faster',
      subtitle: 'A complete toolkit, built for the field.',
      items: [
        {
          icon: 'wrench',
          title: '450+ Expert Tools',
          tag: 'Ghostint Tools',
          desc: "A full integrated panel to pivot instantly to the best OSINT resources on the web (social networks, reverse image, emails).",
        },
        {
          icon: 'cursor',
          title: 'Clean Interface',
          tag: 'Hover Actions',
          desc: "Action buttons and analysis tools only appear on node hover, leaving 100% readable space on your entities.",
        },
        {
          icon: 'map',
          title: 'Automatic Address Entity',
          tag: 'Geo-Sync',
          desc: "Enter an address, the node updates itself and syncs directly with the interactive map to place the marker with no manual action.",
        },
        {
          icon: 'bug',
          title: 'New Cyber Entities',
          tag: 'Threat Intel',
          desc: "Native support for advanced threats with dedicated nodes for ASN, malware hashes, SSL certificates, hostnames and TTPs.",
        },
        {
          icon: 'report',
          title: 'Reports & Backups',
          tag: 'Export',
          desc: "Export your progress as JSON to resume later, or instantly generate official reports in PNG or PDF.",
        },
      ],
    },
    footer: {
      tagline:
        "Ghostint Tracker — Dynamic OSINT graph, hybrid AI analysis and 450+ expert tools. Open source, built for analysts and Threat Intelligence.",
      productTitle: 'Product',
      product: ['The Tracker', 'Video Tutorial', 'AI Analysis', 'Features'],
      resourcesTitle: 'Resources',
      resources: ['Guide', 'Source Code', 'Documentation'],
      copyright: '© 2026 Ghostint Tracker · Open Source',
      status: 'Systems operational',
      disclaimer: {
        label: 'Disclaimer',
        text: 'Tool dedicated to legal OSINT investigation, Threat Intelligence and cybersecurity awareness. The author disclaims all responsibility for any malicious or illegal use.',
      },
    },
  },
  ES: {
    nav: {
      links: ['Tracker', 'Vídeo', 'Análisis IA', 'Funciones', 'Guía'],
      tracker: 'Abrir Tracker',
    },
    hero: {
      badge: 'OSINT · Threat Intelligence · Open Source',
      titleLine1: 'GHOSTINT',
      titleLine2: 'TRACKER',
      tagline: 'Investigación OSINT llevada al máximo.',
      description:
        "Centraliza tus indicios en un grafo dinámico, mapea tus objetivos al instante y activa el análisis por Inteligencia Artificial en un clic. Una herramienta potente, fluida y open source diseñada para analistas y Threat Intelligence.",
      ctaTracker: 'Abrir el Tracker',
      ctaGuide: 'Ver la Guía',
      stats: [
        { label: 'Herramientas OSINT integradas', value: '450+' },
        { label: 'Modos IA', value: '2' },
        { label: 'Open Source', value: '100%' },
      ],
      scroll: 'Desplazar',
    },
    video: {
      sectionLabel: 'Tutorial',
      title: 'Descubre Ghostint Tracker en Acción',
      description:
        'Aprende a dominar la plataforma en 30 minutos: desde la creación visual de tu primer grafo relacional hasta la configuración ultra-simple de tus agentes IA locales y avanzados.',
      watchLabel: 'Reproducción recomendada',
      duration: '30 min',
    },
    hybrid: {
      sectionLabel: 'Análisis Híbrido',
      title: 'El doble poder de la',
      titleAccent: 'IA',
      subtitle: 'Dos modos, un mismo grafo. Elige tu nivel OPSEC.',
      cards: [
        {
          icon: 'local',
          tag: 'Modo Local',
          title: 'Confidencialidad Absoluta',
          desc: "No dejes rastro en la red. Conectando Ghostint a Ollama (Gemma 2), disfrutas de potencia de análisis textual y de reconocimiento directamente en tu máquina, sin conexión a internet. Ideal para preservar el anonimato total y respetar una carta OPSEC estricta.",
          pills: ['Ollama', 'Gemma 2', 'Offline', 'OPSEC'],
        },
        {
          icon: 'advanced',
          tag: 'Modo Avanzado',
          title: 'Inteligencia Inmediata',
          desc: "Libera el poder de los agentes autónomos Hermes. Sin configuraciones complejas ni servidores locales por línea de comandos: introduce simplemente tu clave API Nous Portal directamente en la interfaz del tracker. La IA toma el relevo para explorar la web, cruzar los datos en tiempo real y generar nuevas entidades listas para inyectar.",
          pills: ['Hermes', 'Nous Portal API', 'Web Live', 'Auto-Gen'],
        },
      ],
    },
    features: {
      sectionLabel: 'Funciones de Élite',
      title: 'Todo lo que necesitas para',
      titleAccent: 'investigar más rápido',
      subtitle: 'Un kit de herramientas completo, pensado para el terreno.',
      items: [
        {
          icon: 'wrench',
          title: '450+ Herramientas Expertas',
          tag: 'Ghostint Tools',
          desc: "Un panel completo integrado para pivotar al instante hacia los mejores recursos OSINT de la web (redes sociales, reverse image, emails).",
        },
        {
          icon: 'cursor',
          title: 'Interfaz Depurada',
          tag: 'Acciones al Hover',
          desc: "Los botones de acción y las herramientas de análisis aparecen solo al pasar el ratón sobre el nodo, dejando 100% de espacio legible sobre tus entidades.",
        },
        {
          icon: 'map',
          title: 'Entidad Dirección Automática',
          tag: 'Geo-Sync',
          desc: "Introduce una dirección, el nodo se actualiza solo y se sincroniza directamente con el mapa interactivo para colocar el marcador sin manipulación manual.",
        },
        {
          icon: 'bug',
          title: 'Nuevas Entidades Cyber',
          tag: 'Threat Intel',
          desc: "Soporte nativo de amenazas avanzadas con nodos dedicados para ASN, hashes de malware, certificados SSL, hostnames y TTP.",
        },
        {
          icon: 'report',
          title: 'Informes y Copias de Seguridad',
          tag: 'Export',
          desc: "Exporta tu progreso en JSON para retomarlo más tarde, o genera informes oficiales al instante en PNG o PDF.",
        },
      ],
    },
    footer: {
      tagline:
        "Ghostint Tracker — Grafo OSINT dinámico, análisis IA híbrido y 450+ herramientas expertas. Open source, diseñado para analistas y Threat Intelligence.",
      productTitle: 'Producto',
      product: ['El Tracker', 'Tutorial en Vídeo', 'Análisis IA', 'Funciones'],
      resourcesTitle: 'Recursos',
      resources: ['Guía', 'Código Fuente', 'Documentación'],
      copyright: '© 2026 Ghostint Tracker · Open Source',
      status: 'Sistemas operacionales',
      disclaimer: {
        label: 'Aviso',
        text: 'Herramienta dedicada a la investigación OSINT legal, Threat Intelligence y la concienciación en ciberseguridad. El autor declina toda responsabilidad por cualquier uso malicioso o ilegal.',
      },
    },
  },
  PT: {
    nav: {
      links: ['Tracker', 'Vídeo', 'Análise IA', 'Funções', 'Guia'],
      tracker: 'Abrir Tracker',
    },
    hero: {
      badge: 'OSINT · Threat Intelligence · Open Source',
      titleLine1: 'GHOSTINT',
      titleLine2: 'TRACKER',
      tagline: 'Investigação OSINT levada ao máximo.',
      description:
        "Centralize os seus indícios num grafo dinâmico, mapeie os seus alvos instantaneamente e ative a análise por Inteligência Artificial num clique. Uma ferramenta poderosa, fluida e open source concebida para analistas e Threat Intelligence.",
      ctaTracker: 'Abrir o Tracker',
      ctaGuide: 'Ver o Guia',
      stats: [
        { label: 'Ferramentas OSINT integradas', value: '450+' },
        { label: 'Modos IA', value: '2' },
        { label: 'Open Source', value: '100%' },
      ],
      scroll: 'Rolar',
    },
    video: {
      sectionLabel: 'Tutorial',
      title: 'Descubra o Ghostint Tracker em Ação',
      description:
        'Aprenda a dominar a plataforma em 30 minutos: desde a criação visual do seu primeiro grafo relacional até à configuração ultra-simples dos seus agentes IA locais e avançados.',
      watchLabel: 'Reprodução recomendada',
      duration: '30 min',
    },
    hybrid: {
      sectionLabel: 'Análise Híbrida',
      title: 'O duplo poder da',
      titleAccent: 'IA',
      subtitle: 'Dois modos, um mesmo grafo. Escolha o seu nível OPSEC.',
      cards: [
        {
          icon: 'local',
          tag: 'Modo Local',
          title: 'Confidencialidade Absoluta',
          desc: "Não deixe rasto na rede. Ao ligar o Ghostint ao Ollama (Gemma 2), beneficia de potencia de análise textual e de reconhecimento diretamente na sua máquina, sem qualquer ligação à internet. Ideal para preservar o anonimato total e respeitar uma carta OPSEC estrita.",
          pills: ['Ollama', 'Gemma 2', 'Offline', 'OPSEC'],
        },
        {
          icon: 'advanced',
          tag: 'Modo Avançado',
          title: 'Inteligência Imediata',
          desc: "Liberte a potencia dos agentes autónomos Hermes. Sem configurações complexas nem servidores locais por linha de comandos: introduza simplesmente a sua chave API Nous Portal diretamente na interface do tracker. A IA toma o relevo para explorar a web, cruzar os dados em tempo real e gerar novas entidades prontas a injetar.",
          pills: ['Hermes', 'Nous Portal API', 'Web Live', 'Auto-Gen'],
        },
      ],
    },
    features: {
      sectionLabel: 'Funções de Elite',
      title: 'Tudo o que precisa para',
      titleAccent: 'investigar mais rápido',
      subtitle: 'Um kit de ferramentas completo, pensado para o terreno.',
      items: [
        {
          icon: 'wrench',
          title: '450+ Ferramentas Especialistas',
          tag: 'Ghostint Tools',
          desc: "Um painel completo integrado para pivotar num instante para os melhores recursos OSINT da web (redes sociais, reverse image, emails).",
        },
        {
          icon: 'cursor',
          title: 'Interface Depurada',
          tag: 'Ações ao Hover',
          desc: "Os botões de ação e as ferramentas de análise aparecem apenas ao passar o rato sobre o nó, deixando 100% de espaço legível sobre as suas entidades.",
        },
        {
          icon: 'map',
          title: 'Entidade Endereço Automática',
          tag: 'Geo-Sync',
          desc: "Introduza um endereço, o nó atualiza-se sozinho e sincroniza-se diretamente com o mapa interativo para colocar o marcador sem qualquer manipulação manual.",
        },
        {
          icon: 'bug',
          title: 'Novas Entidades Cyber',
          tag: 'Threat Intel',
          desc: "Suporte nativo de ameaças avançadas com nós dedicados para ASN, hashes de malware, certificados SSL, hostnames e TTP.",
        },
        {
          icon: 'report',
          title: 'Relatórios e Cópias de Segurança',
          tag: 'Export',
          desc: "Exporte o seu progresso em JSON para o retomar mais tarde, ou gere relatórios oficiais num instante em PNG ou PDF.",
        },
      ],
    },
    footer: {
      tagline:
        "Ghostint Tracker — Grafo OSINT dinâmico, análise IA híbrida e 450+ ferramentas especializadas. Open source, concebido para analistas e Threat Intelligence.",
      productTitle: 'Produto',
      product: ['O Tracker', 'Tutorial em Vídeo', 'Análise IA', 'Funções'],
      resourcesTitle: 'Recursos',
      resources: ['Guia', 'Código Fonte', 'Documentação'],
      copyright: '© 2026 Ghostint Tracker · Open Source',
      status: 'Sistemas operacionais',
      disclaimer: {
        label: 'Aviso',
        text: 'Ferramenta dedicada à investigação OSINT legal, Threat Intelligence e à sensibilização para a cibersegurança. O autor declina qualquer responsabilidade por qualquer uso malicioso ou ilegal.',
      },
    },
  },
} as const;

// ── SEO ───────────────────────────────────────────────────────────────────────

const seoMeta: Record<Lang, { htmlLang: string; title: string; description: string; ogLocale: string }> = {
  FR: {
    htmlLang: 'fr',
    title: 'Ghostint Tracker · OSINT Investigation & IA Hybride',
    description:
      "Ghostint Tracker — Centralisez vos indices sur un graphe dynamique, cartographiez vos cibles et activez l'analyse IA (Ollama ou Hermes). 450+ outils OSINT, open source.",
    ogLocale: 'fr_FR',
  },
  EN: {
    htmlLang: 'en',
    title: 'Ghostint Tracker · OSINT Investigation & Hybrid AI',
    description:
      'Ghostint Tracker — Centralize your leads on a dynamic graph, map your targets and activate AI analysis (Ollama or Hermes). 450+ OSINT tools, open source.',
    ogLocale: 'en_GB',
  },
  ES: {
    htmlLang: 'es',
    title: 'Ghostint Tracker · Investigación OSINT e IA Híbrida',
    description:
      'Ghostint Tracker — Centraliza tus indicios en un grafo dinámico, mapea tus objetivos y activa el análisis IA (Ollama o Hermes). 450+ herramientas OSINT, open source.',
    ogLocale: 'es_ES',
  },
  PT: {
    htmlLang: 'pt',
    title: 'Ghostint Tracker · Investigação OSINT e IA Híbrida',
    description:
      'Ghostint Tracker — Centralize os seus indícios num grafo dinâmico, mapeie os seus alvos e ative a análise IA (Ollama ou Hermes). 450+ ferramentas OSINT, open source.',
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

  const anchorIds = ['tracker', 'video', 'ia', 'features', 'guide'];

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
        <span className="font-mono font-bold tracking-widest text-base">
          <span className="text-white">GHOST</span>
          <span className="text-emerald-400 emerald-glow">INT</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {tr.links.map((item, i) => (
            <a
              key={item}
              href={`#${anchorIds[i]}`}
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
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const particles = Array.from({ length: 30 }, (_, i) => i);

  return (
    <motion.section
      id="tracker"
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

      <div className="relative z-20 text-center px-6 max-w-5xl">
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
          className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6 font-mono leading-none"
        >
          <span className="text-white">{tr.titleLine1}</span>
          <span className="text-emerald-400 emerald-glow block md:inline">{tr.titleLine2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-emerald-400 font-mono mb-6"
        >
          {tr.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed"
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
            <ExternalLink size={14} />
          </a>
          <a
            href="#guide"
            className="flex items-center justify-center gap-2 border border-emerald-500/30 text-emerald-400 px-8 py-3 rounded font-semibold hover:bg-emerald-500/10 transition-all"
          >
            <BookOpen size={18} />
            {tr.ctaGuide}
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

function VideoSection({ lang }: { lang: Lang }) {
  const tr = t[lang].video;

  return (
    <section id="video" className="py-32 px-6 bg-cyber-darker/50 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <SectionLabel>{tr.sectionLabel}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight font-mono">
            {tr.title}
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">{tr.description}</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative rounded-xl border border-emerald-500/25 bg-cyber-card p-2 shadow-[0_0_40px_rgba(16,185,129,0.08)]">
            <div className="absolute -top-3 left-6 flex items-center gap-2 bg-cyber-darker border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-emerald-400 text-[10px] font-mono tracking-widest uppercase">{tr.watchLabel}</span>
            </div>
            <div className="absolute -top-3 right-6 bg-cyber-darker border border-emerald-500/30 px-3 py-1 rounded-full">
              <span className="text-emerald-400/80 text-[10px] font-mono tracking-widest">{tr.duration}</span>
            </div>
            <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/mQl5btUpOwc"
                title="Ghostint Tracker — Tutorial"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400/60 text-xs font-mono">
            <PlayCircle size={14} />
            <span>https://www.youtube.com/embed/mQl5btUpOwc</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function HybridAnalysisSection({ lang }: { lang: Lang }) {
  const tr = t[lang].hybrid;

  const cardMeta = [
    {
      icon: <Cpu className="text-emerald-400" size={26} />,
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
      ring: 'border-emerald-500/30',
      chip: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
      pillBorder: 'border-emerald-500/20 text-emerald-400/70',
    },
    {
      icon: <Sparkles className="text-emerald-400" size={26} />,
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]',
      ring: 'border-emerald-500/30',
      chip: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
      pillBorder: 'border-emerald-500/20 text-emerald-400/70',
    },
  ];

  return (
    <section id="ia" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>{tr.sectionLabel}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight font-mono">
            {tr.title} <span className="text-emerald-400 emerald-glow">{tr.titleAccent}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">{tr.subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tr.cards.map((card, i) => {
            const meta = cardMeta[i];
            return (
              <AnimatedSection key={card.title}>
                <div
                  className={`relative h-full bg-cyber-card border ${meta.ring} rounded-xl p-8 ${meta.glow} transition-all hover:-translate-y-1`}
                >
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mb-6" />

                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                      {meta.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-mono tracking-widest uppercase border rounded px-2 py-0.5 w-fit ${meta.chip}`}>
                        {card.tag}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
                        {card.title}
                        {i === 0 ? <Lock size={15} className="text-emerald-400/60" /> : <Zap size={15} className="text-emerald-400/60" />}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{card.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {card.pills.map((pill) => (
                      <span
                        key={pill}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border bg-emerald-500/5 ${meta.pillBorder}`}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const cls = 'text-emerald-400';
  switch (name) {
    case 'wrench':
      return <Wrench className={cls} size={22} />;
    case 'cursor':
      return <MousePointerClick className={cls} size={22} />;
    case 'map':
      return <MapPin className={cls} size={22} />;
    case 'bug':
      return <Bug className={cls} size={22} />;
    case 'report':
      return <FileJson className={cls} size={22} />;
    default:
      return <Wrench className={cls} size={22} />;
  }
}

function FeaturesSection({ lang }: { lang: Lang }) {
  const tr = t[lang].features;

  return (
    <section id="features" className="py-32 px-6 bg-cyber-darker/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>{tr.sectionLabel}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight font-mono">
            {tr.title} <span className="text-emerald-400 emerald-glow">{tr.titleAccent}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">{tr.subtitle}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tr.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group bg-cyber-card border border-cyber-border rounded-xl p-6 transition-all hover:border-emerald-500/40 card-glow ${
                i === tr.items.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/15 transition-colors">
                  <FeatureIcon name={item.icon} />
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400/60 border border-emerald-500/20 rounded px-2 py-0.5">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-cyber-card border border-emerald-500/25 rounded-xl px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-center justify-center">
                <Crosshair className="text-emerald-400" size={20} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Ghostint Tracker</p>
                <p className="text-gray-500 text-xs">Open Source · Threat Intelligence</p>
              </div>
            </div>
            <a
              href="https://tracker.prohacking77.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-2.5 rounded font-bold text-sm hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95"
            >
              <Zap size={16} />
              {t[lang].hero.ctaTracker}
              <ExternalLink size={12} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function GuideSection({ lang }: { lang: Lang }) {
  const tr = t[lang];
  const steps = [
    { n: '01', icon: <Crosshair size={18} />, title: tr.hero.ctaTracker, desc: tr.hero.tagline },
    { n: '02', icon: <PlayCircle size={18} />, title: tr.video.title, desc: tr.video.description },
    { n: '03', icon: <Cpu size={18} />, title: tr.hybrid.cards[0].title, desc: tr.hybrid.cards[0].desc },
    { n: '04', icon: <Sparkles size={18} />, title: tr.hybrid.cards[1].title, desc: tr.hybrid.cards[1].desc },
  ];

  return (
    <section id="guide" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>{t[lang].nav.links[4]}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight font-mono">
            {tr.hero.ctaGuide}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">{tr.hero.description}</p>
        </AnimatedSection>

        <div className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-5 bg-cyber-card border border-cyber-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-emerald-500/50 text-xs font-mono">{s.n}</span>
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/25 rounded-lg flex items-center justify-center text-emerald-400">
                  {s.icon}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="mt-12 text-center">
          <a
            href="https://tracker.prohacking77.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-500 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95"
          >
            <Activity />
            {tr.hero.ctaTracker}
            <ExternalLink size={16} />
          </a>
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
];

function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer;

  return (
    <footer id="contact" className="border-t border-cyber-border bg-cyber-darker py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <span className="font-mono font-bold tracking-widest text-xl block mb-4">
              <span className="text-white">GHOST</span>
              <span className="text-emerald-400">INT</span>
            </span>
            <p className="text-gray-500 text-sm leading-relaxed">{tr.tagline}</p>
            <div className="flex gap-3 mt-5">
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

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{tr.productTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="https://tracker.prohacking77.me" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  {tr.product[0]} <ExternalLink size={12} />
                </a>
              </li>
              <li><a href="#video" className="hover:text-emerald-400 transition-colors">{tr.product[1]}</a></li>
              <li><a href="#ia" className="hover:text-emerald-400 transition-colors">{tr.product[2]}</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">{tr.product[3]}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{tr.resourcesTitle}</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#guide" className="hover:text-emerald-400 transition-colors">{tr.resources[0]}</a></li>
              <li>
                <a href="https://tracker.prohacking77.me" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  {tr.resources[1]} <ExternalLink size={12} />
                </a>
              </li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">{tr.resources[2]}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{t[lang].nav.tracker}</h4>
            <a
              href="https://tracker.prohacking77.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded text-sm font-mono hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
            >
              <Radio size={14} />
              tracker.prohacking77.me
              <ExternalLink size={12} />
            </a>
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
      <VideoSection lang={lang} />
      <HybridAnalysisSection lang={lang} />
      <FeaturesSection lang={lang} />
      <GuideSection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}

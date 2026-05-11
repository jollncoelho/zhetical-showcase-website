import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  Search,
  Eye,
  Globe,
  Lock,
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
  Award,
  BadgeCheck,
  MapPin,
  BookOpen,
  Fingerprint,
} from 'lucide-react';
import './i18n/index';

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

// ── Language selector ─────────────────────────────────────────────────────────

const LANGS = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

function LangSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded text-xs font-mono hover:bg-emerald-500/15 hover:border-emerald-500/40 transition-all"
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span className="tracking-wider">{current.label}</span>
        <ChevDown size={10} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full mt-1.5 bg-[#0a0f0a] border border-emerald-500/20 rounded shadow-lg shadow-black/40 overflow-hidden z-50 min-w-[80px]"
        >
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors ${
                lang.code === i18n.language
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'text-gray-400 hover:bg-emerald-500/8 hover:text-emerald-300'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ── sub-components ────────────────────────────────────────────────────────────

function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-darker/95 backdrop-blur-md border-b border-cyber-border'
          : 'bg-transparent'
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
          {[
            { key: 'nav.enquetes', anchor: 'enquetes' },
            { key: 'nav.prevention', anchor: 'prévention' },
            { key: 'nav.tracker', anchor: 'tracker' },
            { key: 'nav.contact', anchor: 'contact' },
          ].map(({ key, anchor }) => (
            <a
              key={key}
              href={`#${anchor}`}
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm font-medium tracking-wide"
            >
              {t(key)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LangSelector />
          <a
            href="https://tracker.prohacking77.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded text-sm font-mono hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
          >
            <Radio size={14} />
            {t('nav.trackerBtn')}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  const { t } = useTranslation();
  const typingWords = t('hero.typingWords', { returnObjects: true }) as string[];
  const typed = useTypingEffect(typingWords);

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
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
        />
      ))}

      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[20vw] font-black text-emerald-500/[0.02] tracking-tighter font-mono">
          OSINT
        </span>
      </motion.div>

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">
            {t('hero.badge')}
          </span>
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
          {typed}
          <span className="typing-cursor ml-0.5">&nbsp;</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('hero.description')}
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
            {t('hero.ctaTracker')}
          </a>
          <a
            href="#enquetes"
            className="flex items-center justify-center gap-2 border border-emerald-500/30 text-emerald-400 px-8 py-3 rounded font-semibold hover:bg-emerald-500/10 transition-all"
          >
            <Search size={18} />
            {t('hero.ctaGhostint')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-8 justify-center"
        >
          {[
            { label: t('hero.stat1Label'), value: '50+' },
            { label: t('hero.stat2Label'), value: '97%' },
            { label: t('hero.stat3Label'), value: '2+' },
          ].map((stat) => (
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
        <span className="text-xs font-mono tracking-widest uppercase">{t('hero.scroll')}</span>
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

function BioText({ raw }: { raw: string }) {
  const parts = raw.split(/(<b>.*?<\/b>|<w>.*?<\/w>)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('<b>')) {
          return <span key={i} className="text-emerald-400 font-semibold">{part.slice(3, -4)}</span>;
        }
        if (part.startsWith('<w>')) {
          return <span key={i} className="text-white font-medium">{part.slice(3, -4)}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function ExpertiseBioSection() {
  const { t } = useTranslation();

  const certRows = [
    { domain: t('expertise.cert1Domain'), level: t('expertise.cert1Level'), proof: t('expertise.cert1Proof') },
    { domain: t('expertise.cert2Domain'), level: t('expertise.cert2Level'), proof: t('expertise.cert2Proof') },
    { domain: t('expertise.cert3Domain'), level: t('expertise.cert3Level'), proof: t('expertise.cert3Proof') },
  ];

  const pills = [
    { icon: <Zap size={10} />, label: t('expertise.pill1') },
    { icon: <BookOpen size={10} />, label: t('expertise.pill2') },
    { icon: <MapPin size={10} />, label: t('expertise.pill3') },
    { icon: <Crosshair size={10} />, label: t('expertise.pill4') },
    { icon: <Globe size={10} />, label: t('expertise.pill5') },
  ];

  return (
    <section id="expertise" className="py-12 px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="relative rounded-xl border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.06)] bg-[#080b08] overflow-hidden">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/10 bg-emerald-500/3">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-emerald-400/40 text-[10px] font-mono tracking-[0.3em] uppercase leading-none mb-0.5">
                    {t('expertise.passportLabel')}
                  </p>
                  <h2 className="text-2xl font-black font-mono leading-none">
                    <span className="text-white">ZH</span>
                    <span className="text-emerald-400" style={{ textShadow: '0 0 12px rgba(16,185,129,0.5)' }}>É</span>
                    <span className="text-white">TICAL</span>
                  </h2>
                </div>
                <div className="hidden sm:flex items-center gap-1 ml-4">
                  {[
                    { v: '30+', l: t('expertise.certif') },
                    { v: '20', l: t('expertise.years') },
                    { v: '9', l: t('expertise.badges') },
                  ].map((s, i) => (
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

            {/* MRZ */}
            <div className="px-6 py-1.5 border-b border-emerald-500/8 font-mono text-[9px] text-emerald-500/20 tracking-widest overflow-hidden whitespace-nowrap">
              P&lt;BEL&lt;ZHETICAL&lt;&lt;OPERATOR&lt;OSINT&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;ZHT2026BE&lt;&lt;CANCRED13165
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left — Bio */}
              <div className="px-6 py-5 border-b lg:border-b-0 lg:border-r border-emerald-500/10 space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-0.5 h-4 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400/60 text-[10px] font-mono tracking-[0.3em] uppercase">{t('expertise.profileLabel')}</span>
                </div>
                <div className="border-l-2 border-emerald-500/60 pl-3">
                  <p className="text-gray-300 leading-relaxed text-xs"><BioText raw={t('expertise.bio1')} /></p>
                </div>
                <div className="border-l-2 border-emerald-500/30 pl-3">
                  <p className="text-gray-400 leading-relaxed text-xs"><BioText raw={t('expertise.bio2')} /></p>
                </div>
                <div className="border-l-2 border-emerald-500/15 pl-3">
                  <p className="text-gray-400 leading-relaxed text-xs"><BioText raw={t('expertise.bio3')} /></p>
                </div>
                <div className="border-l-2 border-emerald-500/8 pl-3">
                  <p className="text-gray-400 leading-relaxed text-xs"><BioText raw={t('expertise.bio4')} /></p>
                </div>
              </div>

              {/* Right — Certs + Badges + CTA */}
              <div className="px-6 py-5 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-0.5 h-4 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400/60 text-[10px] font-mono tracking-[0.3em] uppercase">{t('expertise.certsLabel')}</span>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-emerald-500/15">
                      <th className="text-left text-emerald-400/60 font-mono text-[10px] tracking-wider pb-2 pr-4">{t('expertise.certDomain')}</th>
                      <th className="text-left text-emerald-400/60 font-mono text-[10px] tracking-wider pb-2 pr-4">{t('expertise.certLevel')}</th>
                      <th className="text-left text-emerald-400/60 font-mono text-[10px] tracking-wider pb-2">{t('expertise.certProof')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certRows.map((row, i) => (
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
                  {pills.map((p) => (
                    <span key={p.label} className="inline-flex items-center gap-1 bg-emerald-500/5 border border-emerald-500/15 text-emerald-400/60 text-[10px] font-mono px-2 py-0.5 rounded-full">
                      {p.icon}{p.label}
                    </span>
                  ))}
                </div>

                {/* Badge images */}
                <div className="flex items-center justify-around gap-4 pt-1 border-t border-emerald-500/10">
                  <img src="https://i.postimg.cc/PNxVSNgV/00openbadge-OZ-2026-VLAMZF.png" alt="Oscar Zulu — Permis d'Osinter" className="h-20 w-20 object-contain rounded-full hover:scale-105 transition-transform duration-200" />
                  <img src="https://i.postimg.cc/14t7v4k2/03-photo-2026-02-23-03-15-49.jpg" alt="Trace Labs CTF Participant" className="h-20 w-20 object-contain rounded hover:scale-105 transition-transform duration-200" />
                  <img src="https://i.postimg.cc/JtnYptfS/06-photo-2024-08-16-13-55-19.jpg" alt="ExorciseThat Cybersecurity" className="h-20 w-20 object-contain rounded-full hover:scale-105 transition-transform duration-200" />
                </div>

                {/* CTA */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-500/10">
                  <a
                    href="https://passport.cancred.ca/app/profile/13165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-500 text-black px-4 py-2 rounded font-black text-xs hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  >
                    <BadgeCheck size={12} />
                    {t('expertise.ctaCanCred')}
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
                    {t('expertise.ctaContact')}
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

function EnquetesSection() {
  const { t } = useTranslation();

  const features = [
    { icon: <Search className="text-emerald-400" size={20} />, title: t('enquetes.f1Title'), desc: t('enquetes.f1Desc') },
    { icon: <Globe className="text-emerald-400" size={20} />, title: t('enquetes.f2Title'), desc: t('enquetes.f2Desc') },
    { icon: <Database className="text-emerald-400" size={20} />, title: t('enquetes.f3Title'), desc: t('enquetes.f3Desc') },
    { icon: <Activity className="text-emerald-400" size={20} />, title: t('enquetes.f4Title'), desc: t('enquetes.f4Desc') },
  ];

  return (
    <section id="enquetes" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-emerald-500" />
            <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">{t('enquetes.sectionLabel')}</span>
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            {t('enquetes.title1')}<br />
            <span className="text-emerald-400">{t('enquetes.title2')}</span>
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-5">{t('enquetes.p1')}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-10">{t('enquetes.p2')}</p>
          <a
            href="mailto:jose@prohacking77.me"
            className="inline-flex items-center gap-2 border border-emerald-500/40 text-emerald-400 px-6 py-3 rounded font-mono text-sm hover:bg-emerald-500/10 transition-all"
          >
            <Mail size={15} />
            {t('enquetes.cta')}
          </a>
        </AnimatedSection>

        <div className="flex flex-col gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 bg-cyber-card border border-cyber-border rounded-lg p-5"
            >
              <div className="w-10 h-10 flex-shrink-0 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                {f.icon}
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

function PreventionSection() {
  const { t } = useTranslation();

  const platforms = [
    {
      name: 'Roblox',
      icon: <Shield className="text-red-400" size={24} />,
      color: 'from-red-900/20 to-transparent',
      border: 'border-red-500/20',
      accent: 'text-red-400',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      desc: t('prevention.robloxDesc'),
      threats: t('prevention.robloxThreats', { returnObjects: true }) as string[],
    },
    {
      name: 'Discord',
      icon: <Users className="text-blue-400" size={24} />,
      color: 'from-blue-900/20 to-transparent',
      border: 'border-blue-500/20',
      accent: 'text-blue-400',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      desc: t('prevention.discordDesc'),
      threats: t('prevention.discordThreats', { returnObjects: true }) as string[],
    },
  ];

  const steps = [
    { step: '01', icon: <Search size={20} />, title: t('prevention.step1Title'), desc: t('prevention.step1Desc') },
    { step: '02', icon: <Eye size={20} />, title: t('prevention.step2Title'), desc: t('prevention.step2Desc') },
    { step: '03', icon: <Database size={20} />, title: t('prevention.step3Title'), desc: t('prevention.step3Desc') },
    { step: '04', icon: <Send size={20} />, title: t('prevention.step4Title'), desc: t('prevention.step4Desc') },
  ];

  return (
    <section id="prévention" className="py-32 px-6 bg-cyber-darker/50">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionLabel>{t('prevention.sectionLabel')}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            {t('prevention.title1')}{' '}
            <span className="text-emerald-400">{t('prevention.title2')}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-16 leading-relaxed">
            {t('prevention.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {platforms.map((p, i) => (
            <AnimatedSection key={p.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`bg-gradient-to-b ${p.color} border ${p.border} rounded-xl p-8`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-cyber-card border border-cyber-border rounded-lg flex items-center justify-center">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${p.accent}`}>{p.name}</h3>
                    <span className={`text-xs border rounded-full px-2 py-0.5 ${p.badge}`}>
                      {t('prevention.activeBadge')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-3 font-mono">
                    {t('prevention.threatsLabel')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.threats.map((threat) => (
                      <span
                        key={threat}
                        className="flex items-center gap-1.5 text-xs text-gray-400 bg-cyber-card border border-cyber-border rounded px-2 py-1"
                      >
                        <AlertTriangle size={10} className="text-yellow-500" />
                        {threat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <h3 className="text-2xl font-bold text-white mb-10 text-center">
            {t('prevention.processTitle')}
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-0 relative">
            {steps.map((item, i) => (
              <div key={item.step} className="flex flex-col md:flex-row items-center flex-1">
                <div className="flex flex-col items-center text-center px-4 py-4 flex-1">
                  <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mb-3">
                    {item.icon}
                  </div>
                  <span className="text-emerald-500/50 text-xs font-mono mb-1">{item.step}</span>
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

function TrackerSection() {
  const { t } = useTranslation();
  const pills = t('tracker.pills', { returnObjects: true }) as string[];

  return (
    <section id="tracker" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <AnimatedSection>
          <SectionLabel>{t('tracker.sectionLabel')}</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            {t('tracker.title1')} <span className="text-emerald-400">{t('tracker.title2')}</span> {t('tracker.title3')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('tracker.desc')}
          </p>
          <a
            href="https://tracker.prohacking77.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-emerald-500 text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 mb-4"
          >
            <Activity size={22} />
            {t('tracker.cta')}
            <ExternalLink size={16} />
          </a>
          <p className="text-gray-600 text-sm font-mono mb-12">{t('tracker.subtext')}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {pills.map((pill) => (
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

function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="border-t border-cyber-border bg-cyber-darker py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <span className="font-mono font-bold tracking-widest text-xl block mb-4">
              <span className="text-white">ZH</span><span className="text-emerald-400">É</span><span className="text-white">TICAL</span>
            </span>
            <p className="text-gray-500 text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              {t('footer.servicesTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#enquetes" className="hover:text-emerald-400 transition-colors">{t('footer.service1')}</a></li>
              <li><a href="#prévention" className="hover:text-emerald-400 transition-colors">{t('footer.service2')}</a></li>
              <li>
                <a href="https://tracker.prohacking77.me" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  {t('footer.service3')} <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              {t('footer.contactTitle')}
            </h4>
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
          <p className="text-gray-600 text-xs font-mono">{t('footer.rights')}</p>
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t('footer.operational')}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-cyber-dark min-h-screen">
      <Navbar />
      <HeroSection />
      <EnquetesSection />
      <PreventionSection />
      <TrackerSection />
      <ExpertiseBioSection />
      <Footer />
    </div>
  );
}

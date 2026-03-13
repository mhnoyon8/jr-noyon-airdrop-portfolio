'use client';

import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Coins,
  Mail,
  MessageCircle,
  Pause,
  Play,
  Shield,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { activeHunts, articles, portfolio, testimonials, tickerItems } from '@/data/content';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const sectionReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const countRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(countRef, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (shouldReduceMotion) {
      setV(to);
      return;
    }

    if (!isInView) return;

    const t = setInterval(() => {
      setV((prev) => {
        const next = prev + Math.ceil(to / 30);
        if (next >= to) {
          clearInterval(t);
          return to;
        }
        return next;
      });
    }, 25);

    return () => clearInterval(t);
  }, [to, shouldReduceMotion, isInView]);

  return (
    <span ref={countRef} className="font-mono" aria-live="off">
      {v}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2
  });

  const particles = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({ id: i, left: `${(i * 7) % 100}%`, delay: i * 0.25 })),
    []
  );


  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [contactFeedback, setContactFeedback] = useState('');

  const sectionNavItems = useMemo(
    () => [
      ['about', 'About'],
      ['portfolio', 'Portfolio'],
      ['hunts', 'Hunts'],
      ['services', 'Services'],
      ['contact', 'Contact']
    ] as const,
    []
  );

  const goToPrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (shouldReduceMotion || isTestimonialPaused) return;

    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isTestimonialPaused, testimonials.length]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionElements = sectionNavItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sectionElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.2, 0.45, 0.65]
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionNavItems]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const mailtoSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:your@email.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setContactFeedback('Thanks! Your email app should open with this message draft.');
  };

  return (
    <main className="bg-background min-h-screen overflow-x-hidden relative">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:border focus:border-accent focus:text-textPrimary"
      >
        Skip to main content
      </a>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ scaleX: progressScaleX }}
      />

      <section className="relative min-h-screen flex items-center border-b border-white/10 bg-mesh overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background/70 to-background"
          animate={shouldReduceMotion ? { opacity: 0.9 } : { opacity: [0.75, 1, 0.75] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
          animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, 30, 0], y: [0, 20, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
          animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, -35, 0], y: [0, -20, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {!shouldReduceMotion && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full bg-accent/70"
            style={{ left: p.left, top: '110%' }}
            animate={{ y: [-20, -760], opacity: [0, 0.8, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          />
        ))}

        <div className="section-wrap relative z-10 py-16">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="inline-flex items-center gap-3 mb-5 glass rounded-full px-4 py-2.5 border border-secondary/40 shadow-glow">
            <img src="/aether-logo.jpg" alt="Aether logo" width="44" height="44" className="rounded-full object-cover border-2 border-accent/70" />
            <span className="text-sm text-textPrimary font-medium">Powered by Aether</span>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" animate="show" className="text-accent font-mono mb-4">
            Crypto Airdrop Portfolio
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold [font-family:var(--font-space)] leading-tight"
          >
            Strategic Crypto Airdrop Hunter
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="text-textSecondary mt-4 text-lg"
          >
            Identifying high-potential airdrops before they drop.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="mt-3 text-2xl md:text-3xl font-semibold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent"
          >
            Jr Noyon
          </motion.p>

          <motion.div className="mt-8 flex gap-3 flex-wrap" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
            <a href="#portfolio" className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-glow hover:-translate-y-0.5 transition duration-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80">See Winning Airdrop Portfolio</a>
            <a href="#contact" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 hover:-translate-y-0.5 transition duration-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80">Book Strategy Call</a>
          </motion.div>

          <motion.div className="mt-4 flex flex-wrap gap-2" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.48 }}>
            {['Proof-based Workflow', 'Security-first Method', 'Community Trusted'].map((b) => (
              <span key={b} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-white/20 bg-white/5 text-textSecondary">
                <CircleCheck className="w-3.5 h-3.5 text-accent" /> {b}
              </span>
            ))}
          </motion.div>

          <div className="grid grid-cols-3 gap-3 mt-12">
            {[
              ['26', 'Airdrops Claimed'],
              ['130+', 'Projects Tracked'],
              ['78', 'Success Rate %']
            ].map((s) => (
              <div key={s[1]} className="glass rounded-xl p-4 text-center">
                <p className="text-xl md:text-2xl font-bold [font-family:var(--font-mono)]">{s[0]}</p>
                <p className="text-xs md:text-sm text-textSecondary">{s[1]}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-textSecondary" animate={shouldReduceMotion ? { y: 0 } : { y: [0, 8, 0] }} transition={shouldReduceMotion ? { duration: 0 } : { repeat: Infinity, duration: 1.8 }}>
          <ArrowDown />
        </motion.a>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] overflow-hidden">
        <motion.div
          className="whitespace-nowrap py-3 text-sm text-textSecondary [font-family:var(--font-mono)]"
          animate={shouldReduceMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={`${item}-${i}`} className="mx-6 inline-block">
              {item}
            </span>
          ))}
        </motion.div>
      </section>

      <nav
        aria-label="Section navigation"
        className="sticky top-2 z-30 section-wrap py-4"
      >
        <div className="glass rounded-full border border-white/15 p-1.5 flex flex-wrap gap-1.5 w-fit mx-auto">
          {sectionNavItems.map(([id, label]) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                    : 'text-textSecondary hover:text-textPrimary hover:bg-white/10'
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>

      <section id="about" className="section-wrap py-20 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold [font-family:var(--font-space)]">Who Am I?</h2>
            <p className="mt-4 text-textSecondary">
              I’m Jr Noyon — a crypto airdrop hunter focused on high-signal opportunities. I use a structured, risk-managed strategy across testnets, mainnets, and ecosystem engagement.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="glass rounded-xl p-4"><p className="text-xl"><CountUp to={4} suffix="+" /></p><p className="text-xs text-textSecondary">Years Experience</p></div>
              <div className="glass rounded-xl p-4"><p className="text-xl"><CountUp to={26} /></p><p className="text-xs text-textSecondary">Successful Claims</p></div>
              <div className="glass rounded-xl p-4"><p className="text-xl"><CountUp to={130} suffix="+" /></p><p className="text-xs text-textSecondary">Projects Tracked</p></div>
              <div className="glass rounded-xl p-4"><p className="text-xl"><CountUp to={78} suffix="%" /></p><p className="text-xs text-textSecondary">Hit Rate</p></div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-[1px]" />
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="section-wrap py-20 scroll-mt-24">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Track Record</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {portfolio.map((p) => (
            <motion.div
              key={p[0]}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
              className="glass rounded-xl p-5 hover:shadow-glow transition-transform duration-300"
            >
              <p className="font-semibold">{p[0]}</p>
              <p className="text-sm text-textSecondary">{p[1]} • {p[2]}</p>
              <p className="text-sm mt-2 text-textSecondary">{p[3]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="hunts" className="section-wrap py-20 scroll-mt-24">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Active Hunts</h2>
        <div className="space-y-4">
          {activeHunts.map((h, idx) => (
            <motion.div key={h[0]} className="glass rounded-xl p-4" variants={sectionReveal} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.08 }}>
              <div className="flex justify-between text-sm"><span>{h[0]}</span><span className="text-accent">{h[2]}</span></div>
              <div className="mt-2 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${h[1]}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-textSecondary mt-3">Last updated: just now</p>
      </section>

      <section className="section-wrap py-20">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Strategies & Tools</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            [Wallet, 'Testnet Participation'],
            [TrendingUp, 'Mainnet Interaction'],
            [MessageCircle, 'Community Engagement'],
            [BarChart3, 'On-chain Analysis']
          ].map(([Icon, title]) => {
            const C = Icon as any;
            return <div key={title as string} className="glass rounded-xl p-4"><C className="text-secondary mb-2" /><p>{title as string}</p></div>;
          })}
        </div>
        <p className="text-textSecondary text-sm">Tools: Dune, DeBank, DefiLlama, Discord alpha channels, Twitter/X monitoring, wallet segmentation.</p>
      </section>

      <section id="services" className="section-wrap py-20 scroll-mt-24">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Services</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {['Airdrop Hunting Consultation', 'Wallet Setup & Security', 'Strategy Planning'].map((s) => (
            <div key={s} className="glass rounded-xl p-5 hover:shadow-glow transition">
              <p className="font-semibold">{s}</p>
              <p className="text-sm text-textSecondary mt-2">Contact for quote</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap py-20">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Blog & Insights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {articles.map((a) => (
            <div key={a} className="glass rounded-xl p-5"><p className="font-semibold">{a}</p><button className="mt-4 text-secondary text-sm">Read more →</button></div>
          ))}
        </div>
      </section>

      <section className="section-wrap py-20">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Testimonials</h2>
        <div
          className="max-w-3xl mx-auto"
          tabIndex={0}
          aria-label="Testimonials carousel"
          onMouseEnter={() => setIsTestimonialPaused(true)}
          onMouseLeave={() => setIsTestimonialPaused(false)}
          onFocus={() => setIsTestimonialPaused(true)}
          onBlur={() => setIsTestimonialPaused(false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') goToPrevTestimonial();
            if (e.key === 'ArrowRight') goToNextTestimonial();
          }}
        >
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-6 text-center"
            aria-live="polite"
          >
            <p className="text-base md:text-lg text-textSecondary">{testimonials[activeTestimonial][0]}</p>
            <p className="mt-4 text-sm text-accent">— {testimonials[activeTestimonial][1]}</p>
          </motion.div>

          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={goToPrevTestimonial}
              aria-label="Previous testimonial"
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsTestimonialPaused((prev) => !prev)}
              aria-label={isTestimonialPaused ? 'Resume autoplay' : 'Pause autoplay'}
              aria-pressed={isTestimonialPaused}
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
            >
              {isTestimonialPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={goToNextTestimonial}
              aria-label="Next testimonial"
              className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                aria-pressed={activeTestimonial === i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 ${activeTestimonial === i ? 'w-8 bg-accent' : 'w-2.5 bg-white/25'}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-wrap py-20 scroll-mt-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-bold [font-family:var(--font-space)]">Contact</h2>
            <div className="mt-4 space-y-2 text-textSecondary text-sm">
              <a
                href="mailto:your@email.com"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                aria-label="Send email to Jr Noyon"
              >
                <Mail className="w-4 h-4" />
                <span>Email: <span className="group-hover:text-accent transition">your@email.com</span></span>
              </a>
              <a
                href="https://t.me/yourhandle"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                aria-label="Open Telegram profile"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Telegram: <span className="group-hover:text-accent transition">@yourhandle</span></span>
              </a>
              <a
                href="https://x.com/yourhandle"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                aria-label="Open Twitter/X profile"
              >
                <Bell className="w-4 h-4" />
                <span>Twitter/X: <span className="group-hover:text-accent transition">@yourhandle</span></span>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
                aria-label="Open Discord"
              >
                <Coins className="w-4 h-4" />
                <span>Discord: <span className="group-hover:text-accent transition">yourdiscord#0001</span></span>
              </a>
            </div>
          </div>
          <form className="glass rounded-2xl p-6 space-y-3" aria-labelledby="contact-form-title" onSubmit={handleContactSubmit}>
            <h3 id="contact-form-title" className="sr-only">Contact form</h3>

            <label className="block text-sm text-textSecondary" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-secondary"
            />

            <label className="block text-sm text-textSecondary" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-secondary"
            />

            <label className="block text-sm text-textSecondary" htmlFor="contact-subject">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              autoComplete="off"
              required
              placeholder="What is this about?"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-secondary"
            />

            <label className="block text-sm text-textSecondary" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Write your message"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-secondary"
            />

            <p className="text-xs text-textSecondary" id="contact-note" aria-live="polite">
              {contactFeedback || 'All fields are required.'}
            </p>
            <button
              type="submit"
              aria-describedby="contact-note"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <motion.button
        type="button"
        onClick={handleBackToTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 z-40 h-11 w-11 rounded-full border border-white/20 bg-background/80 backdrop-blur-md text-textPrimary shadow-lg hover:shadow-glow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
        initial={false}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.9, pointerEvents: showBackToTop ? 'auto' : 'none' }}
        transition={{ duration: 0.22 }}
      >
        <ArrowUp className="w-5 h-5 mx-auto" />
      </motion.button>

      <footer className="border-t border-white/10 py-8">
        <div className="section-wrap flex flex-col md:flex-row justify-between gap-3 text-sm text-textSecondary">
          <p>© 2024 Jr Noyon. All rights reserved.</p>
          <p className="flex items-center gap-2"><Shield className="w-4 h-4" />Crypto involves risk. Always DYOR and manage wallet exposure.</p>
          <p className="text-accent">Built for Web3 opportunities.</p>
        </div>
      </footer>
    </main>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  ArrowDown,
  BarChart3,
  Bell,
  CircleCheck,
  Coins,
  Mail,
  MessageCircle,
  Shield,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
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
  }, [to]);
  return <span className="font-mono">{v}{suffix}</span>;
}

export default function HomePage() {
  const particles = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({ id: i, left: `${(i * 7) % 100}%`, delay: i * 0.25 })),
    []
  );

  const portfolio = [
    ['Uniswap', '2020', '$3,500+', 'Early DEX usage + wallet activity'],
    ['Optimism', '2022', '$2,200+', 'Mainnet transactions + governance awareness'],
    ['Arbitrum', '2023', '$4,000+', 'Bridge + protocol interactions'],
    ['Celestia', '2023', '$1,800+', 'Testnet + ecosystem participation'],
    ['LayerZero', 'Placeholder', '$TBD', 'Cross-chain strategy'],
    ['Scroll', 'Placeholder', '$TBD', 'zkEVM ecosystem farming'],
    ['ZKsync', 'Placeholder', '$TBD', 'Consistent network activity']
  ];

  const activeHunts = [
    ['Monad Ecosystem', 65, 'Testing Phase'],
    ['Layer 2 Retroactive', 80, 'Mainnet Pending'],
    ['DeFi Protocol Wave', 45, 'Testing Phase'],
    ['Omnichain Wallet Quest', 92, 'Claim Ready']
  ];

  const articles = [
    'Top 5 Airdrops to Watch in 2024',
    'How to Avoid Airdrop Scams',
    'My Airdrop Farming Setup'
  ];

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <section className="relative min-h-screen flex items-center border-b border-white/10 bg-mesh">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background/70 to-background" />

        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full bg-accent/70"
            style={{ left: p.left, top: '110%' }}
            animate={{ y: [-20, -760], opacity: [0, 0.8, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: p.delay, ease: 'linear' }}
          />
        ))}

        <div className="section-wrap relative z-10 py-16">
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

          <motion.div className="mt-8 flex gap-3" variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
            <a href="#portfolio" className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition">View Portfolio</a>
            <a href="#contact" className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">Contact Me</a>
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

        <motion.a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-textSecondary" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown />
        </motion.a>
      </section>

      <section id="about" className="section-wrap py-20">
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

      <section id="portfolio" className="section-wrap py-20">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Track Record</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {portfolio.map((p) => (
            <motion.div key={p[0]} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="glass rounded-xl p-5 hover:-translate-y-1 hover:shadow-glow transition">
              <p className="font-semibold">{p[0]}</p>
              <p className="text-sm text-textSecondary">{p[1]} • {p[2]}</p>
              <p className="text-sm mt-2 text-textSecondary">{p[3]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-wrap py-20">
        <h2 className="text-3xl font-bold [font-family:var(--font-space)] mb-8">Active Hunts</h2>
        <div className="space-y-4">
          {activeHunts.map((h) => (
            <div key={h[0]} className="glass rounded-xl p-4">
              <div className="flex justify-between text-sm"><span>{h[0]}</span><span className="text-accent">{h[2]}</span></div>
              <div className="mt-2 w-full bg-white/10 rounded-full h-2 overflow-hidden"><div className="h-2 bg-gradient-to-r from-primary to-secondary" style={{ width: `${h[1]}%` }} /></div>
            </div>
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

      <section className="section-wrap py-20">
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
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ['“Jr spots opportunities early with a disciplined method.”', 'Alpha Community Lead'],
            ['“Great balance between aggression and wallet security.”', 'DeFi Researcher'],
            ['“Consistent process, clear execution.”', 'Protocol Growth Contributor']
          ].map((t) => (
            <div key={t[0]} className="glass rounded-xl p-5"><p className="text-sm text-textSecondary">{t[0]}</p><p className="mt-3 text-xs text-accent">— {t[1]}</p></div>
          ))}
        </div>
      </section>

      <section id="contact" className="section-wrap py-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-3xl font-bold [font-family:var(--font-space)]">Contact</h2>
            <div className="mt-4 space-y-2 text-textSecondary text-sm">
              <p><Mail className="inline w-4 h-4 mr-2" />Email: your@email.com</p>
              <p><MessageCircle className="inline w-4 h-4 mr-2" />Telegram: @yourhandle</p>
              <p><Bell className="inline w-4 h-4 mr-2" />Twitter/X: @yourhandle</p>
              <p><Coins className="inline w-4 h-4 mr-2" />Discord: yourdiscord#0001</p>
            </div>
          </div>
          <form className="glass rounded-2xl p-6 space-y-3" aria-labelledby="contact-form-title">
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

            <p className="text-xs text-textSecondary" id="contact-note">All fields are required.</p>
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

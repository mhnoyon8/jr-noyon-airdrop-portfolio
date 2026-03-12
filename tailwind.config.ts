import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B21A8',
        secondary: '#3B82F6',
        accent: '#FBBF24',
        background: '#0F172A',
        surface: '#1E293B',
        textPrimary: '#FFFFFF',
        textSecondary: '#94A3B8'
      },
      boxShadow: {
        glow: '0 0 24px rgba(59,130,246,0.35)',
        card: '0 10px 30px rgba(15,23,42,0.35)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(at 20% 20%, rgba(107,33,168,0.28) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(59,130,246,0.28) 0px, transparent 50%), radial-gradient(at 50% 80%, rgba(251,191,36,0.12) 0px, transparent 50%)'
      }
    }
  },
  plugins: []
};

export default config;


import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Building2, 
  CreditCard, 
  Landmark, 
  LineChart, 
  ShieldCheck, 
  Globe, 
  Search, 
  Menu, 
  X, 
  Calculator, 
  Bot, 
  ArrowRight,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Wallet,
  PieChart,
  Users,
  Briefcase,
  Lock,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Sun,
  Moon,
  Star,
  Download,
  HelpCircle,
  ChevronDown,
  Phone,
  Mail,
  Coins,
  Send,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ALL_BANKS, ALL_PRODUCTS, CURRENCIES } from './constants';
import { Bank, Product, ProductType, Region, ChatMessage } from './types';
import { getFinancialAdvice } from './services/geminiService';

// Local Stock type for market components
type Stock = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  marketCap?: number | string;
};

// --- COMPONENTS ---

// 1. Navigation
const Navbar = ({ activeTab, setActiveTab, toggleMenu, isDark, toggleTheme }: any) => (
<nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-finance-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex items-center justify-between h-20">
<div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
F
</div>
<span className="text-2xl font-display font-bold text-gray-900 dark:text-white">
FintrivX
</span>
</div>


<div className="hidden lg:flex items-center gap-1">
{[
{ id: 'home', label: 'Dashboard' },
{ id: 'stocks', label: 'Live Stocks' },
{ id: 'banks', label: 'Bank Explorer' },
{ id: 'loans', label: 'Loan Centre' },
{ id: 'cards', label: 'Cards' },
{ id: 'tools', label: 'Tools' },
{ id: 'assistant', label: 'AI Coach' },
{ id: 'about', label: 'About Us' } // NEW NAV ITEM
].map((item) => (
<button
key={item.id}
onClick={() => setActiveTab(item.id)}
className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
activeTab === item.id
? 'bg-blue-50 text-blue-600 dark:bg-neon-blue/20 dark:text-neon-blue font-bold'
: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
}`}
>
{item.label}
</button>
))}


<div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-2"></div>


<button
onClick={toggleTheme}
className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
>
{isDark ? <Sun size={20} /> : <Moon size={20} />}
</button>
</div>


<div className="lg:hidden flex items-center gap-4">
<button
onClick={toggleTheme}
className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
>
{isDark ? <Sun size={20} /> : <Moon size={20} />}
</button>
<button onClick={toggleMenu} className="text-gray-900 dark:text-gray-300 p-2">
<Menu size={24} />
</button>
</div>
</div>
</div>
</nav>
);

// 2. Mobile Menu
const MobileMenu = ({ isOpen, closeMenu, activeTab, setActiveTab }: any) => {
if (!isOpen) return null;
return (
<div className="fixed inset-0 z-50 bg-white dark:bg-finance-dark/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6">
<button onClick={closeMenu} className="absolute top-6 right-6 text-gray-900 dark:text-white">
<X size={32} />
</button>


{[
{ id: 'home', label: 'Dashboard' },
{ id: 'stocks', label: 'Live Stock Market' },
{ id: 'banks', label: 'Global Banks' },
{ id: 'loans', label: 'Loan Center' },
{ id: 'cards', label: 'Cards & Rewards' },
{ id: 'tools', label: 'Financial Tools' },
{ id: 'assistant', label: 'AI Coach' },
{ id: 'about', label: 'About Us' } // NEW
].map((item) => (
<button
key={item.id}
onClick={() => { setActiveTab(item.id); closeMenu(); }}
className={`text-left py-4 text-xl font-medium border-b border-gray-100 dark:border-white/10 ${
activeTab === item.id ? 'text-blue-600 dark:text-neon-blue' : 'text-gray-800 dark:text-gray-300'
}`}
>
{item.label}
</button>
))}
</div>
);
};

// 3. Home Dashboard
const HomeDashboard = ({ setActiveTab }: any) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-50 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Finance Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/80 via-white/60 to-slate-50 dark:from-[#020617]/80 dark:via-[#020617]/70 dark:to-[#020617]"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 text-blue-800 dark:bg-neon-blue/10 dark:border dark:border-neon-blue/20 dark:text-neon-blue mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 dark:bg-neon-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-neon-blue"></span>
            </span>
            <span className="text-sm font-bold tracking-wide uppercase">Tracking 300+ Banks Across 75 Countries</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-tight text-gray-900 dark:text-white drop-shadow-sm">
            <span className="block">Universal Financial</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-teal-600 dark:from-neon-blue dark:via-purple-400 dark:to-emerald-400">Intelligence Portal</span>
          </h1>
          <p className="text-xl text-gray-800 dark:text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Welcome to <span className="font-bold text-blue-600 dark:text-neon-blue">FintrivX</span>. The world's most comprehensive financial decision engine. Compare global interest rates, track live bank stocks, and get personalized AI investment advice—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('banks')}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-neon-blue dark:hover:bg-blue-600 text-white font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group"
            >
              Explore Banks <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveTab('stocks')}
              className="px-8 py-4 rounded-xl bg-white/90 text-gray-900 border border-gray-200 hover:bg-white dark:bg-white/10 dark:text-white dark:border-white/10 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm font-bold shadow-sm"
            >
              <TrendingUp size={20} /> Live Market
            </button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-6xl mx-auto">
          {[
            { label: 'Banks Indexed', val: '300+', icon: Landmark, color: 'text-emerald-500' },
            { label: 'Loan Products', val: '2.5k+', icon: Wallet, color: 'text-purple-500' },
            { label: 'Countries', val: '75+', icon: Globe, color: 'text-blue-500' },
            { label: 'Active Users', val: '1M+', icon: Users, color: 'text-amber-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-none">
              <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.val}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-10 border-y border-gray-200 dark:border-white/5 bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted Data Sources & Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['Forbes Finance', 'Bloomberg', 'Reuters', 'TechCrunch', 'The Wall Street Journal'].map((brand, i) => (
              <span key={i} className="text-xl md:text-2xl font-display font-bold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-neon-blue cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Visual Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
             Everything You Need to <span className="text-blue-600 dark:text-neon-blue">Master Finance</span>
           </h2>
           <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
             Stop opening 20 tabs to compare rates. FintrivX aggregates everything into one beautiful, intelligent dashboard.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Global Banking Index", 
              desc: "Deep profiles of top banks from USA, UK, India, and 70+ nations. Analyze assets, compliance ratings, and digital capabilities.",
              icon: Globe,
              action: () => setActiveTab('banks'),
              img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
            },
            { 
              title: "Smart Loan Engine", 
              desc: "Compare Home, Car, and Business loans with our advanced EMI calculator and amortization visuals.",
              icon: Calculator,
              action: () => setActiveTab('loans'),
              img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600"
            },
            { 
              title: "Live Stock Market", 
              desc: "Track real-time share prices of major global banks with our interactive ticker and market analysis tools.",
              icon: Activity,
              action: () => setActiveTab('stocks'),
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R5ka4ae5_j-PoZ4NiYhCWOWr3MV7GFQaDSfx1Rly1D0mp0uAU3iCfb31XtEctWNlIO4&usqp=CAU"
            },
            { 
              title: "AI Financial Coach", 
              desc: "Powered by Gemini AI, get instant answers to complex financial questions. 'Is now a good time to buy a house?'",
              icon: Bot,
              action: () => setActiveTab('assistant'),
              img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=600"
            },
            { 
              title: "Credit Card Optimizer", 
              desc: "Find cards with the best rewards, lounge access, and lowest fees tailored to your spending lifestyle.",
              icon: CreditCard,
              action: () => setActiveTab('cards'),
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSohKnBC6k9f1ry9KIxehQGqOFa_W9Z7eFSnQ&s"
            },
            { 
              title: "Business Intelligence", 
              desc: "Specialized tools for SMEs and Startups. Compare working capital loans and trade finance options.",
              icon: Briefcase,
              action: () => setActiveTab('tools'),
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" onClick={feature.action}>
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/90 dark:bg-neon-blue/20 backdrop-blur-md text-white dark:text-neon-blue">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{feature.desc}</p>
                <div className="flex items-center text-blue-600 dark:text-neon-blue text-sm font-bold group-hover:translate-x-2 transition-transform">
                  Explore Now <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Details */}
      <div className="bg-gray-50 dark:bg-slate-900/50 py-24">
         <div className="max-w-7xl mx-auto px-4 space-y-24">
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1 space-y-6">
                  <div className="inline-block p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Global Banking at Your Fingertips</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Navigate the complex world of international finance with ease. Access detailed data on assets, branch networks, and stability ratings for banks from New York to Tokyo.
                  </p>
                  <ul className="space-y-3">
                    {['Real-time Asset Data', 'Compliance Ratings (AAA to B)', 'Direct Application Links'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={18} className="text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-blue-600 blur-[60px] opacity-20 rounded-full"></div>
                  <img src="https://storage.googleapis.com/cake-prd-website/homepage/ngan_hang_so_1_eb1f50b739/ngan_hang_so_1_eb1f50b739.jpeg" alt="Global Finance" className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-xl "    />
               </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
               <div className="flex-1 space-y-6">
                  <div className="inline-block p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <Bot size={24} />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white">AI-Powered Decision Making</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    Unsure which loan is right for you? Our Gemini-powered AI coach analyzes your requirements against thousands of products to give tailored advice.
                  </p>
               </div>
               <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-purple-600 blur-[60px] opacity-20 rounded-full"></div>
                  <img src="https://a.storyblok.com/f/47007/1200x628/14ef84dcfe/sea-banking-meta.png" alt="AI Analytics" className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-2xl shadow-xl "  />
               </div>
            </div>
         </div>
      </div>

      {/* Regional Spotlights */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-display font-bold mb-12 flex items-center gap-3 text-gray-900 dark:text-white">
          <MapPin className="text-blue-600 dark:text-neon-blue" /> 
          <span>Regional Banking Powerhouses</span>
        </h2>
        
        <div className="space-y-12">
          {/* USA Section */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-200 dark:border-white/10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <img src="https://flagcdn.com/w40/us.png" alt="USA" className="rounded-sm shadow-sm" /> 
                    United States & California
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Wall Street giants & Silicon Valley innovators</p>
                </div>
                <button onClick={() => setActiveTab('banks')} className="text-sm text-blue-600 dark:text-neon-blue hover:underline transition-colors">View All &rarr;</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {['JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'Silicon Valley Bank', 'Citigroup'].map(name => (
                  <div key={name} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-center border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold mb-3">
                      {name[0]}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* India Section */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-200 dark:border-white/10 relative overflow-hidden shadow-xl">
             <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-[80px]" />
             <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <img src="https://flagcdn.com/w40/in.png" alt="India" className="rounded-sm shadow-sm" /> 
                    India
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Fastest growing fintech market leaders</p>
                </div>
                <button onClick={() => setActiveTab('banks')} className="text-sm text-blue-600 dark:text-neon-blue hover:underline transition-colors">View All &rarr;</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'].map(name => (
                  <div key={name} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-center border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="w-10 h-10 mx-auto rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold mb-3">
                      {name[0]}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "Is the data on FintrivX real-time?", a: "Yes, we update our interest rates and bank data daily through direct APIs with partner institutions." },
            { q: "Do you charge fees for loan applications?", a: "No, FintrivX is completely free for users. We may earn a small commission from banks when your loan is approved." },
            { q: "How secure is my data?", a: "We use bank-grade 256-bit encryption. We do not store your personal financial details; we only process them for comparisons." },
            { q: "Can I apply for loans in other countries?", a: "Yes, our 'Global Banking' section helps expats and businesses find loans in over 75 countries." }
          ].map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                <ChevronDown size={20} className={`transform transition-transform text-gray-500 ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 py-4 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security & Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#020617] pt-16 pb-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">F</div>
                 <span className="text-xl font-bold text-gray-900 dark:text-white">FintrivX</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                FintrivX - The Universal Financial Intelligence & Decision Assistant. 
                We provide transparent, unbiased data to help you make the best financial decisions. 
                Data is updated daily from official banking sources.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"><Twitter size={18} /></a>
                <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"><Facebook size={18} /></a>
                <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-blue-100 dark:hover:bg-white/10 text-gray-600 dark:text-white transition-colors"><Instagram size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><button onClick={() => setActiveTab('banks')} className="hover:text-blue-600 dark:hover:text-neon-blue">Global Banks</button></li>
                <li><button onClick={() => setActiveTab('loans')} className="hover:text-blue-600 dark:hover:text-neon-blue">Loan Comparisons</button></li>
                <li><button onClick={() => setActiveTab('cards')} className="hover:text-blue-600 dark:hover:text-neon-blue">Credit Cards</button></li>
                <li><button onClick={() => setActiveTab('tools')} className="hover:text-blue-600 dark:hover:text-neon-blue">Calculators</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal & Trust</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><Lock size={14} /> Data Privacy</li>
                <li>Terms of Service</li>
                <li>Disclaimer</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">© 2024 FintrivX Financial Portal. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Operational • Secure SSL
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- STOCK MARKET COMPONENTS ---

const StockTicker = ({ stocks }: { stocks: Stock[] }) => {
  return (
    <div className="w-full bg-gray-900 text-white overflow-hidden py-2 border-b border-white/10">
      <div className="whitespace-nowrap animate-ticker flex gap-12">
        {[...stocks, ...stocks].map((stock, i) => ( // Duplicate for seamless loop
          <div key={i} className="flex items-center gap-3">
            <span className="font-bold text-blue-400">{stock.symbol}</span>
            <span className="font-mono">{stock.price.toFixed(2)}</span>
            <span className={`flex items-center text-xs ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {stock.change >= 0 ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
              {Math.abs(stock.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StockMarket = () => {
  // Initialize stocks from ALL_BANKS
  const [stocks, setStocks] = useState<Stock[]>(() => 
    ALL_BANKS
      .filter(b => b.stockSymbol && b.stockPrice)
      .slice(0, 50) // Top 50 banks for display
      .map(b => ({
        id: b.id,
        name: b.name,
        symbol: b.stockSymbol!,
        price: b.stockPrice!,
        change: (Math.random() * 2 - 1), // Initial random change
        marketCap: b.assets
      }))
  );

  const [searchTerm, setSearchTerm] = useState('');

  // Live Price Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((currentStocks: Stock[]) => 
        currentStocks.map((stock: Stock) => {
          // Random fluctuation between -0.5% and +0.5%
          const fluctuation = (Math.random() * 1) - 0.5; 
          const newChange = stock.change + fluctuation;
          // Keep change within realistic day bounds (-5% to +5%)
          const boundedChange = Math.max(-5, Math.min(5, newChange));
          const changeFactor = 1 + (fluctuation / 100);
          
          return {
            ...stock,
            price: Math.max(0.01, stock.price * changeFactor),
            change: boundedChange
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredStocks = useMemo(() => {
    return stocks.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stocks, searchTerm]);

  return (
    <div className="pt-20 min-h-screen">
      <StockTicker stocks={stocks.slice(0, 20)} />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Live Market Watch</h2>
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
               </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Real-time share prices of the world's leading financial institutions.</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search Symbol or Bank..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-finance-dark border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-neon-blue focus:outline-none w-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-semibold">Symbol</th>
                  <th className="px-6 py-4 font-semibold">Bank Name</th>
                  <th className="px-6 py-4 font-semibold text-right">Price (USD)</th>
                  <th className="px-6 py-4 font-semibold text-right">Change (24h)</th>
                  <th className="px-6 py-4 font-semibold text-right hidden md:table-cell">Market Cap/Assets</th>
                  <th className="px-6 py-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredStocks.map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-blue-600 dark:text-neon-blue">{stock.symbol}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{stock.name}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-mono font-bold text-gray-900 dark:text-white">${stock.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`inline-flex items-center gap-1 font-medium px-2 py-1 rounded ${
                        stock.change >= 0 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                      }`}>
                        {stock.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {Math.abs(stock.change).toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 dark:text-gray-400 font-mono hidden md:table-cell">
                      {stock.marketCap}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-sm font-medium text-blue-600 dark:text-neon-blue hover:underline">Trade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredStocks.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No stocks found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// 4. Bank Explorer Component
const BankExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  
  const filteredBanks = useMemo(() => {
    return ALL_BANKS.filter(bank => 
      (regionFilter === 'All' || bank.region === regionFilter) &&
      (bank.name.toLowerCase().includes(searchTerm.toLowerCase()) || bank.country.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, regionFilter]);

  const [visibleCount, setVisibleCount] = useState(24);

  return (
    <div className="pt-28 pb-10 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Global Bank Explorer</h2>
          <p className="text-gray-600 dark:text-gray-400">Deep dive into 300+ top financial institutions across 75 countries.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search bank or country..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-finance-dark border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 dark:focus:ring-neon-blue focus:outline-none w-full sm:w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-2.5 bg-white dark:bg-finance-dark border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none shadow-sm cursor-pointer"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="All">All Regions</option>
            {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBanks.slice(0, visibleCount).map(bank => (
          <div key={bank.id} className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:shadow-xl dark:hover:bg-slate-800/80 transition-all duration-300 group flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={bank.logoPlaceholder} alt={bank.name} className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-white/10 object-cover" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neon-blue transition-colors line-clamp-1">{bank.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{bank.country}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                    <span>Assets: {bank.assets}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                bank.complianceRating === 'AAA' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 
                bank.complianceRating === 'AA' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
              }`}>
                {bank.complianceRating}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
              {bank.description}
            </p>

            <div className="flex flex-col gap-2 mb-4 bg-gray-50 dark:bg-white/5 p-3 rounded-lg border border-gray-100 dark:border-white/5">
               <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Phone size={12} className="text-blue-500" /> 
                  <span className="font-mono">{bank.contactPhone}</span>
               </div>
               <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Mail size={12} className="text-blue-500" />
                  <span className="truncate">{bank.contactEmail}</span>
               </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {bank.features.slice(0,3).map((f, i) => (
                <span key={i} className="px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs border border-gray-200 dark:border-white/5">
                  {f}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-auto">
              <a href={bank.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-sm font-medium transition-all text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                Profile <ExternalLink size={14} />
              </a>
              <a href={bank.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-neon-blue dark:hover:bg-blue-600 text-sm font-medium transition-all text-white shadow-lg shadow-blue-500/20">
                Official Site <ChevronRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {filteredBanks.length > visibleCount && (
        <div className="mt-10 text-center">
          <button 
            onClick={() => setVisibleCount(c => c + 24)}
            className="px-6 py-3 rounded-full bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-sm"
          >
            Load More Banks ({filteredBanks.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

// 5. Product Center
const ProductCenter = ({ typeFilter }: { typeFilter: 'Loan' | 'Card' }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  
  const relevantTypes = typeFilter === 'Loan' 
    ? [ProductType.HomeLoan, ProductType.CarLoan, ProductType.BusinessLoan, ProductType.StartupLoan]
    : [ProductType.CreditCard, ProductType.Forex];

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const isRelevant = relevantTypes.includes(p.type);
      if (!isRelevant) return false;
      return selectedType === 'All' || p.type === selectedType;
    });
  }, [selectedType, relevantTypes]);

  return (
    <div className="pt-28 pb-10 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{typeFilter === 'Loan' ? 'Global Lending Center' : 'Cards & Forex Hub'}</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setSelectedType('All')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedType === 'All' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/50' : 'bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10'}`}
          >
            All Products
          </button>
          {relevantTypes.map(t => (
            <button 
              key={t}
              onClick={() => setSelectedType(t)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedType === t ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/50' : 'bg-white dark:bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredProducts.slice(0, 40).map(product => (
          <div key={product.id} className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10 p-5 rounded-xl flex flex-col sm:flex-row gap-6 items-center sm:items-start group hover:border-blue-400 dark:hover:border-neon-blue/30 shadow-sm hover:shadow-md transition-all">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-neon-blue uppercase tracking-wider">{product.bankName}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neon-blue transition-colors">{product.name}</h3>
                </div>
                <div className="bg-gray-100 dark:bg-white/5 px-3 py-1 rounded text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{product.type === ProductType.CreditCard ? 'Annual Fee' : 'Interest Rate'}</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {product.type === ProductType.CreditCard ? product.annualFee : product.interestRate}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-1 mb-4">
                {product.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle2 size={14} className="text-gray-400 dark:text-gray-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col gap-2 w-full sm:w-auto min-w-[140px]">
              <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-black/20 mb-1 border border-gray-100 dark:border-transparent">
                 <div className="text-xs text-gray-500 mb-1">{product.type === ProductType.CreditCard ? 'Reward Rate' : 'Max Tenure'}</div>
                 <div className="font-mono text-gray-900 dark:text-white font-bold">{product.type === ProductType.CreditCard ? product.rewardRate : product.maxTenure}</div>
              </div>
              <a href={product.applyUrl} target="_blank" rel="noreferrer" className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-center font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                Apply Now <ExternalLink size={12} />
              </a>
              <button className="w-full py-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 text-sm font-medium transition-all">
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Tools Section (Charts and Calculators)
const ToolsSection = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(5.5);
  const [years, setYears] = useState(20);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencySearch, setCurrencySearch] = useState('');

  const currencyData = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: selectedCurrency }).format(val);
  };

  const emi = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    return (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, rate, years]);

  const totalPayment = emi * years * 12;
  const totalInterest = totalPayment - amount;
  
  const chartData = useMemo(() => {
    const data = [];
    let balance = amount;
    const r = rate / 12 / 100;
    for(let i=1; i<= years; i++) {
        const interest = balance * r * 12; // Approx for chart
        balance = balance - (emi * 12 - interest);
        data.push({ year: `Year ${i}`, balance: balance > 0 ? balance : 0 });
    }
    return data;
  }, [amount, rate, years, emi]);

  return (
    <div className="pt-28 pb-10 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Calculator /> Loan Planner</h2>
             <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-700 dark:text-white">
                  {currencyData.symbol} {currencyData.code} <ChevronDown size={14}/>
                </button>
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 hidden group-hover:block hover:block p-2">
                   <input 
                      type="text" 
                      placeholder="Search Currency..." 
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-black/20 rounded-lg text-sm mb-2 border border-gray-200 dark:border-white/10 focus:outline-none"
                      onChange={(e) => setCurrencySearch(e.target.value.toLowerCase())}
                   />
                   <div className="max-h-64 overflow-y-auto">
                      {CURRENCIES.filter(c => c.name.toLowerCase().includes(currencySearch) || c.code.toLowerCase().includes(currencySearch)).map(c => (
                        <button key={c.code} onClick={() => setSelectedCurrency(c.code)} className="w-full text-left px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-white/10 rounded flex justify-between items-center text-gray-700 dark:text-gray-300">
                          <span>{c.name}</span>
                          <span className="font-mono opacity-50">{c.code}</span>
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Loan Amount</label>
              <input 
                type="range" min="5000" max="10000000" step="5000" 
                value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-neon-blue"
              />
              <div className="mt-2 text-3xl font-bold text-blue-600 dark:text-neon-blue">{formatMoney(amount)}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Interest Rate (%)</label>
              <input 
                type="range" min="1" max="20" step="0.1" 
                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{rate}%</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Tenure (Years)</label>
              <input 
                type="range" min="1" max="30" step="1" 
                value={years} onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">{years} Years</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl flex flex-col border border-gray-200 dark:border-white/10 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Payment Breakdown</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
                  <div className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">Monthly EMI</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatMoney(emi)}</div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-1 font-medium">Principal Amount</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{formatMoney(amount)}</div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-500/20">
                  <div className="text-sm text-red-600 dark:text-red-400 mb-1 font-medium">Total Interest</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{formatMoney(totalInterest)}</div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-500/20">
                  <div className="text-sm text-purple-600 dark:text-purple-400 mb-1 font-medium">Total Payable</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{formatMoney(totalPayment)}</div>
              </div>
          </div>

          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-white/10" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. AI Assistant
const AIAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I am FintrivX, your advanced financial coach. How can I help you today? You can ask me about loan comparisons, investment trends, or general banking advice.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getFinancialAdvice(input, 'Individual');
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: "I'm having trouble connecting to the financial network right now. Please try again.", timestamp: new Date() };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-10 px-4 max-w-5xl mx-auto h-[calc(100vh-80px)]">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-white/10 h-full flex flex-col overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-finance-dark dark:to-slate-900 border-b border-white/10 flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">FintrivX AI Coach</h2>
            <p className="text-blue-100 text-sm">Powered by FintrivX • Real-time Financial Analysis</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-black/20" ref={scrollRef}>
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-5 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/20' 
                  : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-white/5 rounded-tl-none shadow-sm'
              }`}>
                <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                <div className={`text-xs mt-2 opacity-60 ${m.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-700 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-white/5 flex items-center gap-3">
                <Loader2 size={18} className="animate-spin text-blue-600 dark:text-neon-blue" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Analyzing market data...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-white/10">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about loans, rates, or financial planning..."
              className="flex-1 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-neon-blue transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-neon-blue dark:hover:bg-blue-600 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- ABOUT US PAGE ----------------
const AboutUs = () => {
return (
<div className="pt-28 pb-20 px-4 max-w-5xl mx-auto">
<h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6 text-center">About Us</h1>


<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
Our website  is a comprehensive digital platform designed and owned by FintrivMultiverse  to provide structured, intelligent, and transparent financial knowledge to users across the globe. Built on the foundation of responsible information-sharing and modern financial research, our goal is to create an ecosystem where individuals, learners, and professionals can explore global financial systems without confusion or complexity. The platform integrates banking insights, loan structures, stock market patterns, and advanced analytical tools to help users form a deeper understanding of how modern financial environments operate. We believe that financial literacy should be accessible, unbiased, and simplified, so that every individual — regardless of background — can make informed decisions. Our interface, content structure, and learning system are designed to break down complicated topics into clear, digestible, and meaningful information blocks. At FintrivMultiverse.org, we take pride in maintaining a high standard of accuracy, ethics, and informational clarity, ensuring that users can trust the platform as a dependable source of knowledge.
</p>


<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
The vision of our website is  to create a global “knowledge multiverse,” where information, technology, and learning interact seamlessly to empower individuals with clarity and confidence. Inspired by the structure and features found in our integrated application, our purpose is to bring together financial data, modern user interfaces, artificial intelligence, and worldwide banking insights into one organized information platform. We aim to foster a learning-first approach by presenting content that encourages curiosity, exploration, and smart decision-making. In a world where digital finance is rapidly evolving, users deserve a reliable source that is both educational and user-friendly. Our long-term purpose is to expand our multiverse into multiple interconnected domains such as financial research, educational tools, entrepreneurship development, and global economic awareness. We strive to ensure that every section of the platform helps users learn meaningfully, act responsibly, and stay informed about global financial trends in a non-biased and respectful manner.
</p>


<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
At Fintrivx, our foremost commitment is to deliver knowledge responsibly and respectfully. We follow a principle-driven approach where accuracy, ethics, and transparency remain at the core of everything we provide. Our platform does not encourage financial risk, speculation, or harmful actions; instead, it focuses entirely on structured education, decent information, and helpful guidance. We ensure that all insights, comparisons, and explanations are presented in a neutral and non-promotional manner. Our objective is to support users in understanding financial concepts, exploring international banking systems, comparing global market structures, and using digital tools wisely. We continuously work toward refining the platform to ensure that every visitor gains value, clarity, and learning without encountering misleading or inappropriate information. The purpose is not to influence decisions but to simplify financial knowledge in a responsible way.
</p>

<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
Our platform embraces innovation through intelligent system design, AI-driven insights, and modern user-interface engineering. The tools and features presented—such as global bank explorers, live stock insights, structured loan comparisons, and AI-assisted information modules—are created with the intention of enhancing learning experiences, not influencing investment or financial actions. The technology behind FintrivMultiverse.org is designed to simplify difficult financial subjects and translate them into understandable information flows. We continuously monitor advancements in financial technologies, global markets, and educational models to keep the platform updated. Our goal is to empower users with technological convenience while maintaining complete neutrality, safety, and informational integrity. We treat technology as a medium for responsible education, not as a promotional or advisory instrument. Every feature is built to improve understanding and provide clarity, ensuring users can explore financial ecosystems with confidence and convenience.
</p>

<p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
Respecting users, their safety, and their informational rights is a fundamental value at FintrivMultiverse.org. We operate with an ethical and user-first mindset, ensuring that our platform never promotes harmful content, misinformation, or illegal actions. All content is curated with decency, professionalism, and responsibility. We strictly avoid any form of financial manipulation, harmful strategies, or misleading implications. Our focus is strictly educational, and our platform is designed to encourage learning, awareness, and informed judgment. We ensure that every piece of information aligns with global digital ethics, lawful standards, and respectful communication guidelines. As we continue to grow the Fintriv Multiverse, we remain committed to creating a safe, respectful, useful, and knowledge-based environment for every visitor worldwide.
</p>

<div className="mt-10 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-600 rounded-xl text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
<strong>Disclaimer:</strong> This website is created solely for knowledge, educational purposes, and the sharing of decent, responsible financial information. Fintrivx does not provide any financial, legal, investment, trading, business, or professional advice. The content available on this website should not be used for decision-making involving financial risk or legal obligations. We do not encourage or support any harmful activities, violations of law, or misuse of information. All data and insights are intended for general understanding only and may not reflect real-time accuracy or official financial positions. Users must rely on certified professionals for financial, legal, or investment consultations. By using this platform, you acknowledge that FintrivMultiverse.org is not liable for any actions taken based on the information provided. This website operates with the intention of sharing knowledge respectfully, ethically, and without causing harm.
</div>
</div>
);
};
// --- APP ROOT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // Default Light Mode

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-finance-dark text-white' : 'bg-finance-light text-gray-900'}`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <MobileMenu 
        isOpen={isMenuOpen} 
        closeMenu={() => setIsMenuOpen(false)} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="animate-fade-in">
        {activeTab === 'home' && <HomeDashboard setActiveTab={setActiveTab} />}
        {activeTab === 'stocks' && <StockMarket />}
        {activeTab === 'banks' && <BankExplorer />}
        {activeTab === 'loans' && <ProductCenter typeFilter="Loan" />}
        {activeTab === 'cards' && <ProductCenter typeFilter="Card" />}
        {activeTab === 'tools' && <ToolsSection />}
        {activeTab === 'assistant' && <AIAssistant />}
        {activeTab === 'about' && <AboutUs />}

      </main>
    </div>
  );
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CreditCard, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Tv,
  Star,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PAYSUITE_URL = "https://paysuite.tech/checkout/01KJNRRPF49SE8Y9GD18TXFWSR";
const DESTINATION_URL = "https://cinehd.site"; // The original site mentioned earlier

const PLATFORMS = [
  { name: "Netflix", domain: "netflix.com" },
  { name: "HBO Max", domain: "hbomax.com" },
  { name: "Disney+", domain: "disneyplus.com" },
  { name: "Prime Video", domain: "primevideo.com" },
  { name: "Doramas", domain: "viki.com" },
  { name: "Séries Premium", domain: "hulu.com" },
  { name: "Canais TV", domain: "directv.com" }
];

const PROMO_IMAGES = [
  "18CjRNRaWU_Z5N-3mD4YjVlLB3xco7sQq",
  "1Gm10LgZV9Du29zF3w7bwy2uzpCW7Q7vY",
  "1I5Id8GGZCrwdE38DWzBI0VAgIGULirx3",
  "1iLmmv7mUDdWa_bvbNVMQIyKw4f6T7H3w",
  "1mjI4hXr02okbmDRb2VArECh0woe_cros",
  "1xDNffmhzX7bEh6-IfEiZ7TfR7v2ZtyGF"
].map(id => `https://lh3.googleusercontent.com/d/${id}`);

const BACKGROUND_IMAGES = [
  "12IRD9wINBKg_MGPnx0mYWGhrh0-u_bx7",
  "13KDnqAOGJwPbDpYtDSuryDEb-LwR8D7n",
  "1qdaXm1306hczZa8Z_1-FiPZnJPI1e3C8"
].map(id => `https://lh3.googleusercontent.com/d/${id}`);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgSlide, setBgSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const allImages = [...PROMO_IMAGES, ...BACKGROUND_IMAGES];
    
    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          setLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === allImages.length) {
          setLoading(false);
        }
      };
    });

    const promoTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_IMAGES.length);
    }, 4000);

    const bgTimer = setInterval(() => {
      setBgSlide((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);

    return () => {
      clearInterval(promoTimer);
      clearInterval(bgTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden flex flex-col items-center">
      {/* Background Image Slideshow with High Contrast Overlay */}
      <div className="fixed inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.img 
            key={bgSlide}
            src={BACKGROUND_IMAGES[bgSlide]} 
            alt="Cinema Background" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Mobile-Centric Container */}
      <main className="relative z-10 w-full max-w-md px-5 pt-12 pb-32 flex flex-col min-h-screen">
        
        {/* Header / Logo */}
        <header className="flex flex-col items-center text-center mb-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 mb-3"
          >
            <div className="bg-emerald-500 p-3 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.4)]">
              <Play className="fill-white text-white w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tighter">CINE<span className="text-emerald-500">HD</span></span>
          </motion.div>
        </header>

        {/* Hero Content */}
        <section className="text-center mb-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-black mb-4 leading-[0.9] tracking-tight"
          >
            CINEMA <br /> <span className="text-emerald-500">ILIMITADO</span>
          </motion.h1>
          <p className="text-lg text-gray-300 font-medium leading-tight mb-6">
            Acesso total a todas as plataformas, <br />
            filmes e séries por apenas <span className="text-white font-black">200 MT</span>.
          </p>

          {/* Promotional Slideshow */}
          <div className="relative h-48 w-full mb-8 flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 bg-[#050505]">
                <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">A carregar catálogo...</span>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full"
              >
                <img
                  src={PROMO_IMAGES[currentSlide]}
                  className="w-full h-full object-cover"
                  alt="Promoção CINEHD"
                  referrerPolicy="no-referrer"
                  onLoad={() => setLoading(false)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to next slide if error
                    setTimeout(() => {
                      setCurrentSlide((prev) => (prev + 1) % PROMO_IMAGES.length);
                    }, 100);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

        </section>

        {/* Main Action Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
        >
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-0 p-6 opacity-5"
          >
            <Tv className="w-20 h-20" />
          </motion.div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Subscrição VIP</span>
              <div className="text-4xl font-black">200 MT</div>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-2xl">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {[
              { icon: ShieldCheck, text: "Acesso imediato ao Canal VIP" },
              { icon: Zap, text: "Link direto para assistir em HD/4K" },
              { icon: Lock, text: "Sem anúncios e sem limites" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (index * 0.1) }}
                className="flex items-center gap-3 text-sm text-gray-300 font-medium"
              >
                <item.icon className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.a 
            href={PAYSUITE_URL}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 50px rgba(16,185,129,0.4)" }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              boxShadow: ["0 15px 40px rgba(16,185,129,0.3)", "0 15px 60px rgba(16,185,129,0.5)", "0 15px 40px rgba(16,185,129,0.3)"]
            }}
            transition={{ 
              boxShadow: { repeat: Infinity, duration: 2 }
            }}
            className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-[0_15px_40px_rgba(16,185,129,0.3)]"
          >
            ATIVAR ACESSO AGORA <ChevronRight className="w-6 h-6" />
          </motion.a>
          
          <p className="mt-6 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <CreditCard className="w-3 h-3" /> Pagamento Seguro via PaySuite
          </p>
        </motion.div>

        {/* Post-Payment Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 rounded-3xl bg-white/5 border border-white/5 text-center"
        >
          <p className="text-xs text-gray-400 leading-relaxed">
            Após o pagamento, você será redirecionado automaticamente para o Canal de Acesso Ilimitado.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-auto pt-12 text-center"
        >
          <p className="text-gray-600 text-[10px] font-black tracking-[0.3em] uppercase">
            © 2026 CINEHD Premium • Fredson Muianga
          </p>
        </motion.footer>

        {/* Sticky Mobile Button */}
        <div className="fixed bottom-6 left-6 right-6 z-[100] md:hidden">
          <a 
            href={PAYSUITE_URL}
            className="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2 active:scale-95 transition-transform border border-white/10"
          >
            ASSINAR POR 200 MT <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </main>
    </div>
  );
}

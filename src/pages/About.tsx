import { motion } from 'framer-motion';
import { Shield, Globe, Award, Target, Users, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="space-y-32">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span className="w-12 h-[1px] bg-brand-gold" />
                  <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold font-display">
                    The Triple Exceed Manifesto
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-medium leading-tight">Beyond <br /><span className="gold-gradient">Importation.</span></h1>
                <p className="text-brand-silver/60 text-xl leading-relaxed max-w-xl">
                  Triple Exceed is not just a logistics firm. We are the architects of automotive excellence in West Africa, bridging the gap between global luxury and the Ghanaian elite with surgical precision.
                </p>
              </div>
              <div className="flex gap-8 border-t border-brand-white/5 pt-12">
                <div>
                  <p className="text-3xl font-display font-medium text-brand-white">2021</p>
                  <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-1">Founded</p>
                </div>
                <div className="w-[1px] h-12 bg-brand-white/5" />
                <div>
                  <p className="text-3xl font-display font-medium text-brand-white">450+</p>
                  <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-1">Assets Delivered</p>
                </div>
                <div className="w-[1px] h-12 bg-brand-white/5" />
                <div>
                  <p className="text-3xl font-display font-medium text-brand-white">98%</p>
                  <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest mt-1">Protocol Success</p>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-square luxury-glass p-4 group">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80" 
                alt="Triple Exceed HQ" 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Shield size={28} />, title: 'Absolute Quality', desc: 'Our 200-point surgical inspection protocol ensures that only tier-one assets ever reach our clients.' },
              { icon: <Globe size={28} />, title: 'Global Reach', desc: 'Strategic hubs in Houston, Shenzhen, Dubai, and Bremerhaven give us unparalleled access to world markets.' },
              { icon: <Award size={28} />, title: 'Elite Service', desc: 'White-glove delivery and end-to-end management mean our clients never have to step foot in a port.' }
            ].map((value, i) => (
              <div key={i} className="luxury-glass p-12 space-y-8 group hover:border-brand-gold/40 transition-all">
                <div className="w-16 h-16 bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-all">
                  {value.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-medium text-brand-white uppercase tracking-widest">{value.title}</h3>
                  <p className="text-brand-silver/60 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Partners */}
          <div className="py-24 border-t border-brand-white/5 space-y-16">
            <div className="text-center space-y-4">
              <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-[10px]">Global Network</span>
              <h2 className="text-4xl font-display font-medium uppercase tracking-widest">Strategic Alliances</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale">
              {/* These would be high-end car brand logos or logistics partners */}
              <span className="text-3xl font-display font-medium tracking-[0.2em]">TESLA</span>
              <span className="text-3xl font-display font-medium tracking-[0.2em]">BYD</span>
              <span className="text-3xl font-display font-medium tracking-[0.2em]">MANHEIM</span>
              <span className="text-3xl font-display font-medium tracking-[0.2em]">MAERSK</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="luxury-glass p-20 text-center space-y-12 bg-brand-matte relative overflow-hidden group">
            <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-8 relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight">Secure Your Piece <br />of Global Excellence</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="/marketplace" className="btn-premium-filled py-4 px-12">View Collection</a>
                <a href="/contact" className="btn-premium py-4 px-12">Contact a Specialist</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

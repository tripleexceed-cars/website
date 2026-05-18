import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Scale, Cookie, CheckCircle, Clock, ArrowLeft, Building2, Globe, Database, Key } from 'lucide-react';

export default function Legal() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname.includes('privacy')) {
      setActiveTab('privacy');
    } else if (location.pathname.includes('terms')) {
      setActiveTab('terms');
    } else if (location.pathname.includes('cookies')) {
      setActiveTab('cookies');
    }
  }, [location]);

  return (
    <div className="pt-32 pb-24 bg-brand-black min-h-screen relative overflow-hidden">
      {/* Background Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-white transition-colors">
              <ArrowLeft size={14} /> Return to Showroom
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-medium text-brand-white">
              Corporate <span className="gold-gradient">Governance</span>
            </h1>
            <p className="text-brand-silver text-lg leading-relaxed max-w-2xl mx-auto">
              Comprehensive regulatory frameworks, data sovereignty protocols, and binding terms governing all international vehicle acquisitions.
            </p>

            {/* Document Switcher Tabs */}
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {[
                { id: 'privacy', label: 'Privacy Protocol', icon: Lock, path: '/privacy' },
                { id: 'terms', label: 'Terms of Service', icon: Scale, path: '/terms' },
                { id: 'cookies', label: 'Cookie Policy', icon: Cookie, path: '/cookies' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <Link
                    key={tab.id}
                    to={tab.path}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-extrabold transition-all duration-300 shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-red-600/30 scale-105 border border-red-500/40'
                        : 'bg-brand-white/5 text-brand-silver hover:bg-brand-white/10 border border-brand-white/10'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-brand-gold'} />
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Document Content Box */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="luxury-glass p-8 md:p-16 space-y-12 bg-[#121212]/90 rounded-2xl border border-white/10 shadow-2xl relative"
          >
            <div className="flex justify-between items-center pb-8 border-b border-brand-white/10">
              <div className="flex items-center gap-4">
                <Shield className="text-brand-gold" size={32} />
                <div>
                  <span className="text-[10px] text-brand-gold uppercase tracking-[0.3em] font-extrabold">Official Record — Effective May 2026</span>
                  <h2 className="text-3xl font-display font-medium text-white">
                    {activeTab === 'privacy' && 'Privacy & Data Protection Protocol'}
                    {activeTab === 'terms' && 'Master Terms of Concierge & Importation'}
                    {activeTab === 'cookies' && 'Digital Tracking & Cookie Specification'}
                  </h2>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                <CheckCircle size={14} /> Fully Compliant
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-brand-silver leading-relaxed space-y-8 text-sm md:text-base">
              {/* PRIVACY POLICY */}
              {activeTab === 'privacy' && (
                <>
                  <div className="p-6 bg-brand-white/5 rounded-xl border border-brand-gold/20 flex gap-4 items-start">
                    <Globe className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                    <p className="text-xs md:text-sm text-brand-white leading-relaxed m-0 font-bold tracking-wide">
                      SUMMARY: Triple Exceed Automobile Ltd. maintains strict data privacy standards across our Accra Headquarters and our operational hubs in Houston (USA) and Shenzhen (China). We utilize military-grade encryption to protect client identification, financial records, and fleet acquisition dossiers.
                    </p>
                  </div>

                  <section className="space-y-4 pt-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      1. Data Controller Identity & Jurisdiction
                    </h3>
                    <p>
                      Triple Exceed Automobile Ltd., operating from Tema Community 25, Accra. Ghana, serves as the primary Data Controller for all client personal data collected through our digital interfaces and secure physical concierge operations. Our international logistics infrastructure mandates secure data conduits between West Africa, North America, and East Asia.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      2. Categorization of Processed Information
                    </h3>
                    <p>
                      To execute white-glove international automobile procurement and rapid port customs clearance, we collect precisely verified data sets:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-brand-white">
                      <li><strong className="text-brand-gold">Identity & Verification Records:</strong> Passports, national identification cards, driver's licenses, and biometric delivery verification documentation required by Ghana Revenue Authority (GRA) customs divisions.</li>
                      <li><strong className="text-brand-gold">Fiscal & Escrow Data:</strong> Wire transfer verification codes, banking references, swift receipts, and currency hedging settlement records.</li>
                      <li><strong className="text-brand-gold">Bespoke Technical Specifications:</strong> Chassis preferences, VIN dossiers, B6/B7 ballistic armor requests, and private collection delivery coordinates.</li>
                      <li><strong className="text-brand-gold">Digital Telemetry:</strong> IP addresses, secure session tokens, satellite tracking pings, and device fingerprints utilized during secure portal login.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      3. Operational Rationale & Legal Basis
                    </h3>
                    <p>
                      All personal data processing is anchored upon definitive legal grounds:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-brand-white">
                      <li><strong>Contractual Execution:</strong> Essential for executing door-to-port maritime transit, securing marine cargo insurance, and delivering physical vehicle titles.</li>
                      <li><strong>Statutory Port Compliance:</strong> Mandated by maritime authorities and port customs for import duty assessment and vehicle registration.</li>
                      <li><strong>Legitimate Commercial Security:</strong> Protecting high-value international escrow transfers against fraudulent interdiction or interception.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      4. Cross-Border Data Conduits & Storage Resilience
                    </h3>
                    <p>
                      Client dossiers are stored within highly fortified cloud databases backed by isolated local data redundancy (`localStorage` encryption arrays). Data transmitted between our Accra Command Center and our overseas hubs in Houston, TX and Shenzhen is protected via 256-bit Advanced Encryption Standard (AES) protocols over private virtual networks.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      5. Client Sovereignty & Data Rights
                    </h3>
                    <p>
                      As an elite patron, you maintain uncompromised ownership over your personal data footprint. You may exercise your right to access complete audit registries, request immediate redaction of non-statutory records, or export your historical fleet documentation in immutable PDF formats by contacting our Data Protection Officer at <span className="text-brand-gold font-bold">tripleexceed@gmail.com</span>.
                    </p>
                  </section>
                </>
              )}

              {/* TERMS OF SERVICE */}
              {activeTab === 'terms' && (
                <>
                  <div className="p-6 bg-brand-white/5 rounded-xl border border-brand-gold/20 flex gap-4 items-start">
                    <Scale className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                    <p className="text-xs md:text-sm text-brand-white leading-relaxed m-0 font-bold tracking-wide">
                      SUMMARY: These Master Terms constitute a legally binding agreement between you and Triple Exceed Automobile Ltd. They govern vehicle sourcing contracts, escrow financial settlements, 200-point surgical inspections, customs duty clearance at Tema/Takoradi ports, and white-glove concierge delivery across Ghana.
                    </p>
                  </div>

                  <section className="space-y-4 pt-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      1. Preliminary Sourcing & Contract Formation
                    </h3>
                    <p>
                      The vehicle listings displayed in our digital fleet gallery represent verified international inventory situated within our USA and China operational hubs. Submitting an inquiry or custom specification request initiates a preliminary verification protocol; it does not constitute an instant binding purchase agreement until an Official Escrow Allocation Contract is signed and initial deposit funds are verified.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      2. Surgical Inspection Protocol & Asset Verification
                    </h3>
                    <p>
                      Prior to maritime embarkation, every vehicle undergoes our rigorous 200-point technical, mechanical, and aesthetic inspection performed by certified master agents at the point of origin (Houston or Shenzhen). Clients receive a certified digital verification dossier. Triple Exceed guarantees that the vehicle's physical condition upon port arrival will match the certified dossier, subject to normal maritime transit wear.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      3. Financial Protocol, Customs Valuation, and Escrow
                    </h3>
                    <p>
                      All monetary transactions must be executed via authorized bank wire transfers directly into designated Triple Exceed corporate escrow accounts.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-brand-white">
                      <li><strong>Pricing Adjustments:</strong> Total delivered pricing includes origin vehicle cost, ocean freight, marine insurance, and projected port customs tariffs. Final port duties are determined exclusively by the Ghana Revenue Authority (GRA); any statutory fluctuations in customs exchange rates prior to final clearance will be reconciled prior to doorstep delivery.</li>
                      <li><strong>Deposit Terms:</strong> Standard vehicle allocations require a verified 50% escrow commitment. Special Operations allocations (including bespoke hypercars and B6/B7 armored vehicles) require a non-refundable 70% commitment due to specialized export licensing requirements.</li>
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      4. Logistics, Maritime Transit Risk, and Force Majeure
                    </h3>
                    <p>
                      Triple Exceed utilizes premium containerized shipping lines (RoRo or secure private 40ft containers). All shipments are fully insured up to 110% of the vehicle's replacement value under comprehensive marine cargo insurance. We are not liable for transit delays arising from maritime weather anomalies, international port strikes, customs bottlenecks, or force majeure events.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      5. Title Transfer & Doorstep Concierge Handover
                    </h3>
                    <p>
                      Legal title and risk of loss transfer to the client strictly upon completion of final white-glove inspection and physical key handover at the client's designated delivery coordinates in Ghana.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      6. Governing Law & Dispute Resolution
                    </h3>
                    <p>
                      These Terms are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising out of or relating to these terms shall be settled through binding commercial arbitration in Accra under the auspices of the Ghana Arbitration Centre.
                    </p>
                  </section>
                </>
              )}

              {/* COOKIE POLICY */}
              {activeTab === 'cookies' && (
                <>
                  <div className="p-6 bg-brand-white/5 rounded-xl border border-brand-gold/20 flex gap-4 items-start">
                    <Cookie className="text-brand-gold flex-shrink-0 mt-1" size={24} />
                    <p className="text-xs md:text-sm text-brand-white leading-relaxed m-0 font-bold tracking-wide">
                      SUMMARY: Our digital platform utilizes specialized cookies, encrypted local storage arrays, and real-time telematics beacons to maintain authenticated user sessions, preserve fleet favorite lists (`te_favorites`), and optimize international server response times.
                    </p>
                  </div>

                  <section className="space-y-4 pt-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      1. Definition of Digital Tracking Artifacts
                    </h3>
                    <p>
                      Cookies are small encrypted text strings placed within your device browser. In addition to traditional HTTP cookies, our high-performance architecture utilizes modern Web Storage APIs (`localStorage` and `sessionStorage`) to provide instantaneous offline fallback capability and lightning-fast catalog navigation across West Africa.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      2. Categorization of Platform Cookies
                    </h3>
                    <div className="space-y-6 pt-2">
                      <div className="p-4 bg-brand-white/5 rounded-xl border-l-4 border-red-600 space-y-2">
                        <h4 className="text-white font-bold text-base flex items-center gap-2">
                          <Key size={16} className="text-brand-gold" /> Strictly Necessary Operational Tokens
                        </h4>
                        <p className="text-xs text-brand-silver">
                          Essential for navigating the platform, maintaining active user authentication states, and securely transmitting vehicle consultation parameters across encrypted API bridges. The website cannot function securely without these elements.
                        </p>
                      </div>

                      <div className="p-4 bg-brand-white/5 rounded-xl border-l-4 border-brand-gold space-y-2">
                        <h4 className="text-white font-bold text-base flex items-center gap-2">
                          <Database size={16} className="text-brand-gold" /> Client Preference & Persistence Storage
                        </h4>
                        <p className="text-xs text-brand-silver">
                          Stores your customized showroom configurations, currency display preferences, and saved luxury asset comparisons (`te_favorites`) across active browsing sessions.
                        </p>
                      </div>

                      <div className="p-4 bg-brand-white/5 rounded-xl border-l-4 border-blue-500 space-y-2">
                        <h4 className="text-white font-bold text-base flex items-center gap-2">
                          <Globe size={16} className="text-blue-500" /> Global Performance & Telematics Beacons
                        </h4>
                        <p className="text-xs text-brand-silver">
                          Monitors CDN distribution speeds between our global server nodes in Houston, Shenzhen, and Accra to dynamically optimize vehicle image loading and satellite tracking API latency.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      3. Third-Party Integration Frameworks
                    </h3>
                    <p>
                      We integrate secure cryptographic handshakes with accredited third-party logistics entities, including maritime satellite tracking networks and secure enterprise communication gateways (WhatsApp API). These entities may deploy encrypted session beacons to verify message integrity and secure data transit.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-display font-medium text-white uppercase tracking-widest flex items-center gap-2 text-brand-gold">
                      4. Managing Your Tracking Preferences
                    </h3>
                    <p>
                      You maintain full control over your digital footprint. You can instantly clear your local browsing cache or configure your browser security settings to reject non-essential telemetry. Note that blocking necessary operational cookies will deactivate access to personalized client portals and saved fleet registries.
                    </p>
                  </section>
                </>
              )}
            </div>

            {/* Footer Acknowledgment Box */}
            <div className="pt-8 border-t border-brand-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-silver uppercase tracking-widest font-extrabold">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-brand-gold" /> Triple Exceed Legal Compliance Department
              </div>
              <div>Direct Legal Inquiries: <span className="text-brand-gold">tripleexceed@gmail.com</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

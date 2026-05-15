import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ArrowRight } from 'lucide-react';
import { NAVIGATION } from '../../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-black/95 backdrop-blur-md h-20' : 'bg-transparent h-24'
      } border-b border-brand-white/10`}
    >
      <div className="h-full px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-gold rotate-45 flex items-center justify-center">
            <span className="-rotate-45 font-bold text-black text-[10px] tracking-tighter">TX</span>
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase text-brand-white">
            Triple <span className="text-brand-gold">Exceed</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {NAVIGATION.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-link hover:text-brand-white ${
                location.pathname === item.href ? 'text-brand-white border-b border-brand-gold' : 'text-brand-silver'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-brand-silver hover:text-brand-white transition-colors"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-brand-white hover:text-brand-gold transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 z-[60] bg-brand-black/98 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-10 right-10 text-brand-white/30 hover:text-brand-white transition-all"
            >
              <X size={32} />
            </button>
            
            <div className="w-full max-w-4xl space-y-12">
              <div className="space-y-4 text-center">
                <span className="text-brand-gold font-bold uppercase tracking-[0.5em] text-[10px]">Global Discovery</span>
                <h2 className="text-4xl md:text-6xl font-display font-medium text-brand-white">Search our Fleet</h2>
              </div>

              <form onSubmit={handleSearch} className="relative group">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Brand, Model, or Specification..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-brand-white/10 py-8 text-2xl md:text-4xl text-brand-white font-display focus:outline-none focus:border-brand-gold transition-all placeholder:text-brand-white/5"
                />
                <button 
                  type="submit"
                  className="absolute right-0 bottom-8 text-brand-gold hover:translate-x-2 transition-transform"
                >
                  <ArrowRight size={48} />
                </button>
              </form>

              <div className="flex flex-wrap justify-center gap-4">
                {['Tesla', 'BYD', 'Porsche', 'Toyota', 'Mercedes'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => {
                      navigate(`/marketplace?q=${tag}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-6 py-2 bg-brand-white/5 border border-brand-white/10 text-[10px] uppercase tracking-widest font-bold text-brand-white/40 hover:text-brand-gold hover:border-brand-gold transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-brand-black border-b border-brand-white/10 p-8 flex flex-col space-y-6"
          >
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-lg uppercase tracking-widest font-display font-medium text-brand-white hover:text-brand-gold"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

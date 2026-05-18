import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Mail, Lock, Key, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabaseService } from '../lib/supabaseService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Mandatory First-Login Reset state
  const [requireReset, setRequireReset] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isClientLogin = location.pathname.includes('/client/');
  const role = isClientLogin ? 'client' : 'admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isClientLogin) {
        await login(email, 'client');
        navigate('/dashboard');
      } else {
        const staffUser = await supabaseService.verifyStaffLogin(email, password);
        if (!staffUser) {
          alert('Invalid Security Credentials');
          return;
        }
        if (staffUser.isFirstLogin) {
          setPendingUser(staffUser);
          setRequireReset(true);
          return;
        }
        await login(staffUser);
        navigate('/dashboard');
      }
    } catch (err) {
      alert('Authentication protocol failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Security keys do not match.');
      return;
    }
    if (newPassword.length < 6) {
      alert('Security key must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const updated = await supabaseService.updateStaffPassword(pendingUser.id, newPassword);
      await login(updated);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to establish permanent security key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px]">Security Gateway</span>
            <h1 className="text-4xl font-display font-medium text-brand-white">
              {isClientLogin ? 'Client Portal' : (requireReset ? 'Mandatory Key Reset' : 'Admin Nexus')}
            </h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {requireReset && pendingUser ? (
            <motion.form 
              key="reset-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handlePasswordReset} 
              className="luxury-glass p-10 space-y-6"
            >
              <div className="p-4 bg-brand-gold/10 border border-brand-gold/20 text-center mb-6">
                <p className="text-brand-gold text-xs font-bold uppercase tracking-wider">Mandatory Protocol Reset</p>
                <p className="text-brand-white/80 text-[11px] mt-1">Welcome, <span className="text-brand-gold font-bold">{pendingUser.name}</span>. For security, you must replace your temporary access code with a permanent key.</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">New Permanent Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    required
                    className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-12 text-xs tracking-widest focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-white/40 hover:text-brand-gold transition-colors p-1"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Confirm Permanent Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    required
                    className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-12 text-xs tracking-widest focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-white/40 hover:text-brand-gold transition-colors p-1"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-premium-filled py-4 flex items-center justify-center gap-3 group"
              >
                {loading ? 'Establishing Security Key...' : (
                  <>
                    <span>Activate Permanent Key</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="login-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit} 
              className="luxury-glass p-10 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Protocol Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-4 text-xs tracking-widest uppercase focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                    placeholder="identity@protocol.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-white/20" size={16} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    className="w-full bg-brand-white/5 border border-brand-white/5 py-4 pl-12 pr-12 text-xs tracking-widest focus:outline-none focus:border-brand-gold/50 transition-all text-brand-white"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-white/40 hover:text-brand-gold transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-premium-filled py-4 flex items-center justify-center gap-3 group"
              >
                {loading ? 'Authenticating...' : (
                  <>
                    <span>Establish Connection</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-center text-[10px] uppercase tracking-widest text-brand-silver/40">
          Triple Exceed Automobile Ltd. | Secured Endpoint
        </p>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAppConfig } from '../context/ConfigContext';
import DynamicIcon from './DynamicIcon';

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const { config } = useAppConfig();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-choose-us' },
    { name: 'Packages', href: '#packages' },
    { name: 'Report Lookup', href: '#reports' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Offset for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            {config.logoUrl ? (
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border border-slate-100 shrink-0">
                <img src={config.logoUrl} alt="custom logo" className="max-h-full max-w-full object-contain" />
              </div>
            ) : (
              <div className="p-2.5 rounded-xl transition-all duration-300 bg-teal-600 text-white shadow-md shadow-teal-600/35">
                <DynamicIcon name={config.logoIcon || 'Microscope'} className="w-6 h-6 animate-pulse-subtle" />
              </div>
            )}
            <div>
              <span className={`font-display font-extrabold text-sm sm:text-base md:text-lg tracking-tight block leading-tight ${
                scrolled ? 'text-teal-900' : 'text-white'
              }`}>
                {config.siteTitle}
              </span>
              <span className={`text-[9px] font-mono tracking-widest uppercase block font-bold mt-0.5 ${
                scrolled ? 'text-teal-600' : 'text-teal-300'
              }`}>
                {config.siteSubtitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-102 ${
                  scrolled
                    ? 'text-slate-600 hover:text-teal-600 hover:bg-teal-50/50'
                    : 'text-slate-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <button
              onClick={onBookClick}
              className={`font-display text-sm font-bold px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                scrolled
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                  : 'bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 ease-in-out border-t border-slate-100 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-100 px-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-display font-semibold px-5 py-3 rounded-xl shadow-md cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

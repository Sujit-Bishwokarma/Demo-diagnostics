import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import WhyChooseUs from './components/WhyChooseUs';
import HealthPackages from './components/HealthPackages';
import ReportDownload from './components/ReportDownload';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import QuickBookingModal from './components/QuickBookingModal';
import DynamicIcon from './components/DynamicIcon';
import { motion } from 'motion/react';
import { useAppConfig } from './context/ConfigContext';
import AdminCPanel from './components/AdminCPanel';


export default function App() {
  const { config } = useAppConfig();
  // Service/Package option chosen in other cards to populate the contact booking form
  const [selectedService, setSelectedService] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Open the modal for instant, friction-free booking anywhere
  const scrollToBooking = (preSelected = '') => {
    if (preSelected) {
      setSelectedService(preSelected);
    } else {
      setSelectedService('General Medical Checkup');
    }
    setIsBookingModalOpen(true);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = servicesSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // WhatsApp chat click
  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(`Hi ${config.siteTitle}, I would like to inquire about your diagnostic services and home blood collection options.`);
    window.open(`https://wa.me/${config.whatsapp}?text=${message}`, '_blank');
  };


  return (
    <div className="min-h-screen flex flex-col font-sans select-none antialiased">
      
      {/* Dynamic Navbar */}
      <Navbar onBookClick={() => scrollToBooking('General Medical Checkup')} />

      <main className="flex-grow">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
          {/* High resolution clinical background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={config.heroImage}
              alt="Apex Diagnostics Center background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-90 scale-102 transform transition-all duration-700"
            />
            {/* Soft neutral gradient overlay for text readability without coloring the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 z-10" />
          </div>

          {/* Hero Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center text-white space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/25 px-4 py-2 rounded-full backdrop-blur-md">
                <DynamicIcon name="Sparkles" className="text-teal-400 w-4 h-4 animate-pulse" />
                <span className="text-xs font-semibold font-mono tracking-wider uppercase text-teal-300">
                  Leading Testing Facilities
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
                {config.heroTitle}
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-sans tracking-wide max-w-2xl mx-auto leading-relaxed">
                {config.heroSubtitle}
              </p>
            </motion.div>

            {/* Hero Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button
                onClick={() => scrollToBooking('General Medical Checkup')}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <DynamicIcon name="Calendar" className="w-5 h-5 text-white" />
                <span>Book a Test</span>
              </button>

              <button
                onClick={scrollToServices}
                className="w-full sm:w-auto border-2 border-slate-300/80 hover:border-white bg-white/5 hover:bg-white/10 text-white font-display font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>View Our Services</span>
                <DynamicIcon name="ArrowRight" className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Bottom subtle scroll-down indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:block">
            <button
              onClick={scrollToServices}
              className="flex flex-col items-center space-y-1.5 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Scroll down to services"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold">Discover</span>
              <div className="w-6 h-10 border-2 border-slate-400/80 rounded-full flex items-start justify-center p-1">
                <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
              </div>
            </button>
          </div>
        </section>

        {/* SECTION 2: REPORT DOWNLOAD */}
        <ReportDownload />

        {/* SECTION 3: SERVICES */}
        <ServicesSection onSelectService={scrollToBooking} />

        {/* SECTION 4: WHY CHOOSE US */}
        <WhyChooseUs />

        {/* SECTION 5: HEALTH PACKAGES */}
        <HealthPackages onSelectPackage={scrollToBooking} />

        {/* SECTION 6: ABOUT & CERTIFICATIONS */}
        <AboutSection />

        {/* SECTION 8: TESTIMONIALS */}
        <TestimonialsSection />

        {/* SECTION 9: CONTACT & BOOKING FORM */}
        <ContactSection
          selectedChoice={selectedService}
          onClearChoice={() => setSelectedService('')}
        />

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-8">
            <div className="flex items-center space-x-2">
              {config.logoUrl ? (
                <div className="w-8 h-8 rounded bg-white/5 p-1 flex items-center justify-center border border-slate-800">
                  <img src={config.logoUrl} alt="custom logo" className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <DynamicIcon name={config.logoIcon} className="w-5 h-5" />
                </div>
              )}
              <span className="font-display font-bold text-white tracking-tight text-lg uppercase">
                {config.siteTitle}
              </span>
            </div>
            
            <p className="text-xs font-mono text-slate-500">
              Government Registered NABL Lab • License Code: MCR-2012-APX
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-slate-500">
                © {new Date().getFullYear()} {config.siteTitle}. All rights reserved. Precision in Diagnosis, Care in Treatment.
              </p>
              <p className="text-[10px] text-slate-600">
                made by <span className="text-slate-400 font-semibold">Crafora Labs</span> with love in bharatpur Chitwan • <span className="text-[9px] font-mono tracking-wider opacity-80">{config.phone}</span>
              </p>
            </div>
            <div className="flex space-x-4 font-semibold shrink-0">
              <a href="#privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
              <span className="text-slate-800">|</span>
              <a href="#terms" className="hover:text-teal-400 transition-colors">Terms of Service</a>
              <span className="text-slate-800">|</span>
              <a href="#sitemap" className="hover:text-teal-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppChat}
          className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer relative"
          title="Chat with us on WhatsApp"
        >
          {/* Wave animation around button */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/25 animate-ping opacity-75" />
          
          <svg viewBox="0 0 448 512" className="w-6.5 h-6.5 z-10 transition-transform group-hover:rotate-6 fill-white" fill="currentColor">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
          
          {/* Tooltip on hover */}
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap hidden sm:inline">
            Need Help? Chat on WhatsApp
          </span>
        </button>
      </div>

      {/* QUICK RESERVATION MODAL */}
      <QuickBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedService={selectedService}
      />

      {/* ADMINISTRATIVE CONTROL PANEL */}
      <AdminCPanel />

    </div>
  );
}

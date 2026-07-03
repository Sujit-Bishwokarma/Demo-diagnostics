import React, { useState, useEffect } from 'react';
import { useAppConfig } from '../context/ConfigContext';
import DynamicIcon from './DynamicIcon';
import { motion, AnimatePresence } from 'motion/react';

interface ContactSectionProps {
  selectedChoice: string;
  onClearChoice: () => void;
}

export default function ContactSection({ selectedChoice, onClearChoice }: ContactSectionProps) {
  const { config } = useAppConfig();
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  
  // App state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Handle auto-population from parent state (when user clicks "Book Now" on services or packages)
  useEffect(() => {
    if (selectedChoice) {
      setService(selectedChoice);
    }
  }, [selectedChoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !service || !date) return;

    // Generate a random Reference Code
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const refCode = `APX-${randomNum}`;

    // Store in localStorage for persistence
    const newBooking = {
      id: refCode,
      name,
      phone,
      service,
      date,
      message,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    const existingBookingsStr = localStorage.getItem('apex_appointments') || '[]';
    try {
      const existing = JSON.parse(existingBookingsStr);
      existing.push(newBooking);
      localStorage.setItem('apex_appointments', JSON.stringify(existing));
    } catch (err) {
      console.error("Local storage booking save failed: ", err);
    }

    setBookingRef(refCode);
    setBookingSuccess(true);
    
    // Clear form
    setName('');
    setPhone('');
    setDate('');
    setMessage('');
    onClearChoice();
  };

  const handleDismissSuccess = () => {
    setBookingSuccess(false);
    setBookingRef('');
  };

  const servicesList = [
    ...config.services.map((s) => s.title),
    ...config.packages.map((p) => p.name),
    'Corporate Employee Screening Plan',
    'General Medical Checkup'
  ];


  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-50 text-teal-600 uppercase border border-teal-200/50 mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-none">
              Schedule Your Diagnostics
            </h2>
            <p className="mt-4 text-base text-slate-500 font-sans">
              Book a test in less than a minute, or contact our medical desk directly with any queries.
            </p>
          </motion.div>
        </div>

        {/* Contact/Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Contact details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-display font-extrabold text-slate-800">
                Contact Information
              </h3>
              
              {/* Cards for Info */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-teal-50 text-teal-600 rounded-xl border border-teal-100/50">
                    <DynamicIcon name="MapPin" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">Center Location</h4>
                    <p className="text-sm text-slate-500 leading-normal mt-1">
                      {config.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-teal-50 text-teal-600 rounded-xl border border-teal-100/50">
                    <DynamicIcon name="Phone" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">Phone Support</h4>
                    <p className="text-sm text-slate-500 leading-normal mt-1">
                      {config.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-teal-50 text-teal-600 rounded-xl border border-teal-100/50">
                    <DynamicIcon name="Mail" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">Email Address</h4>
                    <p className="text-sm text-slate-500 leading-normal mt-1">
                      info@{config.siteTitle.toLowerCase().split(' ')[0] || "apex"}.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 p-3 bg-teal-50 text-teal-600 rounded-xl border border-teal-100/50">
                    <DynamicIcon name="Clock" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 font-sans">Working Hours</h4>
                    <div className="text-xs text-slate-500 font-mono mt-1 space-y-0.5">
                      <p>Mon - Fri: 07:00 AM - 08:00 PM</p>
                      <p>Sat - Sun: 08:00 AM - 04:00 PM</p>
                      <p className="text-teal-600 font-sans font-semibold">Home Sample Collection: 24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Follow our health feeds
              </h4>
              <div className="flex space-x-3 text-sm font-semibold text-slate-600 font-sans">
                <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">Facebook</a>
                <span className="text-slate-300">•</span>
                <a href={config.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">Twitter</a>
                <span className="text-slate-300">•</span>
                <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">Instagram</a>
                <span className="text-slate-300">•</span>
                <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Column 2: Appointment Form Card */}
          <div className="lg:col-span-7">
            <motion.div
              layout
              className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-sm relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {!bookingSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-lg font-display font-bold text-slate-800">
                        Book a Diagnostics Appointment
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-1">
                        Select a test. We will confirm your exact slot within 15 minutes.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                            Desired Test / Package
                          </label>
                          <select
                            required
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
                          >
                            <option value="" disabled>Select diagnostics service...</option>
                            {servicesList.map((srv, idx) => (
                              <option key={idx} value={srv}>{srv}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                            Preferred Date
                          </label>
                          <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                          Patient Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="List any symptoms, past reports, or requirements (e.g. Home Blood Sample Collection needed)..."
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-display font-bold py-3.5 px-6 rounded-xl transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <DynamicIcon name="Calendar" className="w-4 h-4 text-white" />
                        <span>Confirm Appointment Reservation</span>
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-6 space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <DynamicIcon name="CheckCircle2" className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-extrabold text-slate-800">
                        Appointment Slot Confirmed!
                      </h3>
                      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        Your slot reservation is logged in our central register. Our booking desk will phone you in 15 minutes to finalize your timing and details.
                      </p>
                    </div>

                    <div className="inline-block bg-teal-50 border border-teal-100 rounded-xl px-5 py-3 font-mono text-xs">
                      <span className="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-1">Booking Reference ID</span>
                      <span className="text-teal-700 font-bold text-base">{bookingRef}</span>
                    </div>

                    <div className="pt-4 border-t border-slate-200 max-w-sm mx-auto flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleDismissSuccess}
                        className="flex-1 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-display font-bold text-xs py-3 px-4 rounded-xl transition cursor-pointer"
                      >
                        Book Another Test
                      </button>
                      
                      <a
                        href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                          `Hi, I have reserved a diagnostics slot on the web portal. Reference Code: ${bookingRef}. Please confirm my slot timings.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-display font-bold text-xs py-3 px-4 rounded-xl transition shadow flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <DynamicIcon name="MessageSquare" className="w-4 h-4 text-white" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

        {/* Google Maps Embed Frame */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-lg border border-slate-200"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115810.02432924151!2d-122.44146145322986!3d37.757189196810245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${config.siteTitle} Clinic Location Map`}
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
}

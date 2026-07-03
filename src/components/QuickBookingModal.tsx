import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DynamicIcon from './DynamicIcon';
import { useAppConfig } from '../context/ConfigContext';

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService: string;
}

export default function QuickBookingModal({ isOpen, onClose, preSelectedService }: QuickBookingModalProps) {
  const { config } = useAppConfig();
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (8:00 AM - 12:00 PM) - Recommended for Fasting');
  const [homeCollection, setHomeCollection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Combine services and packages for dropdown selection
  const allAvailableServices = React.useMemo(() => {
    const list = config.services.map(s => s.title);
    config.packages.forEach(p => list.push(p.name));
    list.push('Other General Medical Consultation');
    return list;
  }, [config.services, config.packages]);


  // Update selection if preSelectedService changes
  useEffect(() => {
    if (preSelectedService) {
      setSelectedService(preSelectedService);
    } else {
      setSelectedService('General Medical Checkup');
    }
  }, [preSelectedService, isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);

    // Simulate clinical api processing
    setTimeout(() => {
      const id = 'APX-' + Math.floor(10000 + Math.random() * 90000);
      setGeneratedBookingId(id);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const resetModal = () => {
    setPatientName('');
    setPhoneNumber('');
    setBookingDate('');
    setHomeCollection(false);
    setSubmitSuccess(false);
    setGeneratedBookingId('');
    onClose();
  };

  const getWhatsAppMessage = () => {
    const serviceDetails = selectedService || 'General Diagnostics';
    const collectionText = homeCollection ? 'Yes (Home Sample Collection requested)' : 'No (In-clinic appointment)';
    const dateText = bookingDate ? `on ${bookingDate}` : '';
    const text = `Hi ${config.siteTitle}, I would like to confirm my clinical appointment.
    
📝 *Booking Reference:* ${generatedBookingId}
👤 *Patient Name:* ${patientName}
📞 *Phone Number:* ${phoneNumber}
🔬 *Test/Package:* ${serviceDetails}
📅 *Preferred Date:* ${dateText} (${timeSlot})
🏠 *Home Collection:* ${collectionText}

Please guide me with the pre-test instructions and confirmation detail.`;
    return encodeURIComponent(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-slate-100"
          >
            {/* Header banner */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-6 text-white relative shrink-0">
              <button
                onClick={resetModal}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition duration-200 focus:outline-none"
                aria-label="Close booking modal"
              >
                <DynamicIcon name="X" className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase">
                  {config.siteTitle.split(' ')[0] || "Apex"} Rapid Booking Deck
                </span>
              </div>
              <h3 className="text-xl font-display font-extrabold tracking-tight">
                Clinical Reservation Desk
              </h3>
              <p className="text-xs text-slate-300 font-sans mt-1">
                Fill out this quick form. Zero service delays, instant pathologist assignment.
              </p>
            </div>

            {/* Success Stage */}
            {submitSuccess ? (
              <div className="p-8 text-center space-y-6 overflow-y-auto flex-grow">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                  className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 mx-auto"
                >
                  <DynamicIcon name="Check" className="w-8 h-8" />
                </motion.div>

                <div className="space-y-2">
                  <h4 className="text-xl font-display font-extrabold text-slate-800">
                    Clinical Booking Received!
                  </h4>
                  <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                    Dear <span className="font-bold text-slate-700">{patientName}</span>, your reservation has been securely logged in our digital pathological queue system.
                  </p>
                </div>

                {/* Patient Booking ID Highlight */}
                <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl max-w-xs mx-auto text-center space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold block">
                    Your Booking reference ID
                  </span>
                  <span className="text-2xl font-mono font-black text-teal-600 tracking-wider block">
                    {generatedBookingId}
                  </span>
                  <span className="text-[10px] font-sans text-slate-400 block mt-1">
                    NABL Audit Assured
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  {/* WhatsApp Quick Link */}
                  <a
                    href={`https://wa.me/${config.whatsapp}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-500/15 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <DynamicIcon name="MessageSquare" className="w-5 h-5 fill-white" />
                    <span>Instant Confirm via WhatsApp</span>
                  </a>

                  <button
                    onClick={resetModal}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold py-3.5 px-6 rounded-2xl transition duration-300 cursor-pointer"
                  >
                    Close Booking Deck
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form Stage */
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto flex-grow">
                {/* Selected Test / Package Dropdown */}
                <div>
                  <label htmlFor="modal-service" className="block text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">
                    Diagnostic Test / Health Package
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <DynamicIcon name="Microscope" className="w-4 h-4" />
                    </div>
                    <select
                      id="modal-service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm font-sans transition-all cursor-pointer"
                    >
                      {allAvailableServices.map((serviceName) => (
                        <option key={serviceName} value={serviceName}>
                          {serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Name Input */}
                <div>
                  <label htmlFor="modal-name" className="block text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">
                    Patient's Full Name
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <DynamicIcon name="User" className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="modal-name"
                      required
                      placeholder="Enter patient full name..."
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">
                    Mobile Number (For WhatsApp Reports)
                  </label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <DynamicIcon name="Phone" className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="modal-phone"
                      required
                      placeholder="e.g., 9876543210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Scheduling Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Appointment Date */}
                  <div>
                    <label htmlFor="modal-date" className="block text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        type="date"
                        id="modal-date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm font-sans transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label htmlFor="modal-time" className="block text-xs font-bold text-slate-500 font-mono uppercase tracking-wider mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      id="modal-time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="block w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm font-sans transition-all cursor-pointer"
                    >
                      <option value="Morning (8:00 AM - 12:00 PM) - Recommended for Fasting">
                        Morning (8 AM - 12 PM) ★ Recommended
                      </option>
                      <option value="Afternoon (12:00 PM - 4:00 PM)">
                        Afternoon (12 PM - 4 PM)
                      </option>
                      <option value="Evening (4:00 PM - 7:00 PM)">
                        Evening (4 PM - 7 PM)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Home Sample Collection Toggle (Clinical value-add) */}
                <div className="bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl border border-slate-150 transition duration-200">
                  <label className="flex items-start space-x-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={homeCollection}
                      onChange={(e) => setHomeCollection(e.checked || e.target.checked)}
                      className="mt-1 w-4.5 h-4.5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                        <DynamicIcon name="MapPin" className="w-4 h-4 text-teal-600" />
                        Request Home Sample Collection
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5 leading-relaxed">
                        Our NABL-certified phlebotomist will visit your home/office to collect the samples. Completely sterile, contactless, and certified clinical processing.
                      </span>
                    </div>
                  </label>
                </div>

                {/* Submission CTA Button with Cancel */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={resetModal}
                    className="sm:w-1/3 order-2 sm:order-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold py-3.5 px-4 rounded-2xl transition duration-300 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-grow order-1 sm:order-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-display font-extrabold text-base py-3.5 px-6 rounded-2xl transition duration-300 cursor-pointer shadow-lg hover:shadow-orange-500/20 text-center flex items-center justify-center space-x-2.5"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <DynamicIcon name="ShieldCheck" className="w-5 h-5 text-white" />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

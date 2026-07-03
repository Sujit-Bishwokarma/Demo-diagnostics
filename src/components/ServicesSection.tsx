import React, { useState, useMemo } from 'react';
import { useAppConfig } from '../context/ConfigContext';
import { ServiceItem } from '../types';
import DynamicIcon from './DynamicIcon';
import { motion, AnimatePresence } from 'motion/react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

// ServiceImage sub-component to handle beautiful image loading states and increased size transitions
const ServiceImage = ({ src, alt, priceEstimate, iconName }: { src: string; alt: string; priceEstimate: string; iconName: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-slate-100 group shrink-0">
      {/* Skeleton Shimmer Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-150 animate-pulse flex flex-col items-center justify-center z-10">
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-teal-600 animate-spin" />
          <span className="text-[10px] text-slate-500 font-mono mt-3 uppercase tracking-widest font-semibold">Loading Photo...</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
      
      {/* Floating Price Tag */}
      <span className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
        {priceEstimate}
      </span>

      {/* Icon over image corner */}
      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/95 text-teal-600 flex items-center justify-center shadow-md backdrop-blur-sm border border-white/50 z-20">
        <DynamicIcon name={iconName} className="w-5 h-5" />
      </div>
    </div>
  );
};

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const { config } = useAppConfig();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Lab' | 'Imaging' | 'Scans' | 'Preventive'>('All');
  const [selectedDetailService, setSelectedDetailService] = useState<ServiceItem | null>(null);

  // Categories helper
  const filteredServices = useMemo(() => {
    return config.services.filter((service) => {
      // Search matches
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Category matches
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Lab' && (service.id.includes('lab') || service.id.includes('pathology'))) return true;
      if (selectedCategory === 'Imaging' && (service.id.includes('xray') || service.id.includes('ultrasound'))) return true;
      if (selectedCategory === 'Scans' && (service.id.includes('mri') || service.id.includes('genetic'))) return true;
      if (selectedCategory === 'Preventive' && (service.id.includes('fullbody') || service.id.includes('cardiac'))) return true;

      return false;
    });
  }, [searchQuery, selectedCategory, config.services]);

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background grid element */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-50 text-teal-600 uppercase border border-teal-200/50 mb-4">
              {config.servicesBadge || 'Diagnostic Directory & Price Catalog'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-tight">
              {config.servicesTitle || 'Clinical Diagnostic Catalog'}
            </h2>
            <p className="mt-4 text-base text-slate-500 font-sans leading-relaxed">
              {config.servicesSubtitle || 'Search through our complete list of diagnostics services, verify pricing transparency, and book appointments instantly.'}
            </p>
          </motion.div>
        </div>

        {/* Search Bar & Categories Control Panel */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="relative rounded-2xl shadow-sm bg-white p-2 border border-slate-200 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <DynamicIcon name="Search" className="w-5 h-5" />
              </div>
              <input
                id="catalog-search-input"
                type="text"
                placeholder="Search diagnostic services (e.g., Blood test, MRI, Ultrasound, Cardiac)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-base font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <DynamicIcon name="X" className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Quick Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-mono uppercase mr-2">Filter Category:</span>
            {[
              { id: 'All', label: 'All Services' },
              { id: 'Lab', label: 'Clinical Lab & Pathology' },
              { id: 'Imaging', label: 'X-Ray & Ultrasound' },
              { id: 'Scans', label: 'MRI, CT & Genetics' },
              { id: 'Preventive', label: 'Preventive & Cardiac' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/15'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with AnimatePresence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Service Image Section with loading state */}
                <ServiceImage
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800'}
                  alt={service.title}
                  priceEstimate={service.priceEstimate}
                  iconName={service.iconName}
                />

                {/* Content Section */}
                <div className="flex flex-col p-6 flex-grow">
                  <h3 className="text-lg font-display font-extrabold text-slate-800 mb-2 leading-snug">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Metadata and Details */}
                  <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400">Est. Price:</span>
                      <span className="font-bold text-slate-700 text-sm font-sans">{service.priceEstimate}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400">Reporting TAT:</span>
                      <span className="font-bold text-teal-600 text-sm font-sans">{service.duration}</span>
                    </div>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedDetailService(service)}
                      className="flex items-center justify-center space-x-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-sans text-xs font-bold py-3 px-2 rounded-2xl transition-all duration-300 cursor-pointer border border-slate-200"
                    >
                      <DynamicIcon name="Info" className="w-4 h-4 text-teal-600" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="flex items-center justify-center space-x-1.5 bg-orange-500 hover:bg-orange-600 text-white font-sans text-xs font-extrabold py-3 px-2 rounded-2xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-orange-500/15"
                    >
                      <span>Book Test</span>
                      <DynamicIcon name="Calendar" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search Feedback */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 max-w-lg mx-auto"
          >
            <div className="w-16 h-16 bg-slate-50 text-slate-400 flex items-center justify-center rounded-full mx-auto mb-4">
              <DynamicIcon name="Search" className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-slate-700 text-lg">No services match your query</h4>
            <p className="text-sm text-slate-500 mt-2 px-6">
              Try search keywords like "blood", "ECG", "scan", or browse our filters above.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans text-sm font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
              >
                Clear Search filters
              </button>
              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                  "Hi, I am looking for a specific diagnostic service not listed on the site."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-700 text-white font-sans text-sm font-semibold py-2 px-4 rounded-xl transition flex items-center space-x-1.5"
              >
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}

        {/* Bottom Booking CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 p-8 sm:p-10 rounded-3xl shadow-xl border border-teal-800/20 text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider bg-orange-500/15 text-orange-400 uppercase border border-orange-500/25">
              Rapid Reservation Box
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl">
              Can't find your specific clinical test or doctor package?
            </h3>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Our support physicians are available to build custom diagnostic suites tailored for your clinical symptoms or chronic history. Contact us right now!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => onSelectService('General Medical Checkup')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-sm py-3.5 px-6 rounded-2xl transition duration-300 text-center shadow-lg hover:shadow-orange-500/20 cursor-pointer flex items-center justify-center space-x-2"
            >
              <DynamicIcon name="Calendar" className="w-4 h-4 text-white" />
              <span>Book Appointment Reservation</span>
            </button>
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
                "Hi, I'd like to discuss my prescribed tests and book a home sample collection."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white font-sans text-sm font-semibold py-3.5 px-6 rounded-2xl transition duration-300 text-center border border-slate-700 flex items-center justify-center space-x-2"
            >
              <span>Instant WhatsApp Desk</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Test Details Modal */}
      <AnimatePresence>
        {selectedDetailService && (
          <TestDetailsModal
            service={selectedDetailService}
            onClose={() => setSelectedDetailService(null)}
            onBook={onSelectService}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Beautifully stylized modal displaying test details and transparent prices in NPR
interface TestDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBook: (serviceName: string) => void;
}

const TestDetailsModal = ({ service, onClose, onBook }: TestDetailsModalProps) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal content box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10"
      >
        {/* Top Header Banner with image background */}
        <div className="h-44 w-full relative shrink-0">
          <img
            src={service.imageUrl || 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800'}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/50 text-white hover:bg-slate-900/80 transition cursor-pointer"
          >
            <DynamicIcon name="X" className="w-5 h-5" />
          </button>

          {/* Title & Category Info inside overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-teal-500/95 text-[10px] font-bold font-mono uppercase tracking-wider mb-2">
              <DynamicIcon name={service.iconName} className="w-3.5 h-3.5" />
              <span>{service.title} Package</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
              {service.title} Details
            </h3>
          </div>
        </div>

        {/* Scrolling Details Section */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-2">Service Description</h4>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* List of individual test points & prices */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                Test Points &amp; Pricing Breakdown
              </h4>
              <span className="text-xs font-bold text-teal-600 font-mono">
                Est. Range: {service.priceEstimate}
              </span>
            </div>

            <div className="space-y-3">
              {service.testPoints && service.testPoints.length > 0 ? (
                service.testPoints.map((test, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-150 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 max-w-md">
                      <span className="font-sans font-bold text-slate-800 text-sm sm:text-base flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span>{test.name}</span>
                      </span>
                      {test.description && (
                        <p className="text-xs text-slate-500 leading-relaxed pl-3.5">
                          {test.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right self-end sm:self-center pl-3.5">
                      <span className="text-sm font-extrabold text-teal-700 bg-teal-50 border border-teal-100/50 px-3 py-1 rounded-xl">
                        {test.price}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 text-sm italic">No specific individual test points available.</p>
              )}
            </div>
          </div>

          {/* Transparency Note */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-amber-800 text-xs flex items-start space-x-3">
            <DynamicIcon name="AlertTriangle" className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
            <div className="leading-relaxed">
              <strong className="font-bold">Transparent Pricing Policy:</strong> Listed rates are fully inclusive of sample collection, high-frequency diagnostic scans, and fast digital reporting. No hidden facility charges are applied at confirmation.
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-center sm:text-left">
            <span className="block text-[10px] uppercase text-slate-400 font-mono">Estimated cost range:</span>
            <span className="text-lg font-extrabold text-slate-800 font-sans">{service.priceEstimate}</span>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial bg-white hover:bg-slate-100 text-slate-700 font-sans font-bold py-3 px-5 rounded-xl border border-slate-200 transition cursor-pointer text-center text-sm"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onBook(service.title);
                onClose();
              }}
              className="flex-1 sm:flex-initial bg-orange-500 hover:bg-orange-600 text-white font-sans font-extrabold py-3 px-6 rounded-xl transition cursor-pointer text-center text-sm shadow-md hover:shadow-orange-500/10 flex items-center justify-center space-x-1.5"
            >
              <DynamicIcon name="Calendar" className="w-4 h-4" />
              <span>Book This Package</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

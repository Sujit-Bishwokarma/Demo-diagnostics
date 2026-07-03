import React, { useState, useEffect, useRef } from 'react';
import { useAppConfig } from '../context/ConfigContext';
import DynamicIcon from './DynamicIcon';
import { motion, AnimatePresence } from 'motion/react';

export default function TestimonialsSection() {
  const { config } = useAppConfig();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    stopAutoSlide();
    if (config.testimonials.length === 0) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % config.testimonials.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [config.testimonials.length]);

  const handlePrev = () => {
    if (config.testimonials.length === 0) return;
    stopAutoSlide();
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + config.testimonials.length) % config.testimonials.length);
    startAutoSlide();
  };

  const handleNext = () => {
    if (config.testimonials.length === 0) return;
    stopAutoSlide();
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % config.testimonials.length);
    startAutoSlide();
  };

  // Guard in case index is out of bounds after deletion
  const validIndex = activeIndex >= config.testimonials.length ? 0 : activeIndex;
  const current = config.testimonials[validIndex];

  if (!current) {
    return null;
  }


  return (
    <section id="testimonials" className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-100 text-teal-800 uppercase mb-4">
              {config.testimonialsBadge || 'Patient Feedback'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-none">
              {config.testimonialsTitle || 'What Our Patients Say'}
            </h2>
            <p className="mt-4 text-sm text-slate-500 font-sans">
              {config.testimonialsSubtitle || 'Real stories from individuals and business groups who trust our diagnostic workflows.'}
            </p>
          </motion.div>
        </div>

        {/* Carousel Window */}
        <div className="relative min-h-[320px] md:min-h-[260px] flex items-center justify-center">
          
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 100 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full bg-white rounded-3xl border border-slate-200/60 p-8 md:p-10 shadow-lg text-center md:text-left md:flex items-start gap-8"
            >
              {/* Giant quote mark / aesthetic icon */}
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto md:mx-0 mb-6 md:mb-0 flex-shrink-0 border border-teal-100/50">
                <span className="font-serif text-5xl leading-none text-teal-400 select-none">“</span>
              </div>

              {/* Text content */}
              <div className="flex-grow space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center justify-center md:justify-start space-x-1">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx}>
                      <DynamicIcon
                        name="Star"
                        className={`w-5 h-5 ${idx < current.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                      />
                    </span>
                  ))}
                </div>

                {/* Comment quote */}
                <p className="text-slate-600 text-base md:text-lg font-sans leading-relaxed italic">
                  "{current.comment.replace(/Apex Diagnostics/g, config.siteTitle).replace(/Apex/g, config.siteTitle.split(' ')[0])}"
                </p>

                {/* Signature */}
                <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display font-extrabold text-slate-800 text-base">
                      {current.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Verified {current.relation}
                    </p>
                  </div>
                  
                  {/* Badge */}
                  <div className="inline-flex self-center md:self-auto items-center px-2.5 py-1 rounded-md text-[10px] font-bold font-mono tracking-wider uppercase bg-teal-50 text-teal-700 border border-teal-100/30">
                    Verified Diagnostics
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute top-1/2 -left-4 -right-4 md:-left-8 md:-right-8 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 shadow-md transition pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <DynamicIcon name="ChevronLeft" className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 shadow-md transition pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Next Testimonial"
            >
              <DynamicIcon name="ChevronRight" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {config.testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                stopAutoSlide();
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
                startAutoSlide();
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'bg-teal-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

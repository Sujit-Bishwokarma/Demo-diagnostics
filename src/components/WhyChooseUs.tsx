import React from 'react';
import { useAppConfig } from '../context/ConfigContext';
import { WHY_CHOOSE_US } from '../data';
import DynamicIcon from './DynamicIcon';
import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const { config } = useAppConfig();
  return (
    <section id="why-choose-us" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Header column */}
          <div className="lg:col-span-5 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-100 text-teal-800 uppercase mb-4">
                {config.whyChooseUsBadge || 'Our Guarantee'}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-none">
                {config.whyChooseUsTitle || 'Clinical Standards You Can Count On'}
              </h2>
              <p className="mt-4 text-base text-slate-500 font-sans leading-relaxed">
                {config.whyChooseUsSubtitle || 'Health decisions require total clarity. We hold ourselves to uncompromising accuracy levels and extreme efficiency to give you, your family, and your physician immediate peace of mind.'}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 text-xs font-mono font-bold text-slate-500">
                <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm">
                  <DynamicIcon name="ShieldCheck" className="text-teal-600 w-4 h-4" />
                  <span>NABL Standardized</span>
                </div>
                <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200/60 shadow-sm">
                  <DynamicIcon name="Award" className="text-teal-600 w-4 h-4" />
                  <span>ISO 9001 Audited</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core values list */}
          <div className="lg:col-span-7 space-y-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex items-start p-6 bg-white rounded-3xl border border-slate-200/50 hover:border-teal-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Visual Icon Badge */}
                <div className="mr-5 p-3.5 rounded-xl bg-teal-50 text-teal-600 flex-shrink-0 border border-teal-100/50">
                  <DynamicIcon name={item.iconName} className="w-6 h-6" />
                </div>
                
                {/* Text Context */}
                <div>
                  <h3 className="text-lg font-display font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed max-w-xl">
                    {item.reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}

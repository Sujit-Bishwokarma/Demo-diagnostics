import React from 'react';
import { CERTIFICATIONS } from '../data';
import { useAppConfig } from '../context/ConfigContext';
import DynamicIcon from './DynamicIcon';
import { motion } from 'motion/react';

export default function AboutSection() {
  const { config } = useAppConfig();
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        {/* About Center Story */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-50 text-teal-600 uppercase border border-teal-200/50 mb-4">
              Our Legacy
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-none">
              Compassionate Care Meets Absolute Precision
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed font-sans font-medium">
              Apex Diagnostics & Research Center has been Metro City's most trusted testing center since 2012. We leverage state-of-the-art medical technology to provide swift, highly accurate diagnostics in a welcoming environment.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-xl font-display font-bold text-slate-800">
              Our Expert Medical Board
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Highly specialized doctors overseeing all pathology audits and clinical diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-slate-50 rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col items-center text-center hover:bg-white hover:border-teal-100 hover:shadow-md transition-all duration-300"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-display font-bold text-slate-800 text-base">
                  {member.name}
                </h4>
                <p className="text-xs text-teal-600 font-medium font-mono uppercase tracking-wider mt-1">
                  {member.title}
                </p>
                <p className="text-xs text-slate-400 mt-2 font-sans max-w-[220px]">
                  {member.specialty}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Equipment & Certifications Row */}
        <div className="border-t border-slate-100 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-sm font-semibold font-mono text-slate-400 uppercase tracking-widest">
              Accreditations & Clinical Standards
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm hover:scale-102 transition-transform duration-200"
              >
                <div className="p-3 bg-teal-50 text-teal-600 rounded-lg border border-teal-100/50">
                  <DynamicIcon name={cert.icon} className="w-5 h-5" />
                </div>
                <span className="text-xs font-display font-bold text-slate-700 leading-tight">
                  {cert.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { CORPORATE_PLAN } from '../data';
import { useAppConfig } from '../context/ConfigContext';
import DynamicIcon from './DynamicIcon';
import { motion } from 'motion/react';

interface HealthPackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export default function HealthPackages({ onSelectPackage }: HealthPackagesProps) {
  const { config } = useAppConfig();
  return (
    <section id="packages" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-50 text-teal-600 uppercase border border-teal-200/50 mb-4">
              {config.packagesBadge || 'Preventative Healthcare'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-none">
              {config.packagesTitle || 'Health Packages & Screening Plans'}
            </h2>
            <p className="mt-4 text-base text-slate-500 font-sans leading-relaxed">
              {config.packagesSubtitle || 'Investing in early detection is the smartest health choice. Select our medical-expert designed health panels below.'}
            </p>
          </motion.div>
        </div>

        {/* Individual Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {config.packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`flex flex-col relative rounded-3xl p-8 border transition-all duration-300 ${
                pkg.popular
                  ? 'border-teal-500 bg-white shadow-xl ring-2 ring-teal-500/10'
                  : 'border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-200 shadow-sm'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white text-xs font-bold font-mono tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md flex items-center space-x-1">
                  <DynamicIcon name="Sparkles" className="w-3.5 h-3.5 animate-bounce" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Package Meta */}
              <div className="mb-6">
                <h3 className="text-xl font-display font-bold text-slate-800">
                  {pkg.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  {pkg.targetAudience}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline mb-6 border-b border-slate-100 pb-6">
                <span className="text-3xl font-display font-extrabold text-slate-800">
                  NPR {pkg.price.toLocaleString()}
                </span>
                <span className="text-slate-400 ml-2 text-sm font-sans">/ full screening</span>
              </div>

              {/* Test List */}
              <p className="text-sm font-semibold text-slate-700 mb-4 font-sans">
                Included Diagnostics:
              </p>
              <ul className="space-y-3 flex-grow mb-8">
                {pkg.includedTests.map((test, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-500 leading-normal">
                    <DynamicIcon
                      name="Check"
                      className="text-teal-500 w-4 h-4 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span>{test}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Info & Button */}
              <div className="pt-6 border-t border-slate-100 mt-auto">
                <p className="text-xs text-slate-400 leading-normal mb-5 italic">
                  {pkg.description}
                </p>
                <button
                  onClick={() => onSelectPackage(pkg.name)}
                  className={`w-full py-3.5 px-6 rounded-xl text-center font-display font-bold text-sm transition-all duration-300 cursor-pointer shadow-sm ${
                    pkg.popular
                      ? 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-lg'
                      : 'bg-slate-200/60 hover:bg-teal-600 hover:text-white text-slate-700'
                  }`}
                >
                  Book Screen Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Corporate Package Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative bg-slate-800 rounded-3xl p-8 lg:p-12 overflow-hidden shadow-lg border border-slate-700"
        >
          {/* Decorative radial gradient */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-slate-500/10 blur-3xl pointer-events-none" />

          <div className="relative lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-400/15 text-teal-300 border border-teal-500/30 mb-4">
                <DynamicIcon name="Building" className="w-3.5 h-3.5" />
                <span>Enterprise Health</span>
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                {CORPORATE_PLAN.name}
              </h3>
              <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
                {CORPORATE_PLAN.description}
              </p>

              {/* Bullet Features Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CORPORATE_PLAN.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start">
                    <DynamicIcon name="CheckCircle2" className="text-teal-400 w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-300 text-xs md:text-sm leading-normal">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Actions Card */}
            <div className="lg:col-span-5 mt-8 lg:mt-0 flex flex-col justify-center bg-slate-700/40 backdrop-blur-sm border border-slate-600/40 p-6 sm:p-8 rounded-3xl">
              <h4 className="font-display font-bold text-white text-lg mb-2">
                Customized Staff Plans
              </h4>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                We design specialized group checkup matrices corresponding to your company budget, workplace requirements, and schedules.
              </p>
              <button
                onClick={() => onSelectPackage('Corporate Employee Screening Plan')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-display font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                Inquire For Corporate Rates
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

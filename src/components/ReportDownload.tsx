import React, { useState } from 'react';
import { SAMPLE_REPORTS } from '../data';
import { useAppConfig } from '../context/ConfigContext';
import { PatientReport } from '../types';
import DynamicIcon from './DynamicIcon';
import { motion, AnimatePresence } from 'motion/react';

export default function ReportDownload() {
  const { config } = useAppConfig();
  const [patientId, setPatientId] = useState('');
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundReport, setFoundReport] = useState<PatientReport | null>(null);
  const [searchedText, setSearchedText] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const pid = patientId.trim().toLowerCase();
    const phoneNum = phone.trim();

    if (!pid && !phoneNum) return;

    setSearchedText([patientId.trim(), phone.trim()].filter(Boolean).join(' / '));

    // Find by phone and/or patientId
    const report = SAMPLE_REPORTS.find((r) => {
      if (pid && phoneNum) {
        return r.patientId.toLowerCase() === pid && r.phone === phoneNum;
      }
      if (pid) {
        return r.patientId.toLowerCase() === pid;
      }
      if (phoneNum) {
        return r.phone === phoneNum;
      }
      return false;
    });

    setFoundReport(report || null);
    setSearched(true);
  };

  const resetSearch = () => {
    setPatientId('');
    setPhone('');
    setSearched(false);
    setFoundReport(null);
    setSearchedText('');
  };

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp click handler
  const getWhatsAppLink = (messageText: string) => {
    const encodedText = encodeURIComponent(messageText);
    return `https://wa.me/${config.whatsapp}?text=${encodedText}`;
  };


  return (
    <section id="reports" className="py-24 bg-slate-50 border-y border-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-mono tracking-wider bg-teal-100 text-teal-800 uppercase mb-4">
              Patient Portal
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 tracking-tight leading-none">
              Download Diagnostic Reports
            </h2>
            <p className="mt-4 text-sm text-slate-500 font-sans">
              Enter your Patient ID or registered Phone Number below to locate your clinical summaries.
            </p>
          </motion.div>
        </div>

        {/* Search Panel Card */}
        <motion.div
          layout
          className="bg-white rounded-3xl shadow-xl border border-slate-200/60 p-6 md:p-8"
        >
          {!searched ? (
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient ID Field */}
                <div>
                  <label htmlFor="patient-id" className="block text-sm font-semibold text-slate-700 mb-2 font-sans">
                    Patient ID
                  </label>
                  <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <DynamicIcon name="User" className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      id="patient-id"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      placeholder="e.g., PT-101"
                      className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white text-base font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2 font-sans">
                    Phone Number
                  </label>
                  <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <DynamicIcon name="Phone" className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 9876543210"
                      className="block w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white text-base font-sans transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400 leading-normal font-sans">
                  <span className="font-semibold block sm:inline text-slate-500 mr-1.5">💡 Demo Search Credentials:</span>
                  <button
                    type="button"
                    onClick={() => { setPatientId('PT-101'); setPhone('9876543210'); }}
                    className="underline text-teal-600 hover:text-teal-700 font-mono mr-2.5 cursor-pointer font-medium"
                  >
                    PT-101 (9876543210)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPatientId('PT-102'); setPhone('8765432109'); }}
                    className="underline text-teal-600 hover:text-teal-700 font-mono mr-2.5 cursor-pointer font-medium"
                  >
                    PT-102 (8765432109)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setPatientId('PT-103'); setPhone('5555555555'); }}
                    className="underline text-teal-600 hover:text-teal-700 font-mono cursor-pointer font-medium"
                  >
                    PT-103 (5555555555)
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!patientId.trim() && !phone.trim()}
                  className={`w-full sm:w-auto font-display font-bold py-3.5 px-8 rounded-2xl shadow-md transition-all duration-300 text-center ${
                    !patientId.trim() && !phone.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer hover:shadow-lg'
                  }`}
                >
                  Find My Report
                </button>
              </div>
            </form>
          ) : (
            <AnimatePresence mode="wait">
              {foundReport && foundReport.status === 'Ready' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Status header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        <DynamicIcon name="CheckCircle2" className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-slate-800">
                          Report Available
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          ID: {foundReport.patientId} | Collected: {foundReport.dateCollected}
                        </p>
                      </div>
                    </div>
                    
                    <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide bg-emerald-50 text-emerald-700 border border-emerald-200">
                      STATUS: READY
                    </span>
                  </div>

                  {/* Report Body Details */}
                  <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
                      <div>
                        <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Patient Name</span>
                        <span className="text-slate-800 font-bold">{foundReport.patientName}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Assigned Diagnosis</span>
                        <span className="text-teal-700 font-bold">{foundReport.testName}</span>
                      </div>
                    </div>

                    {foundReport.vitals && (
                      <div className="pt-4 border-t border-slate-100">
                        <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider mb-3">Key Vitals Parameters</span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Blood Pressure</span>
                            <span className="text-slate-800 font-bold text-sm font-sans">{foundReport.vitals.bloodPressure}</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Blood Sugar</span>
                            <span className="text-slate-800 font-bold text-sm font-sans">{foundReport.vitals.bloodSugar}</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Cholesterol</span>
                            <span className="text-slate-800 font-bold text-sm font-sans">{foundReport.vitals.cholesterol}</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-slate-400 block text-[10px] uppercase font-bold">Hemoglobin</span>
                            <span className="text-slate-800 font-bold text-sm font-sans">{foundReport.vitals.hemoglobin}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider mb-1.5">Radiology / Lab Comments</span>
                      <p className="text-sm text-slate-600 leading-relaxed italic bg-white p-3.5 rounded-xl border border-slate-100">
                        "{foundReport.resultsSummary}"
                      </p>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                    <button
                      onClick={resetSearch}
                      className="text-sm font-semibold text-slate-500 hover:text-slate-700 flex items-center space-x-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      <span>← Lookup Another</span>
                    </button>
                    
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold py-3 px-5 rounded-xl text-sm transition-all text-center cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <DynamicIcon name="Print" className="w-4 h-4" />
                        <span>Print Details</span>
                      </button>
                      
                      <a
                        href={foundReport.downloadUrl}
                        download={`Report_${foundReport.patientId}.pdf`}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Simulating PDF Download for Patient ID ${foundReport.patientId}: Report_${foundReport.patientName.replace(' ', '_')}.pdf has been saved.`);
                        }}
                        className="flex-1 sm:flex-initial bg-teal-600 hover:bg-teal-700 text-white font-display font-bold py-3 px-6 rounded-xl text-sm shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <DynamicIcon name="Download" className="w-4 h-4" />
                        <span>Download PDF Report</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
                    <DynamicIcon name="AlertCircle" className="w-8 h-8" />
                  </div>

                  <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-display font-extrabold text-slate-800">
                      {foundReport && foundReport.status === 'Reviewing' ? 'Report Under Review' : 'Report Not Ready Yet'}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed font-sans">
                      {foundReport && foundReport.status === 'Reviewing'
                        ? `The diagnostics for Patient ${foundReport.patientName} (${foundReport.testName}) are completed and currently undergoing medical audit by our lead pathologist. Ready very soon!`
                        : `We were unable to locate any finalized reports matching "${searchedText}". They may still be in processing or the credentials entered are incorrect.`}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={resetSearch}
                      className="w-full sm:w-auto text-sm font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 hover:bg-slate-50 px-5 py-3 rounded-xl transition cursor-pointer"
                    >
                      Go Back & Search Again
                    </button>
                    
                    <a
                      href={getWhatsAppLink(
                        foundReport && foundReport.status === 'Reviewing'
                          ? `Hi, I am checking the status of my report (Patient ID: ${foundReport.patientId}, Name: ${foundReport.patientName}). The portal says it's under clinical review.`
                          : `Hi, I am unable to locate my medical diagnostics report on the portal. Please help! My search inputs were: ${searchedText}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-display font-bold py-3 px-6 rounded-xl text-sm shadow-md flex items-center justify-center space-x-2.5 cursor-pointer"
                    >
                      <DynamicIcon name="MessageSquare" className="w-4 h-4 text-white" />
                      <span>Contact us on WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}

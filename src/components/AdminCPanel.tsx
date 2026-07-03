import React, { useState, useRef, useEffect } from 'react';
import { useAppConfig } from '../context/ConfigContext';
import { ServiceItem, PackageItem, TeamMember, TestimonialItem, ServiceTestPoint } from '../types';
import DynamicIcon from './DynamicIcon';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminCPanel() {
  const { 
    config, 
    updateConfig, 
    resetConfig, 
    isAdminLoggedIn, 
    setIsAdminLoggedIn, 
    importConfig 
  } = useAppConfig();

  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'branding' | 'contacts' | 'services' | 'packages' | 'doctors' | 'reviews' | 'backup'>('branding');

  // Custom Toast and Confirmation states to bypass iframe browser native dialog blockages safely
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ message: string; onConfirm: () => void } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const triggerConfirm = (message: string, onConfirm: () => void) => {
    setConfirmModal({ message, onConfirm });
  };

  // Active items for inline additions/edits
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // File input refs for uploading images
  const logoFileRef = useRef<HTMLInputElement>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);
  const serviceFileRef = useRef<HTMLInputElement>(null);
  const doctorFileRef = useRef<HTMLInputElement>(null);

  // Local draft states for Branding & Hero inputs
  const [siteTitle, setSiteTitle] = useState(config.siteTitle);
  const [siteSubtitle, setSiteSubtitle] = useState(config.siteSubtitle);
  const [heroTitle, setHeroTitle] = useState(config.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(config.heroSubtitle);
  const [heroImage, setHeroImage] = useState(config.heroImage);

  // Local draft states for Homepage Section Header customizers
  const [servicesBadge, setServicesBadge] = useState(config.servicesBadge || '');
  const [servicesTitle, setServicesTitle] = useState(config.servicesTitle || '');
  const [servicesSubtitle, setServicesSubtitle] = useState(config.servicesSubtitle || '');
  const [packagesBadge, setPackagesBadge] = useState(config.packagesBadge || '');
  const [packagesTitle, setPackagesTitle] = useState(config.packagesTitle || '');
  const [packagesSubtitle, setPackagesSubtitle] = useState(config.packagesSubtitle || '');
  const [whyChooseUsBadge, setWhyChooseUsBadge] = useState(config.whyChooseUsBadge || '');
  const [whyChooseUsTitle, setWhyChooseUsTitle] = useState(config.whyChooseUsTitle || '');
  const [whyChooseUsSubtitle, setWhyChooseUsSubtitle] = useState(config.whyChooseUsSubtitle || '');
  const [testimonialsBadge, setTestimonialsBadge] = useState(config.testimonialsBadge || '');
  const [testimonialsTitle, setTestimonialsTitle] = useState(config.testimonialsTitle || '');
  const [testimonialsSubtitle, setTestimonialsSubtitle] = useState(config.testimonialsSubtitle || '');

  // Local draft states for Contacts & Social inputs
  const [phone, setPhone] = useState(config.phone);
  const [address, setAddress] = useState(config.address);
  const [whatsapp, setWhatsapp] = useState(config.whatsapp);
  const [facebook, setFacebook] = useState(config.facebook);
  const [twitter, setTwitter] = useState(config.twitter || '');
  const [instagram, setInstagram] = useState(config.instagram);
  const [linkedin, setLinkedin] = useState(config.linkedin);

  // Sync draft states whenever global configuration updates (e.g., reset, upload config)
  useEffect(() => {
    setSiteTitle(config.siteTitle);
    setSiteSubtitle(config.siteSubtitle);
    setHeroTitle(config.heroTitle);
    setHeroSubtitle(config.heroSubtitle);
    setHeroImage(config.heroImage);

    setServicesBadge(config.servicesBadge || '');
    setServicesTitle(config.servicesTitle || '');
    setServicesSubtitle(config.servicesSubtitle || '');
    setPackagesBadge(config.packagesBadge || '');
    setPackagesTitle(config.packagesTitle || '');
    setPackagesSubtitle(config.packagesSubtitle || '');
    setWhyChooseUsBadge(config.whyChooseUsBadge || '');
    setWhyChooseUsTitle(config.whyChooseUsTitle || '');
    setWhyChooseUsSubtitle(config.whyChooseUsSubtitle || '');
    setTestimonialsBadge(config.testimonialsBadge || '');
    setTestimonialsTitle(config.testimonialsTitle || '');
    setTestimonialsSubtitle(config.testimonialsSubtitle || '');

    setPhone(config.phone);
    setAddress(config.address);
    setWhatsapp(config.whatsapp);
    setFacebook(config.facebook);
    setTwitter(config.twitter || '');
    setInstagram(config.instagram);
    setLinkedin(config.linkedin);
  }, [config]);

  // Action to save branding settings explicitly
  const saveBranding = () => {
    updateConfig({
      siteTitle,
      siteSubtitle,
      heroTitle,
      heroSubtitle,
      heroImage,
      servicesBadge,
      servicesTitle,
      servicesSubtitle,
      packagesBadge,
      packagesTitle,
      packagesSubtitle,
      whyChooseUsBadge,
      whyChooseUsTitle,
      whyChooseUsSubtitle,
      testimonialsBadge,
      testimonialsTitle,
      testimonialsSubtitle
    });
    triggerToast('Branding, Hero & Homepage copy updated successfully!', 'success');
  };

  // Action to save contact settings explicitly
  const saveContacts = () => {
    updateConfig({
      phone,
      address,
      whatsapp,
      facebook,
      twitter,
      instagram,
      linkedin
    });
    triggerToast('Contacts & Social configurations updated successfully!', 'success');
  };

  // Passcode login validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin' || passcode === '1234') {
      setIsAdminLoggedIn(true);
      setLoginError('');
      setPasscode('');
      triggerToast('Administrative Console unlocked successfully!', 'success');
    } else {
      setLoginError('Incorrect passcode. Use default "admin" or "1234".');
      triggerToast('Access Denied: Incorrect passcode.', 'error');
    }
  };

  // Lock Console (Clear all state and hide instantly)
  const handleLockConsole = () => {
    triggerConfirm('Are you sure you want to sign out and lock the Administrative Console?', () => {
      setIsAdminLoggedIn(false);
      setIsOpen(false);
      triggerToast('Console locked successfully.', 'info');
    });
  };

  // Hard Reset to defaults
  const handleHardReset = () => {
    triggerConfirm('WARNING: This will clear all custom edits and reset the site to factory defaults. Continue?', () => {
      resetConfig();
      setIsOpen(false);
      triggerToast('Configurations reset successfully.', 'info');
    });
  };

  // Convert uploaded image file to base64 string
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    onSuccess: (base64Url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Export config to JSON download
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `apex_diagnostics_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import config from JSON upload
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const success = importConfig(text);
          if (success) {
            triggerToast('Site configurations imported successfully!', 'success');
          } else {
            triggerToast('Invalid configuration file format. Please upload a valid JSON backup.', 'error');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // Service item CRUD operations
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    id: '', title: '', description: '', priceEstimate: '', duration: '', iconName: 'Microscope', imageUrl: '', testPoints: []
  });
  const [newTestPoint, setNewTestPoint] = useState<ServiceTestPoint>({ name: '', price: '', description: '' });
  const [editingTestPointIdx, setEditingTestPointIdx] = useState<number | null>(null);

  const startEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({ ...service });
    setEditingTestPointIdx(null);
    setNewTestPoint({ name: '', price: '', description: '' });
  };

  const startAddService = () => {
    setEditingServiceId('new');
    setServiceForm({
      id: 'srv-' + Date.now(),
      title: '',
      description: '',
      priceEstimate: 'NPR 1,000 - NPR 5,000',
      duration: '1 - 2 Hours',
      iconName: 'Microscope',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800',
      testPoints: []
    });
    setEditingTestPointIdx(null);
    setNewTestPoint({ name: '', price: '', description: '' });
  };

  const saveService = () => {
    if (!serviceForm.title || !serviceForm.description) {
      triggerToast('Please fill out the Service Title and Description.', 'error');
      return;
    }
    const updatedServices = [...config.services];
    if (editingServiceId === 'new') {
      updatedServices.push(serviceForm as ServiceItem);
      triggerToast('Service package added successfully!', 'success');
    } else {
      const idx = updatedServices.findIndex(s => s.id === editingServiceId);
      if (idx !== -1) updatedServices[idx] = serviceForm as ServiceItem;
      triggerToast('Service package updated successfully!', 'success');
    }
    updateConfig({ services: updatedServices });
    setEditingServiceId(null);
  };

  const deleteService = (id: string) => {
    triggerConfirm('Are you sure you want to delete this service package and all of its test points?', () => {
      const filtered = config.services.filter(s => s.id !== id);
      updateConfig({ services: filtered });
      triggerToast('Service package deleted successfully.', 'success');
    });
  };

  const startEditTestPoint = (idx: number, point: ServiceTestPoint) => {
    setEditingTestPointIdx(idx);
    setNewTestPoint({ ...point });
  };

  // Add/Edit individual test point inside service
  const addTestPoint = () => {
    if (!newTestPoint.name || !newTestPoint.price) {
      triggerToast('Please enter a test name and a price.', 'error');
      return;
    }
    const currentPoints = [...(serviceForm.testPoints || [])];
    if (editingTestPointIdx !== null) {
      currentPoints[editingTestPointIdx] = { ...newTestPoint };
      setEditingTestPointIdx(null);
      triggerToast('Test point updated.', 'success');
    } else {
      currentPoints.push({ ...newTestPoint });
      triggerToast('Test point added.', 'success');
    }
    setServiceForm({
      ...serviceForm,
      testPoints: currentPoints
    });
    setNewTestPoint({ name: '', price: '', description: '' });
  };

  const deleteTestPoint = (idx: number) => {
    const currentPoints = serviceForm.testPoints || [];
    setServiceForm({
      ...serviceForm,
      testPoints: currentPoints.filter((_, i) => i !== idx)
    });
    if (editingTestPointIdx === idx) {
      setEditingTestPointIdx(null);
      setNewTestPoint({ name: '', price: '', description: '' });
    } else if (editingTestPointIdx !== null && editingTestPointIdx > idx) {
      setEditingTestPointIdx(editingTestPointIdx - 1);
    }
  };


  // Health Packages CRUD
  const [packageForm, setPackageForm] = useState<Partial<PackageItem>>({
    id: '', name: '', price: 0, popular: false, includedTests: [], description: '', targetAudience: ''
  });
  const [pkgTestInput, setPkgTestInput] = useState('');

  const startEditPackage = (pkg: PackageItem) => {
    setEditingPackageId(pkg.id);
    setPackageForm({ ...pkg });
    setPkgTestInput(pkg.includedTests.join('\n'));
  };

  const startAddPackage = () => {
    setEditingPackageId('new');
    setPackageForm({
      id: 'pkg-' + Date.now(),
      name: '',
      price: 2500,
      popular: false,
      includedTests: [],
      description: '',
      targetAudience: 'Recommended for all age categories'
    });
    setPkgTestInput('');
  };

  const savePackage = () => {
    if (!packageForm.name || !packageForm.price) {
      triggerToast('Please fill out the Package Name and Price.', 'error');
      return;
    }
    const tests = pkgTestInput.split('\n').map(t => t.trim()).filter(t => t.length > 0);
    const updated = { ...packageForm, includedTests: tests } as PackageItem;

    const updatedList = [...config.packages];
    if (editingPackageId === 'new') {
      updatedList.push(updated);
      triggerToast('Wellness package added successfully!', 'success');
    } else {
      const idx = updatedList.findIndex(p => p.id === editingPackageId);
      if (idx !== -1) updatedList[idx] = updated;
      triggerToast('Wellness package updated successfully!', 'success');
    }
    updateConfig({ packages: updatedList });
    setEditingPackageId(null);
  };

  const deletePackage = (id: string) => {
    triggerConfirm('Are you sure you want to delete this health package?', () => {
      const filtered = config.packages.filter(p => p.id !== id);
      updateConfig({ packages: filtered });
      triggerToast('Health package deleted successfully.', 'success');
    });
  };


  // Doctor (Team Members) CRUD
  const [doctorForm, setDoctorForm] = useState<Partial<TeamMember>>({
    id: '', name: '', title: '', specialty: '', image: ''
  });

  const startEditDoctor = (doc: TeamMember) => {
    setEditingDoctorId(doc.id);
    setDoctorForm({ ...doc });
  };

  const startAddDoctor = () => {
    setEditingDoctorId('new');
    setDoctorForm({
      id: 'doc-' + Date.now(),
      name: '',
      title: 'Consultant',
      specialty: '',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400'
    });
  };

  const saveDoctor = () => {
    if (!doctorForm.name || !doctorForm.title) {
      triggerToast('Please fill out the doctor name and official title.', 'error');
      return;
    }
    const updatedList = [...config.teamMembers];
    if (editingDoctorId === 'new') {
      updatedList.push(doctorForm as TeamMember);
      triggerToast('Medical board member added successfully!', 'success');
    } else {
      const idx = updatedList.findIndex(d => d.id === editingDoctorId);
      if (idx !== -1) updatedList[idx] = doctorForm as TeamMember;
      triggerToast('Medical board details updated successfully!', 'success');
    }
    updateConfig({ teamMembers: updatedList });
    setEditingDoctorId(null);
  };

  const deleteDoctor = (id: string) => {
    triggerConfirm('Are you sure you want to remove this medical board member from listings?', () => {
      const filtered = config.teamMembers.filter(d => d.id !== id);
      updateConfig({ teamMembers: filtered });
      triggerToast('Medical board member removed successfully.', 'success');
    });
  };


  // Reviews / Testimonials CRUD
  const [reviewForm, setReviewForm] = useState<Partial<TestimonialItem>>({
    id: '', name: '', comment: '', rating: 5, relation: ''
  });

  const startEditReview = (rev: TestimonialItem) => {
    setEditingReviewId(rev.id);
    setReviewForm({ ...rev });
  };

  const startAddReview = () => {
    setEditingReviewId('new');
    setReviewForm({
      id: 'rev-' + Date.now(),
      name: '',
      comment: '',
      rating: 5,
      relation: 'Individual Patient'
    });
  };

  const saveReview = () => {
    if (!reviewForm.name || !reviewForm.comment) {
      triggerToast('Please provide patient name and feedback comment.', 'error');
      return;
    }
    const updatedList = [...config.testimonials];
    if (editingReviewId === 'new') {
      updatedList.push(reviewForm as TestimonialItem);
      triggerToast('Patient review added successfully!', 'success');
    } else {
      const idx = updatedList.findIndex(r => r.id === editingReviewId);
      if (idx !== -1) updatedList[idx] = reviewForm as TestimonialItem;
      triggerToast('Patient review updated successfully!', 'success');
    }
    updateConfig({ testimonials: updatedList });
    setEditingReviewId(null);
  };

  const deleteReview = (id: string) => {
    triggerConfirm('Are you sure you want to permanently remove this patient review?', () => {
      const filtered = config.testimonials.filter(r => r.id !== id);
      updateConfig({ testimonials: filtered });
      triggerToast('Patient review removed successfully.', 'success');
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-4 bg-slate-900 text-white rounded-full shadow-xl hover:bg-slate-800 transition-all duration-300 flex items-center justify-center cursor-pointer border border-slate-700/60 group hover:scale-110 active:scale-95"
        aria-label="Open cPanel Console"
      >
        <span className="absolute inset-0 rounded-full bg-slate-900/10 group-hover:animate-ping pointer-events-none" />
        <DynamicIcon name="Cpu" className="w-6 h-6 animate-pulse-subtle group-hover:rotate-45 transition-transform duration-300" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-28 group-hover:ml-2 transition-all duration-300 text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap hidden md:inline-block">
          cPanel
        </span>
      </button>

      {/* Main Administrative Console Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            />

            {/* Panel Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-5xl h-[88vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col text-slate-100 z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <DynamicIcon name="Cpu" className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-display font-extrabold tracking-tight text-white flex items-center space-x-2">
                      <span>Apex Diagnostics cPanel</span>
                      <span className="text-[9px] font-mono tracking-widest uppercase bg-teal-500/10 border border-teal-500/20 px-1.5 py-0.5 rounded text-teal-400 font-bold">
                        Local Storage Sync
                      </span>
                    </h2>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
                      Dynamic Site Customizer &amp; Content Manager
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isAdminLoggedIn && (
                    <button
                      type="button"
                      onClick={handleLockConsole}
                      className="px-3 py-1.5 rounded-xl bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/20 text-xs font-mono font-bold tracking-wider uppercase transition cursor-pointer flex items-center space-x-1.5"
                    >
                      <DynamicIcon name="AlertCircle" className="w-3.5 h-3.5" />
                      <span>Lock Console</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition flex items-center justify-center cursor-pointer"
                  >
                    <DynamicIcon name="X" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!isAdminLoggedIn ? (
                /* Login Gate Screen */
                <div className="flex-grow flex items-center justify-center p-6 bg-slate-900">
                  <form onSubmit={handleLoginSubmit} className="w-full max-w-md bg-slate-950 p-8 rounded-3xl border border-slate-800/80 shadow-xl space-y-6">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto border border-teal-500/25">
                        <DynamicIcon name="Cpu" className="w-8 h-8 animate-bounce" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">Enter Console Passcode</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xs mx-auto">
                        To protect settings, enter the administrative control passcode. 
                        <span className="block mt-1 font-mono text-teal-500 font-bold">Default: admin or 1234</span>
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono tracking-widest uppercase text-slate-400 mb-2">PASSCODE</label>
                        <input
                          type="password"
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none font-mono text-center text-lg text-white placeholder-slate-600 transition"
                          autoFocus
                        />
                      </div>

                      {loginError && (
                        <p className="text-xs text-rose-400 font-sans font-medium text-center bg-rose-500/5 py-2 px-3 rounded-lg border border-rose-500/10">
                          {loginError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-sans font-extrabold text-sm rounded-xl tracking-wider uppercase transition shadow-lg shadow-teal-500/10 cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <DynamicIcon name="Check" className="w-4 h-4" />
                        <span>Unlock Console</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Authorized Control Interface */
                <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                  {/* Left Sidebar Navigation */}
                  <div className="w-full md:w-56 bg-slate-950 border-r border-slate-800/80 flex md:flex-col p-3 overflow-x-auto md:overflow-x-visible md:overflow-y-auto shrink-0 gap-1.5 md:space-y-1">
                    {[
                      { id: 'branding', label: 'Branding & Hero', icon: 'Sparkles' },
                      { id: 'contacts', label: 'Contacts & Social', icon: 'Phone' },
                      { id: 'services', label: 'Services Manager', icon: 'Microscope' },
                      { id: 'packages', label: 'Wellness Packages', icon: 'Heart' },
                      { id: 'doctors', label: 'Medical Board', icon: 'User' },
                      { id: 'reviews', label: 'Patient Reviews', icon: 'Star' },
                      { id: 'backup', label: 'Backup & Utilities', icon: 'Download' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setEditingServiceId(null);
                          setEditingPackageId(null);
                          setEditingDoctorId(null);
                          setEditingReviewId(null);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold transition flex items-center space-x-2.5 cursor-pointer whitespace-nowrap md:w-full ${
                          activeTab === tab.id
                            ? 'bg-teal-500 text-slate-950'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <DynamicIcon name={tab.icon} className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Main Work Space */}
                  <div className="flex-grow p-6 overflow-y-auto bg-slate-900/40 text-sm">
                    {/* TAB 1: BRANDING & LAYOUT */}
                    {activeTab === 'branding' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-display font-extrabold text-white">Brand Assets &amp; Hero Section</h3>
                            <p className="text-xs text-slate-400 font-sans mt-1">Configure logo text, custom symbols, and background illustrations.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Site Title */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Navbar &amp; Footer Logo Title</label>
                            <input
                              type="text"
                              value={siteTitle}
                              onChange={(e) => {
                                const newTitle = e.target.value;
                                setSiteTitle(newTitle);
                                if (heroTitle === siteTitle || heroTitle === 'Apex Diagnostic & Research Center') {
                                  setHeroTitle(newTitle);
                                }
                              }}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* Site Subtitle */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Logo Subtitle</label>
                            <input
                              type="text"
                              value={siteSubtitle}
                              onChange={(e) => setSiteSubtitle(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* Custom Logo Image upload or logo text options */}
                          <div className="space-y-2 md:col-span-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <span className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">Custom Logo Image</span>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                              {config.logoUrl ? (
                                <div className="w-14 h-14 bg-white/5 rounded-xl border border-slate-800 p-2 flex items-center justify-center shrink-0">
                                  <img src={config.logoUrl} alt="custom logo" className="max-h-full max-w-full object-contain" />
                                </div>
                              ) : (
                                <div className="w-14 h-14 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                                  <DynamicIcon name={config.logoIcon} className="w-6 h-6" />
                                </div>
                              )}
                              
                              <div className="space-y-1 flex-grow">
                                <p className="text-xs text-slate-400 leading-normal">
                                  Upload a custom image to replace the default vector microscope icon.
                                </p>
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => logoFileRef.current?.click()}
                                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-white transition cursor-pointer"
                                  >
                                    Upload Custom Logo
                                  </button>
                                  {config.logoUrl && (
                                    <button
                                      type="button"
                                      onClick={() => updateConfig({ logoUrl: '' })}
                                      className="px-3 py-1.5 bg-rose-950/20 hover:bg-rose-950 text-rose-400 rounded-lg text-xs transition cursor-pointer"
                                    >
                                      Remove Custom Image
                                    </button>
                                  )}
                                  <input
                                    type="file"
                                    ref={logoFileRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, (url) => updateConfig({ logoUrl: url }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hero Title */}
                          <div className="space-y-1 md:col-span-2">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Hero Title Greeting</label>
                            <input
                              type="text"
                              value={heroTitle}
                              onChange={(e) => setHeroTitle(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* Hero Subtitle */}
                          <div className="space-y-1 md:col-span-2">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Hero Description</label>
                            <textarea
                              rows={3}
                              value={heroSubtitle}
                              onChange={(e) => setHeroSubtitle(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs resize-none"
                            />
                          </div>

                          {/* Hero Image Field & Upload */}
                          <div className="space-y-2 md:col-span-2 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                            <span className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1">Hero Section Background Image</span>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                              <div className="w-24 h-16 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shrink-0">
                                <img src={heroImage} alt="hero background preview" className="w-full h-full object-cover" />
                              </div>
                              <div className="space-y-2 flex-grow">
                                <input
                                  type="text"
                                  value={heroImage}
                                  onChange={(e) => setHeroImage(e.target.value)}
                                  placeholder="Or paste an image link..."
                                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                                />
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => heroFileRef.current?.click()}
                                    className="px-3 py-1.5 bg-teal-500 text-slate-950 hover:bg-teal-600 rounded-lg text-xs font-bold transition cursor-pointer flex items-center space-x-1"
                                  >
                                    <DynamicIcon name="Cpu" className="w-3.5 h-3.5" />
                                    <span>Upload Local Image File</span>
                                  </button>
                                  <input
                                    type="file"
                                    ref={heroFileRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e, (url) => setHeroImage(url))}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Homepage Section Headers Customizer */}
                        <div className="pt-6 mt-6 border-t border-slate-800/60">
                          <h3 className="text-sm font-mono uppercase text-teal-400 font-bold flex items-center gap-2 mb-2">
                            <DynamicIcon name="Layout" className="text-teal-400 w-4 h-4" />
                            <span>Homepage Section Headers &amp; Copy</span>
                          </h3>
                          <p className="text-xs text-slate-400 font-sans leading-normal mb-5">
                            Modify titles, sub-headers, and descriptive copy of key homepage sections to match your center's identity.
                          </p>

                          <div className="space-y-5">
                            {/* Services Section Copy */}
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-4">
                              <h4 className="text-xs font-mono uppercase text-white font-bold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                                <span>1. Services Catalog Section</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Badge / Small Header</label>
                                  <input
                                    type="text"
                                    value={servicesBadge}
                                    onChange={(e) => setServicesBadge(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Main Title</label>
                                  <input
                                    type="text"
                                    value={servicesTitle}
                                    onChange={(e) => setServicesTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Subtitle Description</label>
                                  <textarea
                                    rows={2}
                                    value={servicesSubtitle}
                                    onChange={(e) => setServicesSubtitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs resize-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Wellness Packages Copy */}
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-4">
                              <h4 className="text-xs font-mono uppercase text-white font-bold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                                <span>2. Wellness Packages Section</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Badge / Small Header</label>
                                  <input
                                    type="text"
                                    value={packagesBadge}
                                    onChange={(e) => setPackagesBadge(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Main Title</label>
                                  <input
                                    type="text"
                                    value={packagesTitle}
                                    onChange={(e) => setPackagesTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Subtitle Description</label>
                                  <textarea
                                    rows={2}
                                    value={packagesSubtitle}
                                    onChange={(e) => setPackagesSubtitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs resize-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Why Choose Us Copy */}
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-4">
                              <h4 className="text-xs font-mono uppercase text-white font-bold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                                <span>3. Clinical Standards (Why Choose Us)</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Badge / Small Header</label>
                                  <input
                                    type="text"
                                    value={whyChooseUsBadge}
                                    onChange={(e) => setWhyChooseUsBadge(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Main Title</label>
                                  <input
                                    type="text"
                                    value={whyChooseUsTitle}
                                    onChange={(e) => setWhyChooseUsTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Subtitle Description</label>
                                  <textarea
                                    rows={2}
                                    value={whyChooseUsSubtitle}
                                    onChange={(e) => setWhyChooseUsSubtitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs resize-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Patient Testimonials Copy */}
                            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-4">
                              <h4 className="text-xs font-mono uppercase text-white font-bold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                                <span>4. Patient Testimonials</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Badge / Small Header</label>
                                  <input
                                    type="text"
                                    value={testimonialsBadge}
                                    onChange={(e) => setTestimonialsBadge(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Main Title</label>
                                  <input
                                    type="text"
                                    value={testimonialsTitle}
                                    onChange={(e) => setTestimonialsTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs"
                                  />
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className="block text-[10px] font-mono uppercase text-slate-500 font-bold">Subtitle Description</label>
                                  <textarea
                                    rows={2}
                                    value={testimonialsSubtitle}
                                    onChange={(e) => setTestimonialsSubtitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:border-teal-500 focus:outline-none text-white text-xs resize-none"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Save Button Footer */}
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={saveBranding}
                            className="px-5 py-2.5 bg-teal-500 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-teal-600 transition cursor-pointer flex items-center space-x-2"
                          >
                            <DynamicIcon name="Check" className="w-4 h-4" />
                            <span>Save Branding Settings</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: CONTACTS & SOCIAL LINKS */}
                    {activeTab === 'contacts' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-display font-extrabold text-white">Contacts &amp; Social Links</h3>
                            <p className="text-xs text-slate-400 font-sans mt-1">Configure diagnostic center contact details, address, and social links.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Phone */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Contact Phone Number</label>
                            <input
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* Address */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Clinic Address (Bharatpur, Chitwan)</label>
                            <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* WhatsApp */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">WhatsApp Code Link Number</label>
                            <input
                              type="text"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs font-mono"
                            />
                          </div>

                          {/* Facebook */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Facebook URL</label>
                            <input
                              type="text"
                              value={facebook}
                              onChange={(e) => setFacebook(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* Instagram */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Instagram URL</label>
                            <input
                              type="text"
                              value={instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>

                          {/* LinkedIn */}
                          <div className="space-y-1">
                            <label className="block text-xs font-mono uppercase text-slate-400 font-bold">LinkedIn URL</label>
                            <input
                              type="text"
                              value={linkedin}
                              onChange={(e) => setLinkedin(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-teal-500 focus:outline-none text-white text-xs"
                            />
                          </div>
                        </div>

                        {/* Save Button Footer */}
                        <div className="flex justify-end pt-2">
                          <button
                            type="button"
                            onClick={saveContacts}
                            className="px-5 py-2.5 bg-teal-500 text-slate-950 font-extrabold text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-teal-600 transition cursor-pointer flex items-center space-x-2"
                          >
                            <DynamicIcon name="Check" className="w-4 h-4" />
                            <span>Save Contacts Settings</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: SERVICES */}
                    {activeTab === 'services' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-display font-extrabold text-white">Services &amp; Breakdowns Manager</h3>
                            <p className="text-xs text-slate-400 font-sans mt-1">Fully customize diagnostic service options, individual price points, and descriptions.</p>
                          </div>
                          {!editingServiceId && (
                            <button
                              type="button"
                              onClick={startAddService}
                              className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl font-mono uppercase tracking-wider hover:bg-teal-600 transition cursor-pointer"
                            >
                              + Add New Service
                            </button>
                          )}
                        </div>

                        {editingServiceId ? (
                          /* SERVICE EDITING INTERFACE */
                          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                            <h4 className="text-sm font-bold text-teal-400 flex items-center space-x-1">
                              <DynamicIcon name="Sparkles" className="w-4 h-4" />
                              <span>{editingServiceId === 'new' ? 'Create New Service' : 'Edit Service Settings'}</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Service Title</label>
                                <input
                                  type="text"
                                  value={serviceForm.title || ''}
                                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Estimated Cost Range (NPR)</label>
                                <input
                                  type="text"
                                  value={serviceForm.priceEstimate || ''}
                                  onChange={(e) => setServiceForm({ ...serviceForm, priceEstimate: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Duration</label>
                                <input
                                  type="text"
                                  value={serviceForm.duration || ''}
                                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Vector Icon (Lucide Icon name)</label>
                                <select
                                  value={serviceForm.iconName || 'Microscope'}
                                  onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-mono"
                                >
                                  {['Microscope', 'Activity', 'Scan', 'Heart', 'ShieldCheck', 'Award', 'Cpu', 'CheckSquare'].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Full Description</label>
                                <textarea
                                  rows={2}
                                  value={serviceForm.description || ''}
                                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs resize-none"
                                />
                              </div>

                              {/* Service Cover Image */}
                              <div className="space-y-2 sm:col-span-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <span className="block text-xs font-mono uppercase text-slate-400 font-bold">Cover Image URL</span>
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <div className="w-16 h-12 bg-slate-950 rounded-lg overflow-hidden shrink-0">
                                    <img src={serviceForm.imageUrl || ''} alt="service preview" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-grow space-y-2">
                                    <input
                                      type="text"
                                      value={serviceForm.imageUrl || ''}
                                      onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                                      className="w-full px-3 py-1 bg-slate-950 border border-slate-800 rounded text-xs"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => serviceFileRef.current?.click()}
                                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded text-[10px] font-bold cursor-pointer"
                                    >
                                      Upload Local File Image
                                    </button>
                                    <input
                                      type="file"
                                      ref={serviceFileRef}
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleFileUpload(e, (url) => setServiceForm({ ...serviceForm, imageUrl: url }))}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* INDIVIDUAL TEST POINTS INSIDE SERVICE */}
                            <div className="pt-4 border-t border-slate-800 space-y-3">
                              <span className="block text-xs font-mono uppercase text-slate-400 font-bold">Test Points &amp; Rates</span>
                              
                              <div className="space-y-2">
                                {(serviceForm.testPoints || []).map((point, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                                    <div className="min-w-0 pr-2">
                                      <p className="font-bold text-white">
                                        {point.name} • <span className="text-teal-400 font-mono">{point.price}</span>
                                        {editingTestPointIdx === idx && (
                                          <span className="ml-2 px-1.5 py-0.5 bg-teal-500/20 text-teal-400 text-[9px] font-mono rounded uppercase tracking-wider font-extrabold animate-pulse">
                                            Editing
                                          </span>
                                        )}
                                      </p>
                                      {point.description && <p className="text-[11px] text-slate-400 mt-0.5">{point.description}</p>}
                                    </div>
                                    <div className="flex items-center space-x-1.5 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => startEditTestPoint(idx, point)}
                                        className="text-xs text-teal-400 hover:text-teal-300 font-mono font-bold cursor-pointer px-2 py-1 bg-teal-500/10 rounded"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => deleteTestPoint(idx)}
                                        className="text-xs text-rose-400 hover:text-rose-600 font-mono font-bold cursor-pointer px-2 py-1 bg-rose-500/10 rounded"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Form to add/edit a test point */}
                              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                                <span className="block text-[11px] font-mono uppercase text-slate-400">
                                  {editingTestPointIdx !== null ? 'Edit Individual Test Point' : 'Add Individual Test Point'}
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    placeholder="Test Name (e.g. 12-Lead ECG)"
                                    value={newTestPoint.name}
                                    onChange={(e) => setNewTestPoint({ ...newTestPoint, name: e.target.value })}
                                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Price in NPR (e.g. NPR 1,200)"
                                    value={newTestPoint.price}
                                    onChange={(e) => setNewTestPoint({ ...newTestPoint, price: e.target.value })}
                                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Brief Description (optional)"
                                    value={newTestPoint.description || ''}
                                    onChange={(e) => setNewTestPoint({ ...newTestPoint, description: e.target.value })}
                                    className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-white sm:col-span-2"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    type="button"
                                    onClick={addTestPoint}
                                    className="px-3 py-1.5 bg-teal-500 text-slate-950 text-xs font-bold font-mono rounded-lg hover:bg-teal-600 transition cursor-pointer"
                                  >
                                    {editingTestPointIdx !== null ? 'Update Test Point' : '+ Append Test Point'}
                                  </button>
                                  {editingTestPointIdx !== null && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingTestPointIdx(null);
                                        setNewTestPoint({ name: '', price: '', description: '' });
                                      }}
                                      className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold font-mono rounded-lg hover:bg-slate-700 transition cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3 pt-4">
                              <button
                                type="button"
                                onClick={saveService}
                                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs font-mono uppercase rounded-lg hover:bg-emerald-600 transition cursor-pointer"
                              >
                                Save Service Details
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingServiceId(null)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs font-mono uppercase rounded-lg hover:bg-slate-700 transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* LIST OF SERVICES */
                          <div className="space-y-3">
                            {config.services.map((srv) => (
                              <div key={srv.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-between gap-4">
                                <div className="flex items-center space-x-3 min-w-0">
                                  <div className="p-2 bg-slate-900 rounded-lg text-teal-400">
                                    <DynamicIcon name={srv.iconName} className="w-5 h-5" />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="font-bold text-white text-sm truncate">{srv.title}</h4>
                                    <p className="text-xs text-slate-400 font-mono mt-0.5">{srv.priceEstimate} • {(srv.testPoints || []).length} Tests</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => startEditService(srv)}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700 transition cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteService(srv.id)}
                                    className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-lg transition cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 4: PACKAGES */}
                    {activeTab === 'packages' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-display font-extrabold text-white">Wellness &amp; Screening Packages</h3>
                            <p className="text-xs text-slate-400 font-sans mt-1">Manage health panels, individual checkup lists, popular badges, and pricing rates.</p>
                          </div>
                          {!editingPackageId && (
                            <button
                              type="button"
                              onClick={startAddPackage}
                              className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl font-mono uppercase tracking-wider hover:bg-teal-600 transition cursor-pointer"
                            >
                              + Add New Package
                            </button>
                          )}
                        </div>

                        {editingPackageId ? (
                          /* PACKAGE EDITING FORM */
                          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                            <h4 className="text-sm font-bold text-teal-400">
                              {editingPackageId === 'new' ? 'Create New Package' : 'Edit Package Settings'}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Package Name</label>
                                <input
                                  type="text"
                                  value={packageForm.name || ''}
                                  onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Price in NPR (Numerical)</label>
                                <input
                                  type="number"
                                  value={packageForm.price || 0}
                                  onChange={(e) => setPackageForm({ ...packageForm, price: parseInt(e.target.value) || 0 })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Target Audience Info</label>
                                <input
                                  type="text"
                                  value={packageForm.targetAudience || ''}
                                  onChange={(e) => setPackageForm({ ...packageForm, targetAudience: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-2 flex items-center pt-5">
                                <input
                                  type="checkbox"
                                  id="popular"
                                  checked={packageForm.popular || false}
                                  onChange={(e) => setPackageForm({ ...packageForm, popular: e.target.checked })}
                                  className="w-4 h-4 text-teal-500 bg-slate-900 border-slate-800 rounded"
                                />
                                <label htmlFor="popular" className="ml-2 text-xs font-mono uppercase text-slate-400 font-bold select-none">
                                  Show "Most Popular" ribbon
                                </label>
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Description / Intention</label>
                                <textarea
                                  rows={2}
                                  value={packageForm.description || ''}
                                  onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs resize-none"
                                />
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">
                                  Included Tests Checklist (One item per line)
                                </label>
                                <textarea
                                  rows={5}
                                  value={pkgTestInput}
                                  onChange={(e) => setPkgTestInput(e.target.value)}
                                  placeholder="e.g. Complete Blood Count&#10;Fasting Blood Glucose&#10;Complete Urine Analysis"
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-sans leading-relaxed"
                                />
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 pt-2">
                              <button
                                type="button"
                                onClick={savePackage}
                                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs font-mono uppercase rounded-lg hover:bg-emerald-600 transition cursor-pointer"
                              >
                                Save Package
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingPackageId(null)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs font-mono uppercase rounded-lg hover:bg-slate-700 transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* LIST OF PACKAGES */
                          <div className="space-y-3">
                            {config.packages.map((pkg) => (
                              <div key={pkg.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-between gap-4">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-bold text-white text-sm">{pkg.name}</h4>
                                    {pkg.popular && (
                                      <span className="text-[9px] bg-teal-500/15 border border-teal-500/20 px-1.5 py-0.5 rounded font-mono text-teal-400 font-bold uppercase">Popular</span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-400 font-mono mt-0.5">NPR {pkg.price.toLocaleString()} • {pkg.includedTests.length} Included Tests</p>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => startEditPackage(pkg)}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700 transition cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deletePackage(pkg.id)}
                                    className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-lg transition cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 5: DOCTORS */}
                    {activeTab === 'doctors' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-display font-extrabold text-white">Medical Board &amp; Team Members</h3>
                            <p className="text-xs text-slate-400 font-sans mt-1">Configure clinicians, specialties, titles, and physician bios.</p>
                          </div>
                          {!editingDoctorId && (
                            <button
                              type="button"
                              onClick={startAddDoctor}
                              className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl font-mono uppercase tracking-wider hover:bg-teal-600 transition cursor-pointer"
                            >
                              + Add New Doctor
                            </button>
                          )}
                        </div>

                        {editingDoctorId ? (
                          /* DOCTOR EDITING FORM */
                          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                            <h4 className="text-sm font-bold text-teal-400">
                              {editingDoctorId === 'new' ? 'Add New Medical Board Member' : 'Edit Physician Profile'}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Doctor Name</label>
                                <input
                                  type="text"
                                  value={doctorForm.name || ''}
                                  onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Official Title / Role</label>
                                <input
                                  type="text"
                                  value={doctorForm.title || ''}
                                  onChange={(e) => setDoctorForm({ ...doctorForm, title: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Specialty &amp; Qualifications</label>
                                <input
                                  type="text"
                                  value={doctorForm.specialty || ''}
                                  onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              {/* Doctor Image with local Upload button */}
                              <div className="space-y-2 sm:col-span-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                                <span className="block text-xs font-mono uppercase text-slate-400 font-bold">Doctor Portrait Image</span>
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <div className="w-14 h-14 bg-slate-950 rounded-full overflow-hidden shrink-0">
                                    <img src={doctorForm.image || ''} alt="doctor preview" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-grow space-y-2">
                                    <input
                                      type="text"
                                      value={doctorForm.image || ''}
                                      onChange={(e) => setDoctorForm({ ...doctorForm, image: e.target.value })}
                                      className="w-full px-3 py-1 bg-slate-950 border border-slate-800 rounded text-xs"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => doctorFileRef.current?.click()}
                                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded text-[10px] font-bold cursor-pointer"
                                    >
                                      Upload Local File Image
                                    </button>
                                    <input
                                      type="file"
                                      ref={doctorFileRef}
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => handleFileUpload(e, (url) => setDoctorForm({ ...doctorForm, image: url }))}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 pt-2">
                              <button
                                type="button"
                                onClick={saveDoctor}
                                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs font-mono uppercase rounded-lg hover:bg-emerald-600 transition cursor-pointer"
                              >
                                Save Doctor Profile
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingDoctorId(null)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs font-mono uppercase rounded-lg hover:bg-slate-700 transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* LIST OF DOCTORS */
                          <div className="space-y-3">
                            {config.teamMembers.map((doc) => (
                              <div key={doc.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-between gap-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-slate-800">
                                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white text-sm">{doc.name}</h4>
                                    <p className="text-xs text-slate-400 font-mono">{doc.title} • {doc.specialty}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => startEditDoctor(doc)}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700 transition cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteDoctor(doc.id)}
                                    className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-lg transition cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 6: TESTIMONIALS */}
                    {activeTab === 'reviews' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-display font-extrabold text-white">Patient Feedback &amp; Reviews</h3>
                            <p className="text-xs text-slate-400 font-sans mt-1">Configure testimonial comments, verified patient badges, and ratings.</p>
                          </div>
                          {!editingReviewId && (
                            <button
                              type="button"
                              onClick={startAddReview}
                              className="px-4 py-2 bg-teal-500 text-slate-950 font-bold text-xs rounded-xl font-mono uppercase tracking-wider hover:bg-teal-600 transition cursor-pointer"
                            >
                              + Add New Review
                            </button>
                          )}
                        </div>

                        {editingReviewId ? (
                          /* REVIEW EDITING FORM */
                          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                            <h4 className="text-sm font-bold text-teal-400">
                              {editingReviewId === 'new' ? 'Write New Testimonial' : 'Edit Testimonial'}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Patient / Group Name</label>
                                <input
                                  type="text"
                                  value={reviewForm.name || ''}
                                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Patient Role / Relation</label>
                                <input
                                  type="text"
                                  value={reviewForm.relation || ''}
                                  placeholder="e.g. Individual Patient, HR Manager"
                                  onChange={(e) => setReviewForm({ ...reviewForm, relation: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Rating (Stars)</label>
                                <select
                                  value={reviewForm.rating || 5}
                                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) || 5 })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-mono"
                                >
                                  {[5, 4, 3, 2, 1].map(n => (
                                    <option key={n} value={n}>{n} Stars</option>
                                  ))}
                                </select>
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="block text-xs font-mono uppercase text-slate-400 font-bold">Feedback Comment</label>
                                <textarea
                                  rows={3}
                                  value={reviewForm.comment || ''}
                                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs resize-none"
                                />
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 pt-2">
                              <button
                                type="button"
                                onClick={saveReview}
                                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs font-mono uppercase rounded-lg hover:bg-emerald-600 transition cursor-pointer"
                              >
                                Save Review
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingReviewId(null)}
                                className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs font-mono uppercase rounded-lg hover:bg-slate-700 transition cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* LIST OF REVIEWS */
                          <div className="space-y-3">
                            {config.testimonials.map((rev) => (
                              <div key={rev.id} className="p-4 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-between gap-4">
                                <div>
                                  <h4 className="font-bold text-white text-sm">{rev.name} • <span className="text-slate-400 font-normal">{rev.relation}</span></h4>
                                  <p className="text-xs text-amber-400 font-mono mt-0.5">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</p>
                                  <p className="text-xs text-slate-300 line-clamp-1 italic mt-1 font-sans">"{rev.comment}"</p>
                                </div>
                                <div className="flex items-center space-x-2 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => startEditReview(rev)}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg hover:bg-slate-700 transition cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteReview(rev.id)}
                                    className="px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white text-xs font-bold rounded-lg transition cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 7: UTILITIES */}
                    {activeTab === 'backup' && (
                      <div className="space-y-6">
                        <div className="border-b border-slate-800 pb-3">
                          <h3 className="text-base font-display font-extrabold text-white">Import / Export Backup Utility</h3>
                          <p className="text-xs text-slate-400 font-sans mt-1">Export your customized content configs as a portable JSON file, or restore/import instantly.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          {/* Export */}
                          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                            <div className="space-y-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                Export Config
                              </span>
                              <h4 className="font-display font-extrabold text-white text-sm pt-1">Download backup file (config.json)</h4>
                              <p className="text-xs text-slate-400 leading-normal">
                                Download all current active configurations including customized services, custom logo, medical board, hero descriptions, and prices into a text configuration file.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={handleExportJSON}
                              className="w-full sm:w-auto py-3 px-5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold font-mono uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center space-x-2"
                            >
                              <DynamicIcon name="Download" className="w-4 h-4" />
                              <span>Download config.json</span>
                            </button>
                          </div>

                          {/* Import */}
                          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
                            <div className="space-y-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                Restore / Bulk Import
                              </span>
                              <h4 className="font-display font-extrabold text-white text-sm pt-1">Upload config.json</h4>
                              <p className="text-xs text-slate-400 leading-normal">
                                Select a previously saved JSON configuration backup file to instantly overwrite the entire site with saved contents and layouts.
                              </p>
                            </div>
                            <div className="relative">
                              <label className="w-full py-3 px-5 bg-slate-800 hover:bg-slate-750 text-white font-bold font-mono uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 border border-slate-700">
                                <DynamicIcon name="Cpu" className="w-4 h-4 text-teal-400" />
                                <span>Upload config.json</span>
                                <input
                                  type="file"
                                  accept="application/json"
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  onChange={handleImportJSON}
                                />
                              </label>
                            </div>
                          </div>

                          {/* Hard Reset */}
                          <div className="p-6 bg-rose-950/10 rounded-2xl border border-rose-500/15 md:col-span-2 space-y-3">
                            <div className="flex items-start space-x-3 text-rose-400">
                              <DynamicIcon name="AlertCircle" className="w-5 h-5 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-bold text-sm text-rose-300">Factory Reset Application Configurations</h4>
                                <p className="text-xs text-rose-400/85 leading-normal mt-1">
                                  This wipes the localStorage cache database entirely and rolls back all headings, contact addresses, and individual diagnostic test rates to standard default metrics.
                                </p>
                              </div>
                            </div>
                            <div className="pt-2 text-right">
                              <button
                                type="button"
                                onClick={handleHardReset}
                                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs font-mono uppercase rounded-lg transition cursor-pointer"
                              >
                                Perform Factory Reset
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center space-x-3 max-w-md w-[90vw]"
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${
              toast.type === 'error' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
              toast.type === 'info' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              'bg-teal-500/10 text-teal-400 border border-teal-500/20'
            }`}>
              <DynamicIcon name={toast.type === 'error' ? 'AlertCircle' : toast.type === 'info' ? 'Info' : 'CheckSquare'} className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold leading-relaxed font-sans">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Confirmation Dialog Modal */}
      <AnimatePresence>
        {confirmModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmModal(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl text-slate-100 z-10 space-y-6"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-xl shrink-0">
                  <DynamicIcon name="AlertCircle" className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-display font-bold text-white text-base">Please Confirm</h4>
                  <p className="text-xs text-slate-400 leading-normal">{confirmModal.message}</p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs font-mono uppercase rounded-lg transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    confirmModal.onConfirm();
                    setConfirmModal(null);
                  }}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs font-mono uppercase rounded-lg transition cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

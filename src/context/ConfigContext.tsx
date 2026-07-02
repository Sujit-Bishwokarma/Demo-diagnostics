import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  SERVICES as INITIAL_SERVICES, 
  INDIVIDUAL_PACKAGES as INITIAL_PACKAGES, 
  TEAM_MEMBERS as INITIAL_TEAM_MEMBERS, 
  TESTIMONIALS as INITIAL_TESTIMONIALS 
} from '../data';
import { ServiceItem, PackageItem, TeamMember, TestimonialItem } from '../types';

// Default static hero image
import DEFAULT_HERO_IMAGE_URL from '../assets/images/diagnostics_hero_1782931877065.jpg';

export interface AppConfig {
  siteTitle: string;
  siteSubtitle: string;
  logoIcon: string;
  logoUrl?: string;
  
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  
  services: ServiceItem[];
  packages: PackageItem[];
  teamMembers: TeamMember[];
  testimonials: TestimonialItem[];
}

const DEFAULT_CONFIG: AppConfig = {
  siteTitle: 'Apex Diagnostic & Research Center',
  siteSubtitle: 'Precision Clinical Lab',
  logoIcon: 'Microscope',
  logoUrl: '',
  
  heroImage: DEFAULT_HERO_IMAGE_URL,
  heroTitle: 'Apex Diagnostic & Research Center',
  heroSubtitle: 'Precision in Diagnosis, Care in Treatment. Get fast, reliable, and NABL-standardized digital medical reports delivered right to your smartphone.',
  
  phone: '9802971617',
  address: 'Bharatpur, Chitwan, Nepal',
  whatsapp: '9779802971617',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  instagram: 'https://instagram.com',
  linkedin: 'https://linkedin.com',
  
  services: INITIAL_SERVICES,
  packages: INITIAL_PACKAGES,
  teamMembers: INITIAL_TEAM_MEMBERS,
  testimonials: INITIAL_TESTIMONIALS
};

interface ConfigContextProps {
  config: AppConfig;
  updateConfig: (newConfig: Partial<AppConfig>) => void;
  resetConfig: () => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  importConfig: (jsonString: string) => boolean;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Load configuration and admin session from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('apex_diagnostics_app_config_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with DEFAULT_CONFIG in case schema updates
        setConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          services: parsed.services || DEFAULT_CONFIG.services,
          packages: parsed.packages || DEFAULT_CONFIG.packages,
          teamMembers: parsed.teamMembers || DEFAULT_CONFIG.teamMembers,
          testimonials: parsed.testimonials || DEFAULT_CONFIG.testimonials,
        });
      }
    } catch (e) {
      console.error('Error loading config from localStorage', e);
    }

    try {
      const auth = localStorage.getItem('apex_diagnostics_admin_logged');
      if (auth === 'true') {
        setIsAdminLoggedIn(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync state changes with localStorage
  const updateConfig = (newFields: Partial<AppConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newFields };
      localStorage.setItem('apex_diagnostics_app_config_v2', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset to static defaults, clear login, and clear local state
  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setIsAdminLoggedIn(false);
    localStorage.removeItem('apex_diagnostics_app_config_v2');
    localStorage.removeItem('apex_diagnostics_admin_logged');
  };

  // Handle manual login state synchronization
  useEffect(() => {
    if (isAdminLoggedIn) {
      localStorage.setItem('apex_diagnostics_admin_logged', 'true');
    } else {
      localStorage.removeItem('apex_diagnostics_admin_logged');
    }
  }, [isAdminLoggedIn]);

  // Bulk import JSON structure configuration
  const importConfig = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        const validated: AppConfig = {
          siteTitle: parsed.siteTitle || DEFAULT_CONFIG.siteTitle,
          siteSubtitle: parsed.siteSubtitle || DEFAULT_CONFIG.siteSubtitle,
          logoIcon: parsed.logoIcon || DEFAULT_CONFIG.logoIcon,
          logoUrl: parsed.logoUrl || DEFAULT_CONFIG.logoUrl || '',
          heroImage: parsed.heroImage || DEFAULT_CONFIG.heroImage,
          heroTitle: parsed.heroTitle || DEFAULT_CONFIG.heroTitle,
          heroSubtitle: parsed.heroSubtitle || DEFAULT_CONFIG.heroSubtitle,
          phone: parsed.phone || DEFAULT_CONFIG.phone,
          address: parsed.address || DEFAULT_CONFIG.address,
          whatsapp: parsed.whatsapp || DEFAULT_CONFIG.whatsapp,
          facebook: parsed.facebook || DEFAULT_CONFIG.facebook,
          twitter: parsed.twitter || DEFAULT_CONFIG.twitter,
          instagram: parsed.instagram || DEFAULT_CONFIG.instagram,
          linkedin: parsed.linkedin || DEFAULT_CONFIG.linkedin,
          services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CONFIG.services,
          packages: Array.isArray(parsed.packages) ? parsed.packages : DEFAULT_CONFIG.packages,
          teamMembers: Array.isArray(parsed.teamMembers) ? parsed.teamMembers : DEFAULT_CONFIG.teamMembers,
          testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : DEFAULT_CONFIG.testimonials,
        };
        setConfig(validated);
        localStorage.setItem('apex_diagnostics_app_config_v2', JSON.stringify(validated));
        return true;
      }
    } catch (e) {
      console.error('Failed to parse config file', e);
    }
    return false;
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, resetConfig, isAdminLoggedIn, setIsAdminLoggedIn, importConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useAppConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useAppConfig must be used within a ConfigProvider');
  }
  return context;
};

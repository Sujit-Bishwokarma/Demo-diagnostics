export interface ServiceTestPoint {
  name: string;
  price: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceEstimate: string;
  duration: string;
  iconName: string; // Used to dynamically map Lucide icons
  imageUrl?: string;
  testPoints?: ServiceTestPoint[];
}

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  popular: boolean;
  includedTests: string[];
  description: string;
  targetAudience: string;
}

export interface CorporatePlan {
  id: string;
  name: string;
  description: string;
  features: string[];
}

export interface PatientReport {
  patientId: string;
  patientName: string;
  phone: string;
  testName: string;
  dateCollected: string;
  status: 'Ready' | 'Pending' | 'Reviewing';
  resultsSummary?: string;
  downloadUrl?: string;
  vitals?: {
    bloodPressure?: string;
    bloodSugar?: string;
    cholesterol?: string;
    hemoglobin?: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  relation: string; // e.g., "Patient", "Corporate Partner"
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  specialty: string;
}

export interface AppointmentBooking {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  packageName?: string;
  date: string;
  timeSlot: string;
  message?: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

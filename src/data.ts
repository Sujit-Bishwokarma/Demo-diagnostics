import { ServiceItem, PackageItem, CorporatePlan, PatientReport, TestimonialItem, TeamMember } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'lab-tests',
    title: 'Lab Tests',
    description: 'Highly precise hematology, biochemistry, immunology, and molecular pathology services with computerized diagnostics.',
    priceEstimate: 'NPR 1,100 - NPR 2,200',
    duration: '12 - 24 Hours',
    iconName: 'Microscope',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'Complete Blood Count (CBC)', price: 'NPR 1,250', description: 'Evaluates overall health and detects a wide range of disorders, including anemia and infection.' },
      { name: 'Lipid Profile (Cholesterol)', price: 'NPR 1,800', description: 'Measures cholesterol level and triglycerides to evaluate cardiovascular risks.' },
      { name: 'Thyroid Profile (T3, T4, TSH)', price: 'NPR 2,200', description: 'Assesses thyroid gland function and metabolic health parameters.' },
      { name: 'Liver Function Test (LFT)', price: 'NPR 1,950', description: 'Measures proteins, liver enzymes, and bilirubin levels to check liver health.' },
      { name: 'Kidney Function Test (KFT)', price: 'NPR 1,600', description: 'Evaluates glomerular filtration rate, urea, creatinine, and electrolytes.' },
      { name: 'HbA1c Glycated Hemoglobin', price: 'NPR 1,100', description: 'Provides a three-month average of blood sugar levels for diabetes tracking.' }
    ]
  },
  {
    id: 'xray-imaging',
    title: 'X-Ray & Imaging',
    description: 'Digital diagnostic radiography, high-frequency ultrasounds, and echocardiograms for precise internal visualization.',
    priceEstimate: 'NPR 1,500 - NPR 2,200',
    duration: '2 - 4 Hours',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'Chest X-Ray (PA View)', price: 'NPR 1,500', description: 'Produces images of the heart, lungs, airways, blood vessels, and chest bones.' },
      { name: 'Spine X-Ray (Cervical / Lumbar)', price: 'NPR 2,200', description: 'Visualizes the vertebrae structure to check for degeneration or spine damage.' },
      { name: 'Abdomen / Pelvis X-Ray', price: 'NPR 1,800', description: 'Assesses the digestive, urinary, and reproductive structures.' },
      { name: 'Joint Radiography (Knee/Shoulder)', price: 'NPR 2,000', description: 'Identifies joint space narrowing, fractures, and bone spurs.' }
    ]
  },
  {
    id: 'mri-scanning',
    title: 'MRI & Scanning',
    description: 'Advanced MRI and high-slice CT scans offering superb spatial resolution and accurate anatomical cross-sections.',
    priceEstimate: 'NPR 9,500 - NPR 14,500',
    duration: '1 - 2 Days',
    iconName: 'Scan',
    imageUrl: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'Brain MRI (High Resolution)', price: 'NPR 14,500', description: 'Scans head structures for tumors, aneurysms, or stroke-induced damage.' },
      { name: 'Spine MRI (Lumbar/Cervical)', price: 'NPR 13,000', description: 'Offers rich imaging of the spinal cord, discs, and surrounding soft tissues.' },
      { name: 'Knee Joint MRI', price: 'NPR 13,500', description: 'Detailed visualization of meniscus, ligaments, cartilage, and tendons.' },
      { name: 'Abdomen CT Scan', price: 'NPR 9,500', description: 'High-speed diagnostic scan of abdominal organs.' },
      { name: 'High Resolution Chest CT (HRCT)', price: 'NPR 11,000', description: 'High-definition lung visualization to assess interstitial pulmonary diseases.' }
    ]
  },
  {
    id: 'fullbody-checkup',
    title: 'Full Body Checkup',
    description: 'Preventive healthcare evaluations combining general blood indicators, metabolic baselines, and cardiac screens.',
    priceEstimate: 'NPR 4,500 - NPR 18,500',
    duration: '24 Hours',
    iconName: 'Heart',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'Basic Metabolic Screening', price: 'NPR 4,500', description: 'Assesses primary metabolic factors, renal outputs, and glucose levels.' },
      { name: 'Cardiovascular Risk Indicators', price: 'NPR 3,800', description: 'Analyzes high-sensitivity CRP, lipid indicators, and cardiac enzymes.' },
      { name: 'Vitamin D3 & B12 Panel', price: 'NPR 5,200', description: 'Evaluates essential micronutrient deficiencies that impact bones and nerves.' },
      { name: 'Complete Hemogram Screen', price: 'NPR 1,500', description: 'Calculates absolute counts of erythrocytes, leukocytes, and platelets.' },
      { name: 'Complete Urinalysis & Stool exam', price: 'NPR 800', description: 'Routine diagnostic screening for systemic or intestinal infections.' }
    ]
  },
  {
    id: 'ultrasound-scanning',
    title: 'Ultrasound Screening',
    description: 'Safe high-frequency sound wave diagnostic procedures for soft tissues, abdomen, thyroid, and fetal development monitoring.',
    priceEstimate: 'NPR 2,500 - NPR 3,500',
    duration: '1 - 2 Hours',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'USG Whole Abdomen & Pelvis', price: 'NPR 3,200', description: 'Checks liver, gall bladder, pancreas, spleen, kidneys, and urinary bladder.' },
      { name: 'USG Obstetric / Pregnancy Scan', price: 'NPR 2,800', description: 'Evaluates fetal development, fluid levels, and gestational progress.' },
      { name: 'Thyroid Ultrasound', price: 'NPR 2,500', description: 'Screening for nodules, swellings, or thyroid enlargement.' },
      { name: 'Bilateral Breast Ultrasound', price: 'NPR 3,500', description: 'Non-invasive diagnostic check for cysts, dense breast tissue, or lumps.' }
    ]
  },
  {
    id: 'cardiac-evaluation',
    title: 'Cardiac Evaluation (ECG/ECHO)',
    description: 'Comprehensive electrical and physical assessment of the heart, with state-of-the-art stress testing, ECG, and ultrasound.',
    priceEstimate: 'NPR 800 - NPR 4,500',
    duration: '2 - 3 Hours',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1628172847831-572c5a3c62a9?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: '12-Lead Electrocardiogram (ECG)', price: 'NPR 800', description: 'Measures the electrical pathways and rhythm patterns of the heart.' },
      { name: '2D Echocardiography (ECHO)', price: 'NPR 3,800', description: 'Cardiac ultrasound with color Doppler to analyze blood flow and structural valves.' },
      { name: 'Treadmill Stress Test (TMT)', price: 'NPR 2,500', description: 'Measures heart safety and stamina during physical exertion.' },
      { name: '24-Hour Holter Monitoring', price: 'NPR 4,500', description: 'Continuous portable ECG recording to capture transient arrhythmias.' }
    ]
  },
  {
    id: 'pathology-biopsy',
    title: 'Pathology & Biopsy',
    description: 'Detailed histopathological and cytopathological tissue examination led by our expert board of pathologists.',
    priceEstimate: 'NPR 1,800 - NPR 6,000',
    duration: '2 - 3 Days',
    iconName: 'Microscope',
    imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'Histopathology Small Specimen', price: 'NPR 3,500', description: 'Microscopic examination of biopsies from skin, polyps, or small excisions.' },
      { name: 'Histopathology Large Specimen', price: 'NPR 6,000', description: 'Detailed examination of excised organ structures or large tumors.' },
      { name: 'FNAC (Fine Needle Aspiration Cytology)', price: 'NPR 2,800', description: 'Simple needle-aspirated cell analysis for lumps or lymph nodes.' },
      { name: 'Pap Smear Cytology Screening', price: 'NPR 1,800', description: 'Standard preventive screening for cervical cellular abnormalities.' }
    ]
  },
  {
    id: 'genetic-testing',
    title: 'Genetic & DNA Screening',
    description: 'Personalized genomic diagnostics, carrier screens, and DNA profiles to evaluate hereditary risk parameters.',
    priceEstimate: 'NPR 14,500 - NPR 45,000',
    duration: '5 - 7 Days',
    iconName: 'Scan',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800',
    testPoints: [
      { name: 'BRCA1 & BRCA2 Gene Mutation Screen', price: 'NPR 18,000', description: 'Hereditary risk assessment for breast and ovarian cancer predisposition.' },
      { name: 'NIPT (Non-Invasive Prenatal Testing)', price: 'NPR 35,000', description: 'Advanced screening of cell-free fetal DNA in maternal blood for chromosomal health.' },
      { name: 'Hereditary Thalassemia Carrier Screen', price: 'NPR 14,500', description: 'Evaluates hemoglobin gene markers to identify carrier risks.' },
      { name: 'Whole Exome Diagnostic Sequencing', price: 'NPR 45,000', description: 'Comprehensive mapping of gene-coding regions to locate complex hereditary conditions.' }
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Accurate Results',
    reason: 'Our clinical lab is equipped with fully automated state-of-the-art diagnostic machines ensuring 99.9% medical accuracy.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Fast Reports',
    reason: 'Receive comprehensive digital reports directly on your mobile device within 12 to 24 hours of sample collection.',
    iconName: 'Zap'
  },
  {
    title: 'Certified Doctors',
    reason: 'Our expert team of board-certified radiologists, pathologists, and friendly phlebotomists have over 50 years of combined experience.',
    iconName: 'Award'
  }
];

export const INDIVIDUAL_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Health Check',
    price: 3500,
    popular: false,
    includedTests: [
      'Complete Blood Count (CBC - 24 Parameters)',
      'Fasting Blood Sugar (Glucose)',
      'Complete Urine Analysis',
      'Kidney Function Indicators (Urea & Creatinine)'
    ],
    description: 'Ideal for routine health screenings and seasonal assessments.',
    targetAudience: 'Recommended for ages 18-35, twice a year.'
  },
  {
    id: 'pkg-standard',
    name: 'Standard Wellness Package',
    price: 7500,
    popular: true,
    includedTests: [
      'Everything in Basic Package',
      'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Liver Function Test (LFT - 11 Parameters)',
      'Thyroid Profile (T3, T4, TSH)',
      'Electrocardiogram (ECG / EKG)'
    ],
    description: 'Our most popular comprehensive screening for general health and risk evaluation.',
    targetAudience: 'Recommended for all adults, at least once a year.'
  },
  {
    id: 'pkg-premium',
    name: 'Premium Executive Package',
    price: 16500,
    popular: false,
    includedTests: [
      'Everything in Standard Package',
      'Cardiac Risk Markers (hs-CRP, ApoA, ApoB)',
      'Vitamin D3 & Vitamin B12 Levels',
      'HbA1c (Average 3-Month Blood Sugar)',
      'Abdominal Ultrasound Screening',
      'Bone Mineral Markers (Calcium & Phosphorus)'
    ],
    description: 'An exhaustive deep-dive diagnostic suite for a fully tailored preventative overview.',
    targetAudience: 'Recommended for age 40+ or individuals with chronic symptoms/family history.'
  }
];

export const CORPORATE_PLAN: CorporatePlan = {
  id: 'corp-wellness',
  name: 'Corporate Employee Screening Plan',
  description: 'Custom-tailored healthcare solutions to protect your workforce, boost productivity, and fulfill statutory medical guidelines.',
  features: [
    'Pre-employment medical clearance screenings',
    'Annual employee health wellness checkups',
    'On-site vaccination & blood draw camps',
    'Executive and leadership diagnostic profiling',
    'Detailed anonymous group analytics reports for HR benefits planning'
  ]
};

export const SAMPLE_REPORTS: PatientReport[] = [
  {
    patientId: 'PT-101',
    patientName: 'Alexander Mercer',
    phone: '9876543210',
    testName: 'Standard Wellness Package',
    dateCollected: 'June 28, 2026',
    status: 'Ready',
    resultsSummary: 'Overall healthy physiological profile. Mild cholesterol elevation and borderline low Vitamin D identified. Recommended lifestyle changes and physical activity.',
    downloadUrl: '#',
    vitals: {
      bloodPressure: '120/82 mmHg',
      bloodSugar: '94 mg/dL',
      cholesterol: '215 mg/dL',
      hemoglobin: '14.8 g/dL'
    }
  },
  {
    patientId: 'PT-102',
    patientName: 'Sarah Jenkins',
    phone: '8765432109',
    testName: 'Basic Health Check & Thyroid Profile',
    dateCollected: 'June 29, 2026',
    status: 'Ready',
    resultsSummary: 'Thyroid function hormones (T3, T4, TSH) are well-stabilized within physiological margins. Mild iron deficiency indicated by hemoglobin level.',
    downloadUrl: '#',
    vitals: {
      bloodPressure: '112/70 mmHg',
      bloodSugar: '88 mg/dL',
      cholesterol: '175 mg/dL',
      hemoglobin: '11.4 g/dL'
    }
  },
  {
    patientId: 'PT-103',
    patientName: 'Marcus Vance',
    phone: '5555555555',
    testName: 'Full Body Scan & Cardiac Screening',
    dateCollected: 'June 30, 2026',
    status: 'Reviewing',
    resultsSummary: 'Awaiting primary scan reviews by Senior Consultant Radiologist.'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-miller',
    name: 'Dr. Evelyn Miller, MD',
    title: 'Lead Pathologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    specialty: 'Clinical Pathology & Hematology'
  },
  {
    id: 'dr-chen',
    name: 'Dr. Raymond Chen, MD',
    title: 'Chief Radiologist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    specialty: 'MRI, CT & Ultrasound Diagnostics'
  },
  {
    id: 'dr-patel',
    name: 'Dr. Amara Patel, PhD',
    title: 'Lab Quality Director',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400',
    specialty: 'Genetics & Molecular Research'
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'David K. Larson',
    rating: 5,
    comment: 'The booking was extremely easy and the home phlebotomist arrived right on time. Got my blood test report on WhatsApp in less than 12 hours! Unbelievably efficient service.',
    relation: 'Individual Patient'
  },
  {
    id: 't-2',
    name: 'Sophia Rodriguez',
    rating: 5,
    comment: 'Clean facilities, professional doctors, and courteous staff. I did my annual Premium Executive checkup here. The consultation after receiving the reports was extremely reassuring.',
    relation: 'Preventative Checkup Patient'
  },
  {
    id: 't-3',
    name: 'James Harrison',
    rating: 5,
    comment: 'We used Apex Diagnostics for our company annual health screenings. Over 150 employees completed tests within two days. Highly organized, minimal disruption, and detailed HR summaries.',
    relation: 'HR Manager, TechSolutions Inc.'
  },
  {
    id: 't-4',
    name: 'Clara Oswald',
    rating: 5,
    comment: 'Very affordable health packages compared to other hospitals. The diagnostic reports were extremely detailed with simple charts representing normal vs abnormal levels. Highly recommended.',
    relation: 'Standard Wellness Patient'
  }
];

export const CERTIFICATIONS = [
  { name: 'NABL Accredited Lab', icon: 'Award' },
  { name: 'ISO 9001:2015 Certified', icon: 'ShieldCheck' },
  { name: 'CAP Compliant Standards', icon: 'CheckCircle2' },
  { name: 'Advanced AI Assisted Imaging', icon: 'Cpu' }
];

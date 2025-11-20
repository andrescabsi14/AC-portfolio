export interface Industry {
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  heroDescription: string;
  color: string;
  borderColor: string;

  // Problems section
  problems: {
    title: string;
    description: string;
  }[];

  // Solution section
  solutions: {
    title: string;
    description: string;
    features: string[];
  }[];

  // Results section
  results: {
    metric: string;
    value: string;
    description: string;
  }[];

  successStory?: {
    company: string;
    quote: string;
    results: string[];
  };
}

export const industryData: Record<string, Industry> = {
  'lawn-care': {
    name: 'Lawn Care',
    slug: 'lawn-care',
    icon: '🌱',
    tagline: 'From Manual Estimates to Instant AI-Powered Quotes',
    heroDescription: 'Stop losing customers to slow response times. Your AI assistant provides instant quotes, schedules services, and manages customer communications 24/7.',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',

    problems: [
      {
        title: 'Missing Calls = Lost Revenue',
        description: 'Every unanswered call during peak season is money left on the table. Customers won\'t wait—they\'ll call your competitor.',
      },
      {
        title: 'Time-Consuming Estimates',
        description: 'Driving to properties for estimates eats up billable hours. You could be serving 3 more customers in that time.',
      },
      {
        title: 'Seasonal Chaos',
        description: 'Spring rush means overwhelmed staff, missed appointments, and frustrated customers. Growth becomes a nightmare.',
      },
      {
        title: 'Payment Collection Headaches',
        description: 'Chasing payments, sending reminders, and managing invoices manually takes hours every week.',
      },
    ],

    solutions: [
      {
        title: 'Instant AI Quotes',
        description: 'Customers get accurate estimates in seconds based on property size, service type, and location.',
        features: [
          'Satellite imagery property measurement',
          'Real-time pricing based on your rates',
          'Upsell opportunities (fertilization, aeration, etc.)',
          'Automatic quote follow-ups',
        ],
      },
      {
        title: 'Smart Scheduling',
        description: 'AI manages your calendar, optimizes routes, and handles customer scheduling automatically.',
        features: [
          'Route optimization to save fuel and time',
          'Weather-based rescheduling',
          'Automatic customer reminders',
          'Crew assignment based on availability',
        ],
      },
      {
        title: 'Automated Communication',
        description: 'Your AI handles customer questions, service confirmations, and updates without human intervention.',
        features: [
          '24/7 customer support',
          'Service completion notifications',
          'Seasonal service reminders',
          'Review requests after service',
        ],
      },
      {
        title: 'Payment Automation',
        description: 'Invoicing, payment reminders, and collection happen automatically.',
        features: [
          'Automatic invoice generation',
          'Multiple payment options',
          'Smart payment reminders',
          'CRM integration',
        ],
      },
    ],

    results: [
      {
        metric: 'Response Time',
        value: '< 60 seconds',
        description: 'Average time from inquiry to quote',
      },
      {
        metric: 'Conversion Rate',
        value: '+45%',
        description: 'Increase in quote-to-customer conversion',
      },
      {
        metric: 'Time Saved',
        value: '20+ hours/week',
        description: 'Staff time freed up for billable work',
      },
      {
        metric: 'Revenue Growth',
        value: '+35%',
        description: 'Average first-year revenue increase',
      },
    ],

    successStory: {
      company: 'Green Valley Lawn Care',
      quote: 'We went from answering 60% of calls to serving 100% of inquiries. Our AI handles everything while we focus on delivering great service.',
      results: [
        'Grew from 85 to 240 customers in 8 months',
        'Reduced administrative time by 75%',
        'Increased profit margins by 23%',
      ],
    },
  },

  'law-offices': {
    name: 'Law Offices',
    slug: 'law-offices',
    icon: '⚖️',
    tagline: 'Qualify Leads and Manage Intake While You Focus on Cases',
    heroDescription: 'Your AI assistant qualifies potential clients, schedules consultations, and manages case intake 24/7, so you only spend time on qualified leads.',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',

    problems: [
      {
        title: 'Unqualified Consultations',
        description: 'Spending valuable attorney time on consultations that don\'t convert wastes money and blocks your calendar.',
      },
      {
        title: 'After-Hours Inquiries',
        description: 'Potential clients contact you outside business hours. By Monday, they\'ve already hired someone else.',
      },
      {
        title: 'Intake Bottleneck',
        description: 'Manual intake forms, follow-up emails, and document collection slow down your entire process.',
      },
      {
        title: 'Client Communication Overload',
        description: 'Answering the same questions repeatedly takes time away from billable work.',
      },
    ],

    solutions: [
      {
        title: 'Intelligent Lead Qualification',
        description: 'AI asks the right questions to determine case viability before scheduling your time.',
        features: [
          'Practice area matching',
          'Conflict of interest checking',
          'Budget qualification',
          'Urgency assessment',
        ],
      },
      {
        title: 'Automated Case Intake',
        description: 'Collect all necessary information before the first meeting.',
        features: [
          'Smart intake forms',
          'Document collection',
          'Calendar integration',
          'CRM synchronization',
        ],
      },
      {
        title: '24/7 Client Communication',
        description: 'Answer common questions instantly, any time of day.',
        features: [
          'Practice area information',
          'Fee structure explanation',
          'Process timeline overview',
          'Case status updates',
        ],
      },
      {
        title: 'Consultation Scheduling',
        description: 'AI manages your calendar and books qualified consultations automatically.',
        features: [
          'Attorney availability matching',
          'Automatic confirmation emails',
          'Reminder system',
          'Rescheduling handling',
        ],
      },
    ],

    results: [
      {
        metric: 'Lead Quality',
        value: '+67%',
        description: 'Increase in qualified consultations',
      },
      {
        metric: 'Response Time',
        value: '24/7',
        description: 'Immediate response to all inquiries',
      },
      {
        metric: 'Intake Time',
        value: '-80%',
        description: 'Reduction in intake processing time',
      },
      {
        metric: 'Conversion Rate',
        value: '+40%',
        description: 'More consultations convert to clients',
      },
    ],

    successStory: {
      company: 'Thompson & Associates',
      quote: 'Our AI handles initial screening so perfectly that 85% of our consultations now convert to clients. We\'ve doubled our caseload without adding staff.',
      results: [
        'Increased billable hours by 40%',
        'Reduced intake costs by $45,000/year',
        'Improved client satisfaction scores by 35%',
      ],
    },
  },

  'medical-practices': {
    name: 'Medical Practices',
    slug: 'medical-practices',
    icon: '🏥',
    tagline: 'Reduce No-Shows and Automate Patient Communication',
    heroDescription: 'Your AI manages scheduling, insurance verification, pre-visit questionnaires, and patient communication—so your staff can focus on patient care.',
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30',

    problems: [
      {
        title: 'Phone Tag Nightmare',
        description: 'Staff spend hours on hold with insurance companies and playing phone tag with patients.',
      },
      {
        title: 'No-Show Epidemic',
        description: 'Every missed appointment is lost revenue and wasted time that could have served another patient.',
      },
      {
        title: 'Manual Intake Chaos',
        description: 'Patients fill out paperwork in the waiting room, creating delays and data entry work for staff.',
      },
      {
        title: 'Insurance Verification Delays',
        description: 'Finding out about coverage issues at check-in creates awkward conversations and billing problems.',
      },
    ],

    solutions: [
      {
        title: 'Smart Scheduling',
        description: 'AI manages appointments with intelligent reminders and easy rescheduling.',
        features: [
          'Multi-channel reminders (SMS, email, voice)',
          'One-click rescheduling',
          'Waitlist management',
          'Provider preference matching',
        ],
      },
      {
        title: 'Automated Insurance Verification',
        description: 'Verify coverage before appointments to avoid billing surprises.',
        features: [
          'Real-time eligibility checking',
          'Coverage limitation alerts',
          'Pre-authorization tracking',
          'Patient responsibility estimation',
        ],
      },
      {
        title: 'Digital Patient Intake',
        description: 'Patients complete forms from home before their visit.',
        features: [
          'Mobile-friendly forms',
          'Medical history collection',
          'Consent documentation',
          'EHR integration',
        ],
      },
      {
        title: 'Patient Communication Hub',
        description: 'Answer common questions and handle routine communications automatically.',
        features: [
          'Appointment preparation instructions',
          'Lab result notifications',
          'Prescription refill requests',
          'General health questions',
        ],
      },
    ],

    results: [
      {
        metric: 'No-Show Rate',
        value: '-65%',
        description: 'Reduction in missed appointments',
      },
      {
        metric: 'Staff Time',
        value: '30+ hours/week',
        description: 'Freed up for patient care',
      },
      {
        metric: 'Patient Satisfaction',
        value: '+42%',
        description: 'Improvement in satisfaction scores',
      },
      {
        metric: 'Insurance Denials',
        value: '-58%',
        description: 'Fewer billing issues',
      },
    ],

    successStory: {
      company: 'Riverside Family Medicine',
      quote: 'Our AI assistant has transformed our practice. No-shows are down dramatically, and our staff can finally focus on what they love—helping patients.',
      results: [
        'Serve 40% more patients with same staff',
        'Reduced administrative costs by $120,000/year',
        'Increased patient retention by 28%',
      ],
    },
  },

  'dental-practices': {
    name: 'Dental Practices',
    slug: 'dental-practices',
    icon: '🦷',
    tagline: 'Fill Your Schedule and Increase Treatment Acceptance',
    heroDescription: 'Stop losing patients to scheduling friction. Your AI handles appointments, treatment explanations, and follow-ups automatically.',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',

    problems: [
      {
        title: 'Schedule Gaps',
        description: 'Cancellations and no-shows create costly gaps in your schedule that are hard to fill.',
      },
      {
        title: 'Treatment Plan Acceptance',
        description: 'Patients leave without scheduling recommended treatments, and follow-up calls rarely work.',
      },
      {
        title: 'Recall Reminder Failure',
        description: 'Manual recall systems miss patients, and they don\'t return for their 6-month cleanings.',
      },
      {
        title: 'New Patient Friction',
        description: 'Complex intake forms and insurance questions create barriers that lose new patients.',
      },
    ],

    solutions: [
      {
        title: 'Dynamic Schedule Optimization',
        description: 'AI fills cancellations instantly and maximizes chair time.',
        features: [
          'Automatic waitlist matching',
          'Smart reminder timing',
          'Easy online rescheduling',
          'Same-day appointment filling',
        ],
      },
      {
        title: 'Treatment Plan Education',
        description: 'AI explains treatments in patient-friendly language and handles objections.',
        features: [
          'Interactive treatment explanations',
          'Cost breakdown and payment options',
          'Insurance coverage information',
          'Video educational content',
        ],
      },
      {
        title: 'Automated Recall System',
        description: 'Never lose track of patients again with intelligent recall management.',
        features: [
          'Multi-touch recall campaigns',
          'Preferred channel communication',
          'Family grouping',
          'Special offer integration',
        ],
      },
      {
        title: 'Seamless New Patient Experience',
        description: 'Make it easy for new patients to start their journey with your practice.',
        features: [
          'Digital intake forms',
          'Insurance verification',
          'Virtual office tour',
          'Provider matching',
        ],
      },
    ],

    results: [
      {
        metric: 'Schedule Utilization',
        value: '+92%',
        description: 'Chairs filled throughout the day',
      },
      {
        metric: 'Treatment Acceptance',
        value: '+55%',
        description: 'More patients say yes to treatment',
      },
      {
        metric: 'Recall Success',
        value: '+73%',
        description: 'More patients return for cleanings',
      },
      {
        metric: 'New Patient Growth',
        value: '+48%',
        description: 'Increase in new patient starts',
      },
    ],

    successStory: {
      company: 'Bright Smile Dental',
      quote: 'We used to have 15-20 empty appointment slots per week. Now our schedule is consistently 95%+ full, and treatment acceptance has never been higher.',
      results: [
        'Added $380,000 in annual revenue',
        'Eliminated front desk overtime',
        'Increased hygiene reappointment rate to 94%',
      ],
    },
  },

  'insurance-offices': {
    name: 'Insurance Offices',
    slug: 'insurance-offices',
    icon: '🛡️',
    tagline: 'Instant Quotes and 24/7 Policy Support',
    heroDescription: 'Your AI provides accurate quotes instantly, answers policy questions, and processes applications—converting more leads into policies.',
    color: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',

    problems: [
      {
        title: 'Quote Delay = Lost Sales',
        description: 'Customers shop around while waiting for your quote. Speed wins in insurance.',
      },
      {
        title: 'Policy Question Overload',
        description: 'Agents spend hours answering the same coverage questions instead of writing new business.',
      },
      {
        title: 'Claims Status Calls',
        description: 'Constant "where\'s my claim?" calls overwhelm your team during their busiest times.',
      },
      {
        title: 'Cross-Sell Opportunities Missed',
        description: 'Existing customers have coverage gaps, but you don\'t have time to review every account.',
      },
    ],

    solutions: [
      {
        title: 'Instant Quote Engine',
        description: 'AI generates accurate quotes in real-time for all your product lines.',
        features: [
          'Multi-carrier comparison',
          'Discount identification',
          'Bundle recommendations',
          'Application pre-filling',
        ],
      },
      {
        title: 'Policy Support Assistant',
        description: 'Answer coverage questions and provide policy information 24/7.',
        features: [
          'Coverage explanation',
          'Policy document access',
          'Change request processing',
          'Payment information',
        ],
      },
      {
        title: 'Claims Status Automation',
        description: 'Customers check claim status without calling your office.',
        features: [
          'Real-time claim tracking',
          'Document upload portal',
          'Next steps guidance',
          'Adjuster contact info',
        ],
      },
      {
        title: 'Intelligent Cross-Selling',
        description: 'AI identifies coverage gaps and recommends additional products.',
        features: [
          'Life event triggers',
          'Coverage gap analysis',
          'Personalized recommendations',
          'Automated follow-up',
        ],
      },
    ],

    results: [
      {
        metric: 'Quote Speed',
        value: '< 2 minutes',
        description: 'From inquiry to accurate quote',
      },
      {
        metric: 'Conversion Rate',
        value: '+52%',
        description: 'More quotes convert to policies',
      },
      {
        metric: 'Service Calls',
        value: '-70%',
        description: 'Reduction in routine inquiries',
      },
      {
        metric: 'Cross-Sell Revenue',
        value: '+$180K',
        description: 'Additional annual premium',
      },
    ],

    successStory: {
      company: 'Hometown Insurance Group',
      quote: 'Our AI quotes faster than our competitors can answer the phone. We\'ve gone from 20% to 65% quote-to-policy conversion in less than a year.',
      results: [
        'Grew book of business by 47%',
        'Reduced staffing needs by 3 FTEs',
        'Increased customer satisfaction to 4.8/5',
      ],
    },
  },

  'labs': {
    name: 'Labs & Research',
    slug: 'labs',
    icon: '🔬',
    tagline: 'Streamline Sample Processing and Results Delivery',
    heroDescription: 'Automate sample tracking, result delivery, and client communication so your team can focus on the science.',
    color: 'from-teal-500/20 to-cyan-500/20',
    borderColor: 'border-teal-500/30',

    problems: [
      {
        title: 'Sample Tracking Chaos',
        description: 'Manual tracking leads to lost samples, delayed results, and frustrated clients.',
      },
      {
        title: 'Result Delivery Delays',
        description: 'Staff manually email results, miss urgent flags, and create compliance risks.',
      },
      {
        title: 'Client Communication Gaps',
        description: '"When will my results be ready?" calls interrupt lab work constantly.',
      },
      {
        title: 'Reporting Bottlenecks',
        description: 'Generating reports for multiple stakeholders takes hours of manual work.',
      },
    ],

    solutions: [
      {
        title: 'Automated Sample Management',
        description: 'Track every sample from collection to completion automatically.',
        features: [
          'Barcode scanning integration',
          'Chain of custody documentation',
          'Priority flagging',
          'Temperature monitoring alerts',
        ],
      },
      {
        title: 'Intelligent Result Distribution',
        description: 'Deliver results to the right people at the right time, automatically.',
        features: [
          'Multi-channel delivery',
          'Critical value alerts',
          'Secure portal access',
          'Compliance documentation',
        ],
      },
      {
        title: 'Client Self-Service Portal',
        description: 'Clients check sample status and access results 24/7.',
        features: [
          'Real-time status tracking',
          'Historical result access',
          'Report downloading',
          'Trend analysis tools',
        ],
      },
      {
        title: 'Automated Reporting',
        description: 'Generate customized reports for different audiences instantly.',
        features: [
          'Template-based reporting',
          'Data visualization',
          'Scheduled distribution',
          'Regulatory compliance',
        ],
      },
    ],

    results: [
      {
        metric: 'Processing Time',
        value: '-40%',
        description: 'Faster sample-to-result turnaround',
      },
      {
        metric: 'Admin Work',
        value: '-60%',
        description: 'Reduction in manual tasks',
      },
      {
        metric: 'Client Inquiries',
        value: '-75%',
        description: 'Fewer status check calls',
      },
      {
        metric: 'Error Rate',
        value: '-85%',
        description: 'Fewer tracking and delivery errors',
      },
    ],

    successStory: {
      company: 'Regional Diagnostics Lab',
      quote: 'Sample tracking errors are virtually eliminated, and our clients love having 24/7 access to their results. Our staff can finally focus on lab work.',
      results: [
        'Process 60% more samples with same staff',
        'Reduced turnaround time by 2 days',
        'Achieved 99.8% accuracy rate',
      ],
    },
  },

  'pharma': {
    name: 'Pharmaceutical',
    slug: 'pharma',
    icon: '💊',
    tagline: 'Intelligent Drug Information and Patient Support',
    heroDescription: 'Provide instant, accurate drug information and patient support while maintaining compliance and improving outcomes.',
    color: 'from-indigo-500/20 to-blue-500/20',
    borderColor: 'border-indigo-500/30',

    problems: [
      {
        title: 'Information Overload',
        description: 'Patients and providers need quick answers about indications, dosing, interactions, and side effects.',
      },
      {
        title: 'Prescription Support Burden',
        description: 'Your team spends hours helping patients navigate prior authorizations and coverage issues.',
      },
      {
        title: 'Adherence Challenges',
        description: 'Patients don\'t take medications correctly, leading to poor outcomes and discontinued use.',
      },
      {
        title: 'Adverse Event Reporting',
        description: 'Gathering and documenting adverse events is time-consuming but critical for compliance.',
      },
    ],

    solutions: [
      {
        title: 'AI Drug Information System',
        description: 'Provide instant, accurate drug information to patients and healthcare providers.',
        features: [
          'Indication and dosing information',
          'Drug interaction checking',
          'Side effect explanations',
          'Patient education materials',
        ],
      },
      {
        title: 'Prescription Access Support',
        description: 'Help patients navigate insurance coverage and access programs.',
        features: [
          'Coverage verification',
          'Prior authorization assistance',
          'Co-pay program enrollment',
          'Alternative option suggestions',
        ],
      },
      {
        title: 'Medication Adherence Program',
        description: 'Improve outcomes with intelligent reminders and education.',
        features: [
          'Customized reminder schedules',
          'Refill notifications',
          'Side effect management tips',
          'Progress tracking',
        ],
      },
      {
        title: 'Adverse Event Collection',
        description: 'Streamline reporting while maintaining regulatory compliance.',
        features: [
          'Structured data collection',
          'Automatic form completion',
          'Regulatory submission',
          'Trend analysis',
        ],
      },
    ],

    results: [
      {
        metric: 'Response Time',
        value: '< 30 seconds',
        description: 'Average inquiry response',
      },
      {
        metric: 'Patient Adherence',
        value: '+38%',
        description: 'Improvement in medication compliance',
      },
      {
        metric: 'Support Costs',
        value: '-$340K',
        description: 'Annual patient support savings',
      },
      {
        metric: 'Coverage Success',
        value: '+45%',
        description: 'More prior auths approved',
      },
    ],

    successStory: {
      company: 'Leading Specialty Pharma Company',
      quote: 'Our AI support system has transformed patient experience. Adherence is up, support costs are down, and our patient satisfaction scores have never been higher.',
      results: [
        'Reduced support call volume by 68%',
        'Improved 6-month adherence rate to 72%',
        'Decreased time-to-coverage by 3.5 days',
      ],
    },
  },

  'hr': {
    name: 'HR & Recruitment',
    slug: 'hr',
    icon: '👥',
    tagline: 'Find Better Candidates Faster with AI-Powered Recruitment',
    heroDescription: 'Screen resumes, schedule interviews, and manage onboarding automatically—so you can focus on finding the perfect fit.',
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',

    problems: [
      {
        title: 'Resume Overload',
        description: 'Hundreds of applications for each position, most unqualified. Manual screening is overwhelming.',
      },
      {
        title: 'Scheduling Nightmare',
        description: 'Coordinating interviews across multiple stakeholders wastes hours and delays hiring.',
      },
      {
        title: 'Candidate Experience Gaps',
        description: 'Slow responses and poor communication cause top candidates to accept other offers.',
      },
      {
        title: 'Onboarding Inconsistency',
        description: 'Manual onboarding creates gaps, delays productivity, and increases early turnover.',
      },
    ],

    solutions: [
      {
        title: 'Intelligent Resume Screening',
        description: 'AI analyzes applications and ranks candidates based on your criteria.',
        features: [
          'Skills matching',
          'Experience analysis',
          'Culture fit assessment',
          'Bias reduction',
        ],
      },
      {
        title: 'Automated Interview Coordination',
        description: 'AI manages scheduling across all stakeholders effortlessly.',
        features: [
          'Calendar integration',
          'Automatic rescheduling',
          'Reminder system',
          'Interview kit preparation',
        ],
      },
      {
        title: 'Candidate Engagement',
        description: 'Keep candidates informed and engaged throughout the process.',
        features: [
          'Status updates',
          'FAQ answering',
          'Company information',
          'Next steps guidance',
        ],
      },
      {
        title: 'Streamlined Onboarding',
        description: 'Automate paperwork, training scheduling, and new hire integration.',
        features: [
          'Digital document signing',
          'Training schedule creation',
          'IT provisioning coordination',
          'Progress tracking',
        ],
      },
    ],

    results: [
      {
        metric: 'Screening Time',
        value: '-85%',
        description: 'Faster candidate evaluation',
      },
      {
        metric: 'Time-to-Hire',
        value: '-12 days',
        description: 'Average reduction in hiring cycle',
      },
      {
        metric: 'Candidate Quality',
        value: '+56%',
        description: 'Improvement in hire quality scores',
      },
      {
        metric: 'Onboarding Time',
        value: '-60%',
        description: 'Faster time-to-productivity',
      },
    ],

    successStory: {
      company: 'TechGrowth Solutions',
      quote: 'We went from drowning in resumes to having a curated pipeline of qualified candidates. Our time-to-hire dropped from 45 to 22 days, and new hire quality has never been better.',
      results: [
        'Filled 35% more positions with same team',
        'Reduced cost-per-hire by $2,400',
        'Improved 90-day retention to 94%',
      ],
    },
  },

  'paperwork': {
    name: 'Document Management',
    slug: 'paperwork',
    icon: '📄',
    tagline: 'End the Paper Nightmare with Intelligent Document Processing',
    heroDescription: 'Stop drowning in paperwork. AI extracts, organizes, and processes your documents automatically.',
    color: 'from-gray-500/20 to-slate-500/20',
    borderColor: 'border-gray-500/30',

    problems: [
      {
        title: 'Storage Chaos',
        description: 'Filing cabinets everywhere, and you still can\'t find the document you need when you need it.',
      },
      {
        title: 'Manual Data Entry',
        description: 'Staff spend hours typing information from paper into systems—boring, error-prone work.',
      },
      {
        title: 'Compliance Risks',
        description: 'Missing documents, retention policy violations, and audit nightmares.',
      },
      {
        title: 'Collaboration Barriers',
        description: 'Physical documents can only be in one place at a time, slowing down workflows.',
      },
    ],

    solutions: [
      {
        title: 'Intelligent Document Capture',
        description: 'AI extracts data from any document automatically.',
        features: [
          'OCR with 99.9% accuracy',
          'Handwriting recognition',
          'Form field extraction',
          'Multi-language support',
        ],
      },
      {
        title: 'Smart Organization',
        description: 'Documents are automatically classified and filed correctly.',
        features: [
          'Auto-classification',
          'Metadata tagging',
          'Version control',
          'Access permissions',
        ],
      },
      {
        title: 'Instant Search & Retrieval',
        description: 'Find any document in seconds with intelligent search.',
        features: [
          'Full-text search',
          'Semantic understanding',
          'Date range filtering',
          'Related document suggestions',
        ],
      },
      {
        title: 'Compliance Automation',
        description: 'Maintain compliance effortlessly with automated retention and audit trails.',
        features: [
          'Retention policy enforcement',
          'Audit trail logging',
          'E-signature integration',
          'Compliance reporting',
        ],
      },
    ],

    results: [
      {
        metric: 'Data Entry Time',
        value: '-95%',
        description: 'Nearly eliminated manual entry',
      },
      {
        metric: 'Document Retrieval',
        value: '< 10 seconds',
        description: 'Average time to find any document',
      },
      {
        metric: 'Storage Costs',
        value: '-$18K/year',
        description: 'Eliminated physical storage',
      },
      {
        metric: 'Compliance Issues',
        value: '-100%',
        description: 'Zero violations since implementation',
      },
    ],

    successStory: {
      company: 'Midwest Manufacturing',
      quote: 'We eliminated 47 filing cabinets and freed up an entire office. Our team went from spending 30% of their time on paperwork to less than 5%.',
      results: [
        'Saved $94,000 in first year',
        'Reduced document processing from 3 days to 2 hours',
        'Passed audit with zero findings',
      ],
    },
  },
};

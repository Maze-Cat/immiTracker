export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EligibilityRequirement {
  requirement: string;
  details: string;
}

export interface VisaInfoContent {
  slug: string;
  title: string;
  subtitle: string;
  overview: string;
  eligibility: EligibilityRequirement[];
  processSteps: ProcessStep[];
  timeline: string;
  faqs: FAQItem[];
}

export interface BilingualVisaInfo {
  en: VisaInfoContent;
  zh: VisaInfoContent;
}

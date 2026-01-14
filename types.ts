
export enum Region {
  Global = "Global Top 25",
  NorthAmerica = "North America",
  Europe = "Europe",
  AsiaPacific = "Asia Pacific",
  MiddleEast = "Middle East",
  SouthAmerica = "South America",
  Africa = "Africa"
}

export enum ProductType {
  HomeLoan = "Home Loan",
  CarLoan = "Car Loan",
  BusinessLoan = "Business Loan",
  StartupLoan = "Startup Loan",
  EducationLoan = "Education Loan",
  CreditCard = "Credit Card",
  Savings = "Savings & Deposits",
  Forex = "Forex & Investment"
}

export interface Bank {
  id: string;
  name: string;
  country: string;
  region: Region;
  rank: number;
  assets: string;
  websiteUrl: string;
  logoPlaceholder: string;
  features: string[];
  complianceRating: 'AAA' | 'AA' | 'A' | 'BBB';
  // Contact info
  contactEmail: string;
  contactPhone: string;
  description: string;
  // Stock Market Data
  stockSymbol?: string;
  stockPrice?: number;
}

export interface Product {
  id: string;
  bankId: string;
  bankName: string;
  type: ProductType;
  name: string;
  interestRate?: string; // e.g., "5.5% p.a."
  processingFee?: string;
  maxTenure?: string;
  maxAmount?: string;
  features: string[];
  applyUrl: string;
  // Credit Card specific
  annualFee?: string;
  rewardRate?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
}
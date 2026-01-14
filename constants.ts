
import { Bank, Product, ProductType, Region, Currency } from './types';

// Helper to generate realistic official URLs
const makeUrl = (name: string, path: string = '') => 
  `https://www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com${path}`;

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', country: 'Switzerland' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', country: 'Sweden' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', country: 'Mexico' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', country: 'Norway' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', country: 'Turkey' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', country: 'Russia' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'dh', country: 'UAE' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', country: 'Saudi Arabia' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', country: 'Poland' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', country: 'Philippines' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', country: 'Czech Republic' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', country: 'Israel' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', country: 'Chile' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', country: 'Colombia' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', country: 'Egypt' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', country: 'Vietnam' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', country: 'Pakistan' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh' },
];


// --- Real World Famous Banks Data ---
// Added stockSymbol and stockPrice (approximate realistic values)

const REAL_BANKS = [
  // --- USA (General & California Specific) ---
  { name: 'JPMorgan Chase', country: 'USA', region: Region.NorthAmerica, assets: '$3.7T', stockSymbol: 'JPM', stockPrice: 198.50 },
  { name: 'Bank of America', country: 'USA', region: Region.NorthAmerica, assets: '$3.1T', stockSymbol: 'BAC', stockPrice: 38.20 },
  { name: 'Wells Fargo', country: 'USA (CA)', region: Region.NorthAmerica, assets: '$1.9T', stockSymbol: 'WFC', stockPrice: 58.90 },
  { name: 'Citigroup', country: 'USA', region: Region.NorthAmerica, assets: '$2.4T', stockSymbol: 'C', stockPrice: 62.40 },
  { name: 'Goldman Sachs', country: 'USA', region: Region.NorthAmerica, assets: '$1.5T', stockSymbol: 'GS', stockPrice: 450.10 },
  { name: 'Morgan Stanley', country: 'USA', region: Region.NorthAmerica, assets: '$1.2T', stockSymbol: 'MS', stockPrice: 96.80 },
  { name: 'Silicon Valley Bank', country: 'USA (CA)', region: Region.NorthAmerica, assets: '$200B', stockSymbol: 'SIVB', stockPrice: 106.50 }, // Simulated/Historical
  { name: 'City National Bank', country: 'USA (CA)', region: Region.NorthAmerica, assets: '$95B', stockSymbol: 'CYN', stockPrice: 88.20 },
  { name: 'Capital One', country: 'USA', region: Region.NorthAmerica, assets: '$450B', stockSymbol: 'COF', stockPrice: 138.40 },
  { name: 'PNC Financial', country: 'USA', region: Region.NorthAmerica, assets: '$560B', stockSymbol: 'PNC', stockPrice: 155.75 },

  // --- United Kingdom ---
  { name: 'HSBC Holdings', country: 'UK', region: Region.Europe, assets: '$2.9T', stockSymbol: 'HSBC', stockPrice: 42.10 },
  { name: 'Lloyds Banking Group', country: 'UK', region: Region.Europe, assets: '$1.1T', stockSymbol: 'LYG', stockPrice: 2.65 },
  { name: 'Barclays', country: 'UK', region: Region.Europe, assets: '$1.5T', stockSymbol: 'BCS', stockPrice: 10.80 },
  { name: 'NatWest Group', country: 'UK', region: Region.Europe, assets: '$900B', stockSymbol: 'NWG', stockPrice: 8.50 },
  { name: 'Standard Chartered', country: 'UK', region: Region.Europe, assets: '$820B', stockSymbol: 'STAN', stockPrice: 17.20 },
  { name: 'Nationwide Building Society', country: 'UK', region: Region.Europe, assets: '$350B', stockSymbol: 'NBS', stockPrice: 145.00 },
  
  // --- India ---
  { name: 'HDFC Bank', country: 'India', region: Region.AsiaPacific, assets: '$340B', stockSymbol: 'HDB', stockPrice: 58.90 },
  { name: 'State Bank of India', country: 'India', region: Region.AsiaPacific, assets: '$700B', stockSymbol: 'SBIN', stockPrice: 750.50 },
  { name: 'ICICI Bank', country: 'India', region: Region.AsiaPacific, assets: '$260B', stockSymbol: 'IBN', stockPrice: 28.40 },
  { name: 'Axis Bank', country: 'India', region: Region.AsiaPacific, assets: '$175B', stockSymbol: 'AXIS', stockPrice: 1050.20 },
  { name: 'Kotak Mahindra Bank', country: 'India', region: Region.AsiaPacific, assets: '$60B', stockSymbol: 'KOTAK', stockPrice: 1780.00 },
  { name: 'Punjab National Bank', country: 'India', region: Region.AsiaPacific, assets: '$160B', stockSymbol: 'PNB', stockPrice: 125.40 },
  { name: 'Bank of Baroda', country: 'India', region: Region.AsiaPacific, assets: '$180B', stockSymbol: 'BOB', stockPrice: 260.80 },
  { name: 'IndusInd Bank', country: 'India', region: Region.AsiaPacific, assets: '$50B', stockSymbol: 'INDUS', stockPrice: 1450.50 },

  // --- Europe & Others ---
  { name: 'BNP Paribas', country: 'France', region: Region.Europe, assets: '$3.0T', stockSymbol: 'BNPQY', stockPrice: 35.60 },
  { name: 'Crédit Agricole', country: 'France', region: Region.Europe, assets: '$2.6T', stockSymbol: 'CRARY', stockPrice: 14.20 },
  { name: 'Deutsche Bank', country: 'Germany', region: Region.Europe, assets: '$1.4T', stockSymbol: 'DB', stockPrice: 16.50 },
  { name: 'Banco Santander', country: 'Spain', region: Region.Europe, assets: '$1.7T', stockSymbol: 'SAN', stockPrice: 4.80 },
  { name: 'UBS Group', country: 'Switzerland', region: Region.Europe, assets: '$1.1T', stockSymbol: 'UBS', stockPrice: 30.20 },
  { name: 'Mitsubishi UFJ', country: 'Japan', region: Region.AsiaPacific, assets: '$3.1T', stockSymbol: 'MUFG', stockPrice: 10.40 },
  { name: 'China Construction Bank', country: 'China', region: Region.AsiaPacific, assets: '$4.7T', stockSymbol: 'CICHY', stockPrice: 12.80 },
  { name: 'RBC Royal Bank', country: 'Canada', region: Region.NorthAmerica, assets: '$1.4T', stockSymbol: 'RY', stockPrice: 98.50 },
  { name: 'Toronto-Dominion', country: 'Canada', region: Region.NorthAmerica, assets: '$1.3T', stockSymbol: 'TD', stockPrice: 59.20 },
  { name: 'Commonwealth Bank', country: 'Australia', region: Region.AsiaPacific, assets: '$800B', stockSymbol: 'CBA', stockPrice: 115.40 },
  { name: 'DBS Bank', country: 'Singapore', region: Region.AsiaPacific, assets: '$500B', stockSymbol: 'DBS', stockPrice: 34.80 },
];

// --- Countries List for Generator ---
const ADDITIONAL_COUNTRIES = [
  { name: 'Brazil', region: Region.SouthAmerica, code: 'BR' },
  { name: 'UAE', region: Region.MiddleEast, code: 'AE' },
  { name: 'Saudi Arabia', region: Region.MiddleEast, code: 'SA' },
  { name: 'South Africa', region: Region.Africa, code: 'ZA' },
  { name: 'Mexico', region: Region.SouthAmerica, code: 'MX' },
  { name: 'Italy', region: Region.Europe, code: 'IT' },
  { name: 'Netherlands', region: Region.Europe, code: 'NL' },
  { name: 'Sweden', region: Region.Europe, code: 'SE' },
  { name: 'South Korea', region: Region.AsiaPacific, code: 'KR' },
  { name: 'Indonesia', region: Region.AsiaPacific, code: 'ID' },
];

const BANK_PREFIXES = ['Royal', 'National', 'United', 'First', 'People\'s', 'Commercial', 'City', 'Global', 'Trust', 'Capital', 'Union', 'Federal', 'State', 'Merchant', 'Alliance', 'Sovereign'];
const BANK_SUFFIXES = ['Bank', 'Group', 'Financial', 'Holdings', 'Credit Union', 'Society', 'Partners', 'Corp', 'Limited'];

const DESCRIPTIONS = [
  "A leading global financial institution providing comprehensive banking and investment services to millions of customers worldwide.",
  "Committed to financial excellence, this bank offers tailored loan solutions, wealth management, and digital banking innovation.",
  "Empowering businesses and individuals with secure, high-yield savings options and competitive credit facilities.",
  "Known for its robust digital infrastructure and customer-centric approach to modern banking challenges.",
  "A trusted partner in your financial journey, offering expert advice and a wide range of loan and card products.",
  "Focused on sustainable finance and community growth through accessible banking and innovative credit solutions."
];

function generateBanks(totalTarget: number): Bank[] {
  const banks: Bank[] = [];
  
  // 1. Add Real Banks
  REAL_BANKS.forEach((b, index) => {
    banks.push({
      id: `real_${index}`,
      name: b.name,
      country: b.country,
      region: b.region,
      rank: index + 1,
      assets: b.assets,
      websiteUrl: makeUrl(b.name),
      logoPlaceholder: `https://picsum.photos/64/64?random=${index}`,
      features: ['Digital Banking', 'Global Reach', 'Wealth Mgmt', 'Corporate Services'].slice(0, Math.floor(Math.random() * 3) + 2),
      complianceRating: index < 10 ? 'AAA' : 'AA',
      contactEmail: `support@${b.name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      contactPhone: `+${Math.floor(Math.random() * 90) + 10} 800-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      description: DESCRIPTIONS[index % DESCRIPTIONS.length],
      stockSymbol: b.stockSymbol,
      stockPrice: b.stockPrice
    });
  });

  // 2. Generate remaining to reach target
  let currentCount = banks.length;
  let i = 0;
  
  while (currentCount < totalTarget) {
    const countryObj = ADDITIONAL_COUNTRIES[i % ADDITIONAL_COUNTRIES.length];
    const prefix = BANK_PREFIXES[Math.floor(Math.random() * BANK_PREFIXES.length)];
    const suffix = BANK_SUFFIXES[Math.floor(Math.random() * BANK_SUFFIXES.length)];
    const name = `${prefix} ${countryObj.name} ${suffix}`;
    // Simple symbol generator
    const symbol = (prefix.substring(0,1) + countryObj.name.substring(0,2) + suffix.substring(0,1)).toUpperCase();
    const price = Math.floor(Math.random() * 400) + 10 + Math.random();
    
    banks.push({
      id: `gen_${i}`,
      name: name,
      country: countryObj.name,
      region: countryObj.region,
      rank: currentCount + 1,
      assets: `$${(Math.random() * 0.9 + 0.1).toFixed(1)}T`,
      websiteUrl: makeUrl(name),
      logoPlaceholder: `https://picsum.photos/64/64?random=${100 + i}`,
      features: ['24/7 Support', 'Mobile App', 'SME Loans', 'High Yield Deposits'].slice(0, Math.floor(Math.random() * 3) + 1),
      complianceRating: Math.random() > 0.7 ? 'AA' : Math.random() > 0.4 ? 'A' : 'BBB',
      contactEmail: `help@${name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      contactPhone: `+${Math.floor(Math.random() * 90) + 10} 202-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
      stockSymbol: symbol,
      stockPrice: parseFloat(price.toFixed(2))
    });
    
    currentCount++;
    i++;
  }
  
  return banks;
}

// Generate 300+ banks for the platform to cover top 75 countries concept
export const ALL_BANKS = generateBanks(300);

// --- Product Generator ---

function generateProducts(banks: Bank[]): Product[] {
  const products: Product[] = [];
  
  banks.forEach(bank => {
    // 1. Home Loans
    products.push({
      id: `hl_${bank.id}`,
      bankId: bank.id,
      bankName: bank.name,
      type: ProductType.HomeLoan,
      name: `${bank.name} ${['Dream', 'Premier', 'Smart', 'Flexi'].sort(() => 0.5 - Math.random())[0]} Home Loan`,
      interestRate: `${(Math.random() * 3 + 4.5).toFixed(2)}%`,
      maxTenure: '30 Years',
      features: ['No hidden fees', 'Digital application', 'Top-up available'],
      applyUrl: makeUrl(bank.name, '/loans/home/apply')
    });

    // 2. Personal/Car Loans
    products.push({
      id: `cl_${bank.id}`,
      bankId: bank.id,
      bankName: bank.name,
      type: ProductType.CarLoan,
      name: `${bank.name} Auto Drive`,
      interestRate: `${(Math.random() * 4 + 7).toFixed(2)}%`,
      maxTenure: '7 Years',
      features: ['100% Financing', 'Instant Approval'],
      applyUrl: makeUrl(bank.name, '/loans/auto/apply')
    });

    // 3. Business Loans (Selected Banks)
    if (Math.random() > 0.5) {
      products.push({
        id: `bl_${bank.id}`,
        bankId: bank.id,
        bankName: bank.name,
        type: ProductType.BusinessLoan,
        name: `${bank.name} SME Growth Capital`,
        interestRate: `${(Math.random() * 5 + 9).toFixed(2)}%`,
        maxAmount: '$10M',
        features: ['Collateral Free options', 'Flexible Repayment'],
        applyUrl: makeUrl(bank.name, '/business/apply')
      });
    }

    // 4. Credit Cards
    const cardTier = Math.random() > 0.5 ? 'Platinum' : 'Infinite';
    products.push({
      id: `cc_${bank.id}`,
      bankId: bank.id,
      bankName: bank.name,
      type: ProductType.CreditCard,
      name: `${bank.name} ${cardTier} Card`,
      annualFee: Math.random() > 0.3 ? `$${Math.floor(Math.random() * 200 + 50)}` : 'Lifetime Free',
      rewardRate: `${(Math.random() * 3 + 1.5).toFixed(1)}X`,
      features: ['Airport Lounge Access', 'Travel Insurance', 'Dining Discounts', 'Concierge Service'],
      applyUrl: makeUrl(bank.name, '/cards/apply')
    });
    
    // 5. Forex/Invest
    if (bank.region !== Region.Africa) { // Just a random logic to vary product availability
      products.push({
        id: `sl_${bank.id}`,
        bankId: bank.id,
        bankName: bank.name,
        type: ProductType.Forex,
        name: `${bank.name} Global Forex Card`,
        features: ['Zero Markup', 'Multi-currency Wallet', 'Locked Rates'],
        applyUrl: makeUrl(bank.name, '/forex/apply')
      });
    }
  });

  return products;
}

export const ALL_PRODUCTS = generateProducts(ALL_BANKS);

export type CompanyType = 'Industria' | 'Comercio' | 'Edificación';
export type Sector = 'Manufactura' | 'Alimentos' | 'Logística' | 'Hospitalidad' | 'Otro';
export type OptimizationLevel = 'Ninguno' | 'Parcial' | 'Avanzado';

export interface LeadData {
  companyType: CompanyType;
  sector: Sector;
  location: string;
  monthlyConsumptionKwh: number;
  monthlyEnergyCost: number;
  hasInternalMeasurement: boolean;
  optimizationLevel: OptimizationLevel;
  hasEnergyAudit: boolean;
  hasOwnGeneration: boolean;
  knowsLaw1715: boolean;
  interestedInTaxBenefits: boolean;
  name?: string;
  email?: string;
  phone?: string;
}

export interface CalculationResult {
  annualSavings: number;
  percentageReduction: number;
  estimatedTaxBenefit: number;
  estimatedRoiMonths: number;
  score: number;
  leadCategory: 'Hot' | 'Warm' | 'Cold';
}

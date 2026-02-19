
import { LeadData, CalculationResult } from '../types';

export function calculateEnergySavings(data: LeadData): CalculationResult {
  // 1. LEAD SCORING LOGIC
  let score = 0;
  
  if (data.companyType === 'Industria') score += 25;
  if (data.monthlyConsumptionKwh > 10000) score += 20;
  if (data.interestedInTaxBenefits || data.knowsLaw1715) score += 30;
  if (!data.hasEnergyAudit) score += 15;
  if (data.optimizationLevel === 'Ninguno') score += 10;

  let category: 'Hot' | 'Warm' | 'Cold' = 'Cold';
  if (score > 60) category = 'Hot';
  else if (score > 30) category = 'Warm';

  // 2. SAVINGS CALCULATION (Proprietary Logic Emulation)
  // Industry-standard conservative estimates
  const baseInefficiencyMap: Record<string, number> = {
    'Industria': 0.22,
    'Comercio': 0.18,
    'Edificación': 0.15
  };

  let inefficiencyFactor = baseInefficiencyMap[data.companyType] || 0.15;
  
  // Adjust based on current optimization
  if (data.optimizationLevel === 'Parcial') inefficiencyFactor *= 0.7;
  if (data.optimizationLevel === 'Avanzado') inefficiencyFactor *= 0.4;
  if (data.hasEnergyAudit) inefficiencyFactor *= 0.9;

  const annualCost = data.monthlyEnergyCost * 12;
  const annualSavings = annualCost * inefficiencyFactor;
  const percentageReduction = inefficiencyFactor * 100;

  // Law 1715: Usually allows up to 50% deduction of investment in 15 years, 
  // plus VAT exclusion and accelerated depreciation.
  // Simplified for diagnostic: ~35% of a potential investment
  const estimatedInvestment = annualSavings * 2.5; // Estimated CAPEX based on ROI of 2.5 years
  const estimatedTaxBenefit = estimatedInvestment * 0.40; // Combined benefits approx
  const estimatedRoiMonths = 24 + (Math.random() * 12); // Realistic range for industrial ROI

  return {
    annualSavings,
    percentageReduction,
    estimatedTaxBenefit,
    estimatedRoiMonths,
    score,
    leadCategory: category
  };
}

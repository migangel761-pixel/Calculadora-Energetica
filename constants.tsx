
import React from 'react';
import { 
  Factory, 
  ShoppingBag, 
  Building2, 
  Utensils, 
  Truck, 
  Hotel, 
  Settings,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const SECTORS_BY_TYPE: Record<string, string[]> = {
  'Industria': ['Manufactura', 'Alimentos', 'Química', 'Siderurgia', 'Otro'],
  'Comercio': ['Retail', 'Alimentos', 'Logística', 'Centros Comerciales', 'Otro'],
  'Edificación': ['Hospitalidad', 'Oficinas', 'Residencial', 'Salud', 'Otro']
};

export const SECTOR_ICONS: Record<string, React.ReactNode> = {
  'Manufactura': <Settings className="w-5 h-5" />,
  'Alimentos': <Utensils className="w-5 h-5" />,
  'Logística': <Truck className="w-5 h-5" />,
  'Hospitalidad': <Hotel className="w-5 h-5" />,
  'Retail': <ShoppingBag className="w-5 h-5" />,
  'Oficinas': <Building2 className="w-5 h-5" />,
  'Salud': <Building2 className="w-5 h-5" />,
  'Otro': <Factory className="w-5 h-5" />
};

export const COMPANY_TYPE_ICONS: Record<string, React.ReactNode> = {
  'Industria': <Factory className="w-6 h-6" />,
  'Comercio': <ShoppingBag className="w-6 h-6" />,
  'Edificación': <Building2 className="w-6 h-6" />
};

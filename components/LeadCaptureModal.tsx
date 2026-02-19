
import React, { useState } from 'react';
import { Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  onSubmit: (details: { name: string, email: string, phone: string }) => void;
}

export const LeadCaptureModal: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      onSubmit(formData);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Desbloquea tu Diagnóstico Personalizado</h2>
        <p className="text-slate-600 mt-2">Estamos calculando tus beneficios bajo la Ley 1715. ¿A dónde enviamos el reporte técnico detallado?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo / Representante</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              required
              type="text" 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Ej: Ing. Juan Pérez"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo Corporativo</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              required
              type="email" 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="juan.perez@empresa.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp / Teléfono Directo</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              required
              type="tel" 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+57 300 000 0000"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
        >
          Generar Diagnóstico Ahora
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
          <ShieldCheck className="w-4 h-4" />
          Tus datos están protegidos bajo nuestra política de tratamiento de datos.
        </p>
      </form>
    </div>
  );
};

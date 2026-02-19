
import React, { useEffect, useState } from 'react';
import { 
  TrendingDown, 
  Calendar, 
  Award, 
  BarChart3, 
  MessageCircle, 
  FileText, 
  ChevronRight,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { LeadData, CalculationResult } from '../types';
import { generateTechnicalInsight } from '../services/geminiService';

interface Props {
  data: LeadData;
  results: CalculationResult;
  onAction: (label: string) => void;
}

export const ResultsDashboard: React.FC<Props> = ({ data, results, onAction }) => {
  const [insight, setInsight] = useState<string>('Analizando ineficiencias...');

  useEffect(() => {
    generateTechnicalInsight(data, results).then(setInsight);
  }, [data, results]);

  const chartData = [
    { name: 'Actual', value: data.monthlyEnergyCost * 12, fill: '#64748b' },
    { name: 'Con Optimización', value: (data.monthlyEnergyCost * 12) - results.annualSavings, fill: '#2563eb' }
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700">
      {/* Header Impact Card */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <AlertTriangle size={120} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold mb-4 border border-red-500/30">
            <AlertTriangle size={14} /> DIAGNÓSTICO DE INEFICIENCIA
          </div>
          <h2 className="text-3xl font-bold mb-2">Pérdida Económica Estimada</h2>
          <p className="text-slate-400 mb-6">Su empresa está perdiendo dinero que podría ser reinvertido en su operación central.</p>
          <div className="text-5xl font-bold text-red-500">
            {formatCurrency(results.annualSavings)} <span className="text-lg text-slate-400 font-normal">/ anual</span>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <TrendingDown size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Optimización de Consumo</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {results.percentageReduction.toFixed(1)}% <span className="text-sm font-normal text-slate-500">de reducción</span>
          </div>
          <p className="text-sm text-slate-500 mt-2">Impacto directo en su huella de carbono y costos fijos operativos.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <Award size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Incentivo Ley 1715</h3>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {formatCurrency(results.estimatedTaxBenefit)} <span className="text-sm font-normal text-slate-500">aprox.</span>
          </div>
          <p className="text-sm text-slate-500 mt-2">Deducciones de renta, exención de IVA y aranceles según normativa vigente.</p>
        </div>
      </div>

      {/* Chart & Analysis Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 size={20} /> Proyección de Costo Anual
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Costo']}
                  cursor={{fill: '#f1f5f9'}}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 flex flex-col">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Lightbulb size={20} className="text-blue-600" /> Insight de Ingeniería
          </h3>
          <div className="flex-grow italic text-blue-800 leading-relaxed text-sm">
            "{insight}"
          </div>
          <div className="mt-6 pt-6 border-t border-blue-200 flex items-center gap-3">
             <div className="p-2 bg-white rounded-full shadow-sm">
                <Calendar size={18} className="text-blue-600" />
             </div>
             <div>
                <p className="text-xs text-blue-700 uppercase font-bold">Retorno Estimado</p>
                <p className="text-lg font-bold text-blue-900">~{results.estimatedRoiMonths.toFixed(0)} meses</p>
             </div>
          </div>
        </div>
      </div>

      {/* CTA Smart Section */}
      <div className="bg-white border-2 border-blue-600 p-10 rounded-3xl text-center shadow-xl shadow-blue-100">
        {results.leadCategory === 'Hot' ? (
          <>
            <div className="inline-block p-4 bg-red-100 text-red-600 rounded-full mb-4 animate-bounce">
               🔥 Potencial Crítico
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Agenda una Consultoría Técnica Sin Costo</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
              Su empresa presenta un perfil ideal para optimización energética inmediata. Un ingeniero senior revisará sus cifras para validar el ROI real.
            </p>
            <button 
              onClick={() => onAction('Consultoría Técnica')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-lg shadow-blue-300 transition-all flex items-center justify-center gap-3 mx-auto group"
            >
              <MessageCircle className="w-6 h-6" />
              Hablar con un Ingeniero
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        ) : results.leadCategory === 'Warm' ? (
          <>
            <div className="inline-block p-4 bg-orange-100 text-orange-600 rounded-full mb-4">
               🌡️ Oportunidades Detectadas
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Recibe tu Diagnóstico Técnico Detallado</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
              Hemos detectado puntos de mejora específicos en su sector. Solicite el informe completo en PDF con el desglose de beneficios.
            </p>
            <button 
              onClick={() => onAction('Informe Detallado')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-lg shadow-slate-300 transition-all flex items-center justify-center gap-3 mx-auto group"
            >
              <FileText className="w-6 h-6" />
              Recibir Informe por Correo
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        ) : (
          <>
            <div className="inline-block p-4 bg-blue-100 text-blue-600 rounded-full mb-4">
               ❄️ Potencial de Mejora
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Optimice su Consumo Energético</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
              Aunque su perfil actual es estable, existen guías de eficiencia que pueden reducir sus costos operativos anuales.
            </p>
            <button 
              onClick={() => onAction('Guía Energética')}
              className="bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-50 font-bold py-5 px-10 rounded-2xl text-xl transition-all flex items-center justify-center gap-3 mx-auto group"
            >
              <FileText className="w-6 h-6" />
              Recibir Guía Energética
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

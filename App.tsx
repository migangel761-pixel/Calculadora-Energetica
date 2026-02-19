
import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  Zap,
  CheckCircle2,
  Circle,
  MapPin,
  Building,
  Info,
  Send
} from 'lucide-react';
import { StepProgressBar } from './components/StepProgressBar';
import { ResultsDashboard } from './components/ResultsDashboard';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { LeadData, CalculationResult, CompanyType, Sector, OptimizationLevel } from './types';
import { calculateEnergySavings } from './services/engine';
import { SECTORS_BY_TYPE, COMPANY_TYPE_ICONS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0: landing, 1-4: phases, 5: results, 6: lead capture, 7: success
  const [data, setData] = useState<LeadData>({
    companyType: 'Industria',
    sector: 'Manufactura',
    location: '',
    monthlyConsumptionKwh: 5000,
    monthlyEnergyCost: 15000000,
    hasInternalMeasurement: false,
    optimizationLevel: 'Ninguno',
    hasEnergyAudit: false,
    hasOwnGeneration: false,
    knowsLaw1715: false,
    interestedInTaxBenefits: false,
  });
  
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleNext = () => {
    if (step === 4) {
      // Calculate and show results immediately after last technical step
      const res = calculateEnergySavings(data);
      setResults(res);
      setStep(5);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleResultAction = (actionLabel: string) => {
    setSelectedAction(actionLabel);
    setStep(6); // Move to lead capture
  };

  const processLead = (details: { name: string, email: string, phone: string }) => {
    const finalData = { ...data, ...details };
    // Here you would typically send finalData to a CRM or API
    console.log("Lead Qualified & Captured:", finalData, "Action:", selectedAction);
    setData(finalData);
    setStep(7); // Success
  };

  const isStepValid = () => {
    if (step === 1) return data.companyType && data.sector && data.location.length > 2;
    if (step === 2) return data.monthlyConsumptionKwh > 0 && data.monthlyEnergyCost > 0;
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Zap className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">SOLECTRICA</span>
            <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-tighter">Energy Savings Engine</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Consultoría</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Proyectos</a>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all">Contacto</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-4xl">
          {step === 0 && (
            <div className="text-center animate-in fade-in slide-in-from-top-4 duration-500">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
                Diagnóstico Energético <span className="text-blue-600">Inteligente</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                En menos de 60 segundos descubre cuánto dinero está perdiendo tu empresa por ineficiencias energéticas mediante ingeniería aplicada.
              </p>
              <button 
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-12 rounded-2xl text-xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 mx-auto group"
              >
                Empezar Diagnóstico
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-8 text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Validado bajo la Ley 1715 de Colombia
              </p>
            </div>
          )}

          {step >= 1 && step <= 4 && (
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-12">
              <StepProgressBar currentStep={step} totalSteps={4} />

              {/* FASE 1: PERFIL */}
              {step === 1 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Perfil de la Empresa</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Tipo de Empresa</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(['Industria', 'Comercio', 'Edificación'] as CompanyType[]).map(t => (
                          <button 
                            key={t}
                            onClick={() => setData({...data, companyType: t, sector: SECTORS_BY_TYPE[t][0] as Sector})}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${data.companyType === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                          >
                            {COMPANY_TYPE_ICONS[t]}
                            <span className="font-bold">{t}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Sector Económico</label>
                        <select 
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                          value={data.sector}
                          onChange={e => setData({...data, sector: e.target.value as Sector})}
                        >
                          {SECTORS_BY_TYPE[data.companyType].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Ciudad / Departamento</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: Bogotá, Cundinamarca"
                            value={data.location}
                            onChange={e => setData({...data, location: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FASE 2: CONSUMO */}
              {step === 2 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Consumo Energético</h2>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Consumo mensual (kWh)</label>
                        <span className="text-2xl font-black text-blue-600">{data.monthlyConsumptionKwh.toLocaleString()} kWh</span>
                      </div>
                      <input 
                        type="range" 
                        min="500" max="100000" step="500"
                        className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-600"
                        value={data.monthlyConsumptionKwh}
                        onChange={e => setData({...data, monthlyConsumptionKwh: parseInt(e.target.value)})}
                      />
                      <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                        <span>Pyme (500)</span>
                        <span>Gran Consumidor (100.000+)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Costo promedio mensual de energía ($ COP)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input 
                          type="number" 
                          className="w-full pl-10 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold"
                          placeholder="20,000,000"
                          value={data.monthlyEnergyCost}
                          onChange={e => setData({...data, monthlyEnergyCost: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Building className="text-slate-400" />
                        <div>
                          <p className="font-bold text-slate-800">¿Cuenta con medición interna?</p>
                          <p className="text-xs text-slate-500">Analizadores de redes o telemedida propia.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setData({...data, hasInternalMeasurement: true})}
                          className={`px-4 py-2 rounded-lg font-bold transition-all ${data.hasInternalMeasurement ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
                        >Sí</button>
                        <button 
                          onClick={() => setData({...data, hasInternalMeasurement: false})}
                          className={`px-4 py-2 rounded-lg font-bold transition-all ${!data.hasInternalMeasurement ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}
                        >No</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FASE 3: OPTIMIZACIÓN */}
              {step === 3 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Nivel de Optimización Actual</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Sistemas de Eficiencia</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(['Ninguno', 'Parcial', 'Avanzado'] as OptimizationLevel[]).map(o => (
                          <button 
                            key={o}
                            onClick={() => setData({...data, optimizationLevel: o})}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${data.optimizationLevel === o ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                          >
                            <span className="font-bold">{o}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <button 
                        onClick={() => setData({...data, hasEnergyAudit: !data.hasEnergyAudit})}
                        className={`p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${data.hasEnergyAudit ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                      >
                        <div className="text-left">
                          <p className="font-bold">Auditoría Energética</p>
                          <p className="text-xs opacity-70">¿Ha realizado un estudio previo?</p>
                        </div>
                        {data.hasEnergyAudit ? <CheckCircle2 /> : <Circle />}
                      </button>

                      <button 
                        onClick={() => setData({...data, hasOwnGeneration: !data.hasOwnGeneration})}
                        className={`p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${data.hasOwnGeneration ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                      >
                        <div className="text-left">
                          <p className="font-bold">Generación Propia</p>
                          <p className="text-xs opacity-70">Solar, Biomasa o Autogeneración.</p>
                        </div>
                        {data.hasOwnGeneration ? <CheckCircle2 /> : <Circle />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FASE 4: TRIBUTARIOS */}
              {step === 4 && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Ley 1715 y Beneficios</h2>
                  <p className="text-slate-500 mb-8">El marco normativo que impulsa su rentabilidad.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div 
                      onClick={() => setData({...data, knowsLaw1715: !data.knowsLaw1715})}
                      className={`p-8 rounded-3xl cursor-pointer border-2 transition-all flex flex-col items-center text-center gap-4 ${data.knowsLaw1715 ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className={`p-4 rounded-full ${data.knowsLaw1715 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <Info size={32} />
                      </div>
                      <h3 className="font-bold text-slate-800">¿Conoce la Ley 1715?</h3>
                      <p className="text-sm text-slate-500">Beneficios por transición energética y renovables.</p>
                      <div className={`mt-2 px-6 py-2 rounded-full text-xs font-bold uppercase ${data.knowsLaw1715 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {data.knowsLaw1715 ? 'Sí, Conozco' : 'No conozco'}
                      </div>
                    </div>

                    <div 
                      onClick={() => setData({...data, interestedInTaxBenefits: !data.interestedInTaxBenefits})}
                      className={`p-8 rounded-3xl cursor-pointer border-2 transition-all flex flex-col items-center text-center gap-4 ${data.interestedInTaxBenefits ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className={`p-4 rounded-full ${data.interestedInTaxBenefits ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <Zap size={32} />
                      </div>
                      <h3 className="font-bold text-slate-800">Interés en Incentivos</h3>
                      <p className="text-sm text-slate-500">¿Desea evaluar deducciones tributarias en renta?</p>
                      <div className={`mt-2 px-6 py-2 rounded-full text-xs font-bold uppercase ${data.interestedInTaxBenefits ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {data.interestedInTaxBenefits ? 'Muy Interesado' : 'No Por Ahora'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons for technical steps */}
              <div className="mt-12 flex justify-between gap-4">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" /> Anterior
                </button>
                <button 
                  disabled={!isStepValid()}
                  onClick={handleNext}
                  className="flex-grow md:flex-none bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {step === 4 ? 'Ver Resultados' : 'Siguiente'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 5 && results && (
            <ResultsDashboard 
              data={data} 
              results={results} 
              onAction={handleResultAction}
            />
          )}

          {step === 6 && (
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-12 animate-in slide-in-from-right-8 duration-500">
              <button 
                onClick={() => setStep(5)}
                className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ArrowLeft size={16} /> Volver a los resultados
              </button>
              <LeadCaptureModal onSubmit={processLead} />
            </div>
          )}

          {step === 7 && (
            <div className="text-center bg-white rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 p-12 md:p-16 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Diagnóstico Solicitado con Éxito!</h2>
              <p className="text-xl text-slate-600 mb-10 max-w-lg mx-auto">
                Un ingeniero especialista de <strong>Solectrica</strong> ha recibido su perfil técnico. En las próximas horas recibirá el informe detallado y nos pondremos en contacto para coordinar el paso a seguir.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                 <button 
                  onClick={() => setStep(0)}
                  className="bg-slate-900 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-slate-800 transition-all"
                >
                  Volver al Inicio
                </button>
                <button 
                  onClick={() => setStep(5)}
                  className="bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Revisar Mis Cifras de Nuevo
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-blue-500 w-8 h-8" />
              <span className="font-display font-bold text-2xl">SOLECTRICA</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              Soluciones integrales de ingeniería para la optimización energética industrial y comercial. Maximizamos su rentabilidad mediante eficiencia y sostenibilidad.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Servicios</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">Auditorías Energéticas</a></li>
              <li><a href="#" className="hover:text-blue-400">Sistemas Solares</a></li>
              <li><a href="#" className="hover:text-blue-400">Gestión de Demanda</a></li>
              <li><a href="#" className="hover:text-blue-400">Ley 1715</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Contacto</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>ingenieria@solectrica.com</li>
              <li>+57 (1) 000 0000</li>
              <li>Bogotá, Colombia</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Solectrica - Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacidad</a>
            <a href="#" className="hover:text-white">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;


import React from 'react';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export const StepProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Fase {currentStep} de {totalSteps}
        </span>
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {Math.round((currentStep / totalSteps) * 100)}% Completado
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

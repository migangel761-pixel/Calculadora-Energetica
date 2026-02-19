
import { GoogleGenAI } from "@google/genai";
import { LeadData, CalculationResult } from "../types";

export async function generateTechnicalInsight(data: LeadData, results: CalculationResult): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Como ingeniero experto en eficiencia energética de Solectrica, analiza los siguientes datos de una empresa:
    - Tipo: ${data.companyType} (${data.sector})
    - Ubicación: ${data.location}
    - Consumo mensual: ${data.monthlyConsumptionKwh} kWh
    - Costo mensual: $${data.monthlyEnergyCost.toLocaleString()} COP
    - Nivel de optimización: ${data.optimizationLevel}
    - Auditoría previa: ${data.hasEnergyAudit ? 'Sí' : 'No'}
    - Interés en beneficios tributarios (Ley 1715): ${data.interestedInTaxBenefits ? 'Sí' : 'No'}

    Resultados calculados:
    - Ahorro anual estimado: $${results.annualSavings.toLocaleString()} COP
    - Reducción potencial: ${results.percentageReduction.toFixed(1)}%
    
    Genera un breve resumen ejecutivo profesional (máximo 100 palabras) que destaque la urgencia económica y la oportunidad técnica. No menciones fórmulas, solo impacto de negocio. Enfócate en la competitividad.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    return response.text || "No se pudo generar el análisis detallado en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nuestro motor de IA está analizando su caso. El potencial de ahorro detectado es significativo y requiere atención inmediata de ingeniería.";
  }
}

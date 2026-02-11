import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // No Vite/AI Studio, usamos import.meta.env
    // Se a chave não existir, o código não quebra o app ao carregar
    const apiKey = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
    
    if (!apiKey) {
      console.warn("Chave VITE_GEMINI_API_KEY não configurada. A IA está desativada.");
      throw new Error("Chave de API não encontrada. Por favor, configure sua chave nas variáveis de ambiente.");
    }

    const ai = new GoogleGenAI(apiKey);
    
    try {
      // Usamos o modelo flash que é mais rápido e econômico
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Gere uma Unidade Curricular completa para o curso "${courseName}" com o tema "${unitName}" seguindo o Modelo SENAI (MSEP). 
      Retorne capacidades básicas, conhecimentos e critérios de avaliação seguindo o padrão NSA, APO, PAR e AUT.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return { text: response.text() };
    } catch (error) {
      console.error("Erro na geração da IA:", error);
      throw error;
    }
  }
}

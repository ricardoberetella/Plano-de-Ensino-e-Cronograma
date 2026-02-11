import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // No Vite/AI Studio, usamos import.meta.env em vez de process.env
    // Isso evita que o app trave caso a variável não esteja definida
    const apiKey = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
    
    if (!apiKey) {
      console.error("Erro: VITE_GEMINI_API_KEY não encontrada nas configurações.");
      throw new Error("Chave de API não configurada. O sistema funcionará apenas em modo manual.");
    }

    const ai = new GoogleGenAI(apiKey);
    
    try {
      // Usamos o modelo flash por ser mais rápido para geração de planos
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Gere uma Unidade Curricular completa para o curso "${courseName}" 
      com o tema "${unitName}" seguindo rigorosamente o Modelo SENAI (MSEP). 
      Inclua capacidades básicas, conhecimentos e critérios de avaliação NSA, APO, PAR, AUT.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return { text: response.text() };
    } catch (error) {
      console.error("Erro na geração da IA:", error);
      throw error;
    }
  }
}

import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // No Vite/AI Studio, usamos import.meta.env. 
    // Se a chave não existir, o app não trava, apenas avisa o erro no console.
    const apiKey = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
    
    if (!apiKey) {
      console.error("Erro: VITE_GEMINI_API_KEY não configurada.");
      throw new Error("Chave de API da IA não encontrada. Verifique as configurações do ambiente.");
    }

    const ai = new GoogleGenAI(apiKey);
    
    try {
      // Usando o modelo 1.5-flash que é estável no ambiente gratuito
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Gere uma Unidade Curricular completa para o curso "${courseName}" 
      com o tema "${unitName}" seguindo o Modelo SENAI (MSEP). 
      Retorne capacidades básicas, conhecimentos e critérios de avaliação.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return { text: response.text() };
    } catch (error) {
      console.error("Erro na geração da IA:", error);
      throw error;
    }
  }
}

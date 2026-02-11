import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // No AI Studio, a chave pode ser injetada ou estar em import.meta.env
    // Se não houver chave, o código não trava mais o app ao abrir
    const apiKey = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
    
    if (!apiKey) {
      console.warn("Aviso: Chave Gemini não configurada. A geração de IA não funcionará.");
      throw new Error("Chave de API não encontrada. Configure VITE_GEMINI_API_KEY.");
    }

    const ai = new GoogleGenAI(apiKey);
    
    try {
      // Usando o modelo flash que é mais rápido e estável
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Gere uma Unidade Curricular completa para o curso "${courseName}" com o tema "${unitName}" seguindo o Modelo SENAI (MSEP). 
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

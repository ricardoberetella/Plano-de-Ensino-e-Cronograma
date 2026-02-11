import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // No Vite, usamos import.meta.env. Para funcionar, 
    // defina VITE_GEMINI_API_KEY no seu arquivo .env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    const ai = new GoogleGenAI(apiKey);
    
    try {
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Gere uma Unidade Curricular completa para o curso "${courseName}" com o tema "${unitName}" seguindo o Modelo SENAI (MSEP). 
      Retorne os dados estruturados com capacidades básicas, conhecimentos e critérios de avaliação.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return { text: response.text() };
    } catch (error) {
      console.error("Erro na geração da IA:", error);
      throw error;
    }
  }
}

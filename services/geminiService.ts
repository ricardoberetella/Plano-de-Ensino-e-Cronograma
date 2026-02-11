import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // No Vite/AI Studio, usamos import.meta.env.
    // Se a chave não estiver configurada, o app não trava mais ao abrir.
    const apiKey = (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) || "";
    
    if (!apiKey) {
      console.error("VITE_GEMINI_API_KEY não encontrada. A IA está desativada.");
      throw new Error("Chave de API não configurada no ambiente.");
    }

    const ai = new GoogleGenAI(apiKey);
    
    try {
      // Usando modelo flash 1.5 que é rápido e estável
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Gere uma Unidade Curricular completa para o curso "${courseName}" 
      com o tema "${unitName}" seguindo o Modelo SENAI (MSEP). 
      Inclua capacidades, conhecimentos e rubricas (NSA, APO, PAR, AUT).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return { text: response.text() };
    } catch (error) {
      console.error("Erro na geração da IA:", error);
      throw error;
    }
  }
}

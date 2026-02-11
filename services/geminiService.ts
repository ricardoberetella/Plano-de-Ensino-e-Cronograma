
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  async generateFullUnit(courseName: string, unitName: string) {
    // ALWAYS initialize right before the call using process.env.API_KEY named parameter.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Gere uma Unidade Curricular completa para o curso "${courseName}" com o tema "${unitName}" seguindo o Modelo SENAI (MSEP).`
      });

      // Directly access .text property from GenerateContentResponse.
      return { text: response.text };
    } catch (error) {
      console.error("Erro na geração da IA:", error);
      throw error;
    }
  }
}

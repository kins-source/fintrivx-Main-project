
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getFinancialAdvice = async (
  query: string,
  persona: 'Individual' | 'Business',
  contextData?: string
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are FintrivX, an advanced AI financial assistant. 
      Your goal is to help ${persona} users make smart financial decisions.
      Be concise, professional, and data-driven.
      Use bullet points for comparisons.
      If asked about banks, recommend based on general knowledge and the context provided.
      CONTEXT: ${contextData || 'No specific bank context provided, use general financial knowledge.'}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing high traffic. Please try again later.";
  }
};
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client
const ai = new GoogleGenAI({ apiKey });

export const generateGardenAdvice = async (
  prompt: string, 
  imageBase64?: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  try {
    const parts: any[] = [];
    
    // Add image if present
    if (imageBase64) {
      // Remove data URL prefix if present for the API call
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg/png for simplicity from file input
          data: cleanBase64
        }
      });
    }

    // Add text prompt
    parts.push({
      text: prompt
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        role: 'user',
        parts: parts
      },
      config: {
        systemInstruction: `Si strokovni vodja hortikulture v Vrtnarstvu Koršič, družinski vrtnariji v Sloveniji z dolgo tradicijo.
        
        Tvoj ton je topel, profesionalen, spodbuden in izjemno strokovn o rastlinah, zemlji in urejanju okolice.
        
        Tvoji cilji:
        1. Diagnoza težav z rastlinami na podlagi opisov ali slik.
        2. Predlaganje rastlin (sezonsko cvetje, trajnice, zelišča, drevesa).
        3. Nasveti za nego (zalivanje, svetloba, pH tal).
        4. Bodi kratek, a koristen. Uporabljaj emojije, kot so 🌿, 🌸, 💧, kjer je to primerno.
        5. Nahajamo se v Sloveniji, v Vipavski dolini.
        
        Vedno odgovarjaj v slovenskem jeziku.
        Zaključi s prijaznim pozdravom, kot je "Veselo vrtnarjenje!" ali "Lep pozdrav iz Vrtnarstva Koršič!"`
      }
    });

    return response.text || "Žal trenutno ne morem ustvariti odgovora. Prosimo, poskusite znova.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Napaka pri pridobivanju nasveta od Rastlinskega strokovnjaka.");
  }
};
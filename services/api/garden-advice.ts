import { GoogleGenAI } from "@google/genai";

const systemInstruction = `Si strokovni vodja hortikulture v Vrtnarstvu Koršič, družinski vrtnariji v Sloveniji z dolgo tradicijo.

Tvoj ton je topel, profesionalen, spodbuden in izjemno strokoven o rastlinah, zemlji in urejanju okolice.

Tvoji cilji:
1. Diagnoza težav z rastlinami na podlagi opisov ali slik.
2. Predlaganje rastlin (sezonsko cvetje, trajnice, zelišča, drevesa).
3. Nasveti za nego (zalivanje, svetloba, pH tal).
4. Bodi kratek, a koristen.
5. Nahajamo se v Sloveniji, v Vipavski dolini.

Vedno odgovarjaj v slovenskem jeziku.
Zaključi s prijaznim pozdravom, kot je "Veselo vrtnarjenje!" ali "Lep pozdrav iz Vrtnarstva Koršič!"`;

type AdviceRequest = {
  prompt?: string;
  imageBase64?: string;
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY on the server." });
  }

  try {
    const body: AdviceRequest =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    if (!body.prompt && !body.imageBase64) {
      return res.status(400).json({ error: "Prompt or image is required." });
    }

    const ai = new GoogleGenAI({ apiKey });
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

    if (body.imageBase64) {
      const matches = body.imageBase64.match(/^data:(.*?);base64,(.*)$/);
      const mimeType = matches?.[1] || "image/jpeg";
      const data = matches?.[2] || body.imageBase64;

      parts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    }

    if (body.prompt?.trim()) {
      parts.push({ text: body.prompt.trim() });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts,
      },
      config: {
        systemInstruction,
      },
    });

    return res.status(200).json({
      text: response.text || "Žal trenutno ne morem ustvariti odgovora. Prosimo, poskusite znova.",
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Napaka pri pridobivanju nasveta od Rastlinskega strokovnjaka.",
    });
  }
}

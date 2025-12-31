
import { GoogleGenAI, Type } from "@google/genai";

export const generateEvaGreeting = async (): Promise<{ greeting: string; poem: string }> => {
  // 在 Vite 环境中，我们通过 vite.config.ts 注入了 process.env.API_KEY
  const apiKey = (process.env as any).API_KEY;

  if (!apiKey) {
    console.warn("API_KEY is missing, using fallback greeting.");
    return {
      greeting: "Eva，新春将至，岁序更新。",
      poem: "愿你此去经年，平安顺遂。\n万物清澈，心中有光。"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "为 Eva 写一段极其简约、高级感十足的元旦祝福。语气要清新雅致。包含 greeting (短句，如：万物可期) 和 poem (两到四行极其精炼的短句)。不要提及任何关于打车的文字，只需温馨高级的祝福。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: { type: Type.STRING },
            poem: { type: Type.STRING }
          },
          required: ["greeting", "poem"]
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return {
      greeting: data.greeting || "Eva，假期快乐。",
      poem: data.poem || "岁末将至，敬颂冬绥。\n平安喜乐，万事顺遂。"
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      greeting: "Eva，愿你假期安好。",
      poem: "冬日渐暖，春山可望。\n岁岁常欢愉，年年皆胜意。"
    };
  }
};

export const generateGardenAdvice = async (
  prompt: string,
  imageBase64?: string
): Promise<string> => {
  const response = await fetch("/api/garden-advice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      imageBase64,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Napaka pri pridobivanju nasveta od Rastlinskega strokovnjaka.");
  }

  return data?.text || "Žal trenutno ne morem ustvariti odgovora. Prosimo, poskusite znova.";
};

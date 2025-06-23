import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export async function getTripPlan(prompt) {
  try {
    const res = await axios.post(
      `${GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );
    return res.data.candidates[0]?.content?.parts[0]?.text || "No response";
  } catch (err) {
    console.error("Gemini API Error:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Message:", err.response.data.error.message);
      alert("❌ Gemini Error: " + err.response.data.error.message);
    } else {
      console.error("Message:", err.message);
      alert("❌ Gemini Error: " + err.message);
    }
    return "Error generating plan.";
  }
}

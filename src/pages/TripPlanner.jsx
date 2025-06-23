import { useState } from "react";
import { getTripPlan } from "../utils/gemini";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const TripPlanner = () => {
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await getTripPlan(prompt);
    setPlan(result);
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-100 to-white text-gray-800 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center">AI Trip Planner ✈️</h1>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleLogout}
            className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4 text-lg text-center">
        Plan your perfect vacation with AI — powered by Gemini ✨
      </p>

      <input
        type="text"
        placeholder="Describe your trip, e.g. 'Plan a 3-day trip to Goa with beaches'"
        className="w-full p-3 border rounded mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {plan && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">
            🗺️ Your Trip Plan:
          </h2>
          <pre className="whitespace-pre-wrap text-gray-800">{plan}</pre>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;

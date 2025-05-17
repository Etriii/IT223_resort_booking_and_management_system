import React, { useEffect, useState } from "react";
import { CheckCircle, RefreshCcw } from "lucide-react";

const UpdateDatabase = () => {
  const [countdown, setCountdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastRun, setLastRun] = useState(null);

  // Calculate countdown until midnight
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);

      const diff = nextMidnight - now;
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate the backend update
  const handleRunUpdate = async () => {
    setLoading(true);
    try {
      // Make an API call

      setTimeout(() => {
        setLastRun(new Date().toLocaleString());
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Update failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <RefreshCcw className="text-blue-600" />
        Daily Booking Status Updater
      </h1>

      <p className="text-gray-600 mb-2">
        This tool updates your bookings automatically. It will:
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>Mark bookings as <strong>Completed</strong> if the checkout date has passed.</li>
        <li>Clean up or process any other overdue status updates.</li>
      </ul>

      <div className=" text-sm text-gray-500">
        <span className="font-medium text-gray-700">Next auto-reset:</span>{" "}
        <span className="font-mono text-blue-600">{countdown}</span>
      </div>

      {lastRun && (
        <div className="my-4 text-green-600 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Last update run at: <span className="font-mono">{lastRun}</span>
        </div>
      )}

      <button
        onClick={handleRunUpdate}
        disabled={loading}
        className={`w-full px-4 py-2 rounded-xl text-white font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "Running..." : "Run Update Now"}
      </button>
    </div>
  );
};

export default UpdateDatabase;

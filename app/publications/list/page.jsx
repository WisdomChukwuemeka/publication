"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicationAPI } from "@/app/services/api";

export default function PublicationList() {
  const router = useRouter();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await PublicationAPI.list();
        setPublications(response.data);
      } catch (err) {
        toast.error("❌ Failed to load publications");
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, []);

  return (
    <div className="p-6">
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-6">📚 Publications</h1>

        {loading ? (
          <p className="text-gray-500">Loading publications...</p>
        ) : publications.length === 0 ? (
          <p className="text-gray-500">No publications found.</p>
        ) : (
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {publications.map((pub) => (
              <motion.div
                key={pub.id}
                whileHover={{ scale: 1.02 }}
                className="border p-4 rounded-lg shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => router.push(`/publications/${pub.id}`)}
              >
                <h2 className="text-lg font-semibold text-blue-600">{pub.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{pub.abstract}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>📂 {pub.categories?.join(", ")}</span>
                  <span>✍️ {pub.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

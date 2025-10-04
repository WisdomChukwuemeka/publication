"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicationAPI } from "@/app/services/api";

export default function PublicationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await PublicationAPI.detail(id);
        setPublication(response.data);
        console.log(response.data)
      } catch (err) {
        toast.error("❌ Failed to load publication");
        router.push("/publications"); // Redirect back if not found
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPublication();
  }, [id, router]);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {loading ? (
        <p className="text-gray-500">Loading publication...</p>
      ) : (
        publication && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow"
          >
            <button
              onClick={() => router.back()}
              className="mb-4 text-blue-600 underline"
            >
              ← Back
            </button>

            <h1 className="text-3xl font-bold mb-4 text-blue-700">
              {publication.title}
            </h1>
            <p className="text-gray-600 mb-4 italic">{publication.abstract}</p>

            <div className="mb-4 text-sm text-gray-500">
              <p>✍️ Author: {publication.author}</p>
              <p>📂 Categories: {publication.category_labels}</p>
              <p>📅 Published: {new Date(publication.created_at).toLocaleDateString()}</p>
            </div>

            <div className="prose max-w-none">
              <p>{publication.content}</p>
            </div>

            {publication.file && (
              <div className="mt-6 flex justify-between items-center">
                <a
                  href={publication.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  📄 View Document
                </a>
                <i className="bi bi-eye flex gap-[5px] items-center">
                  <span>
                    {publication.views}
                  </span>
                  </i>
              </div>
            )}
          </motion.div>
        )
      )}
    </div>
  );
}

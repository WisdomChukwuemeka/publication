"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicationAPI } from "@/app/services/api";

/**
 * PublicationForm with sequential error toasts:
 * - Parses backend validation errors into a queue
 * - Displays only the first error (autoClose: false)
 * - When user fixes that field (simple local check), the toast is dismissed
 *   and the next error is shown.
 */

export default function PublicationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    content: "",
    categories: [],
    file: null,
  });
  const [loading, setLoading] = useState(false);

  // Queue of remaining errors (objects: { key, message })
  const [queuedErrors, setQueuedErrors] = useState([]);
  // The currently active error (displayed toast)
  const [activeError, setActiveError] = useState(null);
  // store current toast id so we can dismiss it
  const currentToastIdRef = useRef(null);

  // Helper: show the active error in a toast (one at a time)
  useEffect(() => {
    // Dismiss previous toast if any
    if (!activeError) {
      toast.dismiss();
      currentToastIdRef.current = null;
      return;
    }

    // build message
    const displayKey =
      activeError.key === "non_field_errors" || activeError.key === "detail"
        ? ""
        : `${activeError.key}: `;

    const content = (
      <div className="max-w-xs">
        <div className="font-semibold mb-1">{displayKey}{activeError.message}</div>

        {/* If non_field error, provide dismiss button */}
        {(activeError.key === "non_field_errors" || activeError.key === "detail") && (
          <div className="mt-2 text-right">
            <button
              onClick={() => advanceErrorQueue()}
              className="text-sm px-3 py-1 bg-gray-100 rounded"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    );

    toast.dismiss(); // ensure only one toast is visible
    const id = toast.error(content, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    });
    currentToastIdRef.current = id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeError]);

  // Advance the queue: dismiss current toast and show next error (if any)
  const advanceErrorQueue = () => {
    if (currentToastIdRef.current) {
      toast.dismiss(currentToastIdRef.current);
      currentToastIdRef.current = null;
    }

    if (queuedErrors.length > 0) {
      const [next, ...rest] = queuedErrors;
      setActiveError(next);
      setQueuedErrors(rest);
    } else {
      setActiveError(null);
      setQueuedErrors([]);
    }
  };

  // Parse backend errors into a queue and initialize activeError
  const queueBackendErrors = (errorData) => {
    const parsed = [];

    for (const [key, value] of Object.entries(errorData)) {
      // value may be an array or string/object; flatten to string
      let message = "";
      if (Array.isArray(value)) {
        message = value.join(" ");
      } else if (typeof value === "object" && value !== null) {
        // nested error: stringify briefly
        message = JSON.stringify(value);
      } else {
        message = String(value);
      }
      parsed.push({ key, message });
    }

    if (parsed.length > 0) {
      setActiveError(parsed[0]);
      setQueuedErrors(parsed.slice(1));
    }
  };

  // Simple heuristic to check if a field is "resolved" locally
  const isFieldResolved = (field, value) => {
    switch (field) {
      case "title":
      case "abstract":
      case "content":
        return String(value || "").trim().length > 0;
      case "categories":
        return Array.isArray(value) && value.length > 0 && value[0] !== "";
      case "file":
        return value != null;
      default:
        // for unknown fields, assume true so we don't block the queue
        return true;
    }
  };

  // Centralized field change handler that also checks and advances queue
  const handleFieldChange = (field, value) => {
    setFormData((prev) => {
      // keep categories as array for backend compatibility
      if (field === "categories") {
        return { ...prev, categories: Array.isArray(value) ? value : [value] };
      }
      return { ...prev, [field]: value };
    });

    // If the active error corresponds to this field and our simple check passes,
    // then advance to the next error.
    if (activeError && activeError.key === field && isFieldResolved(field, value)) {
      // small timeout to allow state update to render first
      setTimeout(() => advanceErrorQueue(), 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear any previous error toasts/queues
    setQueuedErrors([]);
    setActiveError(null);
    toast.dismiss();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("abstract", formData.abstract);
    data.append("content", formData.content);

    // send categories correctly
    formData.categories.forEach((cat) => data.append("categories", cat));

    if (formData.file) data.append("file", formData.file);

    try {
      setLoading(true);
      const response = await PublicationAPI.create(data);
      toast.success("✅ Publication created successfully!");
      // clear queue if any
      setQueuedErrors([]);
      setActiveError(null);
      router.push("/");
      console.log(response.data);
    } catch (err) {
      if (err.response?.data) {
        // Put backend errors into our queue system
        queueBackendErrors(err.response.data);
      } else {
        // non-field/server error: show as a single dismissable toast
        setActiveError({ key: "detail", message: "Error creating publication. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  // helpers for conditional error styles on inputs
  const hasActiveError = (field) => activeError && activeError.key === field;

  return (
    <div className="p-6">
      {/* Toast Container */}
      <ToastContainer position="top-right" hideProgressBar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-6">Create Publication</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            placeholder="Title"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasActiveError("title") ? "border-red-500 ring-red-200" : ""
            }`}
          />

          <textarea
            value={formData.abstract}
            onChange={(e) => handleFieldChange("abstract", e.target.value)}
            placeholder="Abstract"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasActiveError("abstract") ? "border-red-500 ring-red-200" : ""
            }`}
            rows="4"
          />

          <textarea
            value={formData.content}
            onChange={(e) => handleFieldChange("content", e.target.value)}
            placeholder="Content"
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              hasActiveError("content") ? "border-red-500 ring-red-200" : ""
            }`}
            rows="6"
          />

          <div>
            <p className="font-semibold mb-2">Categories:</p>
            <select
              value={formData.categories[0] || ""}
              onChange={(e) => handleFieldChange("categories", e.target.value)}
              className={`w-full p-2 border rounded ${
                hasActiveError("categories") ? "border-red-500" : ""
              }`}
            >
              <option value="">-- Select Category --</option>
              <option value="journal">Journal Article</option>
              <option value="conference">Conference Paper</option>
              <option value="book">Book/Book Chapter</option>
              <option value="thesis">Thesis/Dissertation</option>
              <option value="report">Technical Report</option>
              <option value="review">Review Paper</option>
              <option value="case_study">Case Study</option>
              <option value="editorial">Editorial/Opinion</option>
              <option value="news">News/Blog</option>
              <option value="other">Other</option>
            </select>
          </div>

          <input
            type="file"
            onChange={(e) => handleFieldChange("file", e.target.files[0])}
            className={`w-full p-2 border rounded ${hasActiveError("file") ? "border-red-500" : ""}`}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

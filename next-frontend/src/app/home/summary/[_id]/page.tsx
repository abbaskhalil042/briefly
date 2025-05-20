"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/config/axiosInstance";
import { motion } from "framer-motion";

interface Summary {
  _id?: string;
  original_file: string;
  summary_text: string;
}

const page = () => {
  const [summary, setSummary] = useState<Summary>({
    original_file: "",
    summary_text: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();

  const formatSummaryText = (text: string) => {
    return text.replace(/<u>(.*?)<\/u>/g, "$1");
  };

  const getSingleSummary = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get(`api/v1/pdf/get-pdf/${params._id}`);
      const formatText = formatSummaryText(res.data.data.summary_text);
      setSummary({ ...res.data.data, summary_text: formatText });

      console.log("res.data from single pdf", res.data);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load summary");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params._id) {
      getSingleSummary();
    }
  }, [params._id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 mt-10 py-8 min-h-[100dvh]"
    >
      <div className="bg-white dark:bg-[#0A0A0A] rounded-lg shadow-md border p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {summary.original_file}
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
            {summary.summary_text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default page;

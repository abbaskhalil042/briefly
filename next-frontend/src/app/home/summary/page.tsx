"use client";
import axiosInstance from "@/config/axiosInstance";
import { useAuth } from "@/context/authContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

interface AllSummary {
  _id: string;
  createdAt: string;
  file_name: string;
  summary_text: string;
}

const Summary = () => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [allSummary, setAllSummary] = useState<AllSummary[]>([]);
  const searchParams = useSearchParams();
  // const encodedSummary = searchParams.get("summary");
  // const pdfId = searchParams.get("pdfId");
  // const summary = encodedSummary ? decodeURIComponent(encodedSummary) : "";

  const getAllSummary = async () => {
    setError(null);
    try {
      const res = await axiosInstance.get(`/api/v1/pdf/${user?._id}`);
      setAllSummary(res.data.data || []); // Assuming your API returns { data: [...] }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/v1/pdf/delete-pdf/${id}`);
      getAllSummary();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getAllSummary();
    }
  }, [user?._id]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4  mt-10 py-8 min-h-[100dvh]"
    >
      <h1 className="text-2xl font-bold mb-6">Your PDF Summaries</h1>

      {allSummary.length === 0 ? (
        <p className="text-gray-500">No summaries found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allSummary.map((summary) => (
            <>
              <BackgroundGradient
                key={summary._id}
                className="rounded-[22px] h-full p-4 bg-white dark:bg-zinc-900 hover:scale-105 transition-transform"
              >
                <div className="flex flex-col h-full">
                  <Link href={`/home/summary/${summary._id}`} key={summary._id}>
                    <div className="flex-grow">
                      <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-700 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          <Image
                            src="https://patinaco.s3.ap-south-1.amazonaws.com/logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                            // fill
                            className="object-contain cursor-pointer "
                          />
                        </span>
                      </div>
                      <p className="text-base font-medium text-black dark:text-neutral-200 line-clamp-1">
                        {summary.file_name}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 mt-1">
                        {summary.summary_text}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center mt-3">
                    <Link
                      href={`${summary.file_name}.pdf`}
                      target="_blank"
                      download
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-3 cursor-pointer"
                      >
                        <Download size={14} />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-full px-3 cursor-pointer"
                      onClick={() => handleDelete(summary._id)}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                </div>
              </BackgroundGradient>
            </>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Summary;

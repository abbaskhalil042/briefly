"use client";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { Sparkle } from "lucide-react";
import axiosInstance from "@/config/axiosInstance";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

type UploadState = {
  file: File | null;
  fileName: string;
  isUploading: boolean;
  isGenerating: boolean;
  error: string | null;
  summarizedText: string | null;
};

export default function UploadPdf() {
  const { user } = useAuth();
  console.log("users creadits from upload ", user?.credits);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<UploadState>({
    file: null,
    fileName: "",
    isUploading: false,
    isGenerating: false,
    error: null,
    summarizedText: null,
  });

  const handleFileSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setState((prev) => ({
        ...prev,
        file: files[0],
        fileName: files[0].name,
        error: null,
      }));
    }
  };

  const formatSummaryText = (text: string) => {
    return text.replace(/<u>(.*?)<\/u>/g, "<strong>$1</strong>");
  };

  const uploadFile = async (file: File, userId: string) => {
    const formData = new FormData();
    formData.append("original_file", file);

    const res = await axiosInstance.post(
      `/api/v1/pdf/upload/${userId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return formatSummaryText(res.data.pdf.summary_text);
  };

  const handleUpload = async () => {
    if (!state.file) {
      setState((prev) => ({ ...prev, error: "Please select a file" }));
      return;
    }

    if (!user?._id) {
      setState((prev) => ({ ...prev, error: "Please login first" }));
      return;
    }

    try {
      setState((prev) => ({
        ...prev,
        isUploading: true,
        isGenerating: true,
        error: null,
      }));

      const summary = await uploadFile(state.file, user._id);
      setState((prev) => ({ ...prev, summarizedText: summary }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error:
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      }));
    } finally {
      setState((prev) => ({
        ...prev,
        isUploading: false,
        isGenerating: false,
      }));
    }
  };

  const renderFileUploadArea = () => (
    <div
      className="grid gap-2 cursor-pointer"
      onClick={handleFileSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") handleFileSelect();
      }}
    >
      <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-10 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600">
        <div className="text-center">
          <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
          {state.fileName ? (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {state.fileName}
            </p>
          ) : (
            <>
              <p className="mt-4 font-medium text-gray-900 dark:text-gray-50">
                Drop PDF to upload
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                or click to select PDFs
              </p>
            </>
          )}
          <Input
            type="file"
            className="sr-only"
            accept=".pdf"
            ref={inputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <h4 className="font-semibold mb-2">Summary:</h4>
      <div
        className="whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: state.summarizedText || "" }}
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-[100vh] px-4">
      <div className="grid gap-6 w-full max-w-2xl p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold flex items-center justify-center text-center flex-wrap">
            Upload PDF to see the{" "}
            <span className="flex text-sm items-center justify-center px-3 py-1 border rounded-full ml-2 bg-amber-100 font-bold text-black">
              <Sparkle className="w-4 h-4 text-blue-500 mr-1" />
              AI miracle
            </span>
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Drag and drop PDF or click to select.
          </p>
        </div>

        {renderFileUploadArea()}

        {state.error && <p className="text-sm text-red-500">{state.error}</p>}

        <Button
          disabled={state.isGenerating || state.isUploading || !state.file}
          onClick={handleUpload}
        >
          {state.isGenerating
            ? "Generating..."
            : state.isUploading
            ? "Uploading..."
            : "Start Generating"}
        </Button>

        {state.summarizedText && renderSummary()}
        {state.summarizedText && <Link href="/home/summary">see the summary</Link>}
      </div>
    </div>
  );
}

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

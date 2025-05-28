import React from "react";
import { motion } from "motion/react";

const HowItWorks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center m-16">
        <h1 className="text-4xl font-bold"> Seamless Document Processing</h1>
        <p className="mt-4  ">
          {" "}
          Experience a frictionless workflow designed to transform your
          documents into valuable insights in just seconds.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative m-16">
        {[1, 2, 3, 4].map((step, index) => {
          const gradients = [
            "from-blue-600/20 to-blue-400/20",
            "from-purple-600/20 to-purple-400/20",
            "from-indigo-600/20 to-indigo-400/20",
            "from-amber-600/20 to-amber-400/20",
          ];

          const icons = [
            <svg
              key={step}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-cloud-upload h-6 w-6 text-blue-400"
            >
              <path d="M12 13v8" />
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="m8 17 4-4 4 4" />
            </svg>,
            <svg
              key={step}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text h-6 w-6 text-purple-400"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>,
            <svg
              key={step}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-brain-circuit h-6 w-6 text-indigo-400"
            >
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
              <path d="M9 13a4.5 4.5 0 0 0 3-4" />
              <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
              <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
              <path d="M6 18a4 4 0 0 1-1.967-.516" />
              <path d="M12 13h4" />
              <path d="M12 18h6a2 2 0 0 1 2 2v1" />
              <path d="M12 8h8" />
              <path d="M16 8V5a2 2 0 0 1 2-2" />
              <circle cx="16" cy="13" r=".5" />
              <circle cx="18" cy="3" r=".5" />
              <circle cx="20" cy="21" r=".5" />
              <circle cx="20" cy="8" r=".5" />
            </svg>,
            <svg
              key={step}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-zap h-6 w-6 text-amber-400"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>,
          ];

          const titles = [
            "Upload Document",
            "Document Analysis",
            "AI Processing",
            "Instant Results",
          ];

          const descriptions = [
            "Drag & drop or select any PDF document from your device. We support files up to 100MB.",
            "Our AI engine analyzes the document structure, content, and semantics to understand key information.",
            "Advanced language models identify important information and organize it into a coherent summary.",
            "Receive your comprehensive, customizable summary in seconds, ready to review and share.",
          ];

          return (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={step}
              style={{ opacity: 1, transform: "none" }}
            >
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="relative cursor-pointer">
                    <div className="absolute inset-0 z-10 rounded-full bg-primary/20" />
                    <div
                      className="absolute inset-[1px] z-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.15) 0%, transparent 25%)",
                      }}
                    />
                    <div className="relative z-20 flex items-center justify-center h-20 w-20 rounded-full">
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-radial ${gradients[index]} blur-sm opacity-60`}
                      />
                      <div className="relative bg-black/40 backdrop-blur-sm flex items-center justify-center h-16 w-16 rounded-full border border-white/20">
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                          {step}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-3">{icons[index]}</div>
                  <h3 className="text-lg font-medium mb-2">{titles[index]}</h3>
                  <p className="text-sm text-muted-foreground">
                    {descriptions[index]}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default HowItWorks;

import Architecture from "./Architecture";
import { motion } from "framer-motion";

export default function DiagramWithSlogan() {
  return (
    <motion.div 
    
       initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1, delay: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}

    className="flex items-center justify-center lg:gap-12 px-8 rounded-full flex-col lg:flex-row text-white">
      {/* SVG container */}
      <div className="flex-shrink-0">
        <Architecture />
      </div>

      {/* Text container */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-extrabold leading-tight mb-6">
          Revolutionize Your Document Workflow with Intelligent AI Automation
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Harness cutting-edge natural language processing, fortified security,
          and deep analytics to empower your team. Experience seamless, secure,
          and scalable solutions built to accelerate productivity and unlock
          unprecedented insights.
        </p>
      </div>
    </motion.div>
  );
}

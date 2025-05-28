import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
const StatHighlight = () => {
  return (
    <motion.div
    
      className="flex items-center gap-2 text-neutral-300 mt-[7rem] border p-2 rounded-full text-center m-auto"
    >
      <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400" />
      <span className="text-sm lg:text-md text-center " >
        Over <strong className="text-white">1,000,000+</strong> pdf on <span className="font-semibold text-[#FFFFE3]">Briefly.com</span>
      </span>
    </motion.div>
  );
};

export default StatHighlight;

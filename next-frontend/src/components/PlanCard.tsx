"use client";
import { motion } from "motion/react";
import BasicPlan from "./pricingSection/BasicPlan";
import AdvancedPlan from "./pricingSection/AdvancedPlan";
import CustomPlan from "./pricingSection/CustomPlan";

const PlanCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: 0.3,
        staggerChildren: 0.2
      }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="flex gap-3 md:gap-5 m-5 md:m-10 flex-col lg:flex-row"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <BasicPlan />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <AdvancedPlan />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <CustomPlan />
      </motion.div>
    </motion.div>
  );
};

export default PlanCard;
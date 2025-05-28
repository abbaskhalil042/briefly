"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import BasicPlan from "./pricingSection/BasicPlan";
import AdvancedPlan from "./pricingSection/AdvancedPlan";
import CustomPlan from "./pricingSection/CustomPlan";
import { createOrder } from "@/utils/createOrder";

declare global {
  interface Window {
    Razorpay: any;
  }
}
const PlanCard = () => {
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () =>
      alert("Failed to load Razorpay SDK. Please try again later.");
    document.body.appendChild(script);
  }, []);

  const handlePayment = async (plan: string) => {
    if (!isRazorpayLoaded) {
      alert("Razorpay SDK is still loading, please wait.");
      return;
    }

    const token = localStorage.getItem("token");
    const { orderId, amount, currency } = await createOrder(plan, token!);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "Briefly",
      description: `Payment for ${plan}`,
      order_id: orderId,
      handler: async function (response: any) {
        await fetch("http://localhost:5000/api/v1/payment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            plan,
          }),
        });

        alert("Payment successful!");
        // TODO: refresh user credits or state here
      },
      theme: {
        color: "#6366f1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        staggerChildren: 0.2,
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
        <BasicPlan onClick={() => handlePayment("$9")} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <AdvancedPlan onClick={() => handlePayment("$19")} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <CustomPlan onClick={() => handlePayment("$29")} />
      </motion.div>
    </motion.div>
  );
};

export default PlanCard;

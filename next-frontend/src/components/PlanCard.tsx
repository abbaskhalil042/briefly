"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import BasicPlan from "./pricingSection/BasicPlan";
import AdvancedPlan from "./pricingSection/AdvancedPlan";
import CustomPlan from "./pricingSection/CustomPlan";
import { createOrder } from "@/utils/createOrder";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

// types/razorpay.d.ts
declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (
    event: string,
    callback: (response: RazorpaySuccessResponse) => void
  ) => void;
}
const PlanCard = () => {
  const { setUser } = useAuth();
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
    try {
      if (!isRazorpayLoaded) {
        toast.warning("Payment gateway is still loading, please wait...");
        return;
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Missing Razorpay key configuration");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to make a payment");
        return;
      }

      const { orderId, amount, currency } = await createOrder(plan, token);

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: amount.toString(), // Razorpay expects string amount
        currency,
        name: "Briefly",
        description: `Payment for ${plan}`,
        order_id: orderId,
        handler: async (response: RazorpaySuccessResponse) => {
          try {
            const verification = await fetch(
              "http://localhost:5000/api/v1/payment/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature, // Fixed typo in property name
                  plan,
                }),
              }
            );

            if (!verification.ok)
              throw new Error("Payment verification failed");

            toast.success("Payment successful!");
            setUser((prevUser) =>
              prevUser ? { ...prevUser, credits: prevUser.credits + 100 } : null
            );
          } catch (error) {
            console.error("Verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        theme: {
          color: "#6366f1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to process payment. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-18 justify-center lg:h-[70dvh] ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          staggerChildren: 0.2,
        }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className="flex gap-3  md:gap-5 m-5 md:m-10 flex-col lg:flex-row "
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
    </div>
  );
};

export default PlanCard;

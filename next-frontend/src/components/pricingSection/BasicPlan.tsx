import { Check } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface BasicPlanProps {
  onClick: () => void;
}
const BasicPlan = ({ onClick }: BasicPlanProps) => {
  return (
    <div className="relative rounded-xl border backdrop-blur-sm h-full flex flex-col border-white/10 bg-white/5">
      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold">Starter</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">$9</span>
          <span className="ml-1 text-muted-foreground">/month</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Perfect for individuals and small teams just getting started.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "50 document summaries/month",
            "Up to 100 pages per document",
            "Standard summary customization",
            "Email support",
            "5 user seats",
          ].map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10">
                <Check size={12} className="text-blue-500" />
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t border-white/10 mt-auto">
        <Button onClick={onClick} className="w-full cursor-pointer rounded-full">
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default BasicPlan;

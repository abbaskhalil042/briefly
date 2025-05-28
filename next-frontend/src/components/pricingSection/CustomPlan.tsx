import { Check } from "lucide-react";
import { Button } from "../ui/button";

const customFeatures = [
  "Unlimited document summaries",
  "Up to 500 pages per document",
  "Advanced summary customization",
  "Priority email + chat support",
  "Unlimited user seats",
];

interface CustomPlanProps {
  onClick: () => void;
}

const CustomPlan = ({ onClick }: CustomPlanProps) => {
  return (
    <div className="relative rounded-xl border backdrop-blur-sm h-full flex flex-col border-white/10 bg-white/5">
      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold">Custom</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">$29</span>
          <span className="ml-1 text-muted-foreground">/month</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Ideal for businesses needing flexibility and volume.
        </p>
        <ul className="mt-6 space-y-3">
          {customFeatures.map((feature, index) => (
            <li className="flex items-start" key={index}>
              <div className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10">
                <Check className="w-3 h-3 text-blue-500" />
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t border-white/10 mt-auto">
        <Button
          onClick={onClick}
          className="w-full cursor-pointer rounded-full"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default CustomPlan;

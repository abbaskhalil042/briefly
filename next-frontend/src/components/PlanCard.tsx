import { Check } from "lucide-react";
import BasicPlan from "./pricingSection/BasicPlan";
import AdvancedPlan from "./pricingSection/AdvancedPlan";
import CustomPlan from "./pricingSection/CustomPlan";

const PlanCard = () => {
  return (
    <div className="flex gap-5 m-10 flex-col lg:flex-row">
      <BasicPlan />
      <AdvancedPlan />
      <CustomPlan />
    </div>
  );
};

export default PlanCard;

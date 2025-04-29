import { Stack } from "@mui/material";
import { InfoCard } from "../common/data-display/InfoCard";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import TuneIcon from "@mui/icons-material/Tune";
import AssessmentIcon from "@mui/icons-material/Assessment";
export function FeaturesList() {
  return (
    <Stack gap={12}>
      <InfoCard
        orientation={"left"}
        title={"Nutrients"}
        description={
          "Optimal plant health starts with perfect nutrition. Deliver the right balance of minerals and elements to maximize growth and yields."
        }
        quote={"Feed the roots, and the leaves will follow."}
        icon={WaterDropIcon}
      />

      <InfoCard
        orientation={"right"}
        title={"Controls"}
        description={
          "Automation and precision are key. Monitor and adjust environmental conditions to create the perfect habitat for plants to thrive"
        }
        quote={"Master the environment, master the harvest."}
        icon={TuneIcon}
      />
      <InfoCard
        orientation={"left"}
        title={"Monitoring"}
        description={
          "Continuous monitoring ensures early detection of problems and maintains optimal conditions. Stay a step ahead at all times."
        }
        quote={"What gets measured, gets improved."}
        icon={AssessmentIcon}
      />
    </Stack>
  );
}

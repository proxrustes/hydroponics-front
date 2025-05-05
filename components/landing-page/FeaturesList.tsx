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
        title={"Поживні речовини"}
        description={
          "Оптимальне здоров’я рослин починається з правильної поживи. Забезпечте ідеальний баланс мінералів та елементів для максимального росту та врожайності."
        }
        quote={"Годуй коріння — листя подбає про себе."}
        icon={WaterDropIcon}
      />

      <InfoCard
        orientation={"right"}
        title={"Контроль"}
        description={
          "Автоматизація та точність — ключ до успіху. Слідкуйте та регулюйте умови довкілля, щоб створити ідеальне середовище для росту рослин."
        }
        quote={"Хто контролює середовище — той контролює врожай."}
        icon={TuneIcon}
      />

      <InfoCard
        orientation={"left"}
        title={"Моніторинг"}
        description={
          "Постійний моніторинг дозволяє вчасно виявляти проблеми та підтримувати оптимальні умови. Завжди будьте на крок попереду."
        }
        quote={"Що вимірюється — те покращується."}
        icon={AssessmentIcon}
      />
    </Stack>
  );
}

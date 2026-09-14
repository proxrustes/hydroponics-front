import { SectionBlock } from "@/components/wiki/SectionBlock";
import { Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";

// Data
const plantsSections = [
  {
    title: "Бібліотека рослин",
    description:
      "Повний список усіх рослин, що доступні в системі, разом із їхніми характеристиками та вимогами.",
    link: "/wiki/plants/library",
  },
];

const guides = [
  {
    title: "Як налаштувати освітлення",
    description:
      "Основні правила виставлення інтенсивності світла та тривалості освітлення для різних рослин.",
    link: "/wiki/guides/lighting",
  },
  {
    title: "Контроль pH",
    description:
      "Як правильно вимірювати та регулювати pH у гідропонній системі.",
    link: "/wiki/guides/ph-control",
  },
  {
    title: "Оптимізація поживного розчину",
    description:
      "Короткий гайд по налаштуванню концентрації добрив для різних культур.",
    link: "/wiki/guides/nutrients",
  },
];

const paramsSections = [
  {
    title: "Параметри зони",
    description:
      "Температура повітря, вологість, вологість субстрату та інші показники, що контролюються в кожній зоні.",
    link: "/wiki/params/zone",
  },
  {
    title: "Параметри поживного розчину",
    description:
      "pH рівень, концентрація поживних речовин, температура та рівень розчину у станції.",
    link: "/wiki/params/bucket",
  },
];

export default function Wiki() {
  return (
    <Container sx={{ py: 6 }} maxWidth="lg">
      <Stack alignItems="center" gap={4}>
        <Typography variant="h3" fontWeight={800} color="primary.main">
          Wiki
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary">
          Тут зібрана інформація про рослини, параметри станцій та інші важливі
          теми.
        </Typography>
        <Stack gap={12} sx={{ mt: 12 }}>
          <SectionBlock
            title="Рослини в системі"
            subtitle="Вивчіть доступні культури та їхні особливості для оптимального вирощування"
            items={plantsSections}
            icon={SpaOutlinedIcon}
          />

          <SectionBlock
            title="Гайди і поради"
            subtitle="Практичні інструкції для покращення роботи вашої гідропонної системи"
            items={guides}
            icon={BuildOutlinedIcon}
          />

          <SectionBlock
            title="Параметри системи"
            subtitle="Детальна інформація про основні параметри, які контролюються у гідропоніці"
            items={paramsSections}
            icon={InsightsOutlinedIcon}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

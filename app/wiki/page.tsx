import { SectionBlock } from "@/components/wiki/SectionBlock";
import { Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";

// 📚 Данные
const plantsSections = [
  {
    title: "Бібліотека рослин",
    description:
      "Повний список усіх рослин, що доступні в системі, разом із їхніми характеристиками та вимогами.",
    link: "/wiki/plants/library",
  },
  {
    title: "Групи рослин",
    description:
      "Інформація про категорії рослин: плодоносні культури, зелені культури та інші групи.",
    link: "/wiki/plants/groups",
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
        <Stack direction="row" gap={2}>
          <Button
            component={Link}
            href="/wiki/params"
            variant="contained"
            color="primary"
            size="large"
          >
            Параметри станцій
          </Button>
          <Button
            component={Link}
            href="/wiki/plants"
            variant="contained"
            color="secondary"
            size="large"
          >
            Бібліотека рослин
          </Button>
          <Button
            component={Link}
            href="/wiki/guides"
            variant="outlined"
            color="primary"
            size="large"
          >
            Гайди і поради
          </Button>
        </Stack>
        <Stack gap={12} sx={{ mt: 12 }}>
          <SectionBlock
            title="🌿 Рослини в системі"
            subtitle="Вивчіть доступні культури та їхні особливості для оптимального вирощування"
            items={plantsSections}
          />

          <SectionBlock
            title="🛠️ Гайди і поради"
            subtitle="Практичні інструкції для покращення роботи вашої гідропонної системи"
            items={guides}
          />

          <SectionBlock
            title="📈 Параметри системи"
            subtitle="Детальна інформація про основні параметри, які контролюються у гідропоніці"
            items={paramsSections}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

import { Article } from "@/components/wiki/Article";
import { Container, ListItem, Stack, Typography } from "@mui/material";

export default function Wiki() {
  return (
    <Container maxWidth="xl">
      <Stack gap={4}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          # Про параметри відра
        </Typography>
        <Article title={"🧪 pH"}>
          <Typography variant="body1">
            Bпливає на те як швидко все засвоюється. . Якщо pH занадто низький
            або високий, рослини не можуть засвоювати потрібні поживні речовини,
            навіть якщо вони є в розчині. Ідеальний діапазон pH для більшості
            рослин — 5.5-6.5.
          </Typography>
        </Article>
        <Article title={"〰️ solution_lvl"}>
          <Typography variant="body1">
            Рівень води у системі впливає на те, скільки кисню отримують корені.
            Якщо розчину забагато — корені можуть "задихатися". Якщо замало —
            рослина не отримає достатньо вологи та поживних речовин.
          </Typography>
        </Article>
        <Article title={"🌡️ solution_temperature"}>
          <Typography variant="body1">
            Bпливає на зміст О2 та рівень охолодження рослини. Температура води
            впливає на вміст кисню: у прохолодній воді (18-22°C) кисню більше, і
            рослинам легше дихати. Але якщо вода надто холодна — рослини
            "застуджуються", якщо гаряча — можуть перегрітися та захворіти.
          </Typography>
        </Article>

        <Article title={"〰️ nutrient_concentration"}>
          <Typography variant="body1">
            Концентрація поживних речовин у розчині визначає, чи отримує рослина
            всі необхідні "вітаміни". Якщо концентрація занадто низька — рослина
            буде "голодувати", її ріст уповільниться, і вона почне слабшати.
            Якщо занадто висока — корені можуть "згоріти", і рослина отримає
            стрес.
          </Typography>
        </Article>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          # Про параметри зони
        </Typography>
        <Article title={"🌡️ Temperature"}>
          <Typography variant="body1">
            Оптимальна температура повітря залежить від рослини, але зазвичай це
            22-28°C вдень і трохи прохолодніше вночі. Занадто висока температура
            може висушити листя, а низька — уповільнити ріст.
          </Typography>
        </Article>
        <Article title={"💧 Humidity"}>
          <Typography variant="body1">
            Якщо повітря дуже сухе, рослини швидко втрачають вологу через листя
            і починають стресувати. Якщо занадто вологе — може з’явитись грибок
            або пліснява. Оптимальна вологість залежить від стадії росту:
          </Typography>
          <ListItem>- Для паростків: 60-70%.</ListItem>
          <ListItem>- Для дорослих рослин: 40-60%</ListItem>
        </Article>
        <Article title={"🔆 Light Intensity"}>
          <Typography variant="body1">
            Рослини використовують світло як "їжу" для фотосинтезу. Якщо світла
            мало, рослина не росте. Якщо забагато, листя може згоріти. Тому
            важливо підібрати правильну кількість світла для кожного виду
            рослини.
          </Typography>
        </Article>
        <Article title={"🪴 substrate_humidity"}>
          <Typography variant="body1">
            Bпливає на те як швидко все засвоюється
          </Typography>
        </Article>
      </Stack>
    </Container>
  );
}

import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import GrassIcon from "@mui/icons-material/Grass";
import SpaIcon from "@mui/icons-material/Spa";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
export const plantIcons: Record<string, React.ReactNode> = {
  Tomatoes: <EnergySavingsLeafIcon fontSize="inherit" />,
  Lettuce: <LocalFloristIcon fontSize="inherit" />,
  Basil: <GrassIcon fontSize="inherit" />,
  Strawberries: <SpaIcon fontSize="inherit" />,
  Cucumbers: <AgricultureIcon fontSize="inherit" />,
};
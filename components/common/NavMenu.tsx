import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

export default function NavMenu() {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/dashboard">
        Dashboard
      </Link>
      <Link underline="hover" color="inherit" href="/dashboard">
        Wiki
      </Link>
    </Breadcrumbs>
  );
}

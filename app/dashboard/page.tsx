import AdminUsersPage from "@/components/AdminUsersPage";
import { StationsSection } from "@/components/station/StationsSeciton";
import { getUserRoleFromCookie } from "@/lib/utils/cookiesUtils";
import { Container } from "@mui/material";

export default async function Dashboard() {
  const role = await getUserRoleFromCookie();

  return (
    <Container maxWidth="xl">
      {role === "ADMIN" ? <AdminUsersPage /> : <StationsSection />}
    </Container>
  );
}

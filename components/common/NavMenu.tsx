"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function NavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("currentUser="));
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    document.cookie =
      "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/user/login");
  };

  const handleLogin = () => {
    router.push("/user/login");
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/wiki">
          Wiki
        </Link>
        <Button
          variant="outlined"
          size="small"
          color={isLoggedIn ? "error" : "primary"}
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </Breadcrumbs>
    </Stack>
  );
}

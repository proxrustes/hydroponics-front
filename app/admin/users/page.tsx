"use client";

import {
  Box,
  Button,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { customFetch } from "@/lib/utils/apiUtils";
import { CustomContainer } from "@/components/common/CustomContainer";

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  console.log(users);
  const fetchUsers = async () => {
    const res = await customFetch("admin/users", "GET");
    console.log("res");
    console.log(res.message);
    if (res.status === 200) setUsers(res.message);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити користувача?")) return;
    await customFetch(`admin/users/${id}`, "DELETE");
    fetchUsers();
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    await customFetch(`admin/users/${id}`, "PATCH", { role: newRole });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" alignContent="center" sx={{ my: 3 }}>
        Управління користувачами
      </Typography>
      <CustomContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ім’я</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    size="small"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomContainer>
    </Container>
  );
}

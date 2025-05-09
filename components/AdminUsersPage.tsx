"use client";

import {
  Box,
  Collapse,
  Container,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { customFetch } from "@/lib/utils/apiUtils";

type Station = {
  id: number;
  name: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  stations: Station[];
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});

  const fetchUsers = async () => {
    const res = await customFetch("admin/users", "GET");
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
      <Typography variant="h4" sx={{ my: 3 }}>
        Управління користувачами
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Ім’я</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key="users">
            {users.map((user) => (
              <>
                <TableRow key={user.id}>
                  <TableCell>
                    {user.role !== "ADMIN" && (
                      <IconButton
                        size="small"
                        onClick={() =>
                          setOpenMap((prev) => ({
                            ...prev,
                            [user.id]: !prev[user.id],
                          }))
                        }
                      >
                        {openMap[user.id] ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "ADMIN" ? (
                      <Typography>ADMIN</Typography>
                    ) : (
                      <Select
                        size="small"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                      >
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>

                {user.role !== "ADMIN" && (
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openMap[user.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Станції користувача:
                          </Typography>
                          {user.stations.length === 0 ? (
                            <Typography variant="body2">
                              Немає станцій
                            </Typography>
                          ) : (
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>ID</TableCell>
                                  <TableCell>Назва</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {user.stations.map((station) => (
                                  <TableRow key={station.id}>
                                    <TableCell>{station.id}</TableCell>
                                    <TableCell>{station.name}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

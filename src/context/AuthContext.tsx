import { createContext } from "react";

export const userData = {
  id: 1,
  name: "Alice Johnson",
  username: "alicej",
  password: "alicePass123",
  email: "alice.johnson@example.com",
};

export const UserContext = createContext(userData);

import { createContext } from "react";

export const userData = {
  id: "a138b0ea-faa5-4a75-ae56-921c607ba3af",
  name: "Alice Johnson",
  username: "alicej",
  password: "alicePass123",
  email: "alice.johnson@example.com",
};

export const UserContext = createContext(userData);

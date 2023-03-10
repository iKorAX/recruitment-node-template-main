import { randomUUID } from "crypto";
import { User } from "../entities/user.entity";

const userMock: User = {
  id: randomUUID(),
  email: "email@email.com",
  hashedPassword: "password",
  address: "Giruliu g. 13, Vilnius",
  coordinates: { lat: 54.739105300000006, lng: 25.216116200000002 },
  farms: [],
  drivingDistances: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function buildUserMock(overrides: Partial<User> = {}): User {
  return { ...userMock, ...overrides };
}

import { randomUUID } from "crypto";
import { Farm } from "../entities/farm.entity";

const farmMock: Farm = {
  id: randomUUID(),
  name: "farm name",
  address: "Vilniaus g. 18, Vilnius",
  coordinates: { lat: 54.7157557, lng: 25.2662441 },
  size: 100,
  yield: 100,
  user: {
    id: randomUUID(),
    email: "email123@email.com",
    hashedPassword: "password",
    address: "Giruliu g. 13, Vilnius",
    coordinates: { lat: 54.739105300000006, lng: 25.216116200000002 },
    farms: [],
    drivingDistances: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  drivingDistances: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function buildFarmMock(overrides: Partial<Farm> = {}): Farm {
  return { ...farmMock, ...overrides };
}

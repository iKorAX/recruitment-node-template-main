import { randomUUID } from "crypto";
import { DrivingDistance } from "../entities/driving-distance.entity";

const drivingDistanceMock: DrivingDistance = {
  id: randomUUID(),
  user: {
    id: randomUUID(),
    email: "email@email.com",
    hashedPassword: "password",
    address: "Giruliu g. 13, Vilnius",
    coordinates: { lat: 54.739105300000006, lng: 25.216116200000002 },
    farms: [],
    drivingDistances: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  farm: {
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
  },
  drivingDistance: 10000,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function buildDrivingDistanceMock(overrides: Partial<DrivingDistance> = {}): DrivingDistance {
  return { ...drivingDistanceMock, ...overrides };
}

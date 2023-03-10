import { randomUUID } from "crypto";
import { AccessToken } from "../entities/access-token.entity";

const accessTokenMock: AccessToken = {
  id: randomUUID(),
  token: "token",
  expiresAt: new Date("9999-01-01"),
  user: {
    id: randomUUID(),
    email: "test@email.com",
    hashedPassword: "hashedPassword",
    address: "Address 1, Addressville",
    coordinates: { lat: 0, lng: 0 },
    farms: [],
    drivingDistances: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function buildAccessTokenMock(overrides: Partial<AccessToken> = {}): AccessToken {
  return { ...accessTokenMock, ...overrides };
}

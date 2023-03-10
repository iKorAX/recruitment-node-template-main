import { AuthenticatedRequest } from "common/authenticated-request";
import { NextFunction, Response } from "express";
import { authenticateTokenMiddleware } from "middlewares/authentication.middleware";
import * as jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { AuthService } from "modules/auth/auth.service";
import { buildAccessTokenMock } from "modules/auth/__mocks__/access-token.mock";

jest.mock("jsonwebtoken");

describe("authenticateTokenMiddleware", () => {
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeAll(() => {
    process.env.JWT_SECRET = "secret";
  });

  beforeEach(() => {
    mockResponse = {
      sendStatus: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("if request does not have a token", () => {
    it("responds with HTTP 401", async () => {
      const mockRequest: Partial<AuthenticatedRequest> = {
        headers: { authorization: undefined },
      };

      await authenticateTokenMiddleware(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.sendStatus).toBeCalledWith(401);
      expect(nextFunction).not.toBeCalled();
    });
  });
  describe("if request has a token", () => {
    describe("if token can be decrypted", () => {
      describe("if the decrypted value has a valid format", () => {
        describe("if token can be found in the database", () => {
          it("passes the request to the next handler", async () => {
            const mockRequest: Partial<AuthenticatedRequest> = {
              headers: { authorization: "Bearer token" },
            };
            const mockUserData = { id: randomUUID(), email: "email@email.com" };
            const mockAccessToken = buildAccessTokenMock();

            jest.spyOn(jwt, "verify").mockImplementation(() => mockUserData);
            jest.spyOn(AuthService.prototype, "getActiveUserToken").mockResolvedValue(mockAccessToken);

            await authenticateTokenMiddleware(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);
            expect(nextFunction).toBeCalled();
          });
        });

        describe("if token cannot be found in the database", () => {
          it("responds with HTTP 401", async () => {
            const mockRequest: Partial<AuthenticatedRequest> = {
              headers: { authorization: "Bearer token" },
            };
            const mockUserData = { id: randomUUID(), email: "email@email.com" };

            jest.spyOn(jwt, "verify").mockImplementation(() => mockUserData);
            jest.spyOn(AuthService.prototype, "getActiveUserToken").mockResolvedValue(null);

            await authenticateTokenMiddleware(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);
            expect(mockResponse.sendStatus).toBeCalledWith(401);
            expect(nextFunction).not.toBeCalled();
          });
        });
      });

      describe("if the decrypted value has an invalid format", () => {
        it("responds with HTTP 401", async () => {
          const mockRequest: Partial<AuthenticatedRequest> = {
            headers: { authorization: "Bearer token" },
          };
          const mockUserData = { obviouslyWrongKey: randomUUID(), email: "email@email.com" };

          jest.spyOn(jwt, "verify").mockImplementation(() => mockUserData);

          await authenticateTokenMiddleware(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);
          expect(mockResponse.sendStatus).toBeCalledWith(401);
          expect(nextFunction).not.toBeCalled();
        });
      });
    });
    describe("if token cannot be decrypted", () => {
      it("responds with HTTP 401", async () => {
        const mockRequest: Partial<AuthenticatedRequest> = {
          headers: { authorization: "Bearer token" },
        };

        jest.spyOn(jwt, "verify").mockImplementation(() => new Error("access token error"));

        await authenticateTokenMiddleware(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);
        expect(mockResponse.sendStatus).toBeCalledWith(401);
        expect(nextFunction).not.toBeCalled();
      });
    });
  });
});

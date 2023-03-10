import config from "config/config";
import { UnprocessableEntityError } from "errors/errors";
import { Express } from "express";
import { setupServer } from "server/server";
import { disconnectAndClearDatabase } from "helpers/utils";
import { UsersService } from "modules/users/users.service";
import ds from "orm/orm.config";
import { AuthService } from "../auth.service";
import { LoginUserDto } from "../dto/login-user.dto";
import http, { Server } from "http";
import { GeographyService } from "modules/geography/geography.service";

describe("AuthService", () => {
  let app: Express;
  let usersService: UsersService;
  let authService: AuthService;
  let server: Server;

  beforeAll(() => {
    app = setupServer();
    server = http.createServer(app).listen(config.APP_PORT);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await ds.initialize();

    usersService = new UsersService();
    authService = new AuthService();

    jest.spyOn(GeographyService.prototype, "getCoordinates").mockResolvedValue({ lat: 1, lng: 1 });
  });

  afterEach(async () => {
    await disconnectAndClearDatabase(ds);
  });

  describe(".login", () => {
    const loginDto: LoginUserDto = { email: "user@test.com", password: "password" };
    const createUser = async (userDto: LoginUserDto) =>
      usersService.createUser({ ...userDto, address: "Vilniaus g. 18, Vilnius" });

    it("should create access token for existing user", async () => {
      await createUser(loginDto);

      const { token } = await authService.login(loginDto);

      expect(token).toBeDefined();
    });

    it("should throw UnprocessableEntityError when user logs in with invalid email", async () => {
      await authService.login({ email: "invalidEmail", password: "pwd" }).catch((error: UnprocessableEntityError) => {
        expect(error).toBeInstanceOf(UnprocessableEntityError);
        expect(error.message).toBe("Invalid user email or password");
      });
    });

    it("should throw UnprocessableEntityError when user logs in with invalid password", async () => {
      await createUser(loginDto);

      await authService.login({ email: loginDto.email, password: "invalidPassword" }).catch((error: UnprocessableEntityError) => {
        expect(error).toBeInstanceOf(UnprocessableEntityError);
        expect(error.message).toBe("Invalid user email or password");
      });
    });
  });
});

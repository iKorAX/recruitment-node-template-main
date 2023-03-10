import { setupServer } from "server/server";
import { Express } from "express";
import { DrivingDistanceService } from "../driving-distance.service";
import http, { Server } from "http";
import config from "config/config";
import ds from "orm/orm.config";
import { disconnectAndClearDatabase } from "helpers/utils";
import { User } from "modules/users/entities/user.entity";
import { buildUserMock } from "modules/users/__mocks__/user.mock";
import { Farm } from "modules/farms/entities/farm.entity";
import { buildFarmMock } from "modules/farms/__mocks__/farm.mock";
import { DrivingDistance } from "../entities/driving-distance.entity";
import { GeographyService } from "modules/geography/geography.service";
import { buildDrivingDistanceMock } from "../__mocks__/driving-distance.mock";

describe("DrivingDistanceService", () => {
  let app: Express;
  let server: Server;
  let service: DrivingDistanceService;

  beforeAll(() => {
    app = setupServer();
    server = http.createServer(app).listen(config.APP_PORT);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await ds.initialize();
    service = new DrivingDistanceService();
  });

  afterEach(async () => {
    await disconnectAndClearDatabase(ds);
  });

  describe(".createFromFarmsToUser", () => {
    describe("if farms are found", () => {
      it("creates driving distances from all users to farm", async () => {
        const user = buildUserMock();
        const farm = buildFarmMock({ user });
        jest.spyOn(GeographyService.prototype, "getDrivingDistance").mockResolvedValue(10000);

        await ds.getRepository(User).save(user, { listeners: false });
        await ds.getRepository(Farm).save(farm, { listeners: false });
        await service.createFromFarmsToUser(user);

        expect((await ds.getRepository(DrivingDistance).findBy({ user: { id: user.id } }))[0].drivingDistance).toEqual(10000);
      });
    });

    describe("if no farms are found in the database", () => {
      it("does not create driving distances", async () => {
        const user = buildUserMock();
        jest.spyOn(GeographyService.prototype, "getDrivingDistance").mockResolvedValue(10000);

        await ds.getRepository(User).save(user), { listeners: false };
        await service.createFromFarmsToUser(user);

        expect((await ds.getRepository(DrivingDistance).findBy({ user: { id: user.id } })).length).toEqual(0);
      });
    });
  });

  describe(".createFromUsersToFarm", () => {
    describe("if users are found", () => {
      it("creates driving distances from all users to farm", async () => {
        const user = buildUserMock();
        const farm = buildFarmMock({ user });
        jest.spyOn(GeographyService.prototype, "getDrivingDistance").mockResolvedValue(10000);

        await ds.getRepository(User).save(user, { listeners: false });
        await ds.getRepository(Farm).save(farm, { listeners: false });
        await service.createFromUsersToFarm(farm);

        expect((await ds.getRepository(DrivingDistance).findBy({ farm: { id: farm.id } }))[0].drivingDistance).toEqual(10000);
      });
    });

    describe("if no users are found", () => {
      it("does not create driving distances", async () => {
        const farm = buildFarmMock();
        jest.spyOn(GeographyService.prototype, "getDrivingDistance").mockResolvedValue(10000);

        await service.createFromUsersToFarm(farm);

        expect((await ds.getRepository(DrivingDistance).findBy({ farm: { id: farm.id } })).length).toEqual(0);
      });
    });
  });

  describe(".getAllFarmsWithDistances", () => {
    it("returns an array of driving distances", async () => {
      const user = buildUserMock();
      const farm = buildFarmMock({ user });
      const drivingDistance = ds.getRepository(DrivingDistance).create(buildDrivingDistanceMock({ user, farm }));

      await ds.getRepository(User).save(user, { listeners: false });
      await ds.getRepository(Farm).save(farm, { listeners: false });
      await ds.getRepository(DrivingDistance).save(drivingDistance, { listeners: false });

      const result = await service.getAllFarmsWithDistances(user.id, {});
      expect(result.length).toEqual(1);
      expect(result[0].farm.id).toEqual(farm.id);
      expect(result[0].user.id).toEqual(user.id);
    });
  });
});

import { FarmSortingAttribute } from "modules/farms/enums/farm-sorting-attribute";
import { LessThan, MoreThan } from "typeorm";
import { FindQueryGenerator } from "../domain/find-query-generator";

describe("FindQueryGenerator", () => {
  let generator: FindQueryGenerator;

  beforeEach(() => {
    generator = new FindQueryGenerator();
  });
  describe(".generateQuery", () => {
    describe("if no sorting or filtering is required", () => {
      it("returns the default query", () => {
        const currentUserId = "1";
        const getFarmsDto = {};
        const averageYield = -1;

        expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
          relations: ["user", "farm", "farm.user"],
          where: { user: { id: currentUserId } },
        });
      });
    });

    describe("if sortBy is defined", () => {
      describe("if sorting by date", () => {
        it("adds sorting by date to the query", () => {
          const currentUserId = "1";
          const getFarmsDto = { sortBy: FarmSortingAttribute.DATE };
          const averageYield = -1;

          expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
            relations: ["user", "farm", "farm.user"],
            where: { user: { id: currentUserId } },
            order: { farm: { createdAt: { direction: "DESC" } } },
          });
        });
      });

      describe("if sorting by name", () => {
        it("adds sorting by name to the query", () => {
          const currentUserId = "1";
          const getFarmsDto = { sortBy: FarmSortingAttribute.NAME };
          const averageYield = -1;

          expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
            relations: ["user", "farm", "farm.user"],
            where: { user: { id: currentUserId } },
            order: { farm: { name: { direction: "ASC" } } },
          });
        });
      });

      describe("if sorting by driving distance", () => {
        it("adds sorting by driving distance to the query", () => {
          const currentUserId = "1";
          const getFarmsDto = { sortBy: FarmSortingAttribute.DRIVING_DISTANCE };
          const averageYield = -1;

          expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
            relations: ["user", "farm", "farm.user"],
            where: { user: { id: currentUserId } },
            order: { drivingDistance: { direction: "ASC" } },
          });
        });
      });
    });

    describe("if filterOutliers is set to true", () => {
      const getFarmsDto = { filterOutliers: true };
      const currentUserId = "1";

      describe("if averageYield is more than -1", () => {
        it("adds a filter for outliers", () => {
          const averageYield = 100;

          expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
            relations: ["user", "farm", "farm.user"],
            where: {
              user: { id: currentUserId },
              farm: [{ yield: LessThan(averageYield * 0.7) }, { yield: MoreThan(averageYield * 1.3) }],
            },
          });
        });
      });

      describe("if averageYield is not more than -1", () => {
        it("does not add a filter for outliers", () => {
          const currentUserId = "1";
          const averageYield = -1;

          expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
            relations: ["user", "farm", "farm.user"],
            where: { user: { id: currentUserId } },
          });
        });
      });
    });

    describe("if filterOutliers is set to false", () => {
      it("does not add a filter for outliers", () => {
        const currentUserId = "1";
        const averageYield = -1;
        const getFarmsDto = { filterOutliers: false };

        expect(generator.generateQuery(currentUserId, getFarmsDto, averageYield)).toEqual({
          relations: ["user", "farm", "farm.user"],
          where: { user: { id: currentUserId } },
        });
      });
    });
  });
});

import { Coordinate } from "modules/geography/dto/geocode-response.dto";
import { PointTransformer } from "../point-transformer";

describe("PointTransformer", () => {
  describe(".to", () => {
    it("converts a Coordinate object into a string", () => {
      const transformer = new PointTransformer();

      const coordinate: Coordinate = { lat: 10, lng: 20 };

      expect(transformer.to(coordinate)).toEqual("10, 20");
    });
  });
  describe(".from", () => {
    it("converts coordinates into a Coordinate object", () => {
      const transformer = new PointTransformer();

      const coordinate: { x: number; y: number } = { x: 10, y: 20 };

      expect(transformer.from(coordinate)).toEqual({ lat: 10, lng: 20 });
    });
  });
});

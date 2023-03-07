import { Coordinate } from "modules/geography/dto/geocode-response.dto";
import { ValueTransformer } from "typeorm";

export class PointTransformer implements ValueTransformer {
  public to(value: Coordinate) {
    const { lat, lng } = value;
    return `${lat}, ${lng}`;
  }

  public from(value: { x: number; y: number }): Coordinate {
    const { x: lat, y: lng } = value;

    return { lat, lng };
  }
}

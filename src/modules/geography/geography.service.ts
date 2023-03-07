import { DistanceMatrixService } from "./distance-matrix.service";
import { Coordinate } from "./dto/geocode-response.dto";

export class GeographyService {
  public async getCoordinates(address: string): Promise<Coordinate> {
    const distanceMatrixService = new DistanceMatrixService();
    const validatedResponse = await distanceMatrixService.getCoordinates(address);

    if (validatedResponse.result.length === 0) throw new Error("Address not found");

    const coordinate = validatedResponse.result[0].geometry.location;

    if (coordinate.lat === 0 && coordinate.lng === 0) throw new Error("Address not found");

    return coordinate;
  }
}

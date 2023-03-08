import { DistanceMatrixService } from "./distance-matrix.service";
import { Coordinate } from "./dto/geocode-response.dto";

export class GeographyService {
  private readonly distanceMatrixService: DistanceMatrixService;

  constructor() {
    this.distanceMatrixService = new DistanceMatrixService();
  }
  public async getCoordinates(address: string): Promise<Coordinate> {
    const validatedResponse = await this.distanceMatrixService.getCoordinates(address);

    if (validatedResponse.result.length === 0) throw new Error("Address not found");

    const coordinate = validatedResponse.result[0].geometry.location;

    if (coordinate.lat === 0 && coordinate.lng === 0) throw new Error("Address not found");

    return coordinate;
  }

  public async getDrivingDistance(origin: Coordinate, destination: Coordinate) {
    await this.distanceMatrixService.getDrivingDistance(JSON.stringify(origin), JSON.stringify(destination));

    return 0;
  }
}

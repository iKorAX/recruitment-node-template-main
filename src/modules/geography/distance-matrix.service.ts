import { AxiosResponse } from "axios";
import config from "config/config";
import { externalApiCall } from "helpers/external-api-call";
import { Validator } from "modules/utils/validator";
import { DistanceResponseDto } from "./dto/distance-response.dto";
import { GeocodeResponseDto } from "./dto/geocode-response.dto";

export class DistanceMatrixService {
  private readonly baseUrl = config.DISTANCEMATRIX_BASE_URL;
  private readonly addressEndpoint = config.DISTANCEMATRIX_ADDRESS_ENDPOINT;
  private readonly distanceEndpoint = config.DISTANCEMATRIX_DISTANCE_ENDPOINT;
  private readonly apiKey = config.DISTANCEMATRIX_API_KEY;

  public async getCoordinates(address: string): Promise<GeocodeResponseDto> {
    const response = await this.sendRequest(this.addressEndpoint, { address });

    const validator = new Validator();

    const result = await validator.convertAndValidate(GeocodeResponseDto, response.data as object);

    return result;
  }

  public async getDrivingDistance(origins: string, destinations: string): Promise<DistanceResponseDto> {
    const response = await this.sendRequest(this.distanceEndpoint, { origins, destinations });

    const validator = new Validator();

    const result = await validator.convertAndValidate(DistanceResponseDto, response.data as object);

    return result;
  }

  private async sendRequest(endpoint: string, params: object): Promise<AxiosResponse> {
    const response = await externalApiCall.get(`${this.baseUrl}/${endpoint}`, { params: { ...params, key: this.apiKey } });

    return response;
  }
}

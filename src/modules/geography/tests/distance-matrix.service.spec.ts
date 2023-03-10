import { instanceToPlain, plainToInstance } from "class-transformer";
import { externalApiCall } from "helpers/external-api-call";
import MockAdapter from "axios-mock-adapter";
import { DistanceMatrixService } from "../distance-matrix.service";
import config from "config/config";
import { GeocodeResponseDto } from "../dto/geocode-response.dto";
import { DistanceResponseDto } from "../dto/distance-response.dto";
import { buildGeocodeResponseDtoMock } from "./__mocks__/geocode-response.dto.mock";

describe("DistanceMatrixService", () => {
  beforeAll(() => {
    config.DISTANCEMATRIX_BASE_URL = "https://dummy-url.dumdum";
  });

  describe(".getCoordinates", () => {
    it("should return geographical data for an address", async () => {
      jest.spyOn(externalApiCall, "get");

      const mockedUrl = `${config.DISTANCEMATRIX_BASE_URL}/${config.DISTANCEMATRIX_ADDRESS_ENDPOINT}`;

      const address = "Vilnius street 1, Vilnius";
      const mockResponse = new GeocodeResponseDto();
      mockResponse.result = buildGeocodeResponseDtoMock().result;
      mockResponse.status = "OK";

      const mockAdapter = new MockAdapter(externalApiCall);
      mockAdapter.onGet(mockedUrl).reply(200, instanceToPlain(mockResponse));

      const service = new DistanceMatrixService();

      await expect(service.getCoordinates(address)).resolves.toEqual(mockResponse);
    });

    it("should throw error if request to data provider fails", async () => {
      const mockedUrl = `${config.DISTANCEMATRIX_BASE_URL}/${config.DISTANCEMATRIX_ADDRESS_ENDPOINT}`;

      const mockAdapter = new MockAdapter(externalApiCall);
      mockAdapter.onGet(mockedUrl).replyOnce(404, {});

      const service = new DistanceMatrixService();

      await expect(service.getCoordinates("Vilnius street 1, Vilnius")).rejects.toThrow();
    });
  });

  describe(".getDrivingDistance", () => {
    it("should return driving distance", async () => {
      jest.spyOn(externalApiCall, "get");

      const mockedUrl = `${config.DISTANCEMATRIX_BASE_URL}/${config.DISTANCEMATRIX_DISTANCE_ENDPOINT}`;

      const mockResponse = {
        destination_addresses: ["Verkių g., Vilnius, Lithuania"],
        origin_addresses: ["Ukmergės g. 244, 07162 Vilnius, Lithuania"],
        rows: [
          {
            elements: [
              {
                distance: {
                  text: "4.7 km",
                  value: 4708,
                },
                duration: {
                  text: "10 mins",
                  value: 603,
                },
                origin: "54.721771999999994,25.242017999999998",
                destination: "54.7156288,25.2931425",
                status: "OK",
              },
            ],
          },
        ],
        status: "OK",
      };

      const mockAdapter = new MockAdapter(externalApiCall);
      mockAdapter.onGet(mockedUrl).reply(200, mockResponse);

      const service = new DistanceMatrixService();

      await expect(service.getDrivingDistance("54.721771999999994,25.242017999999998", "54.7156288,25.2931425")).resolves.toEqual(
        plainToInstance(DistanceResponseDto, mockResponse),
      );
    });

    it("should throw error if request to data provider fails", async () => {
      const mockedUrl = `${config.DISTANCEMATRIX_BASE_URL}/${config.DISTANCEMATRIX_DISTANCE_ENDPOINT}`;

      const mockAdapter = new MockAdapter(externalApiCall);
      mockAdapter.onGet(mockedUrl).replyOnce(404, {});

      const service = new DistanceMatrixService();

      await expect(
        service.getDrivingDistance("54.721771999999994,25.242017999999998", "54.7156288,25.2931425"),
      ).rejects.toThrow();
    });
  });
});

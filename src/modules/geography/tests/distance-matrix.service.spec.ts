import { plainToInstance } from "class-transformer";
import { externalApiCall } from "helpers/external-api-call";
import MockAdapter from "axios-mock-adapter";
import { DistanceMatrixService } from "../distance-matrix.service";
import config from "config/config";
import { GeocodeResponseDto } from "../dto/geocode-response.dto";

describe("DistanceMatrixService", () => {
  beforeAll(() => {
    config.DISTANCEMATRIX_BASE_URL = "https://dummy-url.dumdum";
  });

  describe(".getAddressData", () => {
    it("should return geographical data for an address", async () => {
      jest.spyOn(externalApiCall, "get");

      const mockedUrl = `${config.DISTANCEMATRIX_BASE_URL}/${config.DISTANCEMATRIX_ADDRESS_ENDPOINT}`;

      const address = "Vilnius street 1, Vilnius";
      const mockResponse = {
        result: [
          {
            address_components: [
              {
                long_name: "21",
                short_name: "21",
                types: ["street_number"],
              },
              {
                long_name: "henrie st",
                short_name: "henrie st",
                types: ["route"],
              },
              {
                long_name: "bristol",
                short_name: "bristol",
                types: ["locality"],
              },
              {
                long_name: "uk",
                short_name: "uk",
                types: ["country"],
              },
            ],
            formatted_address: "21 Henrie St, Bristol, UK",
            geometry: {
              location: {
                lat: 51.442498500000006,
                lng: -2.5796065,
              },
              location_type: "APPROXIMATE",
              viewport: {
                northeast: {
                  lat: 51.442498500000006,
                  lng: -2.5796065,
                },
                southwest: {
                  lat: 51.442498500000006,
                  lng: -2.5796065,
                },
              },
            },
            place_id: "",
            plus_code: {},
            types: ["locality", "political"],
          },
        ],
        status: "OK",
      };

      const mockAdapter = new MockAdapter(externalApiCall);

      mockAdapter.onGet(mockedUrl).reply(200, mockResponse);
      const service = new DistanceMatrixService();

      await expect(service.getCoordinates(address)).resolves.toEqual(plainToInstance(GeocodeResponseDto, mockResponse));
    });

    it("should throw error if request to data provider fails", async () => {
      const mockedUrl = `${config.DISTANCEMATRIX_BASE_URL}/${config.DISTANCEMATRIX_ADDRESS_ENDPOINT}`;

      const mockAdapter = new MockAdapter(externalApiCall);
      mockAdapter.onGet(mockedUrl).replyOnce(404, {});

      const service = new DistanceMatrixService();

      await expect(service.getCoordinates("Vilnius street 1, Vilnius")).rejects.toThrow();
    });
  });

  // describe(".getDrivingDistance", () => {
  //   it("should return driving distance", async () => {});

  //   it("should throw error if request to data provider fails", async () => {});
  // });
});

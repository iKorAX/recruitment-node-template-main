import { GeocodeResponseDto } from "modules/geography/dto/geocode-response.dto";

const geocodeResponseDtoMock: GeocodeResponseDto = {
  result: [
    {
      addressComponents: [
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
      formattedAddress: "21 Henrie St, Bristol, UK",
      geometry: {
        location: {
          lat: 51.442498500000006,
          lng: -2.5796065,
        },
        locationType: "APPROXIMATE",
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
      placeId: "",
      plusCode: {},
      types: ["locality", "political"],
    },
  ],
  status: "OK",
};

export function buildGeocodeResponseDtoMock(overrides: Partial<GeocodeResponseDto> = {}): GeocodeResponseDto {
  return { ...geocodeResponseDtoMock, ...overrides };
}

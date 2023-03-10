import { DistanceResponseDto } from "modules/geography/dto/distance-response.dto";

const distanceResponseDto: DistanceResponseDto = {
  destinationAddresses: ["Verkių g., Vilnius, Lithuania"],
  originAddresses: ["Ukmergės g. 244, 07162 Vilnius, Lithuania"],
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

export function buildDistanceResponseDtoMock(overrides: Partial<DistanceResponseDto> = {}): DistanceResponseDto {
  return { ...distanceResponseDto, ...overrides };
}

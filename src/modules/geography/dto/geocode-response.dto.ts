import { Expose } from "class-transformer";

export class GeocodeResponseDto {
  public result: Array<GeocodeResponseData>;
  public status: string;
}

export class GeocodeResponseData {
  @Expose({ name: "address_components" })
  public addressComponents: Array<object>;

  @Expose({ name: "formatted_address" })
  public formattedAddress: string;

  public geometry: Geometry;

  @Expose({ name: "place_id" })
  public placeId: string;

  @Expose({ name: "plus_code" })
  public plusCode: {};

  public types: ["locality", "political"];
}

class Geometry {
  public location: Coordinate;
  public location_type: string;
  public viewport: Viewport;
}

export class Coordinate {
  public lat: number;
  public lng: number;
}

class Viewport {
  public northeast: Coordinate;
  public southwest: Coordinate;
}

// {
//     "result": [
//         {
//             "address_components": [
//                 {
//                     "long_name": "ukmergės g.",
//                     "short_name": "ukmergės g.",
//                     "types": [
//                         "route"
//                     ]
//                 },
//                 {
//                     "long_name": "244",
//                     "short_name": "244",
//                     "types": [
//                         "street_number"
//                     ]
//                 },
//                 {
//                     "long_name": "07162",
//                     "short_name": "07162",
//                     "types": [
//                         "postcode"
//                     ]
//                 },
//                 {
//                     "long_name": "vilnius",
//                     "short_name": "vilnius",
//                     "types": [
//                         "locality"
//                     ]
//                 }
//             ],
//             "formatted_address": "Ukmergės g. 244, 07162 Vilnius",
//             "geometry": {
//                 "location": {
//                     "lat": 54.721771999999994,
//                     "lng": 25.242017999999998
//                 },
//                 "location_type": "APPROXIMATE",
//                 "viewport": {
//                     "northeast": {
//                         "lat": 54.721771999999994,
//                         "lng": 25.242017999999998
//                     },
//                     "southwest": {
//                         "lat": 54.721771999999994,
//                         "lng": 25.242017999999998
//                     }
//                 }
//             },
//             "place_id": "",
//             "plus_code": {},
//             "types": [
//                 "locality",
//                 "political"
//             ]
//         }
//     ],
//     "status": "OK"
// }

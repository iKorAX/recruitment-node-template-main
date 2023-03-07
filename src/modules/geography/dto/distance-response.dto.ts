import { Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class DistanceRowElementDetail {
  @IsString()
  public text: string;

  @IsNumber()
  public value: number;
}

export class DistanceRowElement {
  @ValidateNested()
  @Type(() => DistanceRowElementDetail)
  public distance: DistanceRowElementDetail;

  @ValidateNested()
  @Type(() => DistanceRowElementDetail)
  public duration: DistanceRowElementDetail;

  @IsString()
  public origin: string;

  @IsString()
  public destination: string;

  @IsString()
  public status: string;
}

export class DistanceRow {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DistanceRowElement)
  public elements: Array<DistanceRowElement>;
}

export class DistanceResponseDto {
  @Expose({ name: "destination_addresses" })
  @IsArray()
  @Type(() => String)
  public destinationAddresses: Array<string>;

  @Expose({ name: "origin_addresses" })
  @IsArray()
  @Type(() => String)
  public originAddresses: Array<string>;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DistanceRow)
  public rows: Array<DistanceRow>;
}

// {
//   "destination_addresses": [
//       "Verkių g., Vilnius, Lithuania"
//   ],
//   "origin_addresses": [
//       "Ukmergės g. 244, 07162 Vilnius, Lithuania"
//   ],
//   "rows": [
//       {
//           "elements": [
//               {
//                   "distance": {
//                       "text": "4.7 km",
//                       "value": 4708
//                   },
//                   "duration": {
//                       "text": "10 mins",
//                       "value": 603
//                   },
//                   "origin": "54.721771999999994,25.242017999999998",
//                   "destination": "54.7156288,25.2931425",
//                   "status": "OK"
//               }
//           ]
//       }
//   ],
//   "status": "OK"
// }

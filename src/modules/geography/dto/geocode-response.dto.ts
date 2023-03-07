import { Expose, Type } from "class-transformer";
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

export class Coordinate {
  @IsNumber()
  public lat: number;

  @IsNumber()
  public lng: number;
}

class Viewport {
  public northeast: Coordinate;
  public southwest: Coordinate;
}

export class Geometry {
  @ValidateNested()
  @Type(() => Coordinate)
  public location: Coordinate;

  @IsString()
  @Expose({ name: "location_type" })
  public locationType: string;

  @IsObject()
  public viewport: Viewport;
}

export class GeocodeResponseData {
  @Expose({ name: "address_components" })
  @Type(() => Object)
  @IsArray()
  public addressComponents: object[];

  @Expose({ name: "formatted_address" })
  @IsString()
  public formattedAddress: string;

  @ValidateNested()
  @Type(() => Geometry)
  public geometry: Geometry;

  @Expose({ name: "place_id" })
  @IsString()
  public placeId: string;

  @IsObject()
  @Expose({ name: "plus_code" })
  public plusCode: {};

  @IsArray()
  public types: ["locality", "political"];
}

export class GeocodeResponseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GeocodeResponseData)
  public result: Array<GeocodeResponseData>;

  @IsString()
  public status: string;
}

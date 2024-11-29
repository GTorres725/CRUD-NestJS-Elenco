import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Position } from 'src/enums/position.enum';

export class CreatePlayerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Type(() => Date) // Converte o value para um obj Date
  @IsNotEmpty()
  birthday: Date;

  @IsInt()
  @Min(1)
  @Max(99)
  @IsNotEmpty()
  number: number;

  @IsEmpty()
  age: string;

  @MaxLength(2)
  @IsString()
  @IsEnum(Position)
  @IsNotEmpty()
  position: string;
}

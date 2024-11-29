import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { intervalToDuration } from 'date-fns';
import { CreatePlayerDTO } from 'src/dto/create-player.dto';
import { UpdatePlayerDTO } from 'src/dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private readonly dbPrisma: PrismaService) {}

  async readAll() {
    try {
      return this.dbPrisma.player.findMany();
    } catch (_err) {
      throw new InternalServerErrorException();
    }
  }

  async readOne(id: number) {
    const player = await this.dbPrisma.player.findFirst({ where: { id } });
    if (!player) {
      throw new NotFoundException();
    }
    return player;
  }

  async create(createPlayer: CreatePlayerDTO) {
    const { number } = createPlayer;
    const validationNumber = await this.dbPrisma.player.findFirst({
      where: { number },
    });
    if (validationNumber) {
      throw new BadRequestException('This number alreadys used');
    }

    const { birthday } = createPlayer;
    const age = this.difAge(birthday);

    return this.dbPrisma.player.create({
      data: { ...createPlayer, age },
    });
  }

  async update(id: number, updatePlayer: UpdatePlayerDTO) {
    const player = await this.dbPrisma.player.findFirst({ where: { id } });
    if (player) {
      const { birthday } = updatePlayer;
      let age: string;
      if (birthday) {
        age = this.difAge(birthday);
      }
      try {
        await this.dbPrisma.player.update({
          where: { id },
          data: { ...updatePlayer, age },
        });
        return;
      } catch (_err) {
        throw new BadRequestException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  async delete(id: number) {
    const player = await this.dbPrisma.player.findFirst({ where: { id } });
    if (!player) {
      throw new NotFoundException(); //Para não parar o server caso não tenha dados
    }
    try {
      await this.dbPrisma.player.delete({
        where: { id },
      });
      return;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  difAge = (x) => {
    let { years, months, days } = intervalToDuration({
      start: x,
      end: new Date(),
    });

    let monthOrMonths = 'months';
    if (months == 1) {
      monthOrMonths = 'month';
    }

    if (months == undefined) months = 0;
    if (days == undefined) days = 0;

    let dayOrDays = 'days';
    if (days == 1) {
      dayOrDays = 'day';
    }

    return `${years} years, ${months} ${monthOrMonths}, ${days} ${dayOrDays}`;
  };
}

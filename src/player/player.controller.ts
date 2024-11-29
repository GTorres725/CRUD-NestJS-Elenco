import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDTO } from 'src/dto/create-player.dto';
import { UpdatePlayerDTO } from 'src/dto/update-player.dto';

@Controller('/players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async readAll() {
    return this.playerService.readAll();
  }

  @Get(':id')
  async readOne(@Param('id') id: number) {
    return this.playerService.readOne(id);
  }

  @Post()
  async create(@Body() createPlayer: CreatePlayerDTO) {
    return this.playerService.create(createPlayer);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePlayer: UpdatePlayerDTO) {
    return this.playerService.update(id, updatePlayer);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.playerService.delete(id);
  }
}

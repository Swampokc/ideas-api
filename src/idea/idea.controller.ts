import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './idea.dto';
import { HttpExceptionFilter } from '../shared/http-error-filter';

@Controller('idea')
@UseFilters(new HttpExceptionFilter())
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  createIdea(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() data: Partial<IdeaDTO>) {
    return this.ideaService.update(id, data);
  }

  @Delete('id')
  destroyIdea(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }
}

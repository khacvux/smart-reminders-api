import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { NotesService } from './notes.service';
import { GetUser } from '../auth/decorator';
import {
  CreateNoteDto,
  UpdateNecessityNoteDto,
  UpdateNoteDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('add')
  createNote(
    @GetUser('email') email: string,
    @Body() dto: CreateNoteDto,
  ) {
    return this.notesService.createNote(email, dto);
  }

  @Get('list/:id')
  listByIdCategory(@Param('id') idCategory: string) {
    return this.notesService.listById(idCategory);
  }

  @Get('list/all')
  listAll(@GetUser('email') email: string) {
    return this.notesService.listAll(email);
  }

  @Post('update')
  updateNote(@Body() dto: UpdateNoteDto) {
    return this.notesService.updateNote(dto);
  }

  @Post('update-necessity')
  updateNecessity(@Body() dto: UpdateNecessityNoteDto) {
    return this.notesService.updateNecessity(dto);
  }

  @Delete(':id')
  deleteNote(@Param('id') idNote: string) {
    return this.notesService.deleteNote(idNote);
  }
}
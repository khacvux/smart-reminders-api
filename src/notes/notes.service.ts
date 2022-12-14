import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import {
  CreateNoteDto,
  UpdateCategoryDto,
  UpdateNecessityNoteDto,
  UpdateNoteDto,
} from './dto';
import { QuickNoteDto } from './dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private notesRepository: NotesRepository) {}

  async listById(idCategory: string) {
    try {
      return this.notesRepository.find({ idCategory });
    } catch (error) {
      throw error;
    }
  }

  async listAll(email: string) {
    try {
      return this.notesRepository.find({ email });
    } catch (error) {
      throw error;
    }
  }

  async createNote(email: string, dto: CreateNoteDto) {
    try {
      return this.notesRepository.create({
        idCategory: dto.idCategory,
        email: email,
        idNote: uuid(),
        note: dto.note,
        date: dto.date,
        necessity: dto.necessity,
        status: dto.status,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateNote(dto: UpdateNoteDto) {
    try {
      return this.notesRepository.findOneAndUpdate(
        { idNote: dto.idNote },
        {
          note: dto.note,
          date: dto.date,
          necessity: dto.necessity,
          status: dto.status,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async updateNecessity(dto: UpdateNecessityNoteDto) {
    try {
      return this.notesRepository.findOneAndUpdate(
        { idNote: dto.idNote },
        {
          necessity: dto.necessity,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(idNote: string) {
    try {
      return this.notesRepository.findOneAndDelete({
        idNote,
      });
    } catch (error) {
      throw error;
    }
  }

  async quickNote(email: string, dto: QuickNoteDto) {
    try {
      return this.notesRepository.create({
        email: email,
        idNote: uuid(),
        note: dto.note,
        date: dto.date,
        necessity: dto.necessity,
        status: dto.status,
        idCategory: '0',
      });
    } catch (error) {
      throw error;
    }
  }

  async listQuickNote(email: string) {
    try {
      return this.notesRepository.find({
        email,
        idCategory: 0,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(dto: UpdateCategoryDto) {
    try {
      return this.notesRepository.findOneAndUpdate(
        { idNote: dto.idNote },
        {
          idCategory: dto.idCategory,
        },
      );
    } catch (error) {
      throw error;
    }
  }
}

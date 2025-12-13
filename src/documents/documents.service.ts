import { Inject, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsRepository } from './documents.repository';

@Injectable()
export class DocumentsService {
  @Inject() documentsRepository: DocumentsRepository;
  async create(createDocumentDto: CreateDocumentDto) {
    return this.documentsRepository.create(createDocumentDto);
  }

  async findAll(contractId: number) {
    return this.documentsRepository.findAll(contractId);
  }

  async findOne(id: number) {
    return this.documentsRepository.findOne(id);
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return this.documentsRepository.update(id, updateDocumentDto);
  }

  async remove(id: number) {
    return this.documentsRepository.remove(id);
  }
}

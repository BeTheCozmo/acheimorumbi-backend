import { Inject, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentsRepository } from './documents.repository';
import { PaginatedResponse } from 'src/common/interfaces/paginated-response.interface';

@Injectable()
export class DocumentsService {
  @Inject() documentsRepository: DocumentsRepository;
  async create(createDocumentDto: CreateDocumentDto) {
    return this.documentsRepository.create(createDocumentDto);
  }

  async findAll(contractId: number, filters?: Record<string, any>, limit?: number, offset?: number, page?: number): Promise<any[] | PaginatedResponse<any>> {
    const hasFilters = filters && Object.keys(filters).length > 0;
    const actualLimit = Number(limit) || 10;
    const actualOffset = page ? (Number(page) - 1) * actualLimit : (Number(offset) || 0);

    if (hasFilters || limit !== undefined || offset !== undefined || page !== undefined) {
      const { data, total } = await this.documentsRepository.findAllFiltered(contractId, filters || {}, actualLimit, actualOffset);

      return {
        data,
        total,
        limit: actualLimit,
        ...(page ? { page } : { offset: actualOffset })
      };
    }

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

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, HttpException, HttpStatus, Res, StreamableFile, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@modules/auth/auth.guard';
import { PermissionsGuard } from '@modules/permissions/permissions.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { DocumentDto } from './dto/document.dto';
import { Validator } from '@modules/permissions/permissions.decorator';
import { permissionsValidator } from '@modules/permissions/validator/permissions.validator';
import { createReadStream } from 'fs';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@ApiTags('Documents')
@Controller('contracts/:id/documents')
@UseGuards(AuthGuard, PermissionsGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
        contractId: { type: 'number' },
        names: { type: 'array', items: { type: 'string' } },
      },
      required: ['files', 'contractId'],
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, { // Limite de 10 arquivos por upload
      storage: diskStorage({
        destination: './uploads/documents',
        filename: (req, file, callback) => {
          const fileExt = extname(file.originalname);
          const fileName = file.originalname.split('.').slice(0, -1).join();
          callback(null, `${fileName}-${Date.now()}${fileExt}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/pdf|jpg|jpeg|png|json|docx/)) {
          return callback(new HttpException('Invalid file type', HttpStatus.BAD_REQUEST), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 128 * 1024 * 1024 }, // 128MB por arquivo
    }),
  )
  @ApiOperation({ summary: "Upload documents" })
  @ApiResponse({ type: DocumentDto, isArray: true })
  @Validator(permissionsValidator({contracts: "id", documents: "did"}, ["create"]))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') contractId: string,
    @Body('names') names?: string[],
  ) {
    if (!files || files.length === 0) {
      throw new Error('At least one file must be uploaded');
    }
    if (!contractId) {
      throw new Error('contractId is required');
    }

    const documents: CreateDocumentDto[] = files.map((file, index) => ({
      name: names && names[index] ? names[index] : file.originalname,
      url: file.path,
      contractId: parseInt(contractId, 10),
    }));

    const createdDocuments = await Promise.all(
      documents.map((doc) => this.documentsService.create(doc)),
    );

    return createdDocuments;
  }

  @Get()
  @ApiOperation({ summary: "Get all documents" })
  @ApiResponse({ type: DocumentDto, isArray: true })
  @Validator(permissionsValidator({contracts: "id", documents: "did"}, ["read"]))
  findAll(@Param('id') contractId: string, @Query() query: FilterQueryDto & Record<string, any>) {
    const { limit, offset, page, orderBy, order, ...filters } = query;
    return this.documentsService.findAll(+contractId, filters, limit, offset, page, orderBy, order);
  }

  @Get(':did')
  @ApiOperation({ summary: "Get document by id" })
  @ApiResponse({ type: DocumentDto })
  @Validator(permissionsValidator({contracts: "id", documents: "did"}, ["read"]))
  findOne(@Param('did') did: string) {
    return this.documentsService.findOne(+did);
  }

  @Get(':did/download')
  @ApiOperation({ summary: "Get document by id" })
  @ApiResponse({ type: DocumentDto })
  @Validator(permissionsValidator({contracts: "id", documents: "did"}, ["read"]))
  async download(@Param('did') did: string) {
    const document = await this.documentsService.findOne(+did);
    const file = createReadStream(join(process.cwd(), document.url));
    return new StreamableFile(file, {disposition: 'attachment'});
  }

  @Patch(':did')
  @ApiOperation({ summary: "Update document" })
  @ApiResponse({ type: DocumentDto })
  @Validator(permissionsValidator({contracts: "id", documents: "did"}, ["update"]))
  update(@Param('did') did: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(+did, updateDocumentDto);
  }

  @Delete(':did')
  @ApiOperation({ summary: "Delete document" })
  @ApiResponse({ type: DocumentDto })
  @Validator(permissionsValidator({contracts: "id", documents: "did"}, ["delete"]))
  remove(@Param('did') did: string) {
    return this.documentsService.remove(+did);
  }
}

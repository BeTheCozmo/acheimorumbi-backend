import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContractDocDto } from './dto/create-contract-doc.dto';


@Injectable()
export class ContractGeneratorService {
  create(createContractDocDto: CreateContractDocDto) {
    switch (createContractDocDto.contractType) {
      case "SALE":
        return this.createSaleContract(createContractDocDto);
      case "LEASE":
        return this.createLeaseContract(createContractDocDto);
      default: 
        throw new HttpException('Invalid contract type', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  private createSaleContract(createContractDocDto: CreateContractDocDto) {
    const content = fs.readFileSync(path.resolve(__dirname, 'templates', 'contrato-venda.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render(createContractDocDto);
    const buffer = doc.toBuffer();
    // Write for debug
    const filePath = path.resolve(__dirname, 'resource', 'generated', `contrato-venda-${Date.now()}.docx`);
    fs.writeFileSync(filePath, buffer);
    
    return buffer;
  }
  private createLeaseContract(createContractDocDto: CreateContractDocDto) {
    const content = fs.readFileSync(path.resolve(__dirname, 'templates', 'contrato-locacao.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.render(createContractDocDto);
    const buffer = doc.toBuffer();
    // Write for debug
    const filePath = path.resolve(__dirname, 'resource', 'generated', `contrato-locacao-${Date.now()}.docx`);
    fs.writeFileSync(filePath, buffer);
    
    return buffer;
  }  
}

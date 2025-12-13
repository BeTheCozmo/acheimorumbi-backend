import { Injectable } from '@nestjs/common';
import { CreateChecklistTitleDto } from './dto/create-checklist-title.dto';
import { UpdateChecklistTitleDto } from './dto/update-checklist-title.dto';
import { ChecklistTitlesRepository } from './checklist-titles.repository';

@Injectable()
export class ChecklistTitlesService {
  constructor(
    private readonly checklistTitlesRepository: ChecklistTitlesRepository,
  ) {}

  create(createChecklistTitleDto: CreateChecklistTitleDto) {
    return this.checklistTitlesRepository.create(createChecklistTitleDto);
  }

  async createDefaultTitles(contractId: number) {
    const titles = this.getTitlesAndItems(contractId);
    for(const title of titles) {
      const createdTitle = await this.create(title);
      console.log({createdTitle});
    }
  }

  private getTitlesAndItems(contractId: number): CreateChecklistTitleDto[] {
    return [
      {
        contractId,
        title: "Criação dos grupos Vendedores e Compradores e da pasta com o número e o nome do processo",
        items: [
          {title: "Grupo Compradores", checked: false, order: 1},
          {title: "Grupo Vendedores", checked: false, order: 2},
        ],
        order: 1
      },
      {
        contractId,
        title: "Envio link para preenchimento de informações",
        items: [
          {title: "Vendedores", checked: false, order: 1},
          {title: "Compradores", checked: false, order: 2},
          {title: "Corretores", checked: false, order: 3},
        ],
        order: 2
      },
      {
        contractId,
        title: "Solicitação dos documentos",
        instructions: "Para todas as partes",
        items: [
          {title: "Compradores", checked: false, order: 1},
          {title: "Vendedores", checked: false, order: 2},
        ],
        order: 3
      },
      {
        contractId,
        title: "Documentos Pessoais e Certidões dos Vendedores",
        instructions: "Para todas as partes",
        items: [
          {title: "RG-CPF", checked: false, order: 1, instructions: "RG-CPF de ambos"},
          {title: "Estado Civil", checked: false, order: 2, instructions: "Estado Civil de ambos"},
          {title: "Endereço", checked: false, order: 3, instructions: "Endereço de ambos"},
        ],
        order: 4
      },
      {
        contractId,
        title: "Outras Certidões",
        instructions: "Para todas as partes",
        items: [
          {title: "Débitos Mobiliários", checked: false, order: 1},
          {title: "Tributários não inscritos", checked: false, order: 2},
          {title: "Tributários Dívida Ativa", checked: false, order: 3},
          {title: "Receita Federal", checked: false, order: 4},
          {title: "Certidões Cível e Criminal do TRF", checked: false, order: 5},
          {title: "Certidões Trabalhistas", checked: false, order: 6},
          {title: "Cartórios", checked: false, order: 7},
        ],
        order: 5
      },
      {
        contractId,
        title: "Certidões Cíveis",
        instructions: "Para todas as partes",
        items: [
          {title: "Justiça Cível e Criminal - TJSP", checked: false, order: 1},
          {title: "Certidão de Execução Criminal", checked: false, order: 2},
          {title: "Certidão de Distruição Cível em Geral - SAJ SGC", checked: false, order: 3},
          {title: "Certidão de Distruição de Ações Criminais", checked: false, order: 4},
        ],
        order: 6
      },
      {
        contractId,
        title: "Documentos e Certidões do Imóvel",
        instructions: "Para todas as partes",
        items: [
          {title: "Matrícula", checked: false, order: 1},
          {title: "Certidão de dados cadastrais", checked: false, order: 2},
          {title: "Certidão Conjunta de Tributos Municipais", checked: false, order: 3},
        ],
        order: 7
      },
      {
        contractId,
        title: "Certidões Prévias",
        items: [
          {title: "Colocadas na pasta prévias", checked: false, order: 1},
          {title: "Enviadas aos Compradores via Google Drive", checked: false, order: 2},
          {title: "Enviadas aos Vendedores via Google Drive", checked: false, order: 3},
        ],
        order: 8
      },
      {
        contractId,
        title: "Contrato",
        items: [
          {title: "Preenchido", checked: false, order: 1},
          {title: "Enviado para as Partes", checked: false, order: 2},
          {title: "Compradores de acordo", checked: false, order: 3},
          {title: "Vendedores de acordo", checked: false, order: 4},
          {title: "Assinado pelos Compradores", checked: false, order: 5},
          {title: "Assinado pelos Vendedores", checked: false, order: 6},
        ],
        order: 9
      },
      {
        contractId,
        title: "Certidões",
        items: [
          {title: "Retirar certidões das prévias e colocar na PASTA CERTIDÕES", checked: false, order: 1},
          {title: "Matrícula Atualizada", checked: false, order: 2},
          {title: "Declaração - CND", checked: false, order: 3},
          {title: "Protocolo de Recebimento assinado", checked: false, order: 4},
        ],
        order: 10
      },
      {
        contractId,
        title: "Financiamento Bancário ou Escritura e Registro",
        items: [
          {title: "Envio dos documentos do Imóvel", checked: false, order: 1},
          {title: "Envio dos documentos Vendedores", checked: false, order: 2},
          {title: "Envio dos documentos dos Compradores", checked: false, order: 3},
          {title: "Vistoria realizada", checked: false, order: 4, instructions: "somente financiamento"},
          {title: "Vistoria aprovada", checked: false, order: 5, instructions: "somente financiamento"},
          {title: "Emissão do ITBI", checked: false, order: 6},
          {title: "Assinatura do contrato de financiamento ou escritura", checked: false, order: 7},
          {title: "Enviado para registro", checked: false, order: 8},
          {title: "Devolvido para o banco ", checked: false, order: 9, instructions: "somente financiamento"},
        ],
        order: 11
      },
      {
        contractId,
        title: "Finalização",
        items: [
          {title: "Envio da matrícula para o condomínio", checked: false, order: 1},
          {title: "Entrega das chaves e assinatura do termo", checked: false, order: 2},
          {title: "Troca de titularidade", checked: false, order: 3},
        ],
        order: 12
      },
    ]
  }

  findAll() {
    return this.checklistTitlesRepository.findAll();
  }

  findOne(id: number) {
    return this.checklistTitlesRepository.findOne(id);
  }

  update(id: number, updateChecklistTitleDto: UpdateChecklistTitleDto) {
    return this.checklistTitlesRepository.update(id, updateChecklistTitleDto);
  }

  remove(id: number) {
    return this.checklistTitlesRepository.remove(id);
  }
}

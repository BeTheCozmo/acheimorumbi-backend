import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressionParser from 'docxtemplater/expressions';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContractDocDto } from './dto/create-contract-doc.dto';

@Injectable()
export class ContractGeneratorService {
  private parser: any;
  constructor() {
    this.parser = expressionParser.configure({
      filters: {
        toTitleCase(input) {
          if (!input) return input;
          return input.toLowerCase().replace(/(?:^|\s)\S/g, char => char.toUpperCase());
        },
        toUpperCase(input: string) {
          if (!input) return input;
          return input.toUpperCase();
        },
        toLowerCase(input) {
          if (!input) return input;
          return input.toLowerCase();
        },
        toReal(input: number) {
          if (!input) return input;
          const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          return formatter.format(input);
        },
        numberExtended(numero) {
          // Converte para string e remove espaços
          const num = String(numero).trim();

          // Valida se é um número válido
          if (!/^\d+$/.test(num) || num.length > 14) {
            return 'Número inválido';
          }

          // Caso especial: zero
          if (num === '0' || parseInt(num) === 0) {
            return 'zero';
          }

          // Unidades de 0 a 19
          const unidades = [
            '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
            'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis',
            'dezessete', 'dezoito', 'dezenove'
          ];

          // Dezenas de 20 a 90
          const dezenas = [
            '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta',
            'sessenta', 'setenta', 'oitenta', 'noventa'
          ];

          // Centenas de 100 a 900
          const centenas = [
            '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos',
            'seiscentos', 'setecentos', 'oitocentos', 'novecentos'
          ];

          // Função para converter um grupo de até 3 dígitos
          function converterGrupo(grupo) {
            const n = parseInt(grupo);
            if (n === 0) return '';
            if (n === 100) return 'cem';

            let resultado = [];

            // Centena
            const c = Math.floor(n / 100);
            if (c > 0) {
              resultado.push(centenas[c]);
            }

            // Dezena e unidade
            const du = n % 100;
            if (du > 0) {
              if (du < 20) {
                resultado.push(unidades[du]);
              } else {
                const d = Math.floor(du / 10);
                const u = du % 10;
                if (u > 0) {
                  resultado.push(dezenas[d] + ' e ' + unidades[u]);
                } else {
                  resultado.push(dezenas[d]);
                }
              }
            }

            return resultado.join(' e ');
          }

          // Divide o número em grupos de 3 dígitos (da direita para esquerda)
          const grupos = [];
          let temp = num;
          while (temp.length > 0) {
            const grupo = temp.slice(-3);
            grupos.unshift(grupo);
            temp = temp.slice(0, -3);
          }

          // Nomes das classes (unidade, milhar, milhão, etc)
          const classes = ['', 'mil', 'milhão', 'bilhão', 'trilhão'];
          const classesPlural = ['', 'mil', 'milhões', 'bilhões', 'trilhões'];

          const partes = [];
          const tamanho = grupos.length;

          for (let i = 0; i < tamanho; i++) {
            const grupo = grupos[i];
            const valorGrupo = parseInt(grupo);
            const indiceClasse = tamanho - i - 1;

            if (valorGrupo === 0) continue;

            let texto = converterGrupo(grupo);

            // Adiciona o nome da classe (mil, milhão, etc)
            if (indiceClasse > 0) {
              const nomeClasse = valorGrupo > 1 ? classesPlural[indiceClasse] : classes[indiceClasse];
              texto += ' ' + nomeClasse;
            }

            partes.push(texto);
          }

          // Junta as partes com "e" ou sem "e" conforme as regras
          let resultado = '';
          for (let i = 0; i < partes.length; i++) {
            if (i === 0) {
              resultado = partes[i];
            } else {
              // Usa "e" se o último grupo for menor que 100
              const ultimoGrupo = parseInt(grupos[grupos.length - 1]);
              const penultimoGrupo = grupos.length > 1 ? parseInt(grupos[grupos.length - 2]) : 0;

              if (i === partes.length - 1 && ultimoGrupo < 100 && penultimoGrupo > 0) {
                resultado += ' e ' + partes[i];
              } else {
                resultado += ' ' + partes[i];
              }
            }
          }

          return resultado.trim();
        },
        toReference(input) {
          if (!input) return input;
          if (input == "a") return "à";
          if (input == "as") return "às";
          if (input == "o") return "ao";
          if (input == "os") return "aos";
          return input;
        }
      }
    })
  }
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
    const content = fs.readFileSync(path.resolve('resources', 'contrato-venda.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, parser: this.parser });

    doc.render(createContractDocDto);
    const buffer = doc.toBuffer();
    // Write for debug
    const filePath = path.resolve('resources', 'generated', `contrato-venda-${Date.now()}.docx`);
    fs.writeFileSync(filePath, buffer);

    return buffer;
  }
  private createLeaseContract(createContractDocDto: CreateContractDocDto) {
    const content = fs.readFileSync(path.resolve('resources', 'contrato-locacao.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true, parser: this.parser });

    doc.render(createContractDocDto);
    const buffer = doc.toBuffer();
    // Write for debug
    const filePath = path.resolve('resources', 'generated', `contrato-locacao-${Date.now()}.docx`);
    fs.writeFileSync(filePath, buffer);

    return buffer;
  }
}

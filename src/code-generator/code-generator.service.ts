import { Injectable } from "@nestjs/common";

@Injectable()
export class CodeGeneratorService {
  generateRandomString(length: number, prefix: string = '', sufix: string = ''): string {
    if (length < 0) throw new Error('Length must be a non-negative number');

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPart += characters[randomIndex];
    }

    return prefix + randomPart + sufix;
  }
}
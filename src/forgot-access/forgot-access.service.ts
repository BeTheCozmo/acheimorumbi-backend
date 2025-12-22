import { Injectable } from '@nestjs/common';
import { CreateForgotAccessDto } from './dto/create-forgot-access.dto';
import { UpdateForgotAccessDto } from './dto/update-forgot-access.dto';
import { CreateForgotAccessRequestDto } from './dto/create-forgot-acess-request.dto';
import { ForgotAccessRepository } from './forgot-access.repository';

@Injectable()
export class ForgotAccessService {
  constructor(
    private readonly forgotAccessRepository: ForgotAccessRepository,
  ) {}
  async makeRequest({userId, code, expiresAt}: CreateForgotAccessRequestDto) {
    return this.forgotAccessRepository.makeRequest({userId, code, expiresAt});
  }

  findOne(code: string) {
    return this.forgotAccessRepository.findOne(code);
  }

  async verifyCode(code: string): Promise<boolean> {
    const verifiedCode = await this.forgotAccessRepository.findOne(code);
    if (!verifiedCode) return false;
    return !verifiedCode.used;
  }

  setUsed(code: string) {
    return this.forgotAccessRepository.setUsed(code);
  }
}

export class CreateForgotAccessRequestDto {
  userId: number;
  code: string;
  expiresAt: Date;
}

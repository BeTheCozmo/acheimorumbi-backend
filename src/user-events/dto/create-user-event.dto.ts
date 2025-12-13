export class CreateUserEventDto {
  userId: number;
  action: string;
  params: string;
  body: string;
  ip: string;
  userAgent: string;
  url: string;
}

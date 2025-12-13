export class CreateContractDocDto {
  contractType: "SALE" | "LEASE";
  property: {[key: string]: any}
  acquirers: {[key: string]: any}[];
  owners: {[key: string]: any}[];
  ctx: {[key: string]: any};
}
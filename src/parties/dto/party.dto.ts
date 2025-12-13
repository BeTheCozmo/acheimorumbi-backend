
import { PartyInfo } from "./party-info.dto";
import { PartyType } from "./party-type.dto";

export class PartyDto {
  id: number;
  code: string;
  type: PartyType;
  data: PartyInfo;

  contractId: number;

  createdAt?: Date;
  updatedAt?: Date;
}

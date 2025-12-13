import { Injectable } from "@nestjs/common";

@Injectable()
export class ContractContextService {
  constructor(

  ) {}

  generateAdditionalContext({
    acquirers,
    owners,
    property,
    contract
  }: {property: {[key: string]: any}, acquirers: {[key: string]: any}[], owners: {[key: string]: any}[], contract: {[key: string]: any}}) {
    let ctx = {} as {[key: string]: any};
    this.buildPromisingAcquirersAndOwners(ctx, acquirers, owners, contract);
    this.buildCivilState(ctx, acquirers, owners);
    return ctx;
  }

  private buildPromisingAcquirersAndOwners(ctx: {[key: string]: any}, acquirers: {[key: string]: any}[], owners: {[key: string]: any}[], contract: {[key: string]: any}) {
    const moreThanOneAcquirer = acquirers.length > 1;
    const moreThanOneOwner = owners.length > 1;

    if (contract.type.toUpperCase() == "SALE") {
      if (!moreThanOneAcquirer) {
        ctx.promissoriosAdquirentes = acquirers[0].sexo == "Masculino" ? "PROMISSÓRIO COMPRADOR" : "PROMISSÓRIA COMPRADORA"
      } else ctx.promissoriosAdquirentes = "PROMISSÓRIOS COMPRADORES";

      if (!moreThanOneOwner) {
        ctx.promitentesDonos = owners[0].sexo == "Masculino" ? "PROMITENTE VENDEDOR" : "PROMITENTE VENDEDORA"
      } else ctx.promitentesDonos = "PROMITENTES VENDEDORES";
    }

    if (contract.type.toUpperCase() == "LEASE") {
      if (!moreThanOneAcquirer) {
        ctx.promissariosAdquirentes = acquirers[0].sexo == "Masculino" ? "PROMISSÁRIO LOCATÁRIO" : "PROMISSÁRIA LOCATÁRIA"
      } else ctx.promissariosAdquirentes = "PROMISSÁRIOS LOCATÁRIOS";

      if (!moreThanOneOwner) {
        ctx.promitentesDonos = owners[0].sexo == "Masculino" ? "PROMITENTE LOCADOR" : "PROMITENTE LOCADORA"
      } else ctx.promitentesDonos = "PROMITENTES LOCADORES";
    }
  }
}

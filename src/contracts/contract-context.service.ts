import { Injectable } from "@nestjs/common";
import { PaymentInstallmentsType } from "./dto/payment-installments.dto";

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
    ctx = this.buildPromisingAcquirersAndOwners(ctx, acquirers, owners, contract);
    ctx = this.buildAcquirersAndOwnersPlural(ctx, acquirers, owners, contract);
    ctx = this.buildCivilState(ctx, acquirers, owners);
    ctx = this.buildAcquirersAndOwnersQuantityIndicator(ctx, acquirers, owners);
    ctx = this.buildPropertyPaidOffConditions(ctx, property);
    ctx = this.buildAcquirersWillFinance(ctx, acquirers);
    ctx = this.buildInstallments(ctx, contract);
    ctx = this.buildDifferenceInMonthsOfLease(ctx, contract);

    console.log({ctx})
    return ctx;
  }

  private buildPromisingAcquirersAndOwners(ctx: {[key: string]: any}, acquirers: {[key: string]: any}[], owners: {[key: string]: any}[], contract: {[key: string]: any}) {
    const moreThanOneAcquirer = acquirers.length > 1;
    const moreThanOneOwner = owners.length > 1;

    if (contract.type.toUpperCase() == "SALE") {
      if (!moreThanOneAcquirer) {
        ctx.promissoriosAdquirentes = acquirers[0].sexo == "Masculino" ? "PROMISSÁRIO COMPRADOR" : "PROMISSÓRIA COMPRADORA"
      } else ctx.promissoriosAdquirentes = "PROMISSÁRIOS COMPRADORES";

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
    return ctx;
  }

  private buildAcquirersAndOwnersPlural(ctx: {[key: string]: any}, acquirers: {[key: string]: any}[], owners: {[key: string]: any}[], contract: {[key: string]: any}) {
    const moreThanOneAcquirer = acquirers.length > 1;
    const moreThanOneOwner = owners.length > 1;

    if (contract.type == "SALE") {
      if (!moreThanOneAcquirer) {
        ctx.adquirentesNumeroGramatical = acquirers[0].sexo == "Masculino" ? "COMPRADOR" : "COMPRADORA"
      } else ctx.adquirentesNumeroGramatical = "COMPRADORES";

      if (!moreThanOneOwner) {
        ctx.donosNumeroGramatical = owners[0].sexo == "Masculino" ? "VENDEDOR" : "VENDEDORA"
      } else ctx.donosNumeroGramatical = "VENDEDORES";
    }

    if (contract.type.toUpperCase() == "LEASE") {
      if (!moreThanOneAcquirer) {
        ctx.adquirentesNumeroGramatical = acquirers[0].sexo == "Masculino" ? "LOCATÁRIO" : "LOCATÁRIA"
      } else ctx.adquirentesNumeroGramatical = "PROMISSÁRIOS LOCATÁRIOS";

      if (!moreThanOneOwner) {
        ctx.donosNumeroGramatical = owners[0].sexo == "Masculino" ? "LOCADOR" : "LOCADORA"
      } else ctx.donosNumeroGramatical = "LOCADORES";
    }
    return ctx;
  }

  private buildAcquirersAndOwnersQuantityIndicator(ctx: {[key: string]: any}, acquirers: {[key: string]: any}[], owners: {[key: string]: any}[]) {
    ctx.adquirentesIndicadorQuantidade = this.getQuantityIndicator(acquirers);
    ctx.donosIndicadorQuantidade = this.getQuantityIndicator(owners);
    return ctx;
  }

  private getQuantityIndicator(objs: {[key: string]: any}[]): "Os" | "As" | "O" | "A" | "" {
    if (objs?.length == 0) return "";
    if(objs.length == 1) {
      if(objs[0]?.sexo.toUpperCase() == "FEMININO") return "A";
      if(objs[0]?.sexo.toUpperCase() == "MASCULINO") return "O";
    }
    if (objs.every(obj => obj?.sexo.toUpperCase() == "FEMININO")) return "As";
    if (objs.some(obj => obj?.sexo.toUpperCase() == "MASCULINO")) return "Os";
    return "";
  }

  private buildCivilState(ctx: {[key: string]: any}, acquirers: {[key: string]: any}[], owners: {[key: string]: any}[]) {
    return ctx;
  }

  private buildPropertyPaidOffConditions(
    ctx: {[key: string]: any},
    property: {[key: string]: any}
  ) {
    ctx = ctx as {donosIndicadorQuantidade: "Os" | "As" | "O" | "A" | ""} & {[key: string]: any};
    switch (ctx.donosIndicadorQuantidade) {
      case "Os":
        if(property?.status == "PAID_OFF") ctx.donosGrauPosse = "são legítimos possuidores e proprietários";
        else ctx.donosGrauPosse = "são legítimos possuidores";
        break;
      case "O":
        if(property?.status == "PAID_OFF") ctx.donosGrauPosse = "é legítimo possuidor e proprietário";
        else ctx.donosGrauPosse = "é legítimo possuidor";
        break;
      case "As":
        if(property?.status == "PAID_OFF") ctx.donosGrauPosse = "são legítimas possuidoras e proprietárias";
        else ctx.donosGrauPosse = "são legítimas possuidoras";
        break;
      case "A":
        if(property?.status == "PAID_OFF") ctx.donosGrauPosse = "é legítima possuidora e proprietária";
        else ctx.donosGrauPosse = "é legítima possuidora";
        break;
      case "":
        ctx.donosGrauPosse = "";
        break;
      default: break;
    }
    return ctx;
  }

  private buildAcquirersWillFinance(ctx: {[key: string]: any}, acquirers: {[key: string]: any}[]) {
    ctx.adquirentesVaoFinanciar = acquirers.some(acquirer => acquirer?.vaiFinanciar);
    return ctx;
  }

  private buildInstallments(ctx: {[key: string]: any}, contract: {[key: string]: any}) {
    if (!contract?.paymentInstallments) return ctx;

    console.log({paymentInstallments: contract.paymentInstallments})

    const parcelaSinal = contract.paymentInstallments.filter(installment => installment.type == PaymentInstallmentsType.SIGNAL) || undefined;
    if(parcelaSinal) ctx.parcelaSinal = parcelaSinal[0];

    const parcelaDocumentacao = contract.paymentInstallments.filter(installment => installment.type == PaymentInstallmentsType.DOCUMENTATION) || undefined;
    if(parcelaDocumentacao) ctx.parcelaDocumentacao = parcelaDocumentacao[0];
    
    const parcelaAssinatura = contract.paymentInstallments.filter(installment => installment.type == PaymentInstallmentsType.SIGNATURE) || undefined;
    if(parcelaAssinatura) ctx.parcelaAssinatura = parcelaAssinatura[0];
    
    const parcelaFgts = contract.paymentInstallments.filter(installment => installment.type == PaymentInstallmentsType.FGTS) || undefined;
    if(parcelaFgts) ctx.parcelaFgts = parcelaFgts[0];
    
    const parcelaFinanciamento = contract.paymentInstallments.filter(installment => installment.type == PaymentInstallmentsType.FINANCEMENT) || undefined;
    if(parcelaFinanciamento) ctx.parcelaFinanciamento = parcelaFinanciamento[0];
    
    const parcelaComissao = contract.paymentInstallments.filter(installment => installment.type == PaymentInstallmentsType.COMISSION) || undefined;
    if(parcelaComissao) ctx.parcelaComissao = parcelaComissao[0];
    
    return ctx;
  }

  private buildDifferenceInMonthsOfLease(ctx: {[key: string]: any}, contract: {[key: string]: any}) {
    if (!((contract?.type == "LEASE") && contract?.leaseStartDate && contract?.leaseEndDate)) return ctx;

    const diffInMs = contract.leaseEndDate.getTime() - contract.leaseStartDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    ctx.differenceInMonthsOfLease = diffInDays / 30;

    return ctx;
  }
}

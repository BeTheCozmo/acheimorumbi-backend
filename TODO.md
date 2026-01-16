# Campos que precisam ser arrumados no Contrato de Vendas

## Parágrafo primeiro
- [ ] acquiredDate: mudar formato para formato padrão brasileiro. Atualmente está Thu Oct 14 2021 21:00:00 GMT-0300 (Horário Padrão de Brasília).

## Parágrafo terceiro
- [ ] statusDate: mesmo problema do anterior, formato de data ruim.

## III - DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO

### a) parcela sinal
- [ ] Arrumar chave pix e tipo de chave (talvez precise criar funcionalidade de adicionar o nome da pessoa que receberá o pagamento e os dados bancários)
- [ ] Paga para a conta registrada do proprietário no contrato.

### b) parcela financiamento
- [ ] Arrumar o valor do financiamento, aparece vazio e errado.
- [ ] Mesma ideia da anterior, arrumar os dados de pix e bancários, necessitando.
- [ ] Precisa realmente da chave pix e dos dados bancários, também em nome de qual pessoa está sendo feita. Parece que o pagamento é feito direto para a conta do proprietário/conta principal de recebimento dos pagamentos.

### c) se não houver parcela de financiamento
- [ ] Mesmo princípio das anteriores, chave pix, dados bancários e nome.
- [ ] Considerar que o valor do pagamento "à vista" será subtraído deste valor.

### d) pagamento à vista
- [ ] Arrumar dados bancários e informações de depósito, mesma coisa.

### e) se comissão é paga pelos compradores
- [ ] Criar regra para aparecer apenas se são os compradores quem pagam.
- [ ] Arrumar o campo monetário

### f) parcela FGTS
- [ ] Aparecer apenas se for usar FGTS;
- [ ] Se for o caso, corrigir o campo monetário.

### g) se o imóvel será financiado
- [ ] Aparecer apenas se for usado financiamento bancário;
- [ ] Se for o caso, corrigir campo monetário e de apresentação da instituição bancária
- [ ] Parece haver diferenciação quando o imóvel é apartamento. Criar uma forma de apresentar apenas se o imóvel for apartamento (como é apresentado no texto "PARA APARTAMENTO COM USO DE FINANCIAMENTO").

## X - DA INTERMEDIAÇÃO
- [ ] Garantir que os campos bancários estejam corretos, tanto em comissão para os compradores quanto vendedores.
- [ ] a) Corrigir o valor de depósito entre parênteses;
- [ ] b) Alinhar com o Luiz o que é para ser exatamente esta linha que parece repetida mas deve possuir propósito diferente de pagamento;
- [ ] c) inserir corretamente os dados do corretor, banco, cpf e etc.
	- [ ] Parece que precisarei criar o campo CPF em Pessoas.
- [ ] d) inserir corretamente também para o segundo corretor
	- [ ] Alinhar com o Luiz se é preciso adicionar um segundo corretor, se sim preciso mudar a regra de negócios.

## XII - DA NOTIFICAÇÃO
- [ ] Fazer o carregamento correto do array de proprietários e adquirentes;

## XIV - DO FORO
- [ ] Fazer a tabela aparecer corretamente com os dados dos proprietários, adquirentes e testemunhas (que assinarão o contrato).
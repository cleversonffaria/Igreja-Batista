import { Injectable } from '@nestjs/common';

@Injectable()
export class VerifyDocument {
  isCPFOrCNPJ(value: string) {
    // value = value.toString()
    value = value.replace(/\D/g, '');
    if (value.length === 11) return 'CPF';
    if (value.length === 14) return 'CNPJ';
    return false;
  }

  calculatePositionDigits(digits: any, positions = 10, digitsSum = 0) {
    digits = digits.toString();
    for (let i = 0; i < digits.length; i++) {
      digitsSum += digits[i] * positions;
      positions--;
      if (positions < 2) {
        positions = 9;
      }
    }
    digitsSum %= 11;
    if (digitsSum < 2) {
      digitsSum = 0;
    } else {
      digitsSum = 11 - digitsSum;
    }
    const cpf = digitsSum + digitsSum;
    return cpf;
  }

  validCpf(cpf: string) {
    cpf = cpf.replace(/[^0-9]/g, '');
    if (cpf.split('').every((char) => char === cpf[0])) return false;
    let sum;
    let remainder;
    sum = 0;
    if (cpf == '00000000000') return false;

    for (let i = 1; i <= 9; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder == 10 || remainder == 11) remainder = 0;
    if (remainder != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  validCnpj(cnpj: string) {
    cnpj = cnpj.toString();
    cnpj = cnpj.replace(/[^0-9]/g, '');

    if (cnpj == '') return false;
    if (cnpj.length != 14) return false;
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += +numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== +digits.charAt(0)) return false;

    size += 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += +numbers.charAt(size - i) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== +digits.charAt(1)) return false;

    return true;
  }

  isValidCPFOrCNPJ(value: any) {
    const document = this.isCPFOrCNPJ(value);
    value = value.toString();
    value = value.replace(/[^0-9]/g, '');

    if (document === 'CPF') {
      return this.validCpf(value);
    }
    if (document === 'CNPJ') {
      return this.validCnpj(value);
    }
    return false;
  }
}

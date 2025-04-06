import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalaryCalculatorService {
  private smlv2025 = 1423500;
  private auxilioTransporte2025 = 200000;
  private porcentajeSaludEmpleado = 0.04;
  private porcentajePensionEmpleado = 0.04;
  private porcentajeSaludIndependiente = 0.125;
  private porcentajePensionIndependiente = 0.16;
  private factorFondoSolidaridad = 4; // Se descuenta a partir de 4 SMMLV

  calcularSalarioNeto(
    tipoContrato: string,
    salarioBruto: number
  ): number {
    let salarioNeto = salarioBruto;
    const deducciones = this.calcularDeducciones(salarioBruto, tipoContrato);
    salarioNeto -= deducciones.salud;
    salarioNeto -= deducciones.pension;
    salarioNeto -= deducciones.fondoSolidaridad;
    return salarioNeto;
  }

  calcularDeducciones(salarioBruto: number, tipoContrato: string): { salud: number, pension: number, fondoSolidaridad: number } {
    const deducciones = { salud: 0, pension: 0, fondoSolidaridad: 0 };
    const smlvCuatroVeces = this.smlv2025 * this.factorFondoSolidaridad;

    if (tipoContrato === 'indefinido' || tipoContrato === 'termino-fijo' || tipoContrato === 'obra-labor') {
      deducciones.salud = salarioBruto * this.porcentajeSaludEmpleado;
      deducciones.pension = salarioBruto * this.porcentajePensionEmpleado;
      if (salarioBruto >= smlvCuatroVeces) {
        deducciones.fondoSolidaridad = this.calcularFondoSolidaridad(salarioBruto);
      }
    } else if (tipoContrato === 'prestacion-servicios') {
      // La base de cotización para independientes es el 40% del ingreso mensual,
      // pero los porcentajes de descuento se aplican sobre el ingreso bruto para simplificar.
      // En un escenario real, se debe calcular el IBC.
      deducciones.salud = salarioBruto * this.porcentajeSaludIndependiente;
      deducciones.pension = salarioBruto * this.porcentajePensionIndependiente;
      if (salarioBruto >= smlvCuatroVeces) {
        deducciones.fondoSolidaridad = this.calcularFondoSolidaridad(salarioBruto);
      }
    }
    return deducciones;
  }

  calcularFondoSolidaridad(salarioBruto: number): number {
    const smlv = this.smlv2025;
    if (salarioBruto >= 4 * smlv && salarioBruto < 16 * smlv) {
      return salarioBruto * 0.01;
    } else if (salarioBruto >= 16 * smlv && salarioBruto < 17 * smlv) {
      return salarioBruto * 0.012;
    } else if (salarioBruto >= 17 * smlv && salarioBruto < 18 * smlv) {
      return salarioBruto * 0.014;
    } else if (salarioBruto >= 18 * smlv && salarioBruto < 19 * smlv) {
      return salarioBruto * 0.016;
    } else if (salarioBruto >= 19 * smlv && salarioBruto < 20 * smlv) {
      return salarioBruto * 0.018;
    } else if (salarioBruto >= 20 * smlv) {
      return salarioBruto * 0.02;
    }
    return 0;
  }

  calcularImpuestos(salarioNeto: number, tipoContrato: string): number {
    if (tipoContrato === 'prestacion-servicios') {
      if (salarioNeto > 3500000) {
        return salarioNeto * 0.11;
      }
    } else {
      if (salarioNeto > 3000000) {
        return salarioNeto * 0.10;
      }
    }
    return 0;
  }

  calcularSalarioNetoConAuxilioTransporte(salarioBruto: number, salarioNetoSinAuxilio: number, tipoContrato: string): number {
    if ((tipoContrato === 'indefinido' || tipoContrato === 'termino-fijo' || tipoContrato === 'obra-labor') && salarioBruto <= 2 * this.smlv2025) {
      return salarioNetoSinAuxilio + this.auxilioTransporte2025;
    }
    return salarioNetoSinAuxilio;
  }

  obtenerSMLV2025(): number {
    return this.smlv2025;
  }

  obtenerAuxilioTransporte2025(): number {
    return this.auxilioTransporte2025;
  }

  aplicaFondoSolidaridad(salarioBruto: number): boolean {
    return salarioBruto >= this.smlv2025 * this.factorFondoSolidaridad;
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalaryCalculatorService {
  private smlv2025 = 1423500; // Valor actualizado para 2025
  private auxilioTransporte2025 = 200000; // Valor actualizado para 2025

  calcularSalarioNeto(
    tipoContrato: string,
    salarioBruto: number,
    pagarSalud: boolean,
    pagarPension: boolean,
    pagarFondoSolidaridad: boolean
  ): number {
    let salarioNeto = salarioBruto;

    if (tipoContrato !== 'prestacion-servicios') {
      if (pagarSalud) {
        salarioNeto -= salarioBruto * 0.04; // 4% para el empleado
      }
      if (pagarPension) {
        salarioNeto -= salarioBruto * 0.04; // 4% para el empleado
      }
      if (pagarFondoSolidaridad && salarioBruto >= 4 * this.smlv2025) {
        const exceso = salarioBruto - 4 * this.smlv2025;
        salarioNeto -= exceso * 0.01; // Ejemplo de tarifa (varía)
      }
    }
    // Para prestación de servicios, el neto es generalmente el bruto (sin deducciones obligatorias por nómina)
    return salarioNeto;
  }

  calcularDeducciones(salarioBruto: number, pagarSalud: boolean, pagarPension: boolean, pagarFondoSolidaridad: boolean, tipoContrato: string): { salud: number, pension: number, fondoSolidaridad: number } {
    const deducciones = { salud: 0, pension: 0, fondoSolidaridad: 0 };
    if (tipoContrato !== 'prestacion-servicios') {
      if (pagarSalud) {
        deducciones.salud = salarioBruto * 0.04;
      }
      if (pagarPension) {
        deducciones.pension = salarioBruto * 0.04;
      }
      if (pagarFondoSolidaridad && salarioBruto >= 4 * this.smlv2025) {
        const exceso = salarioBruto - 4 * this.smlv2025;
        deducciones.fondoSolidaridad = exceso * 0.01;
      }
    }
    return deducciones;
  }

  calcularImpuestos(salarioNeto: number, tipoContrato: string): number {
    // El cálculo de impuestos para prestación de servicios puede ser diferente (retención en la fuente por honorarios).
    // Este es un ejemplo MUY SIMPLIFICADO y general.
    if (tipoContrato === 'prestacion-servicios') {
      if (salarioNeto > 3500000) {
        return salarioNeto * 0.11; // Ejemplo de retención del 11% (varía)
      }
    } else {
      if (salarioNeto > 3000000) {
        return salarioNeto * 0.10; // Ejemplo de tarifa del 10% para contratos laborales
      }
    }
    return 0;
  }

  calcularSalarioNetoConAuxilioTransporte(salarioBruto: number, salarioNetoSinAuxilio: number, tipoContrato: string): number {
    if (tipoContrato !== 'prestacion-servicios' && salarioBruto <= 2 * this.smlv2025) {
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
}
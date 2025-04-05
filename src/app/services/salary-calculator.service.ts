import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SalaryCalculatorService {
  private smlv2025 = 1423500; // Suponiendo un valor para 2025 (debes actualizarlo)
  private auxilioTransporte2025 = 200000; // Suponiendo un valor para 2025 (debes actualizarlo)

  calcularSalarioNeto(
    tipoContrato: string,
    salarioBruto: number,
    pagarSalud: boolean,
    pagarPension: boolean,
    pagarFondoSolidaridad: boolean
  ): number {
    let salarioNeto = salarioBruto;

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

    return salarioNeto;
  }

  calcularDeducciones(salarioBruto: number, pagarSalud: boolean, pagarPension: boolean, pagarFondoSolidaridad: boolean): { salud: number, pension: number, fondoSolidaridad: number } {
    const deducciones = { salud: 0, pension: 0, fondoSolidaridad: 0 };
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
    return deducciones;
  }

  calcularImpuestos(salarioNeto: number): number {
    // Este es un ejemplo MUY SIMPLIFICADO. El cálculo real de impuestos en Colombia es complejo y depende de muchos factores.
    if (salarioNeto > 3000000) {
      return salarioNeto * 0.10; // Ejemplo de tarifa del 10%
    }
    return 0;
  }

  obtenerSMLV2025(): number {
    return this.smlv2025;
  }

  obtenerAuxilioTransporte2025(): number {
    return this.auxilioTransporte2025;
  }
}
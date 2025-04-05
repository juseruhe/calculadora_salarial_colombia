import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryCalculatorService {
  private smlv2025: number = 1423500; // Valor hipotético del SMLV 2025
  private transportSubsidy: number = 200000; // Auxilio de transporte 2025 (ejemplo)
  
  calculateNetSalary(baseSalary: number, contractType: string, hasTransport: boolean, extras: any): any {
    let healthDiscount: number = 0;
    let pensionDiscount: number = 0;
    let taxDiscount: number = 0;
    let totalDiscounts: number = 0;
    let totalSubsidies: number = 0;
    
    // Cálculo de descuentos según tipo de contrato
    switch(contractType) {
      case 'fixed-term':
      case 'indefinite':
        // Descuentos para empleados con contrato laboral
        healthDiscount = baseSalary * 0.04;
        pensionDiscount = baseSalary * 0.04;
        break;
      case 'service':
        // Descuentos para contratista por prestación de servicios
        healthDiscount = baseSalary * 0.125;
        pensionDiscount = baseSalary * 0.16;
        break;
      // Otros tipos de contrato...
    }
    
    // Subsidio de transporte
    if(hasTransport && baseSalary <= this.smlv2025 * 2) {
      totalSubsidies += this.transportSubsidy;
    }
    
    // Retención en la fuente (simplificado)
    if(baseSalary > this.smlv2025 * 4) {
      taxDiscount = baseSalary * 0.1; // 10% como ejemplo
    }
    
    totalDiscounts = healthDiscount + pensionDiscount + taxDiscount;
    
    return {
      baseSalary,
      contractType,
      healthDiscount,
      pensionDiscount,
      taxDiscount,
      totalDiscounts,
      transportSubsidy: hasTransport ? this.transportSubsidy : 0,
      otherSubsidies: extras.subsidies || 0,
      totalSubsidies: totalSubsidies + (extras.subsidies || 0),
      netSalary: baseSalary + totalSubsidies - totalDiscounts
    };
  }
  
  getSmlv2025(): number {
    return this.smlv2025;
  }
}
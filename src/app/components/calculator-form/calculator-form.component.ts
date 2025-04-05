import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalaryCalculatorService } from '../../services/salary-calculator.service';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.scss'],
  standalone: false
})
export class CalculatorFormComponent implements OnInit {
  calculatorForm: FormGroup;
  smlv2025: number;
  auxilioTransporte2025: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salaryCalculator: SalaryCalculatorService
  ) {
    this.smlv2025 = this.salaryCalculator.obtenerSMLV2025();
    this.auxilioTransporte2025 = this.salaryCalculator.obtenerAuxilioTransporte2025();
    
    this.calculatorForm = this.fb.group({
      tipoContrato: ['indefinido', Validators.required],
      salarioBruto: [
        this.smlv2025, 
        [Validators.required, Validators.min(this.smlv2025)]
      ],
      pagarSalud: [true],
      pagarPension: [true],
      pagarFondoSolidaridad: [false],
      calcularImpuestos: [false],
      incluirAuxilioTransporte: [true]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.calculatorForm.valid) {
      const formData = this.calculatorForm.value;
      
      // Calcular salario neto sin auxilio de transporte
      const salarioNetoSinAuxilio = this.salaryCalculator.calcularSalarioNeto(
        formData.tipoContrato,
        formData.salarioBruto,
        formData.pagarSalud,
        formData.pagarPension,
        formData.pagarFondoSolidaridad
      );

      // Calcular deducciones detalladas
      const deducciones = this.salaryCalculator.calcularDeducciones(
        formData.salarioBruto,
        formData.pagarSalud,
        formData.pagarPension,
        formData.pagarFondoSolidaridad,
        formData.tipoContrato
      );

      // Calcular impuestos si corresponde
      const impuestos = formData.calcularImpuestos
        ? this.salaryCalculator.calcularImpuestos(salarioNetoSinAuxilio, formData.tipoContrato)
        : 0;

      // Calcular salario neto final (con auxilio de transporte si aplica)
      const salarioNetoFinal = formData.incluirAuxilioTransporte
        ? this.salaryCalculator.calcularSalarioNetoConAuxilioTransporte(
            formData.salarioBruto,
            salarioNetoSinAuxilio - impuestos,
            formData.tipoContrato
          )
        : salarioNetoSinAuxilio - impuestos;

      // Navegar a la página de resultados con toda la información
      this.router.navigate(['/resultados'], {
        state: {
          salarioBruto: formData.salarioBruto,
          tipoContrato: formData.tipoContrato,
          salarioNeto: salarioNetoFinal,
          deducciones: deducciones,
          impuestos: impuestos,
          smlv: this.smlv2025,
          auxilioTransporte: formData.incluirAuxilioTransporte && 
                            formData.tipoContrato !== 'prestacion-servicios' && 
                            formData.salarioBruto <= 2 * this.smlv2025 
                            ? this.auxilioTransporte2025 
                            : 0,
          detallesCalculo: {
            salarioNetoSinAuxilio: salarioNetoSinAuxilio,
            salarioNetoAntesImpuestos: salarioNetoSinAuxilio,
            salarioNetoConImpuestos: salarioNetoSinAuxilio - impuestos
          }
        },
      });
    }
  }
}
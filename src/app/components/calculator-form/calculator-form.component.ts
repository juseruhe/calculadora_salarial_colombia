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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private salaryCalculator: SalaryCalculatorService
  ) {
    this.smlv2025 = this.salaryCalculator.obtenerSMLV2025();
    this.calculatorForm = this.fb.group({
      tipoContrato: ['indefinido', Validators.required],
      salarioBruto: [
        this.smlv2025, 
        [
          Validators.required, 
          Validators.min(this.smlv2025)
        ] // Validadores síncronos como array
      ],
      calcularImpuestos: [false],
      incluirAuxilioTransporte: [true],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.calculatorForm.valid) {
      const formData = this.calculatorForm.value;
      const deducciones = this.salaryCalculator.calcularDeducciones(
        formData.salarioBruto,
        formData.tipoContrato
      );
      const salarioNetoSinAuxilio = formData.salarioBruto - deducciones.salud - deducciones.pension - deducciones.fondoSolidaridad;

      const impuestos = formData.calcularImpuestos
        ? this.salaryCalculator.calcularImpuestos(salarioNetoSinAuxilio, formData.tipoContrato)
        : 0;

      const salarioNetoConAuxilio = formData.incluirAuxilioTransporte
        ? this.salaryCalculator.calcularSalarioNetoConAuxilioTransporte(
            formData.salarioBruto, 
            salarioNetoSinAuxilio - impuestos, 
            formData.tipoContrato
          )
        : salarioNetoSinAuxilio - impuestos;

      this.router.navigate(['/resultados'], {
        state: {
          salarioBruto: formData.salarioBruto,
          tipoContrato: formData.tipoContrato,
          salarioNeto: salarioNetoConAuxilio,
          deducciones: deducciones,
          impuestos: impuestos,
          smlv: this.smlv2025,
          auxilioTransporte: formData.incluirAuxilioTransporte ? 
                           this.salaryCalculator.obtenerAuxilioTransporte2025() : 0,
          incluirAuxilioTransporte: formData.incluirAuxilioTransporte,
        },
      });
    }
  }
}
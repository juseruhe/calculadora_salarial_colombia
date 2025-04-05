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
        [Validators.required, Validators.min(this.smlv2025)] // Correcto: validadores síncronos como array
      ],
      pagarSalud: [true],
      pagarPension: [true],
      pagarFondoSolidaridad: [false],
      calcularImpuestos: [false],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.calculatorForm.valid) {
      const formData = this.calculatorForm.value;
      const salarioNeto = this.salaryCalculator.calcularSalarioNeto(
        formData.tipoContrato,
        formData.salarioBruto,
        formData.pagarSalud,
        formData.pagarPension,
        formData.pagarFondoSolidaridad
      );
      const deducciones = this.salaryCalculator.calcularDeducciones(
        formData.salarioBruto,
        formData.pagarSalud,
        formData.pagarPension,
        formData.pagarFondoSolidaridad
      );
      const impuestos = formData.calcularImpuestos
        ? this.salaryCalculator.calcularImpuestos(salarioNeto)
        : 0;

      this.router.navigate(['/resultados'], {
        state: {
          salarioBruto: formData.salarioBruto,
          tipoContrato: formData.tipoContrato,
          salarioNeto: salarioNeto - impuestos,
          deducciones: deducciones,
          impuestos: impuestos,
          smlv: this.smlv2025,
          auxilioTransporte: this.salaryCalculator.obtenerAuxilioTransporte2025(),
        },
      });
    }
  }
}
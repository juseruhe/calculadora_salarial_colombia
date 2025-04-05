import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SalaryCalculatorService } from '../../services/salary-calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.html',
  styleUrls: ['calculator.scss']
})
export class CalculatorComponent {
  baseSalary: number = this.calculatorService.getSmlv2025();
  contractType: string = 'fixed-term';
  hasTransport: boolean = true;
  extras: any = {
    subsidie: 0,
    bonus: 0
  };
  
  contractTypes = [
    { value: 'fixed-term', label: 'Término fijo' },
    { value: 'indefinite', label: 'Término indefinido' },
    { value: 'service', label: 'Prestación de servicios' },
    { value: 'other', label: 'Otro tipo' }
  ];

  constructor(
    private navCtrl: NavController,
    private calculatorService: SalaryCalculatorService
  ) {}

  calculate() {
    const result = this.calculatorService.calculateNetSalary(
      this.baseSalary,
      this.contractType,
      this.hasTransport,
      this.extras
    );
    
    this.navCtrl.navigateForward('/resultados', {
      state: { result }
    });
  }
}
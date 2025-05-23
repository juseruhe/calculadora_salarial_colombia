import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorFormComponent } from 'src/app/components/calculator-form/calculator-form.component';
import { CalculatorFormModule } from 'src/app/components/calculator-form/calculator-form.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorRoutingModule,
   ReactiveFormsModule,
   CalculatorFormModule
  
   
    
  ],
  declarations: [CalculatorComponent],
  
})
export class CalculatorModule {}

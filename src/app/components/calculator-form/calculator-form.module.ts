import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { CalculatorFormComponent } from 'src/app/components/calculator-form/calculator-form.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule

    
  ],
  declarations: [CalculatorFormComponent],
  exports: [CalculatorFormComponent]
  
})
export class CalculatorFormModule {}

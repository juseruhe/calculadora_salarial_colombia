import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent} from './calculator.component';

import { CalculatorRoutingModule } from './calculator-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorRoutingModule
  ],
  declarations: [CalculatorComponent]
})
export class CalculatorModule {}

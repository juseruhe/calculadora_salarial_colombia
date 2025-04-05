import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ResultsComponent} from './results.component';

import { ResultsRoutingModule } from './results-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultsRoutingModule
  ],
  declarations: [ResultsComponent]
})
export class ResultsModule{}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: 'results.page.html',
  styleUrls: ['results.page.scss']
})
export class ResultsComponent {
  result: any;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.result = data?.['result']; // Assuming you passed data with the key 'result' in your route configuration
      if (this.result) {
        console.log('Data received via ActivatedRoute:', this.result);
      }
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/calculator');
  }
}
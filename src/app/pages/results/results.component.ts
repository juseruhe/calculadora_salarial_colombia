import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: false
})
export class ResultsComponent implements OnInit {
  results: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.results = navigation.extras.state;
      console.log('Resultados:', this.results);
    } else {
      this.router.navigate(['/principal']); // Si no hay datos, volver a la calculadora
    }
  }

  ngOnInit() {}
}
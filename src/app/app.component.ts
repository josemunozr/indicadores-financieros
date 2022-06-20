import { Component, OnInit } from '@angular/core';
import { IIndicator } from './core/models/indicator.model';
import { IndicatorsService } from './services/indicators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private indicatorsService: IndicatorsService) { }

  ngOnInit(): void {
  }


}

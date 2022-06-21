import { Component, OnInit } from '@angular/core';
import { IIndicator } from 'src/app/core/models/indicator.model';
import { IndicatorsService } from 'src/app/services/indicators.service';

@Component({
  selector: 'app-list-indicators',
  templateUrl: './list-indicators.component.html',
  styleUrls: ['./list-indicators.component.scss']
})
export class ListIndicatorsComponent implements OnInit {
  listIndicators: Array<IIndicator> = [];
  constructor(
    private indicatorsService: IndicatorsService
  ) { }

  ngOnInit(): void {
    this.getListIndicators();
  }

  private getListIndicators(): void {
    this.indicatorsService
      .getListIndicators()
      .subscribe((resp: Array<IIndicator>) => {
        this.listIndicators = resp;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicatorsService } from 'src/app/services/indicators.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  titleIndicator: string = "";
  indicatorSelected: string = "";
  constructor(
    private activatedRouter: ActivatedRoute,
    private indicatorsService: IndicatorsService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .subscribe(params => {
        this.indicatorSelected = params['indicator'];
        this.titleIndicator = this.indicatorSelected;
        this.getDataIndicatorSelected(this.indicatorSelected);
      })
  }

  private getDataIndicatorSelected(indicator: string): void {
    if (['dolar', 'euro', 'uf'].includes(indicator)) {
      this.getDetailLast30Days(indicator);
    } else {
      this.getDetailCurrentYear(indicator);
    }
  }

  private getDetailLast30Days(indicator: string): void {
    this.indicatorsService.getIndicatorDetailByRangeOfDays(indicator, 30)
      .subscribe({
        next: resp => {
          console.log(resp);
        },
        error: errorResp =>
          console.info('getDetailLast30Days', errorResp.error.Mensaje)
      });
  }

  private getDetailCurrentYear(indicator: string): void {
    this.indicatorsService.getIndicatorDetailCurrentYear(indicator)
      .subscribe({
        next: resp => {
          console.log(resp);
        },
        error: errorResp =>
          console.info('getDetailCurrentYear', errorResp.error.Mensaje)
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IndicatorsService } from 'src/app/services/indicators.service';

@Component({
  selector: 'app-detail-indicator',
  templateUrl: './detail-indicator.component.html',
  styleUrls: ['./detail-indicator.component.scss']
})
export class DetailIndicatorComponent implements OnInit {

  constructor(
    private indicatorsService: IndicatorsService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params
      .subscribe(params => {
        this.getIndicatorDetailByRangeOfDays(params['indicator']);
      })
  }

  private getIndicatorDetailByRangeOfDays(indicator: string): void {
    const subCant = ['dolar', 'euro', 'uf'].includes(indicator) ? 10 : 0
    this.indicatorsService.getIndicatorDetailByRangeOfDays(indicator, subCant)
      .subscribe({
        next: resp => {
          console.log(resp);
        },
        error: errorResp =>
          console.info('getDataIndicator', errorResp.error.Mensaje)
      });
  }

}

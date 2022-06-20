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

  // handleSelectDetail({ name, period }: IIndicator): void {
  //   if (period === '30days') {
  //     // this.getDetailLast30Days(name);
  //   } else {
  //     this.getDetailCurrentYear(name);
  //   }
  // }

  handleShowChart({ name, period }: IIndicator): void {
    // if (period === '30days') {
    //   this.getDataIndicator(name);
    // } else {
    //   //this.getDetailCurrentYear(name);
    // }
  }

  // private getDetailLast30Days(indicator: string): void {
  //   this.indicatorsService.getIndicatorDetailByRangeOfDays(indicator, 30)
  //     .subscribe({
  //       next: resp => {
  //         console.log(resp);
  //       },
  //       error: errorResp =>
  //         console.info('getDetailLast30Days', errorResp.error.Mensaje)
  //     });
  // }

  // private getDetailCurrentYear(indicator: string): void {
  //   this.indicatorsService.getIndicatorDetailCurrentYear(indicator)
  //     .subscribe({
  //       next: resp => {
  //         console.log(resp);
  //       },
  //       error: errorResp =>
  //         console.info('getDetailCurrentYear', errorResp.error.Mensaje)
  //     });
  // }


  // private getDataIndicator(indicator: string): void {
  //   this.indicatorsService.getIndicatorDetailByRangeOfDays(indicator, 10)
  //     .subscribe({
  //       next: resp => {
  //         console.log(resp);
  //       },
  //       error: errorResp =>
  //         console.info('getDataIndicator', errorResp.error.Mensaje)
  //     });
  // }

  private getListIndicators(): void {
    this.indicatorsService
      .getListIndicators()
      .subscribe((resp: Array<IIndicator>) => {
        this.listIndicators = resp;
      });
  }

}

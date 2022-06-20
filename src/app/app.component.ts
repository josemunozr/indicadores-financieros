import { Component, OnInit } from '@angular/core';
import { IIndicator } from './core/models/indicator.model';
import { IndicatorsService } from './services/indicators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listIndicators: Array<IIndicator> = [];

  constructor(private indicatorsService: IndicatorsService) {}

  ngOnInit(): void {
    this.getListIndicators();
  }

  handleSelectDetail({ name }: IIndicator): void {
    this.getDetailLast30Days(name);
  }

  private getListIndicators(): void {
    this.indicatorsService
      .getListIndicators()
      .subscribe((resp: Array<IIndicator>) => {
        this.listIndicators = resp;
      });
  }

  private getDetailLast30Days(indicator: string): void {
    this.indicatorsService.getIndicatorDetailLast30Days(indicator).subscribe({
      next: resp => {
        console.log(resp);
      },
      error: errorResp =>
        console.info('getDollarDetail', errorResp.error.Mensaje)
    });
  }
  private getDetailLastYear(indicator: string): void {
    this.indicatorsService.getIndicatorDetailLastYear(indicator).subscribe({
      next: resp => {
        console.log(resp);
      },
      error: errorResp =>
        console.info('getDollarDetail', errorResp.error.Mensaje)
    });
  }
}

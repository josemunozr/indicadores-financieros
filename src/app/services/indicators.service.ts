import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format, subDays, subMonths } from 'date-fns';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIndicator } from '../core/models/indicator.model';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {
  constructor(private http: HttpClient) {}

  getListIndicators(): Observable<any> {
    return of(
      [
        { indicator: 'Dólar', name: 'dolar', period: '30days' },
        { indicator: 'Euro', name: 'euro', period: '30days' },
        { indicator: 'UF', name: 'uf', period: '30days' },
        { indicator: 'IPC', name: 'ipc', period: '1year' },
        { indicator: 'UTM', name: 'utm', period: '1year' }
      ] as Array<IIndicator>
    );
  }

  getIndicatorDetailByRangeOfDays(indicator: string, cantPreviusDays: number): Observable<any> {
    const period = this.getPeriodByIndicator(indicator,cantPreviusDays);
    return this.http.get(
      `${environment.apiCMF}/${indicator}/periodo/${period}?apikey=${environment.keyCMF}&formato=json`
    );
  }

  getIndicatorDetailCurrentYear(indicator: string): Observable<any> {
    const currentYear = format(new Date(), 'yyyy');
    return this.http.get(
      `${environment.apiCMF}/${indicator}/${currentYear}?apikey=${environment.keyCMF}&formato=json`
    );
  }

  private getPeriodByIndicator(indicator: string, cantPreviusDays: number): string {
    let period: string = '';
    const currentDateWithout30Days = subDays(new Date(), cantPreviusDays);
    const currentDateWithout1Month = subMonths(new Date(), 1);
    const currentDate = new Date();

    switch (indicator) {
      case 'dolar':
        const startDate = {
          year: format(currentDateWithout30Days, 'yyyy'),
          month: format(currentDateWithout30Days, 'MM'),
          days: format(currentDateWithout30Days, 'dd')
        };

        const endDate = {
          year: format(currentDate, 'yyyy'),
          month: format(currentDate, 'MM'),
          days: format(currentDate, 'dd')
        };

        period = `${startDate.year}/${startDate.month}/dias_i/${startDate.days}/${endDate.year}/${endDate.month}/dias_f/${endDate.days}`;
        break;
      case 'euro': // documentación de periodo para euro entrega error al consultar entre 2 fechas.
      case 'uf': // documentación de periodo para uf no se encuentra consulta entre 2 fechas.
        period = `${format(currentDateWithout1Month, 'yyyy/MM')}/${format( currentDate, 'yyyy/MM' )}`;
        break;
    }

    return period;
  }
}

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
  constructor(private http: HttpClient) { }

  getListIndicators(): Observable<any> {
    return of(
      [
        { indicator: 'Dólar', name: 'dolar' },
        { indicator: 'Euro', name: 'euro' },
        { indicator: 'UF', name: 'uf' },
        { indicator: 'IPC', name: 'ipc' },
        { indicator: 'UTM', name: 'utm' }
      ] as Array<IIndicator>
    );
  }

  getIndicatorDetailByRangeOfDays(indicator: string, cantSub: number): Observable<any> {
    const period = this.getPeriodByIndicator(indicator, cantSub);
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

  private getPeriodByIndicator(indicator: string, cantSub: number): string {
    let period: string = '';
    const currentDate = new Date();

    switch (indicator) {
      case 'dolar':
        const currentDateWithoutXDays = subDays(new Date(), cantSub);
        const startDate = {
          year: format(currentDateWithoutXDays, 'yyyy'),
          month: format(currentDateWithoutXDays, 'MM'),
          days: format(currentDateWithoutXDays, 'dd')
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
        const currentDateWithout1Month = subMonths(new Date(), 1);
        period = `${format(currentDateWithout1Month, 'yyyy/MM')}/${format(currentDate, 'yyyy/MM')}`;
        break;
      case 'ipc':
      case 'utm':
        const currentDateWithout12Months = subMonths(new Date(), 12);
        period = `${format(currentDateWithout12Months, 'yyyy/MM')}/${format(currentDate, 'yyyy/MM')}`;
    }

    return period;
  }
}

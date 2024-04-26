import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import 'moment/locale/ar';  // Import Arabic locale

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    moment.locale('ar');  // Set locale to Arabic
    const date = moment(value);
    return 'منذُ' + ' ' + date.fromNow(true) ;
  }
}

import { Injectable, OnInit } from '@angular/core';

import { interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  seconds; minutes; hours; days;
  currentDate;
  futureDate = new Date(2018, 5, 1);

  constructor() {
    this.getTimes();
    const source = interval(1000);
    const subscribe = source.subscribe(val => {
      const difference = this.timeDifference();
      if (Math.round(difference) === 0) {
        console.log('unsubscribed');
        subscribe.unsubscribe();
      } else {
        this.getTimes();
      }
    });
  }

  getTimes() {
    this.currentDate = new Date();
    let seconds = this.timeDifference();

    this.days = Math.floor(seconds / (3600 * 24));
    seconds -= this.days * 3600 * 24;
    this.hours = Math.floor(seconds / 3600);
    seconds -= this.hours * 3600;
    this.minutes = Math.floor(seconds / 60);
    seconds -= this.minutes * 60;
    this.seconds = Math.round(seconds);
  }

  timeDifference() {
    const dif = this.currentDate.getTime() - this.futureDate.getTime();
    const seconds_from_T1_to_T2 = dif / 1000;
    return Math.abs(seconds_from_T1_to_T2);
  }


}

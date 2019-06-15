import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-play-info',
  templateUrl: './play-info.component.html',
  styleUrls: ['./play-info.component.css']
})
export class PlayInfoComponent implements OnInit {
  @select() readonly point$: Observable<number>;
  @select() readonly gameLevel$: Observable<number>;
  @select() readonly playTime$: Observable<number>;
  timeSubscription: Subscription;
  sec: string;
  min: string;
  constructor() { }

  ngOnInit() {
    this.timeSubscription = this.playTime$.subscribe(num => {
      const second = num % 60;
      const minute = Math.floor(num / 60);
      this.sec = String(second).length === 2 ? String(second) : "0" + second;
      this.min = String(minute).length === 2 ? String(minute) : "0" + minute;
    });
  }
  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }
}

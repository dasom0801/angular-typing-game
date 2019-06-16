import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select } from '@angular-redux/store';
import { GameService} from '../game.service';

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
  displayTime: string; 
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.timeSubscription = this.playTime$.subscribe(num => {
      this.displayTime = this.gameService.getDisplayTime(num);
    });
  }
  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }
}

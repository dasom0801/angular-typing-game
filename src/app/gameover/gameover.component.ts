import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {
  @select() readonly playTime$: Observable<number>;
  displayTime: string;
  timeSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private router: Router,
    private render: Renderer) { }
  handleInput(event: any) {
    this.gameService.setRankingList(event.target.value);
    event.target.value = '';
    this.router.navigateByUrl('/main');
  }
  ngOnInit() {
    this.timeSubscription = this.playTime$.subscribe(num => {
      this.displayTime = this.gameService.getDisplayTime(num);
    });
    this.render.selectRootElement('.name-input').focus();
  }
  ngOnDestroy() {
    this.timeSubscription.unsubscribe();
  }
}

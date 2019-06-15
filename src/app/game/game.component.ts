import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @select() readonly isPlay$: Observable<boolean>;
  @select() readonly gameOver$: Observable<boolean>

  handleInput(event: any): void {
    const inputValue = event.target.value;
    this.gameService.removeWord(inputValue, true);
    event.target.value = '';
  }

  constructor(
    private router: Router, 
    private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getPath(this.router.url);
  }
}

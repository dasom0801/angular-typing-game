import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { GameService } from '../game.service';
import { select } from '@angular-redux/store';

import { Word } from '../word';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @select() readonly isPlay$: Observable<boolean>
  @select() words$: Observable<Word[]>

  handleInput(event: any): void {
    const inputValue = event.target.value;
    let typedWord;
    this.words$.pipe(
      map(word => word.map((w, i) => [w, i])),
      first()
    ).subscribe(value => typedWord = value.filter(word => Object.values(word[0]).includes(inputValue))[0])
    if(typedWord) {
      this.gameService.handlePoint(true);
      this.gameService.removeWord(typedWord[1])
    }
    event.target.value = '';
  }

  constructor(
    private router: Router, 
    private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getPath(this.router.url);
  }
}

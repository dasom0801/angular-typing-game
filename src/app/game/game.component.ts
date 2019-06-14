import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer , Subscription, Subject } from 'rxjs';
import { PlayService} from '../play.service';
import { Word } from '../word';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  isPlay: boolean
  point: number
  gameOver: boolean
  words: Word[];
  subscription: Subscription;

  
  getWords(): void {
    this.playService.getWords().subscribe(word => {
      if (this.gameOver) {
        this.subscription.unsubscribe();
      }
      if (this.words.indexOf(word) === -1) {
        word.left = Math.floor((Math.random()*650));
        word.top = 0;
        this.words.push(word);
      }
    });
  }

  handlePoint(isPointUp: boolean): void {
    isPointUp ? ++this.point : --this.point;
    if(this.point === 0) {
      this.gameOver = true;
    }
  }

  handleInput(event: any): void {
    const value = event.target.value;
    const word = this.words.filter(word => Object.values(word).includes(value))[0];
    event.target.value = '';
    if(word) {
      this.removeWord(word);
      this.handlePoint(true);
    }
  }

  removeWord(word:Word): void {
    const index = this.words.indexOf(word);
    this.words.splice(index, 1);
  }

  constructor(private router: Router, private playService: PlayService) { }

  ngOnInit() {
    this.isPlay = this.router.url === '/play';
    this.point = 5;
    this.gameOver = false;
    this.words = [];
    const newWordTime = timer(1000, 2000);
    this.subscription = newWordTime.subscribe(() => this.getWords());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { timer , Subscription } from 'rxjs';

import { Word } from "../word";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() word: Word;
  @Input() gameOver: boolean;
  @Output() handleRemoveWord =  new EventEmitter<Word>();
  @Output() changePoint =  new EventEmitter<boolean>();
  
  subscription: Subscription;
  constructor() { }

  ngOnInit() {
    const newWordTime = timer(1000, 1000);
    this.subscription = newWordTime.subscribe(() =>{ 
      if(this.gameOver) {
        this.subscription.unsubscribe();
      }
      if(this.word.top < 500) {
        this.word.top = this.word.top + 25
      } else {
        this.handleRemoveWord.emit(this.word);
        this.changePoint.emit(false);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

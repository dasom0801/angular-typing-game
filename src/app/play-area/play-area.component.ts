import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Word } from '../word';

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  @Input() point: number;
  @Input() gameOver: boolean;
  @Input() words: Word;
  @Output() handlePoint =  new EventEmitter<boolean>();
  @Output() removeWord =  new EventEmitter<Word>()

  changePoint(isPointUp: boolean): void {
    this.handlePoint.emit(isPointUp);
  }

  handleRemoveWord(word: Word): void {
    this.removeWord.emit(word);
  }

  constructor() { }

  ngOnInit() {
  }

}

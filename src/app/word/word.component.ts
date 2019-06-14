import { Component, OnInit, Input } from '@angular/core';
import { timer , Subscription } from 'rxjs';
import { Word } from "../word";

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.css']
})
export class WordComponent implements OnInit {
  @Input() word: Word
  subscription: Subscription;
  constructor() { }

  ngOnInit() {
    this.word.left = Math.floor((Math.random()*650));
    const newWordTime = timer(1000, 1000);
    this.subscription = newWordTime.subscribe(() =>{ 
      if(this.word.top < 450) {
        this.word.top = this.word.top + 15
      } else {
        console.log(this.word.top);
      }
    });
  }
}

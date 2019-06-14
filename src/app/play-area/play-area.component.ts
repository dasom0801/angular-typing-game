import { Component, OnInit } from '@angular/core';
import { timer , Subscription } from 'rxjs';
import { PlayService} from '../play.service';
import { Word } from "../word";

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.component.html',
  styleUrls: ['./play-area.component.css']
})
export class PlayAreaComponent implements OnInit {
  words: Word[];
  subscription: Subscription;
  getWords(): void {
    this.playService.getWords().subscribe(word => {
      this.words.indexOf(word) === -1 && this.words.push(word);
    });
  }
  constructor(private playService: PlayService) { }
  ngOnInit() {
    this.words = [];
    const newWordTime = timer(1000, 2000);
    this.subscription = newWordTime.subscribe(() => this.getWords());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

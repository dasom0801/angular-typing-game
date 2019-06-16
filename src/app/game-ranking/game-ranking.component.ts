import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { Ranking } from '../ranking'

@Component({
  selector: 'app-game-ranking',
  templateUrl: './game-ranking.component.html',
  styleUrls: ['./game-ranking.component.css']
})
export class GameRankingComponent implements OnInit {
  @select() ranking$: Observable<Ranking[]>;

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  isPlay: Boolean
  constructor(private router: Router) { }

  ngOnInit() {
    this.isPlay = this.router.url === '/play'
  }

}

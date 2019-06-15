import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-play-info',
  templateUrl: './play-info.component.html',
  styleUrls: ['./play-info.component.css']
})
export class PlayInfoComponent implements OnInit {
  @Input() point: number;
  constructor() { }

  ngOnInit() {
  }
}

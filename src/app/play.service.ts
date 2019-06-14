import { Injectable } from '@angular/core';
import { WORDS } from './word-list';
import { Observable, of } from 'rxjs';
import { Word } from "./word";
@Injectable({
  providedIn: 'root'
})

export class PlayService {
  getWords(): Observable<Word> {
    const index = Math.floor((Math.random()*WORDS.length));
    return of(WORDS[index]);
  }

  constructor() { }
}

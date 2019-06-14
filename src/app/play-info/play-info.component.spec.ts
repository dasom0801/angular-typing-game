import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayInfoComponent } from './play-info.component';

describe('PlayInfoComponent', () => {
  let component: PlayInfoComponent;
  let fixture: ComponentFixture<PlayInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

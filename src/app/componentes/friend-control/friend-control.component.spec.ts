import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendControlComponent } from './friend-control.component';

describe('FriendControlComponent', () => {
  let component: FriendControlComponent;
  let fixture: ComponentFixture<FriendControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

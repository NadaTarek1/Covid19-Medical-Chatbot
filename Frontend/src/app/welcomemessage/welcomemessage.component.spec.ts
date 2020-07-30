import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomemessageComponent } from './welcomemessage.component';

describe('WelcomemessageComponent', () => {
  let component: WelcomemessageComponent;
  let fixture: ComponentFixture<WelcomemessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomemessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

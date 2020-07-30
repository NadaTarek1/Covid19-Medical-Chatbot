import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstyleComponent } from './newstyle.component';

describe('NewstyleComponent', () => {
  let component: NewstyleComponent;
  let fixture: ComponentFixture<NewstyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

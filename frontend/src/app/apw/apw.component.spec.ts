import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApwComponent } from './apw.component';

describe('ApwComponent', () => {
  let component: ApwComponent;
  let fixture: ComponentFixture<ApwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApwComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

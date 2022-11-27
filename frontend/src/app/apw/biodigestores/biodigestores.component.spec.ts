import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiodigestoresComponent } from './biodigestores.component';

describe('BiodigestoresComponent', () => {
  let component: BiodigestoresComponent;
  let fixture: ComponentFixture<BiodigestoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiodigestoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiodigestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

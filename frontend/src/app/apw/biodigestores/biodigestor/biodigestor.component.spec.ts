import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiodigestorComponent } from './biodigestor.component';

describe('BiodigestorComponent', () => {
  let component: BiodigestorComponent;
  let fixture: ComponentFixture<BiodigestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiodigestorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiodigestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

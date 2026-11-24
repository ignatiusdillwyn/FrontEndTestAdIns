import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutiDetailsComponent } from './cuti-details.component';

describe('CutiDetailsComponent', () => {
  let component: CutiDetailsComponent;
  let fixture: ComponentFixture<CutiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutiDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CutiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

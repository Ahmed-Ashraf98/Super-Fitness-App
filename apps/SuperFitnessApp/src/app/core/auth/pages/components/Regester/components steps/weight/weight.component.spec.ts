import { WeightComponent } from './weight.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('WeightComponent', () => {
  let component: WeightComponent;
  let fixture: ComponentFixture<WeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

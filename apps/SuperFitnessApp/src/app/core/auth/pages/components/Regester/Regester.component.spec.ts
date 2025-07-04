import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegesterComponent } from './Regester.component';

describe('RegesterComponent', () => {
  let component: RegesterComponent;
  let fixture: ComponentFixture<RegesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegesterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

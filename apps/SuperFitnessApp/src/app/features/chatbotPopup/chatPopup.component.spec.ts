import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatPopupComponent } from './chatPopup.component';

describe('ChatPopupComponent', () => {
  let component: ChatPopupComponent;
  let fixture: ComponentFixture<ChatPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

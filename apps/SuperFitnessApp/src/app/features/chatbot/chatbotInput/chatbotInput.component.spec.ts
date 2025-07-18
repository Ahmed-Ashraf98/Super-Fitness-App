import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotInputComponent } from './chatbotInput.component';

describe('ChatbotInputComponentComponent', () => {
  let component: ChatbotInputComponent;
  let fixture: ComponentFixture<ChatbotInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

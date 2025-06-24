import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotInputComponentComponent } from './chatbotInput.component';

describe('ChatbotInputComponentComponent', () => {
  let component: ChatbotInputComponentComponent;
  let fixture: ComponentFixture<ChatbotInputComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotInputComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

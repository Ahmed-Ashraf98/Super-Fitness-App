import { createAction, props } from '@ngrx/store';

export const sendMessage = createAction(
  '[Chatbot] Send Message',
  props<{ content: string }>()
);

export const aiResponse = createAction(
  '[Chatbot] AI Response',
  props<{ content: string }>()
);

export const clearChat = createAction('[Chatbot] Clear Chat');

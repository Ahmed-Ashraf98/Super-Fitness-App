import { createReducer, on } from '@ngrx/store';
import { initialChatState, ChatbotRole } from './chatbot.state';
import * as ChatbotActions from './chatbot.actions';

export const chatbotReducers = createReducer(
  initialChatState,
  on(ChatbotActions.sendMessage, (state, { content }) => ({
    ...state,
    chatHistory: [...state.chatHistory, { role: ChatbotRole.USER, content }],
    isLoading: true,
  })),
  on(ChatbotActions.aiResponse, (state, { content }) => ({
    ...state,
    chatHistory: [...state.chatHistory, { role: ChatbotRole.AI, content }],
    isLoading: false,
  })),
  on(ChatbotActions.clearChat, () => initialChatState)
);

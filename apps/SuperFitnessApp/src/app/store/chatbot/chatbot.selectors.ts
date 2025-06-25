import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatbotState } from './chatbot.state';

export const chatbotSelectors = createFeatureSelector<ChatbotState>('chatbot');

export const chatHistory = createSelector(
  chatbotSelectors,
  (state) => state.chatHistory
);

export const loadingStatus = createSelector(
  chatbotSelectors,
  (state) => state.isLoading
);

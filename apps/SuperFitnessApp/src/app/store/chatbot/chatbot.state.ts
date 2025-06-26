export enum ChatbotRole {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  role: ChatbotRole;
  content: string;
}

export interface ChatbotState {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export const initialChatState: ChatbotState = {
  chatHistory: [],
  isLoading: false,
  error: null,
};

import { create } from 'zustand'

interface GlobalState {
  currentQuestionIndex: number;
  currentQuestion: string;
  setCurrentQuestion: (index: number, question: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  currentQuestionIndex: 0,
  currentQuestion: '',
  setCurrentQuestion: (index, question) => set({ currentQuestionIndex: index, currentQuestion: question }),
}));

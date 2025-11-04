import { create } from 'zustand';

export type Language = 'uz' | 'ru' | 'cy';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageStore>((set) => ({
  language: 'uz',
  setLanguage: (lang) => set({ language: lang }),
}));

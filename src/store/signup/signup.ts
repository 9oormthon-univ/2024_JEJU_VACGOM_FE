import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  babyName: string;
  babySsn: string;
  nickname: string;
}
interface Action {
  setbabyName: (text: string) => void;
  setBabySsn: (text: string) => void;
  setNickname: (text: string) => void;
}

const useSignupStore = devtools<State & Action>((set) => ({
  // state
  babyName: '',
  babySsn: '',
  nickname: '',
  // actions
  setbabyName: (text: string) => set({ babyName: text }),
  setBabySsn: (text: string) => set({ babySsn: text }),
  setNickname: (text: string) => set({ nickname: text }),
}));

export default create(useSignupStore);

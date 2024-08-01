import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  birthday: string;
  userName: string;
  phoneNo: string;
}
interface Action {
  setBirthday: (text: string) => void;
  setUserName: (text: string) => void;
  setPhoneNo: (text: string) => void;
}

const useKaKaoStore = devtools<State & Action>((set) => ({
  // state
  birthday: '',
  userName: '',
  phoneNo: '',
  // actions
  setBirthday: (text: string) => set({ birthday: text }),
  setUserName: (text: string) => set({ userName: text }),
  setPhoneNo: (text: string) => set({ phoneNo: text }),
}));

export default create(useKaKaoStore);

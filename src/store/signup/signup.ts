import create from 'zustand';

const useSignupStore = create((set) => ({
  babyName: '',
  babySsn: '',
  nickname: '',
  setbabyName: (text: string) => set({ babyName: text }),
  setBabySsn: (text: string) => set({ babySsn: text }),
  setNickname: (text: string) => set({ nickname: text }),
}));

export default useSignupStore;

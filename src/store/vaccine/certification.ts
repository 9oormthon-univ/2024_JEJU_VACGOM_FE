import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  vaccineId: number | null;
}
interface Action {
  setvaccineId: (text: number) => void;
}

const useCertificateStore = devtools<State & Action>((set) => ({
  // state
  vaccineId: 0,

  // actions
  setvaccineId: (text: number) => set({ vaccineId: text }),
}));

export default create(useCertificateStore);

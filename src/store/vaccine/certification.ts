import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  vaccinationId: number | null;
}
interface Action {
  setvaccinationId: (text: number) => void;
}

const useCertificateStore = devtools<State & Action>((set) => ({
  // state
  vaccinationId: 0,

  // actions
  setvaccinationId: (text: number) => set({ vaccinationId: text }),
}));

export default create(useCertificateStore);

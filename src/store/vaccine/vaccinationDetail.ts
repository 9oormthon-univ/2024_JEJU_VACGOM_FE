import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  vacType: string | null;
  vaccinationId: string | null;
}
interface Action {
  setVacType: (text: string) => void;
  setVaccinationId: (text: string) => void;
}

const useVaccinationStore = devtools<State & Action>((set) => ({
  // state
  vacType: '',
  vaccinationId: '',

  // actions
  setVacType: (text: string) => set({ vacType: text }),
  setVaccinationId: (text: string) => set({ vaccinationId: text }),
}));

export default create(useVaccinationStore);

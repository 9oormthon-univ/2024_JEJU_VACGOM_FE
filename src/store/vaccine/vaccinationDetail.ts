import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  vacType: string | null;
  vaccineId: string | null;
}
interface Action {
  setVacType: (text: string) => void;
  setVaccineId: (text: string) => void;
}

const useVaccinationStore = devtools<State & Action>((set) => ({
  // state
  vacType: 0,
  vaccineId: 0,

  // actions
  setVacType: (text: string) => set({ vacType: text }),
  setVaccineId: (text: string) => set({ vaccineId: text }),
}));

export default create(useVaccinationStore);

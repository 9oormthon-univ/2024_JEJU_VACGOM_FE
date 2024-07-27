import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  parentsName: string;
  parentsSsn: string;
  phonenumber: string;
}
interface Action {
  setParentsName: (text: string) => void;
  setParentsSsn: (text: string) => void;
  setPhonenumber: (text: string) => void;
}

const useParentsVerifyStore = devtools<State & Action>((set) => ({
  // state
  parentsName: '부모',
  parentsSsn: '',
  phonenumber: '',
  // actions
  setParentsName: (text: string) => set({ parentsName: text }),
  setParentsSsn: (text: string) => set({ parentsSsn: text }),
  setPhonenumber: (text: string) => set({ phonenumber: text }),
}));

export default create(useParentsVerifyStore);

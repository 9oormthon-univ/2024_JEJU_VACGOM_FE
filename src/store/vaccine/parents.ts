import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  parentsName: string | null;
  parentsId: string | null;
}
interface Action {
  setparentsName: (text: number) => void;
  setparentsId: (text: number) => void;
}

const useParentsStore = devtools<State & Action>((set) => ({
  // state
  parentsId: '',
  parentsName: '',

  // actions
  setparentsName: (text: number) => set({ parentsId: text }),
  setparentsId: (text: number) => set({ parentsName: text }),
}));

export default create(useParentsStore);

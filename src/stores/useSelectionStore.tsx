import { create } from 'zustand';

interface SelectionState {
  selectedOption: string | null;
  selectedBuilding: string | null;
  setSelectedOption: (option: string | null) => void;
  setSelectedBuilding: (building: string | null) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedOption: null,
  selectedBuilding: null,
  setSelectedOption: (option) => set({ selectedOption: option }),
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),
}));

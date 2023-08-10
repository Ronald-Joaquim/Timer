import { ReactNode, createContext, useState } from "react";

interface CreateCycleData {
  task: string;
  MinutesInput: number;
}

interface Cycle {
  id: string;
  task: string;
  MinutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  fineshedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  cycleId: string | null;
  amountSeconds: number;
  markCuurentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cycleId, setCycleId] = useState<string | null>(null);
  const [amountSeconds, setAmountSeconds] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === cycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds);
  }

  function markCuurentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === cycleId) {
          return { ...cycle, fineshedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      MinutesAmount: data.MinutesInput,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setCycleId(id);
    setAmountSeconds(0);
  }

  function interruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === cycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setCycleId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        cycleId,
        markCuurentCycleAsFinished,
        amountSeconds,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

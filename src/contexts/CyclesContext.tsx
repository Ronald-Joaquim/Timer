import { ReactNode, createContext, useState, useReducer } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptedCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  MinutesInput: number;
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    cycleId: null,
  });

  const [amountSeconds, setAmountSeconds] = useState(0);
  const { cycles, cycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === cycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds);
  }

  function markCuurentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      MinutesAmount: data.MinutesInput,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSeconds(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptedCurrentCycleAction());
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

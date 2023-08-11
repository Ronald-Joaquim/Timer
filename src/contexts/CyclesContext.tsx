import { ReactNode, createContext, useState, useReducer } from "react";

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

interface CyclesState {
  cycles: Cycle[];
  cycleId: string | null;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            cycleId: action.payload.newCycle.id,
          };
        case "INTERRUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.cycleId) {
                return { ...cycle, interruptedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            cycleId: null,
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.cycleId) {
                return { ...cycle, fineshedDate: new Date() };
              } else {
                return cycle;
              }
            }),
            cycleId: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      cycleId: null,
    }
  );

  const [amountSeconds, setAmountSeconds] = useState(0);
  const { cycles, cycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === cycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSeconds(seconds);
  }

  function markCuurentCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
      payload: {
        activeCycle,
      },
    });
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      MinutesAmount: data.MinutesInput,
      startDate: new Date(),
    };

    dispatch({
      type: "ADD_NEW_CYCLE",
      payload: {
        newCycle,
      },
    });

    setAmountSeconds(0);
  }

  function interruptCurrentCycle() {
    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycle,
      },
    });
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

import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";

import { HomeContainer, StartButton, StopButton } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdoown";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";

const newCycleFromValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  owner: zod.string().optional(),
  MinutesInput: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFromValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  MinutesInput: number;
  startDate: Date;
  interruptedDate?: Date;
  fineshedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  cycleId: string | null;
  amountSeconds: number;
  markCuurentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cycleId, setCycleId] = useState<string | null>(null);

  const [amountSeconds, setAmountSeconds] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === cycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFromValidationSchema),
    defaultValues: {
      task: "",
      MinutesInput: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

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

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      MinutesInput: data.MinutesInput,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setCycleId(id);
    setAmountSeconds(0);

    reset();
  }

  function handleStopCycle() {
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

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{
            activeCycle,
            cycleId,
            markCuurentCycleAsFinished,
            amountSeconds,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} />
            Interromper
          </StopButton>
        ) : (
          <StartButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  );
}

import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInSeconds } from "date-fns";

import * as zod from "zod";

import {
  Countdown,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartButton,
  StopButton,
  TaskInput,
} from "./styles";
import { useEffect, useState } from "react";

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
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [cycleId, setCycleId] = useState<string | null>(null);
  const [amountSeconds, setAmountSeconds] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFromValidationSchema),
    defaultValues: {
      task: "",
      MinutesInput: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === cycleId);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSeconds(
          differenceInSeconds(new Date(), activeCycle.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

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
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === cycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setCycleId(null);
  }

  const totalSeconds = activeCycle ? activeCycle.MinutesInput * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSeconds : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestion"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register("task")}
          />

          <datalist id="task-suggestion">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutes">durant</label>
          <MinutesInput
            type="number"
            id="minutes"
            placeholder="00"
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}
            {...register("MinutesInput", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <Countdown>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </Countdown>

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

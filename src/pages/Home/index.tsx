import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as zod from "zod";

import {
  Countdown,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartButton,
  TaskInput,
} from "./styles";

const newCycleFromValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  owner: zod.string().optional(),
  MinutesInput: zod.number().min(5).max(60),
});

type NewCycleFormData = zod.infer<typeof newCycleFromValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFromValidationSchema),
    defaultValues: {
      task: "",
      MinutesInput: 0,
    },
  });

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }
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
            step={5}
            min={5}
            max={60}
            {...register("minutesInput", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <Countdown>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </Countdown>

        <StartButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  );
}

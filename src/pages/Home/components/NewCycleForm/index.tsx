import { FormContainer, MinutesInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
  );
}

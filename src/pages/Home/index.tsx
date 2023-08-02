import { Play } from "phosphor-react";
import {
  Countdown,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  StartButton,
  TaskInput,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestion"
            placeholder="Dê um nome para o seu projeto"
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

        <StartButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  );
}

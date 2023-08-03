import { HistoryContainer, HistoryList } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>Concluido</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>30 Minutos</td>
              <td>Há cerca de 9 meses</td>
              <td>Concluido</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>10 Minutos</td>
              <td>Há cerca de 1 meses</td>
              <td>Concluido</td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 Minutos</td>
              <td>Há cerca de 4 meses</td>
              <td>Concluido</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}

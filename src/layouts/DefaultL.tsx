import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";

export function DefaultL() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

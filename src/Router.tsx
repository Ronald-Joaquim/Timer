import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { DefaultL } from "./layouts/DefaultL";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultL />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}

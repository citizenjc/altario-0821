import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Generator } from "./components/Generator/Generator";
import { Payment } from "./components/Payment/Payment";
import { Layout, NoMatch } from "./components/Layout/Layout";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="generator" element={<Generator />} />
        <Route path="payment" element={<Payment />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

// GlobalState.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { PaymentProps } from "./components/Payment/Payment";

interface GlobalStateType {
  code: string;
  setCode: (pin: string) => void;
  char: string;
  setChar: (char: string) => void;
  grid: string[][];
  setGrid: (grid: string[][]) => void;
  isGeneratorRunning: boolean;
  setIsGeneratorRunning: (isRunning: boolean) => void;
  genInterval?: number;
  setGenInterval: (intervalId: number | undefined) => void;
  canType: boolean;
  setCanType: (canType: boolean) => void;
  paymentList: PaymentProps[];
  setPaymentList: (
    paymentList: PaymentProps[] | ((prev: PaymentProps[]) => PaymentProps[])
  ) => void;
}

const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [code, setCode] = useState<string>("");
  const [char, setChar] = useState<string>("");
  const [grid, setGrid] = useState<string[][]>([]);
  const [isGeneratorRunning, setIsGeneratorRunning] = useState<boolean>(false);
  const [genInterval, setGenInterval] = useState<number | undefined>(undefined);
  const [canType, setCanType] = useState<boolean>(true);
  const [paymentList, setPaymentList] = useState<PaymentProps[]>([]);

  return (
    <GlobalStateContext.Provider
      value={{
        code,
        setCode,
        char,
        setChar,
        grid,
        setGrid,
        isGeneratorRunning,
        setIsGeneratorRunning,
        genInterval,
        setGenInterval,
        canType,
        setCanType,
        paymentList,
        setPaymentList,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Create a custom hook for accessing the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

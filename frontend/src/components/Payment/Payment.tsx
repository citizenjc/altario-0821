import {
  Button,
  CodeBox,
  Container,
  GridCell,
  GridContainer,
  GridModalCloseButton,
  GridModalContainer,
  GridModalHeader,
  Header,
  HorizontalContainer,
  Input,
  Label,
  LiveStatus,
  PaymentsContainer,
  Table,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  VerticalContainer,
} from "./Payment-styled";
import { useGlobalState } from "../../GlobalState";
import { useEffect, useState } from "react";
import { clearPayments, fetchPayments, savePayments } from "../../api/Payment";

export interface PaymentProps {
  name: string;
  amount: string;
  code: string;
  grid: string[][];
}

export const Payment = () => {
  const { code, grid, paymentList, setPaymentList, isGeneratorRunning } =
    useGlobalState();

  const [paymentValue, setPaymentValue] = useState<string>("");
  const [amountValue, setAmountValue] = useState<string>("");

  const [isGridModalVisible, setIsGridModalVisible] = useState(false);
  const [storedGrid, setStoredGrid] = useState<string[][]>([]);
  const [storedCode, setStoredCode] = useState<string>("");

  useEffect(() => {
    const computePayments = async () => {
      const existingPayments = await fetchPayments();

      console.log(existingPayments);

      if (existingPayments.length > 0) {
        setPaymentList(existingPayments);
      } else {
        setPaymentList((prev: PaymentProps[]) => {
          if (prev.length > 0) {
            return prev;
          }

          const grid = Array.from({ length: 8 }, () => {
            const payment: PaymentProps = {
              name: "",
              amount: "",
              code: "",
              grid: [],
            };

            return payment;
          });

          return grid;
        });
      }
    };

    computePayments();
  }, []);

  const handleAdd = () => {
    console.log(paymentValue, amountValue);
    if (paymentValue && amountValue) {
      const newPayment: PaymentProps = {
        name: paymentValue,
        amount: amountValue,
        code: code || "",
        grid: grid || [],
      };

      const newList = [...paymentList];

      //get first empty row
      const emptyRow = paymentList.find((payment) => !payment.name);

      if (emptyRow) {
        const index = paymentList.indexOf(emptyRow);

        newList[index] = newPayment;
      } else {
        newList.push(newPayment);
      }

      setPaymentList(newList);

      setPaymentValue("");
      setAmountValue("");
    }
  };

  const handleClear = async () => {
    const clearGrid = Array.from({ length: 8 }, () => {
      const payment: PaymentProps = {
        name: "",
        amount: "",
        code: "",
        grid: [],
      };

      return payment;
    });

    setPaymentList(clearGrid);

    const result = await clearPayments();

    if (result) {
      alert("Payments cleared successfully");
    }
  };

  const handleSave = async () => {
    //save to db
    const result = await savePayments(paymentList);

    if (result) {
      alert("Payments saved successfully");
    }
  };

  const toggleGridModal = (code: string, grid: string[][]) => {
    if (!isGridModalVisible) {
      setStoredGrid(grid);
      setStoredCode(code || "");
    }

    setIsGridModalVisible(!isGridModalVisible);
  };

  return (
    <Container>
      <Header className="text-3xl">Payment</Header>
      <div className="flex items-baseline">
        <LiveStatus
          className={`text-sm font-extrabold mr-2 ${
            isGeneratorRunning ? "bg-red-600" : "bg-transparent"
          }`}
        />
        {isGeneratorRunning ? "LIVE" : "NOT LIVE, PLEASE START GENERATOR"}
      </div>
      <CodeBox className="border rounded border-gray-400">
        YOUR CODE NOW: <strong className="ml-2">{code || "**"}</strong>
      </CodeBox>
      <HorizontalContainer>
        <VerticalContainer>
          <Label className="text-gray-700 font-semibold text-xs ">
            PAYMENT
          </Label>
          <Input
            onChange={(e) => setPaymentValue(e.target.value)}
            value={paymentValue}
            disabled={!code}
            placeholder="Payment"
            className="border rounded border-gray-400"
            type="text"
          />
        </VerticalContainer>
        <VerticalContainer>
          <Label className="text-gray-700 font-semibold text-xs ">AMOUNT</Label>
          <Input
            onChange={(e) => setAmountValue(e.target.value)}
            value={amountValue}
            disabled={!code}
            placeholder="Amount"
            className="border rounded border-gray-400"
            type="number"
          />
        </VerticalContainer>
        <Button
          onClick={handleAdd}
          disabled={!code}
          className="border rounded bg-slate-500 text-white mt-6"
        >
          + ADD
        </Button>
        <Button
          onClick={handleClear}
          className="border rounded bg-red-500 text-white mt-6"
        >
          CLEAR
        </Button>
        <Button
          onClick={handleSave}
          className="border rounded bg-green-500 text-white mt-6"
        >
          SAVE
        </Button>
      </HorizontalContainer>
      <PaymentsContainer>
        <Label className="text-gray-700 font-semibold text-xs">
          PAYMENT LIST
        </Label>
        <TableContainer className="border rounded border-gray-400">
          <Table className="table-fixed">
            <TableHead className="text-gray-700 font-semibold text-xs">
              <TableRow className="border-b border-gray-400 divide-x divide-gray-400">
                <TableHeader className="w-1/2 text-left pl-2">NAME</TableHeader>
                <TableHeader>AMOUNT</TableHeader>
                <TableHeader>CODE</TableHeader>
                <TableHeader>GRID</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-400">
              {paymentList.map((value, index) => (
                <TableRow
                  className="divide-x divide-gray-400"
                  key={`row-${index}`}
                >
                  <TableData className="w-1/2 text-left pl-2">
                    {value.name}
                  </TableData>
                  <TableData className="text-center">{value.amount}</TableData>
                  <TableData className="text-center">{value.code}</TableData>
                  <TableData className="text-center">
                    {value.grid.length ? (
                      <Button
                        className="border rounded bg-slate-400 font-semibold text-sm"
                        onClick={() => toggleGridModal(value.code, value.grid)}
                      >
                        GRID
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PaymentsContainer>
      {isGridModalVisible && (
        <GridModal
          toggleModal={toggleGridModal}
          code={storedCode}
          gridData={storedGrid}
        />
      )}
    </Container>
  );
};

const GridModal = ({
  gridData,
  code,
  toggleModal,
}: {
  gridData: string[][];
  code: string;
  toggleModal: (code: string, grid: string[][]) => void;
}) => {
  return (
    <GridModalContainer>
      <VerticalContainer className="items-center border rounded shadow w-2/3 p-3 bg-white">
        <GridModalHeader className="mb-3">
          <CodeBox className="border rounded border-gray-400">
            YOUR CODE THEN: <strong className="ml-2">{code || "**"}</strong>
          </CodeBox>
          <GridModalCloseButton
            className="border rounded border-gray-400"
            onClick={() => toggleModal("", [])}
          >
            x
          </GridModalCloseButton>
        </GridModalHeader>
        <GridContainer>
          {gridData.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <GridCell
                  className="border border-gray-400"
                  key={`cell-${rowIndex}-${cellIndex}`}
                >
                  {cell}
                </GridCell>
              ))}
            </div>
          ))}
        </GridContainer>
      </VerticalContainer>
    </GridModalContainer>
  );
};

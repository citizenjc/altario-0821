import {
  Button,
  CodeBox,
  Container,
  Header,
  HorizontalContainer,
  Input,
  Label,
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

interface PaymentProps {
  name: string;
  amount: string;
  code: string;
  grid: string[][];
}

export const Payment = () => {
  const { code: pinCode } = useGlobalState();
  const [paymentList, setPaymentList] = useState<PaymentProps[]>([]);

  return (
    <Container>
      <Header className="text-3xl">Payment</Header>
      <CodeBox className="border rounded border-gray-400">
        YOUR CODE NOW: <strong>{pinCode || "**"}</strong>
      </CodeBox>
      <HorizontalContainer>
        <VerticalContainer>
          <Label className="text-gray-700 font-semibold text-xs ">
            PAYMENT
          </Label>
          <Input className="border rounded border-gray-400" type="text" />
        </VerticalContainer>
        <VerticalContainer>
          <Label className="text-gray-700 font-semibold text-xs ">AMOUNT</Label>
          <Input className="border rounded border-gray-400" type="text" />
        </VerticalContainer>
        <Button className="border rounded bg-slate-500 text-white mt-6">
          + ADD
        </Button>
      </HorizontalContainer>
      <PaymentsContainer>
        <Label className="text-gray-700 font-semibold text-xs ">
          PAYMENT LIST
        </Label>
        <TableContainer className="border rounded border-gray-400">
          <Table className="table-fixed">
            <TableHead className="text-gray-700 font-semibold text-xs">
              <TableRow className="border-b border-gray-400 divide-x divide-gray-400">
                <TableHeader className="w-1/2">NAME</TableHeader>
                <TableHeader>AMOUNT</TableHeader>
                <TableHeader>CODE</TableHeader>
                <TableHeader>GRID</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y divide-gray-400">
              {/* generate 8 table rows with empty data */}
              {Array.from(Array(8).keys()).map((_, index) => (
                <TableRow
                  className="divide-x divide-gray-400"
                  key={`row-${index}`}
                >
                  <TableData></TableData>
                  <TableData></TableData>
                  <TableData></TableData>
                  <TableData></TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PaymentsContainer>
    </Container>
  );
};

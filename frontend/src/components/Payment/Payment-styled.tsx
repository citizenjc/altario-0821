import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 1200px;
  min-height: 85vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`;

export const Header = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const Label = styled.label`
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-right: 2rem;
  width: 10rem;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HorizontalContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90%;
`;

export const CodeBox = styled.div`
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: center;
`;

export const PaymentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

export const TableContainer = styled.div`
  width: 100%;
  max-height: 22.6rem;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableHeader = styled.th`
  height: 2.5rem;
`;

export const TableData = styled.td`
  height: 2.5rem;
`;

export const TableRow = styled.tr``;

export const GridModalContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const GridModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const GridModalCloseButton = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const GridContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(10, 1fr);
  & > :first-child {
    :first-child {
      border-top-left-radius: 0.25rem;
    }
    :last-child {
      border-bottom-left-radius: 0.25rem;
    }
  }
  & > :last-child {
    :first-child {
      border-top-right-radius: 0.25rem;
    }
    :last-child {
      border-bottom-right-radius: 0.25rem;
    }
  }
`;

export const GridCell = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LiveStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid black;
`;

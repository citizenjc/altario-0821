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

export const GridContainer = styled.div`
  display: grid;
  width: 75%;
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

export const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const Label = styled.label`
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: 10px;
`;

export const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CodeBox = styled.div`
  display: flex;
  padding: 10px 50px;
  align-items: center;
  justify-content: center;
`;

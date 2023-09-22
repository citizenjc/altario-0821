// Layout-styled.tsx
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Navbar = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;

  a {
    text-decoration: none;
    color: white;
    margin-right: 20px;
    font-weight: bold;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Layout.tsx
import { Navbar } from "./Layout-styled";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/generator">Generator</Link>
        <Link to="/payment">Payment</Link>
      </Navbar>

      <Outlet />
    </div>
  );
};

export const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

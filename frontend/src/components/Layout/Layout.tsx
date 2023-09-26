// Layout.tsx
import { Navbar } from "./Layout-styled";
import { NavLink, Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Navbar className="bg-slate-800 text-cyan-50 mb-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/generator">Generator</NavLink>
        <NavLink to="/payment">Payment</NavLink>
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

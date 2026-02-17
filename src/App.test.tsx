import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Acme Widget Co heading", () => {
  render(<App />);
  const heading = screen.getByText(/Acme Widget Co/i);
  expect(heading).toBeInTheDocument();
});

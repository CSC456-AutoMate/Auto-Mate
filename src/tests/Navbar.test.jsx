import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "../components/UserAuth";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  test("navbar renders & shows logged out state components", () => {
    render(
      <BrowserRouter>
        <UserAuthContextProvider vale={{ user: null }}>
          <Navbar />
        </UserAuthContextProvider>
      </BrowserRouter>
    );

    const brandText = screen.getByText("AutoMate");
    expect(brandText).toBeInTheDocument();

    
    const menuButton = screen.getByRole("button", { name: "" });
    fireEvent.click(menuButton);

    expect(screen.getByText("Login")).toBeVisible();
    expect(screen.getByText("Sign Up")).toBeVisible();

    fireEvent.click(menuButton);
  });


});

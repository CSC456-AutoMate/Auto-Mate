import Home from "../pages/Home";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

describe("#Home", () => {
    // unit test
    it("welcome user should rendered", () => {
        render(<Home />);
        const homeElement = screen.getByText(/welcome user!/i);
        expect(homeElement).toBeInTheDocument();
    });

});

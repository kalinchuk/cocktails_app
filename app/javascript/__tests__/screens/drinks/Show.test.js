/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DrinksApi from "../../../apis/DrinksApi";
import drinkDetailsData from "../../__fixtures__/drink_details.json";
import Show from "../../../components/screens/drinks/Show";

jest.mock("../../../apis/DrinksApi");

describe("Show", () => {
  const mockResponse = {
    data: drinkDetailsData
  };

  beforeEach(() => {
    DrinksApi.details.mockResolvedValue(mockResponse);
  });

  it("renders without crashing", () => {
    render(<Show id="1" />);
  });

  it("displays loading initially", () => {
    render(<Show id="1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the details of the drink", async () => {
    render(<Show id="1" />);
    await waitFor(() => {
      expect(screen.getByText("Van Vleet")).toBeInTheDocument();
      expect(screen.getByText("Old-fashioned glass")).toBeInTheDocument();
      expect(screen.getByText("Shake all ingredients with ice, strain into an old-fashioned glass over ice cubes, and serve.")).toBeInTheDocument();
      expect(screen.getAllByRole('listitem').length).toBe(2);
    });
  });

  it("calls DrinksApi with the correct id", () => {
    render(<Show id="1" />);
    expect(DrinksApi.details).toHaveBeenCalledWith("1");
  });
});
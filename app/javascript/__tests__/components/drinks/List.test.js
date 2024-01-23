/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DrinksApi from "../../../apis/DrinksApi";
import List from "../../../components/drinks/List";
import drinksData from "../../__fixtures__/drink_list.json";

jest.mock("../../../apis/DrinksApi");

describe("List", () => {
  const mockResponse = {
    data: drinksData
  };

  beforeEach(() => {
    DrinksApi.search.mockResolvedValue(mockResponse);
  });

  it("renders without crashing", () => {
    render(<List/>);
  });

  it("displays loading initially", () => {
    render(<List/>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it("renders the list of drinks", async () => {
    render(<List/>);
    await waitFor(() => {
      expect(screen.getByText(drinksData.drinks[0].name)).toBeInTheDocument();
    });
  });

  it("handles empty response", async () => {
    DrinksApi.search.mockResolvedValueOnce({ data: { drinks: [] } });
    render(<List/>);
    await waitFor(() => {
      expect(screen.getByText("No results")).toBeInTheDocument();
    });
  });

  it("paginates correctly", async () => {
    render(<List searchQuery="query" customLimit={drinksData.drinks.length} />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("next page")[0]);
      expect(DrinksApi.search).toHaveBeenCalledWith("query", 1, 10);
    });
  });

  it("resets index on query change", async () => {
    const { rerender } = render(
      <List
        searchQuery="query1"
        customLimit={drinksData.drinks.length}
      />
    );
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("next page")[0]);
      expect(DrinksApi.search).toHaveBeenCalledWith("query1", 1, 10);
      rerender(<List searchQuery="query2" />);
      expect(DrinksApi.search).toHaveBeenCalledWith("query2", 0, 10);
    });
  });
});

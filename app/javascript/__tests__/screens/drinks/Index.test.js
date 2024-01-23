/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "../../../components/screens/drinks/Index";
import List from "../../../components/drinks/List";

jest.mock("../../../components/drinks/List", () => {
  return jest.fn(() => null);
});

describe("Index", () => {
  it("renders without crashing", () => {
    render(<Index />);
    expect(screen.getByText('Cocktails')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('updates search query correctly', () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'mojito' } });
    expect(searchInput.value).toBe('mojito');
  });

  it('does not update search query for less than 3 characters', () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'mo' } });
    expect(searchInput.value).toBe('mo');
    expect(List).not.toHaveBeenCalledWith({ searchQuery: 'mo' });
  });

  it('passes updated search query to List', () => {
    render(<Index />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'mojito' } });
    expect(List).toHaveBeenCalledWith({ searchQuery: 'mojito' }, {});
  });
});
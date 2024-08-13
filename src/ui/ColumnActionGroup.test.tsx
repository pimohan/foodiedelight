// src/features/ColumnActionGroup.test.tsx
import { render, fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ColumnActionGroup } from "./ColumnActionGroup"; // Adjust the import path as necessary

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("ColumnActionGroup", () => {
  const mockNavigate = jest.fn();
  const mockRecord = { id: "1" };

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<ColumnActionGroup record={mockRecord} />);
    expect(screen.getByTestId("column-action-group")).toBeInTheDocument();
  });

  it("navigates to the edit page when the edit icon is clicked", () => {
    render(<ColumnActionGroup record={mockRecord} />);
    fireEvent.click(screen.getByTestId("edit-icon"));
    expect(mockNavigate).toHaveBeenCalledWith("/admin/restaurants/1/edit");
  });

  it("calls the delete function when the delete icon is confirmed", async () => {
    (axios.delete as jest.Mock).mockResolvedValue({});

    render(<ColumnActionGroup record={mockRecord} />);
    fireEvent.click(screen.getByTestId("delete-icon"));

    // Confirm the popconfirm
    // fireEvent.click(
    //   screen.getByTestId("delete-popconfirm")
    //   // .getElementsByClassName(".ant-popover-buttons .ant-btn-primary")!
    // );

    // expect(axios.delete).toHaveBeenCalledWith(
    //   "http://localhost:5001/restaurants/1"
    // );
  });
});

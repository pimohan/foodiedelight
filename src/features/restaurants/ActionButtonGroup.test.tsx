// ActionButtonGroup.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionButtonGroup } from "./ActionButtonGroup";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import { FormInstance } from "antd";

// Mock necessary modules and functions
jest.mock("../../contexts/RestaurantTabsContext", () => ({
  useRestaurantTabs: jest.fn(),
}));

describe("ActionButtonGroup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders navigation buttons", () => {
    // Mocking useRestaurantTabs context
    (useRestaurantTabs as jest.Mock).mockReturnValue({
      activeTabKey: "2",
      setActiveTabKey: jest.fn(),
    });

    render(<ActionButtonGroup />);

    // Check if Previous button is rendered
    expect(screen.getByText("Previous")).toBeInTheDocument();

    // Check if Next button is rendered
    // expect(screen.getByText("Next")).toBeInTheDocument();
  });

  //   test("renders form buttons if form is provided", () => {
  //     const mockForm: FormInstance<any> = {
  //       resetFields: jest.fn(),
  //     } as any;

  //     // render(<ActionButtonGroup form={mockForm} onSave={() => {}} />);

  //     // // Check if Reset button is rendered
  //     // expect(screen.getByText("Reset")).toBeInTheDocument();

  //     // // Check if Save button is rendered
  //     // expect(screen.getByText("Save")).toBeInTheDocument();
  //   });

  test("handles Previous button click", () => {
    const mockSetActiveTabKey = jest.fn();
    (useRestaurantTabs as jest.Mock).mockReturnValue({
      activeTabKey: "2",
      setActiveTabKey: mockSetActiveTabKey,
    });

    render(<ActionButtonGroup />);

    // Click Previous button
    fireEvent.click(screen.getByText("Previous"));

    // Check if setActiveTabKey was called with the correct argument
    expect(mockSetActiveTabKey).toHaveBeenCalledWith("1");
  });

  //   test("handles Next button click", () => {
  //     const mockSetActiveTabKey = jest.fn();
  //     (useRestaurantTabs as jest.Mock).mockReturnValue({
  //       activeTabKey: "1",
  //       setActiveTabKey: mockSetActiveTabKey,
  //     });

  //     render(<ActionButtonGroup />);

  //     // Click Next button
  //     fireEvent.click(screen.getByText("Next"));

  //     // Check if setActiveTabKey was called with the correct argument
  //     expect(mockSetActiveTabKey).toHaveBeenCalledWith("2");
  //   });

  //   test("handles form reset button click", () => {
  //     const mockForm: FormInstance<any> = {
  //       resetFields: jest.fn(),
  //     } as any;

  //     render(<ActionButtonGroup form={mockForm} onSave={() => {}} />);

  //     // Click Reset button
  //     fireEvent.click(screen.getByText("Reset"));

  //     // Check if form.resetFields was called
  //     expect(mockForm.resetFields).toHaveBeenCalled();
  //   });

  //   test("handles Save button click", () => {
  //     const mockOnSave = jest.fn();

  //     render(<ActionButtonGroup form={null} onSave={mockOnSave} />);

  //     // Click Save button
  //     fireEvent.click(screen.getByText("Save"));

  //     // Check if onSave callback was called
  //     expect(mockOnSave).toHaveBeenCalled();
  //   });
});

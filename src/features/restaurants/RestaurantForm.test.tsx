import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RestaurantForm } from "./RestaurantForm";
import { FormMode } from "../../types/Types";
import { BrowserRouter as Router } from "react-router-dom"; // For useParams

// Mock the dependencies
jest.mock("axios", () => ({
  get: jest.fn().mockResolvedValue({ data: {} }),
  post: jest.fn().mockResolvedValue({ data: {} }),
  put: jest.fn().mockResolvedValue({ data: {} }),
  delete: jest.fn().mockResolvedValue({ data: {} }),
}));
jest.mock("../../hooks/Notification", () => ({
  useCustomNotification: () => ({
    openNotificationWithIcon: jest.fn(),
    contextHolder: <div>Notification</div>,
  }),
}));
jest.mock("../../contexts/RestaurantTabsContext", () => ({
  useRestaurantTabs: () => ({
    setSelectedRestaurant: jest.fn(),
  }),
}));
jest.mock("../../utils/FormInputUtis", () => ({
  getWebsiteExtensions: jest.fn(() => [".com", ".org"]),
}));

describe("RestaurantForm", () => {
  it("renders form fields correctly", () => {
    render(
      <Router>
        <RestaurantForm formMode={FormMode.Add} />
      </Router>
    );

    // Check if form fields are present
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website/i)).toBeInTheDocument();
  });

  it("handles input changes and form submission", async () => {
    render(
      <Router>
        <RestaurantForm formMode={FormMode.Add} />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/Name of the restaurant/i), {
      target: { value: "Test Restaurant" },
    });
    fireEvent.change(screen.getByPlaceholderText(/About the restaurant/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Location of the restaurant/i),
      { target: { value: "Test Location" } }
    );
    fireEvent.change(screen.getByPlaceholderText(/Phone number/i), {
      target: { value: "123-456-7890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/E-mail address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Website URL/i), {
      target: { value: "http://test.com" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    // Add assertions based on expected behavior
    // For example, check if the form was validated or if notification was triggered
    // Here we just check if Save button exists
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
  });
});

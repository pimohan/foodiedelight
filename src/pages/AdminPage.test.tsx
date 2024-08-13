import { render, screen } from "@testing-library/react"; // Import React Testing Library functions
import AdminPage from "./AdminPage"; // Adjust the path as needed

// Mock the AdminLayout component
jest.mock("../features/authentication/AdminLayout", () => ({
  AdminLayout: () => <div>AdminLayout Component</div>,
}));

describe("AdminPage", () => {
  it("should render the AdminLayout component", () => {
    render(<AdminPage />); // Render the AdminPage component

    // Check if AdminLayout component's content is present in the document
    expect(screen.getByText("AdminLayout Component")).toBeInTheDocument();
  });
});

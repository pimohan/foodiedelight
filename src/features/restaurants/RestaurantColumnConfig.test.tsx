import React from "react";
import { render, screen } from "@testing-library/react";
import { Table } from "antd";
import { RestaurantColumns } from "./RestaurantColumnConfig";

describe("RestaurantColumns", () => {
  const mockData = [
    {
      id: "1",
      name: "Restaurant One",
      description: "Description One",
      location: "Location One",
      category: "Category One",
    },
    {
      id: "2",
      name: "Restaurant Two",
      description: "Description Two",
      location: "Location Two",
      category: "Category Two",
    },
  ];

  it("should render the columns correctly", () => {
    render(
      <Table columns={RestaurantColumns} dataSource={mockData} rowKey="id" />
    );

    // Verify column headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    // Verify data rendering
    expect(screen.getByText("Restaurant One")).toBeInTheDocument();
    expect(screen.getByText("Description One")).toBeInTheDocument();
    expect(screen.getByText("Location One")).toBeInTheDocument();
    expect(screen.getByText("Category One")).toBeInTheDocument();
    expect(screen.getByTestId("action-1")).toBeInTheDocument();

    expect(screen.getByText("Restaurant Two")).toBeInTheDocument();
    expect(screen.getByText("Description Two")).toBeInTheDocument();
    expect(screen.getByText("Location Two")).toBeInTheDocument();
    expect(screen.getByText("Category Two")).toBeInTheDocument();
    expect(screen.getByTestId("action-2")).toBeInTheDocument();
  });
});

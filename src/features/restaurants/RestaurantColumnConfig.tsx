import { TableColumnsType } from "antd";
import { ColumnActionGroup } from "../../ui/ColumnActionGroup";

// Define the type for restaurant data
interface RestaurantType {
  id: React.Key;
  name: string;
  description: string;
  location: string;
  category: string;
}

// Define the columns configuration for the restaurant table
export const RestaurantColumns: TableColumnsType<RestaurantType> = [
  // Column for restaurant name
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "25%",
    ellipsis: true, // Truncate text with ellipsis if it overflows
    fixed: true, // Fixed column to the left
    defaultSortOrder: "ascend", // Default sort order
    sorter: (a, b) => a.name.length - b.name.length, // Sort by name length
  },
  // Column for restaurant description
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "30%",
    ellipsis: true, // Truncate text with ellipsis if it overflows
    responsive: ["md", "lg"], // Show on medium and larger screens
    sorter: (a, b) => a.description.length - b.description.length, // Sort by description length
  },
  // Column for restaurant location
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    width: "30%",
    ellipsis: true, // Truncate text with ellipsis if it overflows
    responsive: ["sm", "md", "lg"], // Show on small and larger screens
    sorter: (a, b) => a.location.length - b.location.length, // Sort by location length
  },
  // Column for restaurant category
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "20%",
    responsive: ["sm", "md", "lg"], // Show on small and larger screens
    sorter: (a, b) => a.category.length - b.category.length, // Sort by category length
  },
  // Column for action buttons
  {
    title: "Action",
    key: "operation",
    fixed: "right", // Fixed column to the right
    width: 100,
    render: (_, record) => <ColumnActionGroup record={record} />, // Render action group component
  },
];

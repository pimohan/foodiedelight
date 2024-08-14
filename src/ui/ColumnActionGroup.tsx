import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from "../contexts/RestaurantsContext";

interface ColumnActionGroupProps {
  record: any; // Represents the record for which actions are provided
}

export const ColumnActionGroup = ({ record }: ColumnActionGroupProps) => {
  const navigate = useNavigate();
  const { restaurantService, setReload } = useRestaurants();

  // Function to handle the deletion of a record
  const handleDelete = async () => {
    await restaurantService?.deleteRestaurant(record.id);
    setReload(true);
  };

  return (
    <div className="column-action-group" data-testid="column-action-group">
      <EditTwoTone
        title="Edit"
        onClick={() => navigate(`/admin/restaurants/${record.id}/edit`)} // Navigate to the edit page
        data-testid="edit-icon"
      />

      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => handleDelete()}
        data-testid="delete-popconfirm"
      >
        <DeleteTwoTone title="Delete" data-testid="delete-icon" />
      </Popconfirm>
    </div>
  );
};

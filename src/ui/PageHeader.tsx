import { useLocation, useParams } from "react-router-dom";
import { Layout } from "antd";

import { removeElement } from "../utils/ArrayUtil";

const { Header } = Layout;

export const PageHeader = () => {
  const location = useLocation();
  const { restaurantId } = useParams(); // Get the restaurantId parameter from the URL

  // Construct the title by removing the restaurantId from the path segments and joining them with " - "
  const title = removeElement(
    location.pathname.split("/").slice(2),
    restaurantId
  ).join(" - ");

  return <Header className="app-header">{title}</Header>; // Render the title in the Header component
};

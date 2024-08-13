import { useEffect, useState } from "react";
import { Table } from "antd";

import { RestaurantColumns } from "./RestaurantColumnConfig";
import { ToolBar } from "./ToolBar";
import { useRestaurants } from "../../contexts/RestaurantsContext";
import { getItem, setItem } from "../../utils/LocalStorageUtil";

const RestaurantsList = () => {
  // State hooks for managing data, loading state, pagination, etc.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    parseInt(getItem("pageSize") || "10")
  );

  // Access search text from context
  const { restaurantService, reload, setReload, searchText } = useRestaurants();

  // Function to fetch data from the API
  const fetchData = useCallback(
    async (page: number, size: number) => {
      setLoading(true);
      try {
        let response = null;

        if (page === 1 && total === 0) {
          response = await restaurantService?.getRestaurants(page);
          setData(response?.data?.data);
          setTotal(parseInt(response?.data?.items, 10));
        } else {
          response = await restaurantService?.getRestaurants(page, size);
          setData(response?.data);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
      setReload(false);
      setLoading(false);
    },
    [total, setReload, restaurantService] // Add dependencies here
  );

  // Handle table pagination changes
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    setItem("pageSize", pagination.pageSize);
  };

  // Fetch data when current page or page size changes
  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize, fetchData]);

  // Fetch data with a delay when search text changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(currentPage, pageSize);
      console.log("Text", searchText);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentPage, pageSize, searchText, fetchData]);

  useEffect(() => {
    if (reload) {
      fetchData(currentPage, pageSize);
    }
  }, [reload, fetchData, currentPage, pageSize]);

  return (
    <div>
      <header>
        {/* Toolbar component */}
        <ToolBar parentRoute={null} />
      </header>
      <main>
        <Table
          rowKey="id"
          size="small"
          columns={RestaurantColumns}
          dataSource={data}
          scroll={{ y: "calc(100vh - 350px)" }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "40", "50"],
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </main>
    </div>
  );
};

export default RestaurantsList;

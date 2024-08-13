import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { ProtectedRoute } from "./features/authentication/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { FormMode } from "./types/Types";
import { ErrorBoundary } from "./ui/ErrorBounday";

const DELAY = 150;
const delay = () => new Promise((resolve) => setTimeout(resolve, DELAY));

// Lazy load the components
const AdminPage = lazy(() => delay().then(() => import("./pages/AdminPage")));
const LoginPage = lazy(() => delay().then(() => import("./pages/LoginPage")));
const UserProfile = lazy(() =>
  delay().then(() => import("./features/authentication/UserProfile"))
);
const RestaurantsLayout = lazy(() =>
  delay().then(() => import("./features/restaurants/RestaurantsLayout"))
);
const RestaurantsList = lazy(() =>
  delay().then(() => import("./features/restaurants/RestaurantsList"))
);
const RestaurantTabs = lazy(() =>
  delay().then(() => import("./features/restaurants/RestaurantTabs"))
);

// Loading fallback component
const Loading = () => <Spin size="default" fullscreen />;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <ProtectedRoute element={<AdminPage />} />
      </Suspense>
    ),
    children: [
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute element={<UserProfile />} />
          </Suspense>
        ),
      },
      {
        path: "restaurants",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute element={<RestaurantsLayout />} />
          </Suspense>
        ),
        children: [
          {
            path: "list",
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute element={<RestaurantsList />} />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  element={<RestaurantTabs formMode={FormMode.Add} />}
                />
              </Suspense>
            ),
          },
          {
            path: ":restaurantId/edit",
            element: (
              <Suspense fallback={<Loading />}>
                <ProtectedRoute
                  element={<RestaurantTabs formMode={FormMode.Edit} />}
                />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

root.render(
  <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

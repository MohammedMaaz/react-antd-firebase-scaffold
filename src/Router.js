import React from "react";
import {
  Switch,
  Route as RouterRoute,
  Redirect,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import { connect } from "dva";
import PageSpinner from "./components/Spinner/PageSpinner";
import { routes } from "./utils/config";
import { setComputedRoutes } from "./models/router";

//layouts
import EmptyLayout from "./layouts/EmptyLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { getRoutePath } from "./utils";
import RootWrapper from "./components/RootWrapper";

const routeRenderer = (
  routes,
  prefix = "",
  basePath = "",
  parentConfig = {}
) => {
  const allRoutes = [];
  const computedRoutes = [];

  routes.forEach((route, i) => {
    const routePath = getRoutePath(basePath, route.route?.path || "");
    if (route.subRoutes) {
      const [ar, cr] = routeRenderer(
        route.subRoutes,
        prefix + i + ".",
        routePath,
        route
      );
      allRoutes.push(...ar);
      computedRoutes.push(...cr);
    }

    if (route.route?.path && route.component) {
      allRoutes.push(
        <Route
          key={prefix + i}
          layoutType={route.layoutType || parentConfig.layoutType}
          authType={route.authType || parentConfig.authType}
          {...route.route}
          path={routePath}
        >
          <route.component />
        </Route>
      );
      computedRoutes.push({
        ...route,
        key: prefix + i,
        route: { ...route.route, path: routePath },
      });
    }
  });

  return [allRoutes, computedRoutes];
};

export default connect(undefined, { setComputedRoutes })(function Router({
  setComputedRoutes,
}) {
  const [ar, cr] = routeRenderer(routes);
  setComputedRoutes(cr);

  return (
    <BrowserRouter>
      <RootWrapper>
        <Switch>{ar}</Switch>
      </RootWrapper>
    </BrowserRouter>
  );
});

const LayoutWrapper = ({ type, children }) => {
  switch (type) {
    case "empty":
      return <EmptyLayout>{children}</EmptyLayout>;
    case "auth":
      return <AuthLayout>{children}</AuthLayout>;
    case "dashboard":
      return <DashboardLayout>{children}</DashboardLayout>;
    case "none":
    default:
      return children;
  }
};

const AuthWrapper = connect(({ auth }) => ({
  isLoggedIn: auth.user,
}))(({ isLoggedIn, type, children }) => {
  const location = useLocation();

  switch (type) {
    case "only-authenticated":
      if (isLoggedIn === undefined) return <PageSpinner text="Loading" />;
      else if (isLoggedIn === null)
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      return children;
    case "only-unauthenticated":
      if (isLoggedIn === undefined) return <PageSpinner text="Loading" />;
      else if (isLoggedIn !== null)
        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      return children;
    case "none":
    default:
      return children;
  }
});

const Route = ({
  authType = "none",
  layoutType = "empty",
  children,
  ...props
}) => {
  return (
    <RouterRoute {...props}>
      <AuthWrapper type={authType}>
        <LayoutWrapper type={layoutType}>{children}</LayoutWrapper>
      </AuthWrapper>
    </RouterRoute>
  );
};

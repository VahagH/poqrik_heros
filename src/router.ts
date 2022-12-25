import React from "react";

export const ROLES = ["user", "admin"];

export interface PageProps {
  name: string;
  path: string;
  navBar?: boolean;
  component?: any;
  role?: string[];
  onClick?: () => void;
}
export const publicPages: PageProps[] = [
  {
    name: "Գլխավոր",
    path: "/",
    navBar: true,
    component: React.lazy(() => import("./pages/publicPages/Home")),
  },
  {
    name: "Տոնական",
    path: "/dresses",
    navBar: true,
    component: React.lazy(() => import("./pages/publicPages/Dresses")),
  },
  {
    name: "Ընտրվածներ",
    path: "/favorites",
    navBar: false,
    component: React.lazy(() => import("./pages/publicPages/Favorites")),
  },
  {
    name: "Կերպարներ",
    path: "/shapes",
    navBar: true,
    component: React.lazy(() => import("./pages/publicPages/Shapes")),
  },
];
export const privatePagesWithCode: PageProps[] = [
  {
    name: "Log In",
    path: "/admin",
    navBar: false,
    component: React.lazy(() => import("./pages/privatePages/LogIn")),
  },
  {
    name: "Reset Password",
    path: "/resetPassword",
    navBar: false,
    component: React.lazy(() => import("./pages/privatePages/ForgotPassword")),
  },
];

export const privatePages: PageProps[] = [
  {
    name: "Ամրագրումներ",
    path: "/reservation",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Reservations")),
  },
  {
    name: "Օգտվողներ",
    path: "/users",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Users")),
  },
  {
    name: "Հաշվետվություն",
    path: "/report",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Reports")),
  },
  {
    name: "Իմ էջը",
    path: "/myAccount",
    navBar: false,
    component: React.lazy(() => import("./pages/privatePages/Reports")),
  },
];

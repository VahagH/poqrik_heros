import React from "react";

export interface PageProps {
  name: string;
  path: string;
  navBar?: boolean;
  component: any;
}
export const publicPages: PageProps[] = [
  {
    name: "Log In",
    path: "/",
    navBar: false,
    component: React.lazy(() => import("./pages/publicPages/LogIn")),
  },
  {
    name: "Reset Password",
    path: "/resetPassword",
    navBar: false,
    component: React.lazy(() => import("./pages/publicPages/ForgotPassword")),
  },
];

export const privatePages: PageProps[] = [
  {
    name: "Տոնական",
    path: "/dresses",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Dresses")),
  },
  {
    name: "Կերպարներ",
    path: "/shapes",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Shapes")),
  },
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
];

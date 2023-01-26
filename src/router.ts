import React from "react";
import { PageProps, ROLES } from "./support/types";

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
    disable: true,
    component: React.lazy(() => import("./pages/publicPages/Favorites")),
  },
  {
    name: "Կերպարներ",
    path: "/shapes",
    navBar: true,
    component: React.lazy(() => import("./pages/publicPages/Shapes")),
  },
  {
    name: "Ինֆո",
    path: "/info/:id",
    navBar: false,
    component: React.lazy(() => import("./pages/publicPages/Description")),
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
    path: "/reservations",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Reservations")),
    role: [ROLES.admin, ROLES.user],
  },
  {
    name: "Օգտվողներ",
    path: "/users",
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Users")),
    role: [ROLES.admin],
  },
  {
    name: "Հաշվետվություն",
    path: "/reports",
    disable: true,
    navBar: true,
    component: React.lazy(() => import("./pages/privatePages/Reports")),
    role: [ROLES.admin],
  },
  {
    name: "Իմ էջը",
    path: "/profile",
    navBar: false,
    component: React.lazy(() => import("./pages/privatePages/MyProfile")),
    role: [ROLES.admin, ROLES.user],
  },
  {
    name: "Տեսականի",
    path: "/assortment",
    navBar: false,
    component: React.lazy(() => import("./pages/privatePages/Assortment")),
    role: [ROLES.admin],
  },
];

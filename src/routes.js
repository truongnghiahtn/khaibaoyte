import UserPage from "./page/home/UserPage";
import AskPage from "./page/home/AskPage";
import Home from "./page/home/Home";

const routesHome = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/user",
    exact: false,
    component: UserPage,
  },
  {
    path: "/ask",
    exact: false,
    component: AskPage,
  },
];

export { routesHome };

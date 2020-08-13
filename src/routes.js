import UserPage from "./page/home/UserPage";
import AskPage from "./page/home/AskPage";

const routesHome = [
  {
    path: "/",
    exact: true,
    component: UserPage,
  },
  {
    path: "/ask",
    exact: false,
    component: AskPage,
  },
];

export { routesHome };

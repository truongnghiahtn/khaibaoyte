import UserPage from "./page/home/UserPage";
import Home from "./page/home/Home";
import Submit from "./components/pageSubmit"

const routesHome = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: `/user`,
    exact: false,
    component: UserPage,
  },
  {
    path: "/Submit",
    exact: false,
    component: Submit,
  },
];

export { routesHome };

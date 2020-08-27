import UserPage from "./page/home/UserPage";
import Home from "./page/home/Home";
import Submit from "./page/home/pageSubmit";
import Dashboard from "./page/dasboard/Dasboard";
import Chart from "./components/chart"
import Chart1 from "./components/chart1"

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
  {
    path: "/Dashboard",
    exact: false,
    component: Dashboard,
  },
  {
    path: "/chart",
    exact: false,
    component: Chart,
  },
  {
    path: "/chart1",
    exact: false,
    component: Chart1,
  },
];

export { routesHome };

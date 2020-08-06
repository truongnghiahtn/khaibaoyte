import TrangChu from "./page/home/Home";





const routesHome = [
  {
    path: "/",
    exact: true,
    component: TrangChu
  },
  {
    path: "/Trangchu",
    exact: false,
    component: TrangChu
  },
];

export { routesHome };


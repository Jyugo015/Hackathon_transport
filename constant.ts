export type MenuItem = {
  name: string;
  link: string;
  dropdown?: { name: string; link: string }[];
};

export const MENU_ITEMS: MenuItem[] = [
  { name: "Home", link: "/" },
  {
    name: "BusUM",
    link: "/busum",
    dropdown: [
      { name: "Route AB", link: "/busum/route/route-ab" },
      { name: "Route BA", link: "/busum/route/route-ba" },
      { name: "Route C", link: "/busum/route/route-c" },
      { name: "Route College 13", link: "/busum/route/route-college-13" },
      { name: "Route D", link: "/busum/route/route-d" },
      { name: "Route E", link: "/busum/route/route-e" },
    ],
  },
  {
    name: "RapidBus",
    link: "/rapidbus",
    dropdown: [
      { name: "T815", link: "/rapidbus/t815" },
      { name: "T789", link: "/rapidbus/t789" },
    ],
  },
  { name: "DRT", link: "/drt" },
];

export type MenuItem = {
  name: string;
  link: string;
  dropdown?: { name: string; link: string }[];
};

export const MENU_ITEMS: MenuItem[] = [
  { name: "Home", link: "/" },
  { name: "Grabbit Ride", link: "/grabbit_ride" },
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

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "Grabbit Ride", url: "/grabbit_ride" },
      { title: "UM Bus", url: "/busum" },
      { title: "RapidBus", url: "/rapidbus" },
      { title: "DRT", url: "/drt" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "LinkedIn", url: "#" },
      { title: "Twitter", url: "#" },
      { title: "GitHub", url: "#" },
      { title: "Portfolio", url: "#" },
    ],
  },
];

export type BusRoute = {
  name: string;
  mapUrl: string;
  timetable: { time: string }[];
  busStop: { name: string }[];
};

export type BusRoutes = Record<string, BusRoute>;

export const BUS_ROUTES: BusRoutes = {
  "route-ab": {
    name: "Route AB",
    mapUrl: "/images/route-ab-map.png",
    timetable: [
      { time: "7:30 AM" },
      { time: "7:50 AM" },
      { time: "8:10 AM" },
      { time: "8:30 AM" },
      { time: "8:50 AM" },
      { time: "9:10 AM" },
      { time: "9:30 AM" },
      { time: "10:30 AM" },
      { time: "11:00 AM" },
      { time: "11:30 AM" },
      { time: "12:00 PM" },
      { time: "1:30 PM" },
      { time: "2:00 PM" },
      { time: "3:00 PM" },
      { time: "4:00 PM" },
      { time: "5:30 PM" },
      { time: "6:00 PM" },
      { time: "7:00 PM" },
      { time: "8:00 PM" },
      { time: "9:00 PM" },
    ],
    busStop: [
      { name: "Um Central" },
      { name: "KK3/4/7" },
      { name: "KK8/10" },
      { name: "Academy of Islamic Studies" },
      { name: "KK11" },
      { name: "KK12" },
      { name: "KK1" },
      { name: "Faculty of Engineering" },
      { name: "Um Central" },
    ],
  },
  "route-ba": {
    name: "Route BA",
    mapUrl: "/images/route-ba-map.png",
    timetable: [
      { time: "7:30 AM" },
      { time: "7:50 AM" },
      { time: "8:10 AM" },
      { time: "8:30 AM" },
      { time: "8:50 AM" },
      { time: "9:10 AM" },
      { time: "9:30 AM" },
      { time: "10:30 AM" },
      { time: "11:00 AM" },
      { time: "11:30 AM" },
      { time: "12:00 PM" },
      { time: "1:30 PM" },
      { time: "2:00 PM" },
      { time: "3:00 PM" },
      { time: "4:00 PM" },
      { time: "5:30 PM" },
      { time: "6:00 PM" },
      { time: "7:00 PM" },
      { time: "8:00 PM" },
      { time: "9:00 PM" },
    ],
    busStop: [
      { name: "Um Central" },
      { name: "Pasum" },
      { name: "KK5" },
      { name: "Academy of Islamic Studies" },
      { name: "KK8/10" },
      { name: "Academy of Malay Studies" },
      { name: "KK3/4/7" },
      { name: "Faculty of Science" },
    ],
  },
};

export type RapidBus = {
  name: string;
};

export type RapidBuses = Record<string, RapidBus>;

export const RAPID_BUSES: RapidBuses = {
  t815: {
    name: "T815",
  },
  t789: {
    name: "T789",
  },
};

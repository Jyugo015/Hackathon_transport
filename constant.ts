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

export const HERO_ITEMS = [
  "/images/hero/carousel/carousel-1.jpeg",
  "/images/hero/carousel/carousel-2.jpg",
  "/images/hero/carousel/carousel-3.jpg",
  "/images/hero/carousel/carousel-4.jpg",
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
    mapUrl: "/images/busum/route-ab-map.jpg",
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
    mapUrl: "/images/busum/route-ba-map.jpg",
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
  "route-c": {
    name: "Route C",
    mapUrl: "/images/busum/route-c-map.jpg",
    timetable: [
      { time: "7:30 AM" },
      { time: "8:00 AM" },
      { time: "8:30 AM" },
      { time: "9:00 AM" },
      { time: "9:30 AM" },
      { time: "10:30 AM" },
      { time: "11:00 AM" },
      { time: "11:30 AM" },
      { time: "12:00 PM" },
      { time: "3:00 PM" },
      { time: "4:00 PM" },
      { time: "6:00 PM" },
      { time: "7:00 PM" },
      { time: "8:00 PM" },
      { time: "9:00 PM" },
    ],
    busStop: [
      { name: "Um Central" },
      { name: "Pasum" },
      { name: "Angkasapuri" },
      { name: "Pantai Permai" },
      { name: "Bangsar South" },
      { name: "Faculty of Engineering" },
      { name: "Um Central" },
    ],
  },
  "route-college-13": {
    name: "Route College 13",
    mapUrl: "/images/busum/route-college-13-map.jpg",
    timetable: [{ time: "7:30 AM" }, { time: "8:00 AM" }],
    busStop: [
      { name: "Um Central" },
      { name: "Pasum" },
      { name: "Angkasapuri" },
      { name: "Pantai Permai" },
      { name: "Bangsar South" },
      { name: "Faculty of Engineering" },
      { name: "Um Central" },
    ],
  },
  "route-d": {
    name: "Route D",
    mapUrl: "/images/busum/route-d-map.jpg",
    timetable: [
      { time: "7:30 AM" },
      { time: "8:00 AM" },
      { time: "8:30 AM" },
      { time: "9:00 AM" },
      { time: "9:30 AM" },
      { time: "10:30 AM" },
      { time: "11:00 AM" },
      { time: "11:30 AM" },
      { time: "12:00 PM" },
      { time: "3:00 PM" },
      { time: "4:00 PM" },
      { time: "6:00 PM" },
      { time: "7:00 PM" },
      { time: "8:00 PM" },
      { time: "9:00 PM" },
    ],
    busStop: [
      { name: "Faculty of Engineering (West)" },
      { name: "International House" },
      { name: "Rapid Stop 1" },
      { name: "Rapid Stop 2: S.K. Sri Damai" },
      { name: "Rapid Stop 3: PJ 219 Happy Mansion Apartment" },
      { name: "Rapid Stop 4: PJ 220 Happy Apartment Gate a" },
      { name: "Rapid Stop 5: PJ 233 Shell 17/22" },
      { name: "Uia PJ (Barat)" },
      { name: "Kolej Kediaman Ke-13" },
      { name: "UM Central" },
    ],
  },
  "route-e": {
    name: "Route E",
    mapUrl: "/images/busum/route-e-map.jpg",
    timetable: [{ time: "7:30 AM" }, { time: "8:00 AM" }],
    busStop: [
      { name: "Um Central" },
      { name: "KK9" },
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

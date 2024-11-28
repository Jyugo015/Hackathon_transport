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

export type HeroItem = {
  img: string;
  path: string;
  title: string;
};

export const HERO_ITEMS: HeroItem[] = [
  {
    img: "/images/hero/carousel/carousel-1.jpeg",
    path: "/grabbit_ride",
    title: "Grabbit Ride",
  },
  {
    img: "/images/hero/carousel/carousel-2.jpg",
    path: "/busum",
    title: "BusUM",
  },
  {
    img: "/images/hero/carousel/carousel-3.jpg",
    path: "/rapidbus",
    title: "RapidBus",
  },
  { img: "/images/hero/carousel/carousel-4.jpg", path: "/drt", title: "DRT" },
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
  urlPath: string;
  timetable_img?: string;
  timetable_WDays?: { time: string }[];
  timetable_WEnds?: { time: string }[];
};

export type RapidBuses = Record<string, RapidBus>;

export const RAPID_BUSES: RapidBuses = {
  t815: {
    name: "T815",
    urlPath: "https://myrapidbus.prasarana.com.my/kiosk?route=700&bus=",
    timetable_img: "/images/rapidbus/t815-timetable.jpg",
  },
  t789: {
    name: "T789",
    urlPath: "https://myrapidbus.prasarana.com.my/kiosk?route=733&bus=",
    timetable_WDays: [
      { time: "05:55" },
      { time: "06:10" },
      { time: "06:25" },
      { time: "06:40" },
      { time: "06:55" },
      { time: "07:10" },
      { time: "07:25" },
      { time: "07:40" },
      { time: "07:55" },
      { time: "08:10" },
      { time: "08:25" },
      { time: "08:40" },
      { time: "08:55" },
      { time: "09:10" },
      { time: "09:30" },
      { time: "09:50" },
      { time: "10:10" },
      { time: "10:30" },
      { time: "10:50" },
      { time: "11:10" },
      { time: "11:30" },
      { time: "11:50" },
      { time: "12:10" },
      { time: "12:30" },
      { time: "12:50" },
      { time: "13:10" },
      { time: "13:30" },
      { time: "13:50" },
      { time: "14:10" },
      { time: "14:25" },
      { time: "14:40" },
      { time: "14:55" },
      { time: "15:10" },
      { time: "15:25" },
      { time: "15:40" },
      { time: "15:55" },
      { time: "16:10" },
      { time: "16:25" },
      { time: "16:40" },
      { time: "16:55" },
      { time: "17:10" },
      { time: "17:25" },
      { time: "17:40" },
      { time: "17:55" },
      { time: "18:10" },
      { time: "18:30" },
      { time: "18:50" },
      { time: "19:10" },
      { time: "19:30" },
      { time: "19:50" },
      { time: "20:10" },
      { time: "20:35" },
      { time: "21:00" },
      { time: "21:25" },
      { time: "21:50" },
      { time: "22:15" },
      { time: "22:40" },
      { time: "23:00" },
      { time: "23:20" },
      { time: "23:40" },
    ],
    timetable_WEnds: [
      { time: "06:10" },
      { time: "06:30" },
      { time: "06:50" },
      { time: "07:10" },
      { time: "07:30" },
      { time: "07:50" },
      { time: "08:10" },
      { time: "08:30" },
      { time: "08:50" },
      { time: "09:10" },
      { time: "09:30" },
      { time: "09:50" },
      { time: "10:10" },
      { time: "10:30" },
      { time: "11:00" },
      { time: "11:30" },
      { time: "12:00" },
      { time: "12:20" },
      { time: "12:40" },
      { time: "13:00" },
      { time: "13:20" },
      { time: "13:40" },
      { time: "14:00" },
      { time: "14:30" },
      { time: "15:00" },
      { time: "15:30" },
      { time: "16:00" },
      { time: "16:30" },
      { time: "17:00" },
      { time: "17:30" },
      { time: "18:00" },
      { time: "18:30" },
      { time: "19:00" },
      { time: "19:30" },
      { time: "20:00" },
      { time: "21:00" },
      { time: "21:30" },
      { time: "22:00" },
      { time: "22:30" },
      { time: "23:00" },
    ],
  },
};

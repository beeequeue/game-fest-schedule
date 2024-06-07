type Event = {
  name: string
  dateTime: Date
  url?: string
}

export const events = [
  {
    name: "PlayStation State of Play",
    dateTime: new Date("2024-05-31 00:00Z+2"),
    url: "https://www.youtube.com/watch?v=m-4ZM3jxhdE",
  },
  {
    name: "Summer Game Fest",
    dateTime: new Date("2024-06-07 23:00Z+2"),
    url: "https://www.youtube.com/watch?v=pZzia5NrMuU",
  },
  {
    name: "Day of the Devs",
    dateTime: new Date("2024-06-08 01:00Z+2"),
    url: "https://www.youtube.com/watch?v=pZzia5NrMuU",
  },
  {
    name: "Devolver's annual games showcase",
    dateTime: new Date("2024-06-08 02:00Z+2"),
    url: "https://www.youtube.com/watch?v=pZzia5NrMuU",
  },
  {
    name: "Future of Play Direct",
    dateTime: new Date("2024-06-08 17:00Z+2"),
  },
  {
    name: "Wholesome Direct",
    dateTime: new Date("2024-06-08 18:00Z+2"),
  },
  {
    name: "Latin American Games Showcase",
    dateTime: new Date("2024-06-08 19:00Z+2"),
  },
  {
    name: "Women Led Games",
    dateTime: new Date("2024-06-08 20:30Z+2"),
  },
  {
    name: "Future Games Show",
    dateTime: new Date("2024-06-08 21:00Z+2"),
    url: "https://www.youtube.com/watch?v=1jXmyz452hs",
  },
  {
    name: "Xbox Games Showcase",
    dateTime: new Date("2024-06-09 19:00Z+2"),
    url: "https://www.youtube.com/watch?v=8LZM-mxaPlQ",
  },
  {
    name: "PC Gaming Show",
    dateTime: new Date("2024-06-09 22:00Z+2"),
    url: "https://www.youtube.com/watch?v=af4QRDcl3r8",
  },
  {
    name: "Ubisoft Backwards",
    dateTime: new Date("2024-06-10 21:00Z+2"),
    url: "https://www.youtube.com/watch?v=0QNRXquzTts",
  },
] satisfies Event[]

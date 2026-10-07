// Edit this file to change the festival name, dates, events, announcements and gallery.
const SITE = {
  festName: "Spectrum 2026",
  college: "Your College Name",
  tagline: "Three days of code, culture and competition.",
  start: "2026-11-20T09:00:00",
  days: ["Day 1 · Fri 20 Nov", "Day 2 · Sat 21 Nov", "Day 3 · Sun 22 Nov"],
  contactEmail: "fest@yourcollege.edu",
  contactPhone: "+91 00000 00000",
};

const EVENTS = [
  { id: "hack24", title: "CodeStorm Hackathon", category: "Technical", day: 1, time: "09:30 AM", venue: "Computer Lab A", fee: 200, desc: "Build a working prototype in 12 hours. Teams of up to 4." },
  { id: "quiz", title: "Tech Quiz League", category: "Technical", day: 1, time: "02:00 PM", venue: "Seminar Hall", fee: 50, desc: "Rapid-fire rounds on computing, science and current affairs." },
  { id: "robo", title: "RoboRace", category: "Technical", day: 2, time: "10:00 AM", venue: "Mechanical Workshop", fee: 300, desc: "Design a line-following robot and race it against the clock." },
  { id: "datathon", title: "Data Detective", category: "Technical", day: 2, time: "01:30 PM", venue: "Computer Lab B", fee: 100, desc: "Clean, analyse and present insights from a mystery dataset." },
  { id: "dance", title: "Rhythm Rush (Group Dance)", category: "Cultural", day: 2, time: "05:00 PM", venue: "Main Auditorium", fee: 150, desc: "Teams of 4 to 12 perform a 5-minute routine in any style." },
  { id: "music", title: "Unplugged Voices", category: "Cultural", day: 3, time: "11:00 AM", venue: "Open Air Stage", fee: 0, desc: "Solo and duet singing, acoustic instruments welcome." },
  { id: "drama", title: "Nukkad Natak (Street Play)", category: "Cultural", day: 3, time: "03:00 PM", venue: "Central Courtyard", fee: 100, desc: "A 10-minute street play on a social theme of your choice." },
  { id: "cricket", title: "Box Cricket Cup", category: "Sports", day: 1, time: "04:00 PM", venue: "Sports Ground", fee: 250, desc: "Six-a-side knockout tournament. Bring your own team." },
  { id: "chess", title: "Checkmate Open", category: "Sports", day: 3, time: "09:30 AM", venue: "Library Hall", fee: 50, desc: "Swiss-system chess for all skill levels." },
  { id: "uiux", title: "UI/UX Design Workshop", category: "Workshop", day: 1, time: "11:00 AM", venue: "Seminar Hall", fee: 0, desc: "Hands-on session on wireframing and prototyping with an industry mentor." },
  { id: "ml", title: "Intro to Machine Learning", category: "Workshop", day: 3, time: "10:00 AM", venue: "Computer Lab A", fee: 0, desc: "Train your first model in Python. Laptop required." },
];

const ANNOUNCEMENTS = [
  { date: "2026-10-06", text: "Registrations are open for all events. Early sign-ups get priority seating at workshops." },
  { date: "2026-10-04", text: "CodeStorm Hackathon: team size is now up to 4 members." },
  { date: "2026-10-01", text: "Volunteer applications for the organising committee close on 15 October." },
];

// Add a real photo by setting src (for example "images/dance.jpg"). Without src, a coloured tile is shown.
const GALLERY = [
  { title: "Opening ceremony", category: "Highlights", colors: ["#5b2be0", "#ff4d8d"] },
  { title: "Hackathon night", category: "Technical", colors: ["#1d1a2f", "#5b2be0"] },
  { title: "Robot race finals", category: "Technical", colors: ["#0f5d37", "#2fbf71"] },
  { title: "Group dance", category: "Cultural", colors: ["#a0124f", "#ff4d8d"] },
  { title: "Street play", category: "Cultural", colors: ["#ff8a3d", "#ffd23f"] },
  { title: "Unplugged evening", category: "Cultural", colors: ["#3f1aa8", "#8a4dff"] },
  { title: "Cricket final", category: "Sports", colors: ["#0b6e99", "#37c5ff"] },
  { title: "Chess open", category: "Sports", colors: ["#2b2b3a", "#6c6c8a"] },
  { title: "Prize distribution", category: "Highlights", colors: ["#c28a00", "#ffd23f"] },
];

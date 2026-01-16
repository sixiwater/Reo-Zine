
import { Memory } from './types';

// Approximate bounds of China for simplified projection
export const MAP_BOUNDS = {
  minLon: 98, 
  maxLon: 125,
  minLat: 20,
  maxLat: 42
};

export const MEMORIES: Memory[] = [
  { 
    year: 2017,
    displayYear: "2017", 
    city: "Hangzhou", 
    coords: [120.15, 30.28], 
    title: "The Meeting", 
    tag: "Start",
    image: "https://picsum.photos/seed/2017_start/600/800",
    stories: [
      {
        content: "Opposite dreams: One wanted to stay single, one wanted a family. We shared a dorm and a youth.",
        title: "Xixi Dormitory"
      },
      {
        content: "Late night talks about the future. We didn't know then how our paths would diverge and converge again.",
        image: "https://picsum.photos/seed/2017_night/600/800",
        title: "Night Talks"
      }
    ]
  },
  {
    year: 2018,
    displayYear: "2018",
    city: "Hangzhou",
    coords: [120.20, 30.20], // Slight offset
    title: "Carefree Days",
    tag: "Youth",
    image: "https://picsum.photos/seed/2018_fun/600/800",
    stories: [
        {
            content: "The year of exploration. We walked through the mist of the West Lake, believing time was infinite.",
            title: "West Lake Mist"
        }
    ]
  },
  { 
    year: 2019, 
    displayYear: "2019", 
    city: "Beijing", 
    coords: [116.40, 39.90], 
    title: "The Decisive Turn", 
    tag: "Change",
    image: "https://picsum.photos/seed/2019_beijing/600/800",
    stories: [
      { content: "I switched to Design in 2 weeks. You said my bravery became your light for years to come." }
    ]
  },
  {
    year: 2020,
    displayYear: "2020",
    city: "Shenzhen",
    coords: [114.05, 22.54],
    title: "Distance",
    tag: "Remote",
    image: "https://picsum.photos/seed/2020_sz/600/800",
    stories: [
        { content: "Separated by cities, connected by signals. The world paused, but our growth accelerated in silence." }
    ]
  },
  { 
    year: 2021, 
    displayYear: "2021", 
    city: "Hangzhou", 
    coords: [120.15, 30.30], 
    title: "The Silent Summer", 
    tag: "Secret",
    image: "https://picsum.photos/seed/2021_silent/600/800",
    stories: [
      { content: "The 6 AM debate. I saw your 'strangeness', but missed your fear of death. A 3-year misunderstanding." }
    ]
  },
  { 
    year: 2022, 
    displayYear: "2022", 
    city: "Xi'an", 
    coords: [108.94, 34.27], 
    title: "Parallel Lines", 
    tag: "Growth",
    image: "https://picsum.photos/seed/2022_xian/600/800",
    stories: [
      { content: "From ByteDance to Huawei. We swapped our 20-year-old dreams. I chose marriage, you chose career." }
    ]
  },
  {
    year: 2023,
    displayYear: "2023",
    city: "Chengdu",
    coords: [104.06, 30.57],
    title: "The Grind",
    tag: "Perseverance",
    image: "https://picsum.photos/seed/2023_chengdu/600/800",
    stories: [
        { content: "Buried in work, we sent brief messages. 'Stay strong'. 'You too'. The foundation was holding." }
    ]
  },
  { 
    year: 2024, 
    displayYear: "2024.11", 
    city: "Chongqing", 
    coords: [106.55, 29.56], 
    title: "Truth in the Fog", 
    tag: "Reunion",
    image: "https://picsum.photos/seed/2024_cq/600/800",
    stories: [
      { content: "First meeting after graduation. The guilt, the tears, and the new promise of meeting every year." }
    ]
  },
  { 
    year: 2025, 
    displayYear: "2025", 
    city: "Iceland", 
    coords: [110.00, 35.00], // Fake coords to keep it on map relative to China visual or just off-map
    title: "Missing Bridesmaid", 
    tag: "Marriage",
    image: "https://picsum.photos/seed/2025_ice/600/800",
    stories: [
      { content: "A wedding in Iceland without a banquet. No bridesmaid, but a lifelong witness." }
    ]
  },
  { 
    year: 2026, 
    displayYear: "2026.01", 
    city: "Qingdao", 
    coords: [120.38, 36.06], 
    title: "3-Page Letter", 
    tag: "Forever",
    image: "https://picsum.photos/seed/2026_qd/600/800",
    stories: [
      { content: "New beginnings by the sea. You asked me to 'always be myself'. This H5 is my reply." }
    ]
  }
];

export const MUSIC_URL = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3";

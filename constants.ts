import { Memory } from './types';

// Approximate bounds of China for simplified projection
// Longitude: ~73E to ~135E
// Latitude: ~18N to ~54N
export const MAP_BOUNDS = {
  minLon: 98, // Adjusted specifically to center the visual interest area better
  maxLon: 125,
  minLat: 20,
  maxLat: 42
};

export const MEMORIES: Memory[] = [
  { 
    year: "2017-2019", 
    city: "Hangzhou", 
    coords: [120.15, 30.28], 
    title: "The Start: Xixi Dormitory", 
    story: "Opposite dreams: One wanted to stay single, one wanted a family. We shared a dorm and a youth.", 
    tag: "Meeting",
    image: "https://picsum.photos/seed/hangzhou/600/800"
  },
  { 
    year: "2019", 
    city: "Beijing/Shenzhen", 
    coords: [116.40, 39.90], 
    title: "The Decisive Turn", 
    story: "I switched to Design in 2 weeks. You said my bravery became your light for years to come.", 
    tag: "Career Change",
    image: "https://picsum.photos/seed/beijing/600/800"
  },
  { 
    year: "2021", 
    city: "Hangzhou", 
    coords: [120.15, 30.28], 
    title: "The Silent Summer", 
    story: "The 6 AM debate. I saw your 'strangeness', but missed your fear of death. A 3-year misunderstanding.", 
    tag: "Secret",
    image: "https://picsum.photos/seed/silent/600/800"
  },
  { 
    year: "2021-2024", 
    city: "Xi'an/Chengdu", 
    coords: [108.94, 34.27], 
    title: "Parallel Climbing", 
    story: "From ByteDance to Huawei. We swapped our 20-year-old dreams. I chose marriage, you chose career.", 
    tag: "Growth",
    image: "https://picsum.photos/seed/growth/600/800"
  },
  { 
    year: "2024.11", 
    city: "Chongqing", 
    coords: [106.55, 29.56], 
    title: "The Truth in the Fog", 
    story: "First meeting after graduation. The guilt, the tears, and the new promise of meeting every year.", 
    tag: "Reunion",
    image: "https://picsum.photos/seed/chongqing/600/800"
  },
  { 
    year: "2025", 
    city: "Iceland/Shenzhen", 
    coords: [114.05, 22.54], 
    title: "The Missing Bridesmaid", 
    story: "A wedding in Iceland without a banquet. No bridesmaid, but a lifelong witness.", 
    tag: "Marriage",
    image: "https://picsum.photos/seed/iceland/600/800"
  },
  { 
    year: "2026.01", 
    city: "Qingdao", 
    coords: [120.38, 36.06], 
    title: "The 3-Page Letter", 
    story: "New beginnings by the sea. You asked me to 'always be myself'. This H5 is my reply.", 
    tag: "Forever",
    image: "https://picsum.photos/seed/qingdao/600/800"
  }
];

export const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder
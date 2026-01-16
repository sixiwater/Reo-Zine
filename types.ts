export interface Memory {
  year: string;
  city: string;
  coords: [number, number]; // [Longitude, Latitude]
  title: string;
  story: string;
  tag: string;
  image?: string;
}

export type ViewMode = 'map' | 'timeline';
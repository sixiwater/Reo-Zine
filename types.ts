
export interface Story {
  content: string;
  image?: string; // Optional override image for specific story part
  title?: string; // Optional subtitle
}

export interface Memory {
  year: number;       // Numeric year for sorting/timeline logic (2017, 2018...)
  displayYear: string; // String representation (e.g. "2017.09")
  city: string;
  coords: [number, number]; // [Longitude, Latitude]
  title: string;
  tag: string;
  image: string;      // Default/Cover image
  stories: Story[];   // Array of story segments
}

export type ViewMode = 'map' | 'timeline';

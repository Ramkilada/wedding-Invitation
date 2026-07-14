export interface RSVPResponse {
  id: string;
  name: string;
  phone: string;
  guests: number;
  attendance: 'yes' | 'no';
  mealPreference: 'veg' | 'non-veg';
  events: string[]; // e.g., ['Haldi', 'Sangeet', 'Muhurtham', 'Reception']
  blessing?: string;
  timestamp: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  hindiName?: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  icon: string;
  description: string;
  mapEmbedUrl: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  type: 'illustration' | 'uploaded';
}

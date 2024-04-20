export interface Episode {
  id: number;
  title: string;
  publicationDate: string;
  duration: number;
  description: string;
  audioUrl: string;
  sponsoredBy?: string[];
}

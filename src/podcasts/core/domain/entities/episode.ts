export interface Episode {
  id: string;
  title: string;
  publicationDate: string;
  duration: number;
  description: string;
  audioUrl: string;
  sponsoredBy?: string[];
}

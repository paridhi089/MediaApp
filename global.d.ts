declare global {
  interface Show {
    id: number;
    url:string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    rating: {average: number | null};
    image: {medium: string | null};
    summary:string;
  }

  interface ApiResponse {
    score: number;
    show: Show;
  }
}

export {};

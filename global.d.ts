declare global {
  interface Show {
      id: number;
      name: string;
      image: {
        medium: string;
        original: string;
      };
      summary: string;
      language: string;
      runtime:string;
      averageRuntime:string;
      status:string;
      genres: string[];
      premiered: string;
      rating: {
        average: number | null;
      };
      schedule: {
        time:string;
        days:string[];
      }
    }

  interface ApiResponse {
    score: number;
    show: Show;
  }
}

export {};

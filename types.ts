
export interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export interface GeminiResponse {
  greeting: string;
  poem: string;
}

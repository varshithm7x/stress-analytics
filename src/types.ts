export interface StressData {
  user_name: string;
  user_age: number;
  cortisol_val: number;
  amylase_val: number;
  iga_val: number;
  sleep_val: number;
}

export interface StressResult {
  score: number;
  level: 'Low' | 'Moderate' | 'High';
  recommendations: string[];
  metrics: {
    cortisol_norm: number;
    amylase_norm: number;
    iga_norm: number;
    sleep_norm: number;
  };
  // Original input values
  user_name?: string;
  user_age?: number;
  cortisol_val?: number;
  amylase_val?: number;
  iga_val?: number;
  sleep_val?: number;
}

export interface ApiResponse {
  success: boolean;
  data?: StressResult;
  error?: string;
}
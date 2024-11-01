import { RecordData } from "./types";

export interface DataState {
    region: string;
    errors: number;
    seed: string;
    page: number;
    data: RecordData[];
    loading: boolean;
    hasMore: boolean;
  }

  export interface LoadDataParams {
    region: string;
    errors: number;
    seed: string;
    page: number;
  }
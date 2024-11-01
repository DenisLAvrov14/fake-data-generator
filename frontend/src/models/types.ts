
export interface RegionSelectorProps {
    value: string;
    onChange: (region: string) => void;
  }
  
  export interface ErrorSliderProps {
    value: number;
    onChange: (value: number) => void;
  }
  
  export interface SeedInputProps {
    value: string;
    onChange: (value: string) => void;
    onRandom: () => void;
  }
  
  export interface DataTableProps {
    data: Array<RecordData>;
    isLoading: boolean; 
    onScrollEnd: () => void; 
  }
  
  
  export interface RecordData {
    id: string;
    name: string;
    address: string;
    phone: string;
  }
  
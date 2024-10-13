export type TFormat = "pdf" | "igstory" | "igpost" | "fbpost";

export type TFormData = {
  title: string;
  name: string;
  surname: string;
  age: number | null;
  agePostfix: string;
  birthdate: number | null;
  location: string;
  circumstances: string;
  identifyingFeatures: string;
  note: string;
  file: string;
  contacts: string;
  photoScale: number;
  showImageLabel: boolean;
  photoPositionX: number;
  photoPositionY: number;
  format: TFormat;
};

export type TTheme = "default" | "bw";

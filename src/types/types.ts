export type TFormat = "pdf" | "igstory" | "igpost" | "fbpost";

export type TFormData = {
  title: string;
  name: string;
  surname: string;
  age: string;
  birthdate: number;
  location: string;
  circumstances: string;
  identifyingFeatures: string;
  note: string;
  file: string;
  contacts: string;
  photoPositionX: number;
  photoPositionY: number;
  format: TFormat;
};

import { writable } from "svelte/store";
import type { TFormData } from "../types/types";

export const formData = writable<TFormData>({
  title: "Poster title",
  name: "Name",
  surname: "Surname",
  age: null,
  agePostfix: "years old",
  birthdate: null,
  location: "Last known location",
  circumstances: "Circumstances of disappearance",
  identifyingFeatures: "How would you describe this person?",
  note: "Additional information",
  format: "igstory",
  file: "",
  showImageLabel: true,
  photoScale: 100,
  photoPositionX: 50,
  photoPositionY: 50,
  contacts: "192 / another number",
});

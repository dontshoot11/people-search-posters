import html2canvas from "html2canvas";
import { get } from "svelte/store";
import jsPDF from "jspdf";
import { formData } from "../stores/formStore";
import { adjustPosterSize, resetPosterSize } from "./adjustPosterSize";
import { changeTheme } from "./changeTheme";

import type { TTheme } from "../types/types";

let { format } = get(formData);
formData.subscribe((data) => {
  format = data.format;
});

export const generateFile = async () => {
  resetPosterSize();

  const element = document.getElementById("poster");
  if (element) {
    const rect = element.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const scale = 2;

    const createCanvasAndSaveFile = async (theme: TTheme) => {
      changeTheme(theme);
      const isBW = theme === "bw";
      const canvas = await html2canvas(element, {
        scale: scale,
        logging: false,
        width: canvasWidth,
        height: canvasHeight,
      });

      const context = canvas.getContext("2d");
      if (context && isBW) {
        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;

        const contrast = 15;
        const contrastFactor =
          (259 * (contrast + 255)) / (255 * (259 - contrast));

        for (let i = 0; i < pixels.length; i += 4) {
          const grayscale =
            pixels[i] * 0.3 + pixels[i + 1] * 0.59 + pixels[i + 2] * 0.11;

          pixels[i] = contrastFactor * (grayscale - 128) + 128;
          pixels[i + 1] = contrastFactor * (grayscale - 128) + 128;
          pixels[i + 2] = contrastFactor * (grayscale - 128) + 128;
        }

        context.putImageData(imgData, 0, 0);
      }

      const imgDataURL = canvas.toDataURL("image/png", 1.0);

      if (format === "pdf") {
        const pdf = new jsPDF({
          orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
          unit: "px",
          format: [canvasWidth, canvasHeight],
        });
        pdf.addImage(imgDataURL, "PNG", 0, 0, canvasWidth, canvasHeight);
        pdf.save(`poster${isBW ? "-bw" : ""}.pdf`);
      } else {
        const link = document.createElement("a");
        link.href = imgDataURL;
        link.download = `poster${isBW ? "-bw" : ""}.png`;
        link.click();
      }
    };

    await createCanvasAndSaveFile("default");

    if (format === "pdf") {
      await createCanvasAndSaveFile("bw");
    }

    changeTheme("default");
    adjustPosterSize();
  }
};

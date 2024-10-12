import html2canvas from "html2canvas";
import { get } from "svelte/store";
import jsPDF from "jspdf";
import { formData } from "../stores/formStore";
import { adjustPosterSize, resetPosterSize } from "./adjustPosterSize";

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
    const scale = 1;

    const canvas = await html2canvas(element, {
      scale: scale,
      logging: false,
      width: canvasWidth,
      height: canvasHeight,
    });

    const imgData = canvas.toDataURL("image/png", 1.0);

    if (format === "pdf") {
      const pdf = new jsPDF({
        orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
        unit: "px",
        format: [canvasWidth, canvasHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvasWidth, canvasHeight);
      pdf.save("poster.pdf");
    } else {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "poster.png";
      link.click();
    }

    adjustPosterSize();
  }
};

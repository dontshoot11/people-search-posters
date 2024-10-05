import html2canvas from "html2canvas";
import { get } from "svelte/store";
import jsPDF from "jspdf";
import { formData } from "../stores/formStore";

let { format } = get(formData);
formData.subscribe((data) => {
  format = data.format;
});

const imgSizes = {
  pdf: {
    width: 1080,
    height: 1920,
  },
  igstory: {
    width: 1080,
    height: 1920,
  },
  igpost: {
    width: 1080,
    height: 1920,
  },
  fbpost: {
    width: 1080,
    height: 1920,
  },
};

export const generateFile = async () => {
  const element = document.getElementById("poster");
  if (element) {
    const rect = element.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const scaleX = imgSizes[format].width / canvasWidth;
    const scaleY = imgSizes[format].height / canvasHeight;
    const scale = Math.min(scaleX, scaleY);
    if (format === "pdf") {
      const canvas = await html2canvas(element, {
        scale: 3,
        logging: false,
        width: canvasWidth,
        height: canvasHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
        unit: "px",
        format: [canvasWidth, canvasHeight],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);
      pdf.save("poster.pdf");
    } else {
      const canvas = await html2canvas(element, {
        scale: scale,
        logging: false,
        width: canvasWidth, // Текущая ширина элемента
        height: canvasHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "poster.jpg";
      link.click();
    }
  }
};

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
    height: 1080,
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
    const scale = 2;

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
        unit: "in",
        format: [canvasWidth / 96, canvasHeight / 96],
      });

      const dpi = 300;
      const widthInInches = imgSizes[format].width / dpi;
      const heightInInches = imgSizes[format].height / dpi;

      pdf.addImage(imgData, "PNG", 0, 0, widthInInches, heightInInches);
      pdf.save("poster.pdf");
    } else {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "poster.png";
      link.click();
    }
  }
};

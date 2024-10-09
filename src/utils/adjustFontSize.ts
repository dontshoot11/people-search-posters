let initialFontSizes = new Map<HTMLElement, number>();

export function adjustFontSize() {
  if (typeof document !== "undefined") {
    const textBlocks = document.querySelectorAll(
      '[data-block="text-block"]'
    ) as NodeListOf<HTMLElement>;

    textBlocks.forEach((textBlock) => {
      const container = textBlock.closest(
        '[data-container="text-container"]'
      ) as HTMLElement;

      if (!container) return;

      const containerStyle = window.getComputedStyle(container);
      const textBlockStyle = window.getComputedStyle(textBlock);
      const htmlElement = document.querySelector("html") as HTMLElement;
      const htmlFontSize = parseFloat(
        window.getComputedStyle(htmlElement).fontSize
      );
      const paddingLeft = parseFloat(containerStyle.paddingLeft);
      const paddingRight = parseFloat(containerStyle.paddingRight);
      const containerWidth = container.clientWidth - paddingLeft - paddingRight;

      let fontSizeRem =
        parseFloat(window.getComputedStyle(textBlock).fontSize) / htmlFontSize;

      if (!initialFontSizes.has(textBlock)) {
        initialFontSizes.set(textBlock, fontSizeRem);
      }

      const initialFontSizeRem = initialFontSizes.get(textBlock) || fontSizeRem;

      const maxHeight = parseFloat(textBlockStyle.maxHeight);

      const decreaseText = () => {
        while (
          (textBlock.scrollWidth > containerWidth ||
            (maxHeight && textBlock.scrollHeight > maxHeight)) &&
          fontSizeRem > 6
        ) {
          fontSizeRem -= 0.1;
          textBlock.style.fontSize = `${fontSizeRem}rem`;
        }
      };

      const increaseText = () => {
        while (
          textBlock.scrollWidth <= containerWidth &&
          (!maxHeight || textBlock.scrollHeight <= maxHeight) &&
          fontSizeRem < initialFontSizeRem
        ) {
          fontSizeRem += 0.1;
          textBlock.style.fontSize = `${fontSizeRem}rem`;
        }
      };

      requestAnimationFrame(() => {
        if (
          textBlock.scrollWidth > containerWidth ||
          (maxHeight && textBlock.scrollHeight > maxHeight)
        ) {
          decreaseText();
        } else if (fontSizeRem < initialFontSizeRem) {
          increaseText();
        }
      });
    });
  }
}

export function resetFontSize() {
  if (typeof document !== "undefined") {
    const textBlocks = document.querySelectorAll(
      '[data-block="text-block"]'
    ) as NodeListOf<HTMLElement>;

    textBlocks.forEach((textBlock) => {
      textBlock.style.removeProperty("font-size");
    });

    initialFontSizes.clear();
    setTimeout(() => {
      adjustFontSize();
    }, 50);
  }
}

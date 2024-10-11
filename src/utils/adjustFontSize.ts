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
      const paddingLeft = parseFloat(containerStyle.paddingLeft);
      const paddingRight = parseFloat(containerStyle.paddingRight);
      const containerWidth = container.clientWidth - paddingLeft - paddingRight;

      let fontSize = parseFloat(window.getComputedStyle(textBlock).fontSize);

      if (!initialFontSizes.has(textBlock)) {
        initialFontSizes.set(textBlock, fontSize);
      }

      const initialFontSize = initialFontSizes.get(textBlock) || fontSize;

      const maxHeight = parseFloat(textBlockStyle.maxHeight);

      const decreaseText = () => {
        while (
          (textBlock.scrollWidth > containerWidth ||
            (maxHeight && textBlock.scrollHeight > maxHeight)) &&
          fontSize > 6
        ) {
          fontSize -= 0.1;
          textBlock.style.fontSize = `${fontSize}px`;
        }
      };

      const increaseText = () => {
        while (
          textBlock.scrollWidth <= containerWidth &&
          (!maxHeight || textBlock.scrollHeight <= maxHeight) &&
          fontSize < initialFontSize
        ) {
          fontSize += 0.1;
          textBlock.style.fontSize = `${fontSize}px`;
        }
      };

      requestAnimationFrame(() => {
        if (
          textBlock.scrollWidth > containerWidth ||
          (maxHeight && textBlock.scrollHeight > maxHeight)
        ) {
          decreaseText();
        } else if (fontSize < initialFontSize) {
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
    }, 150);
  }
}

let initialFontSizes = new Map<HTMLElement, number>();
let initialBlockHeights = new Map<HTMLElement, number>();

export function adjustFontSize() {
  let maxHeightMultiplier = 2;

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

      if (!initialBlockHeights.has(textBlock)) {
        initialBlockHeights.set(textBlock, textBlock.scrollHeight);
      }

      const initialFontSizeRem = initialFontSizes.get(textBlock) || fontSizeRem;
      const initialBlockHeight =
        initialBlockHeights.get(textBlock) || textBlock.scrollHeight;

      const decreaseText = () => {
        while (
          (textBlock.scrollWidth > containerWidth ||
            textBlock.scrollHeight >
              initialBlockHeight * maxHeightMultiplier) &&
          fontSizeRem > 6
        ) {
          fontSizeRem -= 0.1;
          textBlock.style.fontSize = `${fontSizeRem}rem`;
        }
      };

      const increaseText = () => {
        while (
          textBlock.scrollWidth <= containerWidth &&
          textBlock.scrollHeight <= initialBlockHeight * maxHeightMultiplier &&
          fontSizeRem < initialFontSizeRem
        ) {
          fontSizeRem += 0.1;
          textBlock.style.fontSize = `${fontSizeRem}rem`;
        }
      };

      requestAnimationFrame(() => {
        if (
          textBlock.scrollWidth > containerWidth ||
          textBlock.scrollHeight > initialBlockHeight * maxHeightMultiplier
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
    initialBlockHeights.clear();
    setTimeout(() => {
      adjustFontSize();
    }, 50);
  }
}

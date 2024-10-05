let initialFontSizes = new Map<HTMLElement, number>();

export function adjustFontSize() {
  if (typeof document !== "undefined") {
    const textBlocks = document.querySelectorAll(
      '[data-role="text-block"]'
    ) as NodeListOf<HTMLElement>;

    textBlocks.forEach((textBlock) => {
      const container = textBlock.closest(
        '[data-role="text-container"]'
      ) as HTMLElement;

      if (container) {
        const containerStyle = window.getComputedStyle(container);
        const htmlElement = document.querySelector("html") as HTMLElement;
        const htmlFontSize = parseFloat(
          window.getComputedStyle(htmlElement).fontSize
        );
        const paddingLeft = parseFloat(containerStyle.paddingLeft);
        const paddingRight = parseFloat(containerStyle.paddingRight);
        const containerWidth =
          container.clientWidth - paddingLeft - paddingRight;
        let fontSizeRem =
          parseFloat(window.getComputedStyle(textBlock).fontSize) /
          htmlFontSize;

        if (!initialFontSizes.has(textBlock)) {
          initialFontSizes.set(textBlock, fontSizeRem);
        }

        const initialFontSizeRem =
          initialFontSizes.get(textBlock) || fontSizeRem;

        const decreaseText = () => {
          while (textBlock.scrollWidth > containerWidth && fontSizeRem > 0.5) {
            fontSizeRem -= 0.2;
            textBlock.style.fontSize = `${fontSizeRem}rem`;
          }
        };

        const increaseText = () => {
          while (
            textBlock.scrollWidth <= containerWidth &&
            fontSizeRem < initialFontSizeRem
          ) {
            fontSizeRem += 0.2;
            textBlock.style.fontSize = `${fontSizeRem}rem`;
          }
        };
        requestAnimationFrame(() => {
          if (textBlock.scrollWidth > containerWidth) {
            decreaseText();
          } else if (fontSizeRem < initialFontSizeRem) {
            increaseText();
          }
        });
      }
    });
  }
}

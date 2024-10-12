export function adjustPosterSize() {
  if (typeof document !== "undefined") {
    const poster = document.getElementById("poster");
    const posterWrap = document.getElementById("posterWrap");
    const posterWidth = poster?.offsetWidth;
    const posterHeight = poster?.offsetHeight;
    const wrapWidth = posterWrap?.offsetWidth;
    const wrapHeight = posterWrap?.offsetHeight;

    if (poster && wrapWidth && posterWidth && wrapHeight && posterHeight) {
      const scaleWidth = wrapWidth / posterWidth;
      const scaleHeight = wrapHeight / posterHeight;
      const scale = Math.min(scaleWidth, scaleHeight);
      poster.style.transform = `scale(${scale})`;
    } else if (poster) {
      poster.style.transform = "scale(1)";
    }
  }
}

export function resetPosterSize() {
  if (typeof document !== "undefined") {
    const poster = document.getElementById("poster");
    if (poster) {
      poster.style.removeProperty("transform");
    }
  }
}

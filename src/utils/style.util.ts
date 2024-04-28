type Media = "laptop" | "tablet" | "mobile";

const DEVICE_WIDTH: { [key in Media]: number } = {
  laptop: 1279,
  tablet: 991,
  mobile: 767,
};

const media = (media: Media) => (css: TemplateStringsArray) =>
  `@media screen and (max-width: ${DEVICE_WIDTH[media]}px) ${css}`;

export const laptop = media("laptop");
export const tablet = media("tablet");
export const mobile = media("mobile");

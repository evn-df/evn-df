const Image = require("@11ty/eleventy-img");
const path = require("path");

const imageShortcode = async (
  src,
  alt,
  className = undefined,
  widths = [400, 800, 1280],
  formats = ["webp", "jpeg"],
  sizes = "100vw"
) => {
  const imageMetadata = await Image(src, {
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: "_site/assets/images",
    urlPath: "/assets/images",
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    class: className,
  };

  return Image.generateHTML(imageMetadata, imageAttributes);
};


module.exports = (eleventyConfig) => {
    eleventyConfig.addShortcode('image', imageShortcode)
}
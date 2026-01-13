const Image = require("@11ty/eleventy-img");
const htmlmin = require("html-minifier-terser");

module.exports = function(eleventyConfig) {
  // Копируем статические файлы
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Добавляем watch для CSS и JS
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

  // Shortcode: responsive images with AVIF/WebP/JPEG
  eleventyConfig.addNunjucksAsyncShortcode("image", async function (src, alt, sizes = "(max-width: 768px) 100vw, 800px") {
    const metadata = await Image(src, {
      widths: [600, 900, 1200],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./dist/img/",
      urlPath: "/img/",
    });

    const imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    return Image.generateHTML(metadata, imageAttributes);
  });
  
  // Фильтр для активного пункта меню
  eleventyConfig.addFilter("isActive", function(currentPage, itemUrl) {
    return currentPage === itemUrl ? 'class="active"' : '';
  });

  // Transform: Minify HTML output (failsafe)
  eleventyConfig.addTransform("htmlmin", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      try {
        return await htmlmin.minify(content, {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: false, // Disabled - breaks MathJax config
          // Ignore math fragments to avoid parser confusion
          ignoreCustomFragments: [/\$\$[\s\S]*?\$\$/g, /\$[^$]*\$/g],
        });
      } catch (e) {
        console.warn("[htmlmin] Skipping minify due to error:", e.message);
        return content;
      }
    }
    return content;
  });

  // Collection: chapters (for navigation/sidebar use)
  eleventyConfig.addCollection("chapters", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/{basics,simplex,duality,glossary,literature}.njk");
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

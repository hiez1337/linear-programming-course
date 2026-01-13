module.exports = function(eleventyConfig) {
  // Копируем статические файлы
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Добавляем watch для CSS и JS
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");
  
  // Фильтр для активного пункта меню
  eleventyConfig.addFilter("isActive", function(currentPage, itemUrl) {
    return currentPage === itemUrl ? 'class="active"' : '';
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

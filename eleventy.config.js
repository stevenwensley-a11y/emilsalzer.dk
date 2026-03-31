const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Markdown: breaks:true så enkelt linjeskift → <br> (kritisk for poesi)
  const md = markdownIt({ html: true, breaks: true });
  eleventyConfig.setLibrary("md", md);

  // Poesi collection sorted by order field
  eleventyConfig.addCollection("poesi", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/poesi/*.md")
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/sitemap.xml": "sitemap.xml" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

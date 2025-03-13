const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Debug: afficher les messages de débogage pendant la construction
  console.log("📊 Démarrage de la génération du site...");

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  // Configuration améliorée du plugin Syntax Highlight
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    alwaysWrapLineHighlights: true,
    trim: true,
    lineSeparator: "\n",
    preAttributes: {
      class: "language-*",
      tabindex: 0
    }
  });
  eleventyConfig.addPlugin(pluginNavigation);

  // Copy les fichiers statiques
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("fontawesome-free-5.12.1-web");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("site.webmanifest");

  // Formats de date
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // Format pour le sitemap et RSS
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Raccourcir le texte (pour les résumés)
  eleventyConfig.addFilter("truncate", function(text, length) {
    if (text) {
      return text.length > length ? text.substring(0, length) + "..." : text;
    }
    return "";
  });

  // Filtre limit pour limiter le nombre d'éléments dans une collection
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Filtre date pour formater les dates, y compris 'now'
  eleventyConfig.addFilter("date", function(dateObj, format) {
    if (dateObj === 'now') {
      return DateTime.now().toFormat(format);
    }
    
    if (typeof dateObj === "string") {
      return DateTime.fromISO(dateObj).toFormat(format);
    }
    
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Filtre slice pour prendre un sous-ensemble d'un tableau
  eleventyConfig.addFilter("slice", function(array, start, end) {
    return array.slice(start, end);
  });

  // Filtre pour nettoyer les extraits d'articles (enlever CSS, styles et balises)
  eleventyConfig.addFilter("cleanExcerpt", function(content) {
    if (!content) return "";
    
    // Enlever les balises style et leur contenu
    let cleaned = content.replace(/<style[\s\S]*?<\/style>/gi, "");
    
    // Enlever toutes les balises HTML
    cleaned = cleaned.replace(/<[^>]*>/g, " ");
    
    // Enlever les déclarations CSS inline (@import, etc.)
    cleaned = cleaned.replace(/@import[^;]*;/g, "");
    
    // Enlever les déclarations de style CSS
    cleaned = cleaned.replace(/[a-z-]+\s*:\s*[^;]+;/g, "");
    
    // Enlever les accolades et leur contenu (règles CSS)
    cleaned = cleaned.replace(/\{[^}]*\}/g, "");
    
    // Supprimer les espaces multiples
    cleaned = cleaned.replace(/\s+/g, " ");
    
    return cleaned.trim();
  });

  // Configuration Markdown améliorée
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "",
      level: [1, 2, 3, 4]
    }),
    slugify: eleventyConfig.getFilter("slugify")
  });
  
  // Configuration des blocs de code
  markdownLibrary.renderer.rules.fence = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const info = token.info ? token.info.trim() : "";
    const langName = info ? info.split(/\s+/g)[0] : "";
    const langClass = langName ? ` language-${langName}` : "";
    
    return `<pre class="code-block${langClass}"><code class="${langClass}">${token.content}</code></pre>`;
  };
  
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Débogage pour BrowserSync
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        console.log('🌍 Serveur prêt!');
        console.log('⚙️ Configuration de pagination activée');
        
        // Affiche l'URL du site
        bs.addMiddleware("*", (req, res) => {
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(`<h1>Page non trouvée</h1><p>Veuillez vérifier l'URL.</p>`);
          res.end();
        });
      }
    }
  });

  // Collections principale des articles
  eleventyConfig.addCollection("posts", function(collection) {
    const posts = collection.getFilteredByGlob("_posts/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
    console.log(`📚 Total number of articles: ${posts.length}`);
    return posts;
  });

  // Categories (equivalent to Jekyll categories)
  eleventyConfig.addCollection("categories", function(collection) {
    let categories = {};
    collection.getFilteredByGlob("_posts/**/*.md").forEach(function(item) {
      if ("categories" in item.data) {
        for (const category of item.data.categories) {
          if (!(category in categories)) {
            categories[category] = [];
          }
          categories[category].push(item);
        }
      }
    });
    return categories;
  });

  // Configuration de base
  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site"
    },
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}; 
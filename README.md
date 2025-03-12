# The Architect - Blog

Personal website on modern architecture for cloud, data, and AI, built with Eleventy (11ty).

## About

This site was migrated from Jekyll to Eleventy (11ty) while maintaining the same appearance and features.

## Technologies Used

- **Eleventy (11ty)** - JavaScript static site generator
- **Nunjucks** - Template engine
- **Bootstrap** - CSS framework
- **GitHub Pages** - Hosting
- **Google Domains** - Custom domain

## Local Installation

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 14.x or higher)
2. Clone this repository
3. Install dependencies: `npm install`
4. Start the development server: `npm run serve`
5. The site will be available at http://localhost:8080

## Create a New Article

1. Create a new file in the `_posts` folder in the format `YYYY-MM-DD-title.md`
2. Add the following frontmatter:
   ```yaml
   ---
   title: "Article Title"
   layout: post
   date: YYYY-MM-DD
   image: "image.jpg"
   categories: ["Category 1", "Category 2"]
   ---
   ```
3. Write your content in Markdown under the frontmatter

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

MIT
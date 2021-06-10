require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby WordPress cuteanimalplanet`,
    description: `Gatsby cuteanimalplanet site for cuteanimalplanet Gatsby Theme.`,
    author: `@developershagor`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-notifications`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        type: {
          MediaItem: {
            localFile: {
              requestConcurrency: 1
            },
          },
        },
        // url: process.env.WPGRAPHQL_URL,
        url: `https://www.luxuryandglamor.com/graphql`,
        verbose: true,
        develop: {
          hardCacheMediaFiles: false,
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true,
          },
        },
        html: {
          fallbackImageMaxWidth: 800,
          useGatsbyImage: true,
          createStaticFiles: true,
          imageMaxWidth: 1024
        },
        schema: {
          perPage: 50,
          timeout: 900000,
          requestConcurrency: 1,
          previewRequestConcurrency: 1,
        },
        type: {
          __all: {
            limit: 50,
          },
          Menu: {
            limit: 9999,
          },
          MenuItem: {
            limit: 9999,
          },
          Page: {
            limit: 999999,
          },
          MediaItem: {
            localFile: {
              requestConcurrency: 1,
            },
          },
        },
        // fields can be excluded globally.
        // this example is for wp-graphql-gutenberg.
        // since we can get block data on the `block` field
        // we don't need these fields
        excludeFieldNames: [`blocksJSON`, `saveContent`],
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                  35
                : // And then we can pull all posts in production
                  null,
          },
          // this shows how to exclude entire types from the schema
          // this example is for wp-graphql-gutenberg
          CoreParagraphBlockAttributesV2: {
            exclude: true,
          },
        },
      },
    },
    {
      resolve: "gatsby-plugin-social9-socialshare",
      options: {
        content:  "f03c29e9abd146f1885badf34342bbd9",
        async: true,
        defer: true
      }
    },
    
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/, // See below to configure properly
        },
      },
    },
  ],
}

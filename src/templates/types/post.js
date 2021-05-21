import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Comments from "../../components/Comments"
import ContentTypePagination from "../../components/ContentTypePagination"
import AuthorBio from "../../components/AuthorBio"
import PostMeta from "../../components/PostMeta"
import PostCategories from "../../components/PostCategories"
import FeaturedMedia from "../../components/FeaturedMedia"

const post = ({ data }) => {
  const { nextPage, previousPage, page } = data
  const {
    title,
    content,
    featuredImage,
    categories,
    excerpt,
    databaseId,
    author,
    date,
  } = page

  return (
    <Layout
      bodyClass={`post-template-default single single-post postid-${databaseId} single-format-standard wp-embed-responsive singular has-post-thumbnail has-single-pagination showing-comments footer-top-visible customize-support`}
    >
      <Seo title={data.mdx.frontmatter.title} description={data.mdx.frontmatter.excerpt} />

      <article
        className={`post-${databaseId} post type-post status-publish format-standard has-post-thumbnail hentry category-uncategorized`}
        id={`post-${databaseId}`}
      >
         <FeaturedMedia image={featuredImage} />

         <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
        </Helmet>

        <Helmet
          title={title}
          titleTemplate={`%s · ${site.siteMetadata.title}`}
          defaultTitle={site.siteMetadata.title}
        />
            
        <header className="entry-header header-footer-group">
          <div className="entry-header-content">
            
            <meta property="og:title" content={title} />
            
            <PostCategories categories={categories} />
            <h1
              className="entry-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
             <PostMeta title={title} author={author} date={date} />
             <div class="s9-widget-wrapper"></div>
            <div
              className="intro-text section-inner max-percentage small"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
           
          </div>
        </header>
     

        <div className="post-inner thin">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        <div className="section-inner">
          <AuthorBio author={author} />
          <div class="s9-widget-wrapper"></div>
          <ContentTypePagination
            previousPage={previousPage}
            nextPage={nextPage}
            contentType={"Post"}
          />
          <Comments />
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query post($id: String!, $nextPage: String, $previousPage: String) {
    page: wpPost(id: { eq: $id }) {
      ...PostContent
    }
    nextPage: wpPost(id: { eq: $nextPage }) {
      title
      uri
    }
    previousPage: wpPost(id: { eq: $previousPage }) {
      title
      uri
    }
  }
`

export default post;

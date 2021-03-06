import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import { Location } from "@reach/router"
import { useLangKey } from "../components/I18nContext"
import defaultImage from "../images/social.png"
import { SchemaOrg } from "./SchemaOrg"

const locales = {
  zh: {
    description: "报时树技术博客",
  },
}

export function Seo({
  title: customTitle,
  description: customDescription,
  image: customImage,
  datePublished,
  isBlogPost,
}) {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          canonicalUrl
        }
      }
    }
  `)

  const langKey = useLangKey()
  const t = locales[langKey]

  const title = customTitle || "报时树技术博客"
  const description = customDescription || t.description
  const image = customImage || defaultImage

  return (
    <Location>
      {({ location }) => {
        const url = `${siteMetadata.canonicalUrl}${location.pathname}`

        return (
          <>
            <Helmet>
              {/* General tags */}
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta
                name="image"
                content={`${siteMetadata.canonicalUrl}${image}`}
              />
              <link rel="canonical" href={url} />

              {/* OpenGraph tags */}
              <meta property="og:url" content={url} />
              {isBlogPost ? (
                <meta property="og:type" content="article" />
              ) : null}
              <meta property="og:title" content={title} />
              <meta property="og:description" content={description} />
              <meta
                property="og:image"
                content={`${siteMetadata.canonicalUrl}${image}`}
              />

              {/* Twitter Card tags */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:creator" content="@neoziro" />
              <meta name="twitter:title" content={title} />
              <meta name="twitter:description" content={description} />
              <meta
                name="twitter:image"
                content={`${siteMetadata.canonicalUrl}${image}`}
              />
            </Helmet>
            <SchemaOrg
              title={title}
              url={url}
              defaultTitle="报时树技术博客"
              isBlogPost={isBlogPost}
              image={image}
              description={description}
              canonicalUrl={siteMetadata.canonicalUrl}
              datePublished={datePublished}
            />
          </>
        )
      }}
    </Location>
  )
}

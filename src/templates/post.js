/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from 'components/SEO'
import Layout from '../components/Layout'
import Share from '../components/Share'
import config from '../../config/website'
import Markdown from 'react-markdown'
export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  const author = mdx.frontmatter.author || config.author
  const date = mdx.frontmatter.date
  const title = mdx.frontmatter.title
  const banner = mdx.frontmatter.banner
  const bannerCredit = mdx.frontmatter.bannerCredit
  console.log({ banner })
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        sx={{
          width: '100%',
          display: 'flex',
          bg: 'background',
        }}
      >
        <Container>
          <Styled.h1
            sx={{
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {title}
          </Styled.h1>
          {banner && (
            <div
              sx={{
                textAlign: 'center',
                p: { marginTop: 0 },
                a: {
                  color: 'primary',
                },
              }}
            >
              <Img
                fluid={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
              {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
            </div>
          )}
          <div
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 20,
              'h3,span': {
                textAlign: 'center',
                fontSize: 15,
                opacity: 0.6,
                margin: '0 5px',
              },
            }}
          >
            {author && <Styled.h3>{author}</Styled.h3>}
            {author && <span>—</span>}
            {date && <Styled.h3>{date}</Styled.h3>}
          </div>
          <br />
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container>
        <Share
          url={`${config.siteUrl}/${mdx.frontmatter.slug}/`}
          title={title}
          twitterHandle={config.twitterHandle}
        />
        <br />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        slug
        keywords
        banner {
          childImageSharp {
            fluid(maxWidth: 720, traceSVG: { color: "#573ede" }, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        bannerCredit
      }
      body
    }
  }
`

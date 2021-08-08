import Head from 'next/head';
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostData } from '../lib/posts'
import userSwr from 'swr'
import { GetStaticProps } from 'next'

export default function Home({ allPostsData }: {
  allPostsData: {
    date: string,
    title: string,
    id: string
  }[]
}) {
  // console.dir(allPostsData)
  // const { data, error } = userSwr('https://reqres.in/api/users/2', fetch)
  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>
  // console.dir(data.json().then(c => console.dir(c.data.email)))
  // console.dir('after that')
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>My name is Rubén. And I'm building this blog from a tutorial.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list} >
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>)
          )}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostData()
  // console.dir(allPostsData)
  return {
    props: {
      allPostsData
    }
  }
}
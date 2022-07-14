import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout'

import Link from 'next/link'
import utilStyle from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'

//SSGの場合
//非同期処理(async)で外部から一度だけデータを取ってくる(getStaticProps)
export async function getStaticProps() {
  //posts.jsで作成したmdファイルのデータ
  const allPostsData = getPostsData();
  console.log(allPostsData);
  return {
    //propsで渡す
    props: {
      allPostsData,
    },
  };
}



export default function Home({ allPostsData }) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>30代未経験からWEBエンジニアを目指すブログです｡現在NEXT.jsを勉強中です｡
      </p>
    </section>

    <section>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <a><img src={`${thumbnail}`} className={styles.thumbnailImage} /></a>
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
        ))}

      </div>
    </section>

  </Layout>
}

import Layout from "../../components/Layout";
import Head from "next/head";
import { getAllpostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css"

export async function getStaticPaths() {
    const paths = getAllpostIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}


export default function post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>
                    {postData.title}
                </h1>
                <div className={utilStyles.lightText}>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
            </article>
        </Layout>
    );
}
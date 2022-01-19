import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../Service/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import Link from "next/link";

type Posts = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface postProps {
  posts: Posts[];
}

export default function Posts({ posts }: postProps) {
  return (
    <>
      <Head>
        <title>posts igNews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.post}>
          {posts.map((post) => {
            return (
              <Link href={`posts/preview/${post.slug}`}>
                <a key={post.slug}>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["posts.title", "posts.content"],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",

      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
  };
};

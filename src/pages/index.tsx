import React from "react";
import Head from "next/head";
import styles from "./home.module.scss";
import { GetStaticProps } from "next/types";
import { stripe } from "../Service/stripe";
import { SubscribeButton } from "../Components/SubscribeButton";

interface stripeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home(props: stripeProps) {
  return (
    <>
      <Head>
        <title>inicio | ig.news</title>
      </Head>

      <main className={styles.homeContainer}>
        <section className={styles.homeContent}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News Abount <br />
            the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {props.product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1Jv0CUHwY4NJncRglDCFaUuR", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24, //24 hours
  };
};

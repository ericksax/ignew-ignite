import { useSession, signIn } from "next-auth/client";
import { getStripeJs } from "../../Service/stripe-js";
import React from "react";

import styles from "./subscribeButton.module.scss";
import { api } from "../../Service/api";
import { useRouter } from "next/router";

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session?.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId: sessionId });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}

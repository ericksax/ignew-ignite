import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./SignInButton.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";

export function SignInButton({}) {
  const [session] = useSession();
  return session ? (
    <button onClick={() => signOut()} className={styles.SignInButton}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button onClick={() => signIn("github")} className={styles.SignInButton}>
      <FaGithub color="#fdb21c" />
      Sign in with Github
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  );
}

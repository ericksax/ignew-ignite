import Prismic from "@prismicio/client";
const apiEndpoint = process.env.PRISMIC_ENDPOINT;

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(apiEndpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
  });
  return prismic;
}

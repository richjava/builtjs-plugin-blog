import { GetStaticPaths, GetStaticProps } from "next";
import { withRouter } from "next/router";
import { getConfig, getItems } from "@builtjs/theme";
import Page from "../../demo/page";
import { pages } from "../../demo/constants";

export default withRouter(Page);

export const getStaticPaths: GetStaticPaths = async () => {
  const allItems = await getItems("blog-item");
  return {
    paths:
      allItems.items.map(
        ({ attributes }: any) => `/blog-items/${attributes.slug}`
      ) ?? [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const config = await getConfig(pages.BLOG_ARTICLE);
  config.params = context.params;
  return {
    props: { config },
  };
};

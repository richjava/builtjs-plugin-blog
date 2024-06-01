import { GetStaticPaths, GetStaticProps } from "next";
import { withRouter } from "next/router";
import { getConfig, getEntries } from "@builtjs/theme";
import Page from "@/lib/theme/page";
import { pages } from "@/lib/theme/constants";

export default withRouter(Page);

export const getStaticPaths: GetStaticPaths = async () => {
  const entryData:any = await getEntries('post');
  return {
    paths:
      entryData.entries.map(
        (entry:any) => `/post/${entry.slug}`
      ) ?? [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  // const config = await getConfig({
  //   pageName: pages.BLOG_ARTICLE, 
  //   params
  // });
  const config = await getConfig({pageName: pages.BLOG_ARTICLE});
  config.params = params;
  return {
    props: { config }
  };
  console.log('config...', config);
  return {
    props: { config },
  };
};

import { withRouter } from "next/router";
import { getConfig, getData } from "@builtjs/theme";
import Page from "../../demo/page";
import { pageTypes } from "../../demo/constants";

export default withRouter(Page);

export async function getStaticPaths() {
  let pageData = await getData("/data/pages.json");
  let pages = pageData.pages.reduce(
    (acc: any, page: any) =>
      page.type === "templates" ? [...acc, `/templates/${page.slug}`] : acc,
    []
  );
  return {
    paths: pages,
    fallback: true,
  };
}

export async function getStaticProps(context:any) {
  const { slug } = context.params;
  const config = await getConfig(slug, pageTypes.TEMPLATES);
  return {
    props: { config },
  };
}

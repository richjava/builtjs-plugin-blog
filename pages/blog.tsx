import { withRouter } from "next/router";
import { getConfig } from "@builtjs/theme";
import Page from "../demo/page";
import { pages } from "../demo/constants";

export default withRouter(Page);

export async function getStaticProps() {
  const config = await getConfig(pages.BLOG);
  return {
    props: { config }
  };
}
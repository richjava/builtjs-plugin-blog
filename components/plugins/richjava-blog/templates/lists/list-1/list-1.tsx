import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { 
  urlForImage, 
 } from "@/lib/images";
import { Tag } from "@/components/plugins/richjava-blog/elements";

export default function List1({ content }: any) {
  if (!content) return <></>;
  let { collections = null } = { ...content };
  if (!collections) {
    return <></>;
  }
  let collectionName = Object.keys(collections)[0];
  const heroPost = collections[collectionName][0];
  const url = `/${collectionName}/${heroPost.slug}`;
  return (
    <section id="list-1" className="template">
      <div className="max-w-screen-xl mx-auto">
        {heroPost && (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="h-full col-span-3 lg:order-last">
              <Link href={url}>
                <div className="relative transition-opacity rounded-lg h-96 lg:h-full hover:opacity-80">
                  <Image
                    className="bg-gray-100 rounded-lg"
                    src={urlForImage(heroPost.image)}
                    layout="fill"
                    objectFit="cover"
                    alt={heroPost.heading}
                  />
                </div>
              </Link>
            </div>
            <div className="col-span-2 lg:py-20">
              {heroPost.tags && (
                <div className="grid grid-flow-col gap-2 mb-4 auto-cols-max">
                  {heroPost.tags.map((tag: any) => {
                    return (
                      <Tag
                        key={tag.aname}
                        attributes={tag}
                      ></Tag>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center mb-4">
                {heroPost.date && (
                  <p className="mb-0 text-sm capitalize preheading">
                    {format(new Date(heroPost.date), "dd LLLL yyyy")}
                  </p>
                )}
                <span className="mx-3 text-gray-400">|</span>
                {heroPost.category && (
                  <Link className="no-underline hover:underline" href={`/`}>
                    <p className="mb-0 text-sm capitalize">
                      {heroPost.category}
                    </p>
                  </Link>
                )}
              </div>
              <Link className="no-underline" href={url}>
                <h2 className="hover:text-gray-700 dark:hover:text-gray-200">
                  {heroPost.heading}
                </h2>
              </Link>
              <p className="mb-10 text-lg">{heroPost.blurb}</p>
              <Link href={url}>Read Article</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

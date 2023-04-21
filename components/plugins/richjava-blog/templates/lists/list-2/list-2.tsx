import Link from "next/link";
import Image from "next/image";
import getConfig from "next/config";
import { format } from "date-fns";
import { Tag } from "@/components/plugins/richjava-blog/elements";

export default function List2({ content, router }: any) {
  if (!content) return <></>;
  const { collections } = content;
  const { publicRuntimeConfig } = getConfig();
  if (!collections) {
    throw new Error("No template collections");
  }
  let collectionName = Object.keys(collections)[0];
  let collection = collections[collectionName];
  let items;
  if (collection) {
    items = collection.data;
  }
  
  return (
    <section id="list-2" className="template">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-3">
          {items &&
            items.map((item: any) => {
              return (
                <div key={item.attributes.slug}>
                  <div>
                    <Link
                      className="w-24"
                      href={`/${collectionName}/${item.attributes.slug}`}
                    >
                      <div className="relative mb-6 transition-opacity h-96 lg:h-56 hover:opacity-80">
                        <Image
                          className="bg-gray-100 rounded-lg"
                          src={`${publicRuntimeConfig.BACKEND_URL || ""}${
                            item.attributes?.image?.data.attributes.url
                          }`}
                          layout="fill"
                          objectFit="cover"
                          alt={item.attributes.title}
                        />
                      </div>
                    </Link>
                  </div>
                  <div>
                    {item.attributes.tags && (
                      <div className="grid grid-flow-col gap-2 mb-4 auto-cols-max">
                        {item.attributes.tags.data.map((tag: any) => {
                          return (
                            <Tag
                              key={tag.attributes.name}
                              attributes={tag.attributes}
                            ></Tag>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex items-center mb-2">
                      <p className="mb-0 text-sm capitalize preheading">
                        {format(new Date(item.attributes.date), "dd LLLL yyyy")}
                      </p>
                      <span className="mx-3 text-gray-400">|</span>
                      {/* TODO: Implement Category functionality */}
                      {item.attributes.category && (
                        <Link
                          className="no-underline hover:underline"
                          href={`/`}
                        >
                          <p className="mb-0 text-sm capitalize">
                            {item.attributes.category}
                          </p>
                        </Link>
                      )}
                    </div>
                    <Link
                      className="no-underline"
                      href={`/${collectionName}/${item.attributes.slug}`}
                    >
                      <h3 className="mb-2 hover:text-gray-700 dark:hover:text-gray-200">
                        {item.attributes.title}
                      </h3>
                    </Link>
                    <p>{item.blurb}</p>
                    <Link href={`/${collectionName}/${item.attributes.slug}`}>
                      Read Article
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        {!items.length && (
          <div>
            <p>No posts</p>
          </div>
        )}
      </div>
    </section>
  );
}

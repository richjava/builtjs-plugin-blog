import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/plugins/richjava-blog/elements";
import { 
  urlForImage, 
  widthForImage, 
  heightForImage
 } from "@/lib/images";

const getHTML = (content: any) => {
  return {
    __html: content,
  };
};

export default function Article1({ content }: any) {
  if (!content) return <></>;
  let { item = null } = { ...content };
  let author = null;
  if (item.author) {
    author = item.author;
  }
  return (
    <article id="article-1" className="template">
      {item && (
        <div className="max-w-screen-xl mx-auto">
          <header className="max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <p className="mb-0 text-sm capitalize preheading">
                {format(new Date(item.date), "dd LLLL yyyy")}
              </p>
              <span className="mx-3 text-gray-400">|</span>
              <Link className="no-underline hover:underline" href="/">
                <p className="mb-0 text-sm">{item.category}</p>
              </Link>
            </div>
            <h1 className="mb-10">{item.heading}</h1>
            {author && (
              <div className="flex items-center">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    className="rounded-full"
                    src={urlForImage(author.profileImage)}
                    layout="fill"
                    objectFit="cover"
                    alt={author.fullName}
                  />
                </div>
                <div>
                  <p className="mb-0 font-bold text-black capitalize">
                    {author.fullName}
                  </p>
                  <p className="mb-0 text-sm capitalize">
                    {author.position || "Writer"}
                  </p>
                </div>
              </div>
            )}
          </header>
          <div className="relative my-20">
            <Image
              src={urlForImage(author.profileImage)}
              width={widthForImage(author.profileImage)}
              height={heightForImage(author.profileImage)}
              layout="responsive"
              alt={author.fullName}
            />
          </div>
          <div
            className="max-w-2xl mx-auto"
            dangerouslySetInnerHTML={getHTML(item.content)}
          ></div>
          <div className="max-w-2xl mx-auto">
            {item.tags && (
              <div className="grid grid-flow-col gap-2 mb-4 auto-cols-max">
                {item.tags.map((tag: any) => {
                  return (
                    <Tag
                      key={tag.name}
                      attributes={tag}
                    ></Tag>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
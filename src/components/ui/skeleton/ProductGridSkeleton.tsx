import { Title } from "../title/Title";

interface Props {
  title?: string;
  withTitle?: boolean;
  items?: number;
}

export const ProductGridSkeleton = ({ title, withTitle, items = 6 }: Props) => {
  return (
    <div className="px-6 sm:px-9 lg:px-12">
      {withTitle && title && title.trim().length > 0 && (
        <Title
          title={title}
          className="pt-10 text-[24px] leading-[30px] tracking-[1.4px]"
        />
      )}

      {withTitle && (!title || title.trim().length <= 0) && (
        <div className="animate-pulse pt-10">
          <div className="h-[30px] w-48 bg-gray-100"></div>
        </div>
      )}

      <div className="flex flex-row flex-wrap justify-between after:w-[47%] sm:after:w-[30%] mt-[15px]">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="animate-pulse w-[47%] sm:w-[30%] my-[25px]">
            <div className="mb-1 w-full relative pt-[100%] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gray-100"></div>

            <div>
              <div className="h-5 w-28 sm:w-32 md:w-40 xm:w-48 mlg:w-1/2  bg-gray-100 mb-2" />
              <div className="h-5 w-10 bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

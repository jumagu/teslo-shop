import Link from "next/link";
import Image from "next/image";

export const NotFound = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full max-w-[1500px] mb-auto mx-auto sm:px-[30px] py-20 xm:px-[10%]">
        <picture className="flex justify-center items-baseline max-w-full">
          <div className="font-medium text-[148px] sm:text-[243px] text-black text-opacity-40 leading-[normal] tracking-[7.4px] sm:tracking-[12px]">
            4
          </div>

          <div>
            <Image
              className="w-auto max-h-[148px] sm:max-h-[242px]"
              src="/images/page-not-found/CyberOwl.png"
              width={500}
              height={500}
              alt="Cyber Owl"
            />
          </div>

          <div className="font-medium text-[148px] sm:text-[243px] text-black text-opacity-40 leading-[normal] tracking-[7.4px] sm:tracking-[12px]">
            4
          </div>
        </picture>

        <div className="m-[0_auto] w-full md:max-w-[1000px]">
          <h2 className="font-medium text-center text-[28px] leading-[34px] tracking-[1.4px] max-w-[345px] sm:max-w-[unset] m-[0_auto] pt-8 pb-2">
            Whoops! Sorry About That.
          </h2>

          <p className="font-normal text-center text-[13px] leading-[26px] tracking-[1.8px] max-w-[345px] sm:max-w-[unset] m-[12px_auto] text-zinc-500">
            Join Starman back at the{" "}
            <Link
              className="text-zinc-700 underline hover:text-zinc-500 focus:text-black transition-colors duration-[.33s]"
              href="/"
            >
              homepage
            </Link>{" "}
            or visit our{" "}
            <Link
              className="text-zinc-700 underline hover:text-zinc-500 focus:text-black transition-colors duration-[.33s]"
              href="#"
            >
              FAQ Page
            </Link>{" "}
            for help.
          </p>
        </div>
      </div>
    </div>
  );
};

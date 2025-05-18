"use client";
import { Button } from "@heroui/button";

import { subtitle, title } from "@/components/primitives";
import { useSelector } from "react-redux";

export default function Home() {
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const userData = useSelector((state) => state?.auth?.userData);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className="poppins_bold sm:text-5xl text-brand-dark dark:text-brand-light">
          Make
        </span>
        <span className="roboto_regular text-4xl text-brand-primary">
          beautiful
        </span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Button radius="md" variant="bordered">
          Button
        </Button>
        <Button isDisabled color="primary" radius="md">
          Disabled
        </Button>
      </div>
    </section>
  );
}

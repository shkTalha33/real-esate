import { Button } from "@heroui/button";

import { subtitle, title } from "@/components/primitives";

export default function Home() {
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

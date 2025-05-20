import React from "react";

export default function SectionHeading({
  tag,
  heading1,
  heading2,
  description,
}) {
  return (
    <>
      <div className="text-center mb-12">
        <span className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-1 rounded-full text-sm poppins_medium mb-4">
          {tag}
        </span>
        <h2 className="text-3xl md:text-4xl poppins_bold text-dark-900 dark:text-white mb-4">
          <span className="text-brand-warning">{heading1}</span> {heading2}
        </h2>
        <p
          className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 roboto_light"
          style={{ fontSize: "1.125rem" }}
        >
          {description}
        </p>
      </div>
    </>
  );
}

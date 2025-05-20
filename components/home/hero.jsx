"use client";
import { house7 } from "@/public/assets/images";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src={house7}
          alt="Luxury Modern Home"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Animated Shape Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-primary/10 rounded-full filter blur-3xl -z-0" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-warning/10 rounded-full filter blur-3xl -z-0" />

      {/* Hero Content */}
      <div className="lg:container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-white/20">
            <span
              className="text-white tracking-wider poppins_medium"
              style={{ fontSize: "0.875rem" }}
            >
              LUXURY LIVING REDEFINED
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-white mb-6 leading-tight poppins_bold text-[4rem]">
            <span className="block" style={{ lineHeight: "1.1" }}>
              Find Your
            </span>
            <span
              className="text-brand-warning"
              style={{ display: "block", lineHeight: "1.1" }}
            >
              Dream Home
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed roboto_light"
            style={{ fontSize: "1.25rem" }}
          >
            Discover exclusive properties in the most sought-after locations.
            Your perfect home is just a click away.
          </p>

          {/* CTA Buttons */}
          <div className="flex  flex-row justify-center gap-4">
            <Link
              href="/properties"
              className="bg-brand-warning hover:bg-brand-warningdark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 mb-0 shadow-lg shadow-brand-warning/30 roboto_medium"
              style={{ fontSize: "1.125rem" }}
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/20 px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 roboto_medium"
              style={{ fontSize: "1.125rem" }}
            >
              Contact Agent
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "2500+", label: "Properties" },
              { value: "98%", label: "Happy Clients" },
              { value: "15+", label: "Years Experience" },
              { value: "50+", label: "Awards Won" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-white mb-2 poppins_bold"
                  style={{ fontSize: "2.25rem" }}
                >
                  {stat.value}
                </div>
                <div
                  className="uppercase tracking-wider text-white/70 roboto_light"
                  style={{ fontSize: "0.875rem" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}

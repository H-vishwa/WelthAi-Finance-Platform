import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
            {statsData.map((statsData, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {statsData.value}
                </div>
                <div className="text-gray-600">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {featuresData.map((featuresData, index) => (
              <Card key={index} className="p-6">
                <CardContent className={"space-y-4 pt-4"}>
                  {featuresData.icon}
                  <h3 className=" ">{featuresData.title}</h3>
                  <p className="text-gray-600">{featuresData.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {howItWorksData.map((howItWorksData, index) => (
              <div
                key={index}
                className="text-center hover:shadow-xl hover:rounded-2xl p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {howItWorksData.icon}
                </div>
                <h3 className="text-xl font-semibold">
                  {howItWorksData.title}
                </h3>
                <p className="text-gray-600 pb-3">
                  {howItWorksData.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>

          {/* ✅ Single Carousel with controls */}
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="m-2 p-4 bg-white rounded-2xl shadow-md mx-2 md:basis-1/2 lg:basis-1/3">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                      unoptimized
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
      <section className="py-10 md:py-20 flex items-center justify-center">
        <div className="max-w-7xl mx-5 flex flex-col md:flex-row items-center justify-between text-left bg-gradient-to-b from-[#001F3F] via-[#003F66] to-[#00B8D9] rounded-2xl p-6 md:p-10 text-white shadow-xl animate-gradient">
          {/* Text content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl md:text-[46px] md:leading-[60px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#E0F7FF]">
              Ready to take control of your Finances?
            </h2>
            <p className="mt-4 text-lg bg-gradient-to-r from-[#E0F7FF] to-[#80E9FF] text-transparent bg-clip-text ">
              Join thousands of users who are already managing their finances
              smarter with Welth
            </p>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <Link href="/dashboard">
              <Button className="text-slate-900 bg-white rounded-full text-sm px-6 py-3 mt-4 md:mt-0 hover:bg-[#cef3ff] transition animate-pulse">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

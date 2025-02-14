import Image from "next/image";
import TestimonialImg from "@/public/images/large-testimonial.jpg";

export default function LargeTestimonial() {
  return (
    <section className="mb-[200px] px-4">
      <h2 className="text-5xl font-bold text-center text-blue-500 mt-8">What users say...</h2>
      <h3 className="text-lg font-semibold text-center text-grey-400 mt-2 md:text-3xl">150+ user interviews, reviews, and shoutouts—and counting 
      </h3>
      <h3 className="text-base font-medium text-center text-green-500 mt-1 md:text-4xl">Driven by user-first thesis 

</h3>


      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["togRbicQWEQ", "YS8wIpw01w4", "bfR0Q7dyhJo"].map((videoId, index) => (
          <div
            key={index}
            className="relative p-[3px] rounded-2xl bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"
          >
            <div className="overflow-hidden rounded-2xl bg-black">
              <iframe
                className="w-full h-56 sm:h-64 md:h-48 lg:h-56 rounded-2xl"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

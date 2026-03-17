import { testimonialsData } from "../data/data";
import React from "react";

export default function technologyData() {
  return (
    <section className="py-16 bg-neutral-50">

      <div className="container mx-auto px-4">

        <div className="text-center mb-12">

          <h3 className="text-3xl font-bold mb-4">
         The Technology Behind the Detection
          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonialsData.map((item, i) => (

            <div key={i} className="bg-white rounded-xl p-6 shadow">

              <div className="flex items-center mb-4">

               

                <div>
                  <h5 className="font-semibold">
                    {item.name}
                  </h5>

                  <p className="text-sm text-neutral-600">
                    {item.role}
                  </p>
                </div>

              </div>

              <p className="text-neutral-700 italic">
                "{item.content}"
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
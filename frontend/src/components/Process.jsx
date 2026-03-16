import { processStepsData } from "../data/data";
import React from "react";

export default function Process() {
  return (
    <section className="py-16 bg-white">

      <div className="container mx-auto px-4">

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">
            Verification Process
          </h3>
          <p className="text-neutral-600">
            Our multi-layered approach ensures accurate detection
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">

          {processStepsData.map((step, i) => (

            <div key={i} className="text-center">

              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.step}
              </div>

              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center mx-auto rounded-lg mb-4">
                <i className={step.icon}></i>
              </div>

              <h4 className="font-semibold mb-2">
                {step.title}
              </h4>

              <p className="text-neutral-600">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
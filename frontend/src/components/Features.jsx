import { featuresData } from "../data/data";
import React from "react";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <section className="py-16 bg-white">

      <div className="container mx-auto px-4">

        <h3 className="text-3xl font-bold text-center mb-12">
          Comprehensive Detection Suite
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {featuresData.map((item, i) => (

            <Link key={i} to={item.path}>

              <div className="card-hover bg-white rounded-xl p-6 border border-neutral-200 cursor-pointer hover:shadow-lg transition">

                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                  <i className={`${item.icon} text-xl`}></i>
                </div>

                <h4 className="text-xl font-semibold text-primary mb-3">
                  {item.title}
                </h4>

                <p className="text-neutral-600">
                  {item.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}
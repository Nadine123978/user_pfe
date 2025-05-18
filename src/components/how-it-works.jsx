import React from "react";
import { Card, CardContent } from "../components/Card";

import { motion } from "framer-motion";
import { FaLaptop, FaStar, FaTicketAlt } from "react-icons/fa";

const steps = [
  {
    icon: <FaLaptop size={32} className="text-white" />,
    title: "Choose an event you want to be part with",
    text: "Lorem ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    icon: <FaTicketAlt size={32} className="text-white" />,
    title: "Live unique experience",
    text: "Lorem ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  },
  {
    icon: <FaStar size={32} className="text-white" />,
    title: "Get access to private perks",
    text: "Lorem ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-16 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">How it works</h2>
        <p className="text-gray-400">Lorem ipsum text</p>
      </div>

      <div className="flex flex-col gap-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <img
              src={`/images/step${index + 1}.jpg`}
              alt={`Step ${index + 1}`}
              className="w-full md:w-1/2 rounded-xl shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <Card className="bg-[#334155] rounded-2xl p-6">
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#1e293b] p-3 rounded-xl">{step.icon}</div>
                    <h3 className="text-xl font-semibold">Step {index + 1}</h3>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                  <p className="text-gray-300">{step.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

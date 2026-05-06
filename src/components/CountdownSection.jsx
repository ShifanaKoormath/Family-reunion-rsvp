import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CountdownSection() {
  const eventDate = new Date("2026-05-24T09:00:00");

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50 via-pink-50 to-blue-50"></div>

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-5xl md:text-7xl font-black text-blue-900"
        >
          The Celebration Begins In
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-20">
          {[
            { label: "Days", value: timeLeft.days || 0 },
            { label: "Hours", value: timeLeft.hours || 0 },
            { label: "Minutes", value: timeLeft.minutes || 0 },
            { label: "Seconds", value: timeLeft.seconds || 0 },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-[40px] p-10 text-center shadow-2xl border border-white/50"
            >
              <div className="text-6xl md:text-8xl font-black text-pink-600">
                {item.value}
              </div>

              <div className="mt-4 uppercase tracking-widest text-gray-600 font-bold">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
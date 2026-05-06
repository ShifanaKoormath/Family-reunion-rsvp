import { motion } from "framer-motion";

const messages = [
  "Can’t wait to meet everyone again ❤️",
  "Together is our favorite place to be 🎉",
  "Looking forward to beautiful memories ✨",
  "Different paths, one family 🌿",
];

export default function FamilyMessages() {
  return (
    <section className="py-28 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center text-5xl md:text-6xl font-black text-blue-900"
      >
        Family Messages
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-20">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 shadow-2xl text-center"
          >
            <p className="text-2xl leading-relaxed text-gray-700">
              {message}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
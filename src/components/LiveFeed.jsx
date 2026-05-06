import { motion } from "framer-motion";

export default function LiveFeed({ joinedData }) {
  const totalMembers = joinedData.reduce(
    (sum, item) => sum + item.memberCount,
    0
  );

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-white via-pink-50 to-yellow-50"></div>

      {/* FLOATING SHAPES */}

      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-pink-200 opacity-30 blur-3xl"></div>

      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-200 opacity-30 blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* COUNTERS */}

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-[40px] p-10 text-white shadow-2xl"
          >
            <h2 className="text-6xl md:text-7xl font-black">
              {totalMembers}
            </h2>

            <p className="mt-4 text-2xl md:text-3xl">
              Members Joining
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-10 text-white shadow-2xl"
          >
            <h2 className="text-6xl md:text-7xl font-black">
              {joinedData.length}
            </h2>

            <p className="mt-4 text-2xl md:text-3xl">
              Families Confirmed
            </p>
          </motion.div>
        </div>

        {/* TITLE */}

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center text-5xl md:text-7xl font-black text-blue-900"
        >
          Who’s Joining?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-xl text-gray-600"
        >
          Every family joining makes the celebration warmer ❤️
        </motion.p>

        {/* FEED */}

        <div className="mt-20 space-y-8">
          {joinedData.length === 0 && (
            <div className="bg-white/80 backdrop-blur-xl rounded-[35px] p-10 text-center shadow-2xl">
              <h3 className="text-3xl font-black text-pink-600">
                Be The First Family To Join 🎉
              </h3>

              <p className="mt-4 text-xl text-gray-600">
                Your participation begins the celebration.
              </p>
            </div>
          )}

          {joinedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 shadow-2xl border border-white/50 hover:scale-[1.02] transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <h3 className="text-3xl font-black text-pink-600">
                    {item.submittedBy}
                  </h3>

                  <p className="mt-3 text-xl text-gray-700 leading-relaxed">
                    from{" "}
                    <span className="font-bold text-blue-700">
                      {item.family}
                    </span>{" "}
                    joined with{" "}
                    <span className="font-black text-orange-500">
                      {item.memberCount}
                    </span>{" "}
                    members 🎊
                  </p>

                  {item.message && (
                    <p className="mt-4 italic text-gray-600">
                      “{item.message}”
                    </p>
                  )}
                </div>

                <div className="text-5xl">
                  🎉
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
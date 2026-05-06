import { motion } from "framer-motion";

export default function LiveParticipants({ joinedData = [] }) {
  const totalMembers = joinedData.reduce(
    (sum, item) => sum + item.memberCount,
    0
  );

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-white">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fff8f4] to-[#fffdf7]"></div>

      {/* SOFT COLOR BLOBS */}

      <div className="absolute top-[-60px] left-[-40px] w-72 h-72 rounded-full bg-pink-200/30 blur-[90px]"></div>

      <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 rounded-full bg-blue-200/25 blur-[100px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* COUNTERS */}

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* MEMBERS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
            }}
            className="relative overflow-hidden rounded-[38px] bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 p-10 text-white shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
          >
            {/* LIGHT OVERLAY */}

            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.18),transparent)]"></div>

            <div className="relative z-10">
              <h2 className="text-6xl md:text-7xl font-black">
                {totalMembers}
              </h2>

              <p className="mt-4 text-2xl md:text-3xl font-medium">
                Members Joining
              </p>
            </div>
          </motion.div>

          {/* FAMILIES */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.9,
            }}
            className="relative overflow-hidden rounded-[38px] bg-gradient-to-r from-[#1f3f95] via-[#2855c5] to-[#3b82f6] p-10 text-white shadow-[0_25px_70px_rgba(0,0,0,0.12)]"
          >
            {/* LIGHT OVERLAY */}

            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15),transparent)]"></div>

            <div className="relative z-10">
              <h2 className="text-6xl md:text-7xl font-black">
                {joinedData.length}
              </h2>

              <p className="mt-4 text-2xl md:text-3xl font-medium">
                Families Confirmed
              </p>
            </div>
          </motion.div>
        </div>

        {/* HEADING */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black text-[#1f2f55]">
            Who’s Joining?
          </h2>

          <p className="mt-6 text-xl md:text-2xl text-gray-600">
            Every family joining makes the celebration warmer ❤️
          </p>
        </motion.div>

        {/* LIVE FEED */}

        <div className="mt-20 space-y-7">
          {/* EMPTY STATE */}

          {joinedData.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              className="bg-white rounded-[36px] p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100"
            >
              <h3 className="text-3xl md:text-4xl font-black text-pink-600">
                Be The First Family To Join 🎉
              </h3>

              <p className="mt-5 text-xl text-gray-600">
                Your participation begins the celebration.
              </p>
            </motion.div>
          )}

          {/* FEED ITEMS */}

          {joinedData.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 70,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.7,
              }}
              whileHover={{
                scale: 1.015,
              }}
              className="relative overflow-hidden bg-white rounded-[36px] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 transition"
            >
              {/* SOFT TOP GRADIENT */}

              <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-pink-500 via-orange-400 to-blue-600"></div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* TEXT */}

                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-pink-600">
                    {item.submittedBy}
                  </h3>

                  <p className="mt-4 text-xl md:text-2xl text-gray-700 leading-relaxed">
                    from{" "}
                    <span className="font-black text-[#1f3f95]">
                      {item.family}
                    </span>{" "}
                    joined with{" "}
                    <span className="font-black text-orange-500">
                      {item.memberCount}
                    </span>{" "}
                    members 🎊
                  </p>

                  {item.message && (
                    <p className="mt-5 italic text-gray-500 text-lg">
                      “{item.message}”
                    </p>
                  )}
                </div>

                {/* ICON */}

                <div className="text-5xl md:text-6xl">
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
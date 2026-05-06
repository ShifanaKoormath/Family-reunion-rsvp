import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-24 px-6">
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,214,102,0.12),transparent_30%)]"></div>

      {/* TOP CURVE */}

      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <div className="relative h-[180px]">
          <div className="absolute top-[-120px] left-[-10%] w-[130%] h-[220px] rounded-[100%] bg-pink-100/40"></div>

          <div className="absolute top-[-80px] left-[-5%] w-[120%] h-[180px] rounded-[100%] bg-yellow-100/50"></div>

          <div className="absolute top-[-100px] right-[-10%] w-[130%] h-[200px] rounded-[100%] bg-blue-100/30"></div>
        </div>
      </div>

      {/* FLOATING CONFETTI */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -16, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className={`absolute rounded-full ${
              [
                "bg-pink-500",
                "bg-orange-500",
                "bg-yellow-400",
                "bg-blue-600",
                "bg-green-500",
                "bg-purple-500",
              ][Math.floor(Math.random() * 6)]
            }`}
            style={{
              width: `${8 + Math.random() * 8}px`,
              height: `${18 + Math.random() * 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* MAIN HERO */}

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
          >
            {/* SMALL TEXT */}

            <p className="uppercase tracking-[0.28em] text-[#1f3f95] font-bold text-sm md:text-base">
              FAMILY REUNION 2026
            </p>

            {/* MAIN HEADING */}

            <h1 className="mt-6 text-5xl md:text-7xl font-black leading-[1.05] text-[#1f2f55]">
              One Family.
              <br />

              <span className="bg-gradient-to-r from-pink-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
                One Celebration.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-8 text-xl md:text-2xl leading-relaxed text-gray-600 max-w-2xl">
              A joyful gathering filled with laughter,
              memories, conversations, food, games,
              and the warmth of being together again.
            </p>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#join"
                className="px-10 py-5 rounded-full bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 text-white text-lg font-bold shadow-[0_14px_40px_rgba(0,0,0,0.15)] hover:scale-105 transition"
              >
                Join Celebration 🎉
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-10 py-5 rounded-full border-2 border-[#1f3f95] text-[#1f3f95] text-lg font-bold hover:bg-[#1f3f95] hover:text-white transition"
              >
                View Location 📍
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >
            {/* MAIN CARD */}

            <div className="relative overflow-hidden rounded-[40px] bg-white border border-gray-100 shadow-[0_25px_70px_rgba(0,0,0,0.10)] p-10">
              {/* TOP STRIP */}

              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-600 via-yellow-400 to-blue-600"></div>

              {/* CONTENT */}

              <div className="pt-6">
                <p className="uppercase tracking-[0.3em] text-[#1f3f95] text-sm font-bold">
                  Celebration Details
                </p>

                <h3 className="mt-5 text-4xl md:text-5xl font-black text-[#1f2f55] leading-tight">
                  Our Family
                  <br />
                  Get Together
                </h3>

                <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                  Different branches. One root.
                  Let’s gather once again and create
                  memories that stay forever.
                </p>

                {/* MINI INFO */}

                <div className="mt-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      📅
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        DATE
                      </p>

                      <p className="font-black text-[#1f2f55] text-xl">
                        24 MAY 2026
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      🕘
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        TIME
                      </p>

                      <p className="font-black text-[#1f2f55] text-xl">
                        9:00 AM – 5:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      📍
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        VENUE
                      </p>

                      <p className="font-black text-[#1f2f55] text-xl">
                        Edan Garden,
                        <br />
                        Pukayur, Malappuram
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING DECOR */}

            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-pink-200/40 blur-2xl"></div>

            <div className="absolute -bottom-8 -left-6 w-24 h-24 rounded-full bg-yellow-200/40 blur-2xl"></div>
          </motion.div>
        </div>

        {/* DETAIL CARDS */}

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
            delay: 0.3,
            duration: 1,
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {[
            {
              icon: "📅",
              title: "DATE",
              value: "24 MAY 2026",
              sub: "SUNDAY",
              color: "text-pink-600",
            },
            {
              icon: "🕘",
              title: "TIME",
              value: "9:00 AM – 5:00 PM",
              sub: "",
              color: "text-orange-500",
            },
            {
              icon: "📍",
              title: "VENUE",
              value: "EDAN GARDEN,\nPUKAYUR,\nMALAPPURAM",
              sub: "",
              color: "text-green-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -6,
              }}
              className="relative bg-white rounded-[32px] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
            >
              {/* TOP STRIP */}

              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-orange-400 to-blue-600"></div>

              <div className="text-5xl">
                {item.icon}
              </div>

              <h3
                className={`mt-5 text-2xl font-black ${item.color}`}
              >
                {item.title}
              </h3>

              <p className="mt-4 text-xl md:text-2xl font-bold whitespace-pre-line leading-relaxed text-[#243b53]">
                {item.value}
              </p>

              {item.sub && (
                <p className="mt-2 text-gray-500 font-medium">
                  {item.sub}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
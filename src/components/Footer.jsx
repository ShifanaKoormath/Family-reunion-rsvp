import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white pt-28 pb-16 px-6">
      {/* TOP CURVE */}

      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <div className="relative h-[180px]">
          <div className="absolute top-[-120px] left-[-10%] w-[130%] h-[220px] rounded-[100%] bg-pink-100/40"></div>

          <div className="absolute top-[-90px] left-[-5%] w-[120%] h-[180px] rounded-[100%] bg-yellow-100/40"></div>

          <div className="absolute top-[-110px] right-[-10%] w-[130%] h-[200px] rounded-[100%] bg-blue-100/30"></div>
        </div>
      </div>

      {/* CONFETTI */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 8, -8, 0],
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
              width: `${8 + Math.random() * 6}px`,
              height: `${18 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.65,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* HEADING */}

        <motion.h2
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
          className="text-5xl md:text-7xl font-black text-[#1f2f55]"
        >
          See You There ❤️
        </motion.h2>

        {/* TEXT */}

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
          className="mt-8 text-xl md:text-2xl leading-relaxed text-gray-600"
        >
          A celebration of togetherness, laughter,
          stories, food, games, memories,
          and the joy of meeting again.
        </motion.p>

        {/* QUOTE */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 1,
          }}
          className="mt-14"
        >
          <p className="text-2xl md:text-4xl italic text-[#243b53]">
            “Together is our favorite place to be.”
          </p>
        </motion.div>

        {/* DIVIDER */}

        <div className="mt-16 flex justify-center">
          <div className="w-44 h-1 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-blue-600"></div>
        </div>

        {/* BOTTOM */}

       <div className="mt-10">
  <p className="uppercase tracking-[0.28em] text-[#1f3f95] text-sm md:text-base font-bold">
    OUR FAMILY REUNION 2026
  </p>

  <p className="mt-4 text-gray-500">
    Different Branches • One Root
  </p>

 {/* CREDIT */}

<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.5,
    duration: 0.8,
  }}
  className="mt-14 flex justify-center"
>
  <div className="relative overflow-hidden rounded-full bg-white border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-8 py-4">
    {/* TOP GLOW */}

    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent)]"></div>

    <p className="relative z-10 text-sm md:text-base text-gray-600">
      Developed by{" "}
      <a
        href="https://evovision.in"
        target="_blank"
        rel="noreferrer"
        className="font-black text-lg md:text-xl bg-gradient-to-r from-pink-600 via-orange-500 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition"
      >
        evovision.in
      </a>
    </p>
  </div>
</motion.div>

</div>
      </div>
    </footer>
  );
}
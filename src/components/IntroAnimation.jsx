import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function IntroAnimation({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.03,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="fixed inset-0 z-[999] overflow-hidden bg-white"
      >
        {/* SOFT SUNLIGHT */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,215,120,0.35),transparent_40%)]"></div>

        {/* TOP FLAGS */}

        <motion.div
          initial={{
            y: -60,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1"
        >
          {[
            "#ff007f",
            "#ff7a00",
            "#f2c300",
            "#42c84b",
            "#3b5bdb",
            "#7c3aed",
          ].map((color, index) => (
            <motion.div
              key={index}
              animate={{
                rotate: [0, -4, 4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              style={{
                borderTopColor: color,
              }}
              className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[42px] border-l-transparent border-r-transparent"
            />
          ))}
        </motion.div>

        {/* CONFETTI */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                y: -20,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: window.innerHeight + 100,
                rotate: 360,
              }}
              transition={{
                duration: 7 + Math.random() * 3,
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
                width: `${8 + Math.random() * 5}px`,
                height: `${20 + Math.random() * 8}px`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* MAIN CONTENT */}

        <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
          {/* SMALL TEXT */}

          <motion.p
            initial={{
              opacity: 0,
              letterSpacing: "0.5em",
              y: 30,
            }}
            animate={{
              opacity: 1,
              letterSpacing: "0.28em",
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="uppercase text-[#243b53] text-sm md:text-base font-semibold"
          >
            A DAY TO COME TOGETHER AGAIN
          </motion.p>

          {/* MAIN EMOTIONAL LINE */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
              duration: 1,
            }}
            className="mt-10 max-w-5xl text-5xl md:text-8xl font-black leading-[1.05]"
          >
            <span className="bg-gradient-to-r from-pink-600 via-orange-500 via-yellow-500 to-blue-600 bg-clip-text text-transparent">
              Different Branches.
            </span>

            <br />

            <span className="text-[#1f2f55]">
              One Root.
            </span>
          </motion.h1>

          {/* TAGLINE */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="mt-10 text-2xl md:text-4xl italic text-[#243b53]"
          >
            Together is our favorite place to be.
          </motion.p>

          {/* FINAL TEXT */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.5,
            }}
            className="mt-16"
          >
            <p className="uppercase tracking-[0.35em] text-[#1f3f95] font-bold text-sm md:text-base">
              Welcome To The Celebration
            </p>
          </motion.div>
        </div>

        {/* BOTTOM LIGHT */}

        <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[260px] rounded-full bg-yellow-200/40 blur-[90px]"></div>

        {/* TRANSITION SWEEP */}

        <motion.div
          initial={{
            x: "-120%",
          }}
          animate={{
            x: "220%",
          }}
          transition={{
            delay: 3,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[28%] h-full bg-white/60 blur-3xl rotate-12"
        />
      </motion.div>
    </AnimatePresence>
  );
}
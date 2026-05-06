import { motion } from "framer-motion";

export default function SectionTransition() {
  return (
    <div className="relative h-40 overflow-hidden">
      {/* GLOW */}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-100/50 to-transparent"></div>

      {/* WAVES */}

      <motion.div
        animate={{
          x: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 w-[120%] h-32 bg-gradient-to-r from-pink-200 via-orange-100 to-blue-200 rounded-t-[100%]"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20px] left-0 w-[120%] h-28 bg-gradient-to-r from-yellow-100 via-pink-100 to-orange-100 rounded-t-[100%] opacity-80"
      />

      {/* FLOATING PARTICLES */}

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [-20, -80],
            }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 3,
              delay: Math.random() * 5,
            }}
            className={`absolute w-3 h-3 rounded-full ${
              [
                "bg-pink-400",
                "bg-yellow-300",
                "bg-orange-400",
                "bg-blue-400",
              ][Math.floor(Math.random() * 4)]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "0%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import IntroAnimation from "../components/IntroAnimation";
import HeroSection from "../components/HeroSection";
import CountdownSection from "../components/CountdownSection";
import LiveParticipants from "../components/LiveParticipants";
import RSVPSection from "../components/RSVPSection";
import Footer from "../components/Footer";
import FamilyMessages from "../components/FamilyMessages";

import { useEffect } from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

const [joinedData, setJoinedData] =
  useState([]);
  useEffect(() => {
  const q = query(
    collection(db, "participants"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setJoinedData(data);
  });

  return () => unsubscribe();
}, []);


  return (
    <div className="overflow-x-hidden bg-white">
      {/* INTRO */}

      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation
            onFinish={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 1.02,
          y: 60,
        }}
        animate={{
          opacity: showIntro ? 0 : 1,
          scale: showIntro ? 1.02 : 1,
          y: showIntro ? 60 : 0,
        }}
        transition={{
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 80 : 0,
          }}
          transition={{
            delay: 0.2,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HeroSection />
        </motion.div>

        {/* COUNTDOWN */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 60 : 0,
          }}
          transition={{
            delay: 0.45,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <CountdownSection />
        </motion.div>

        {/* LIVE PARTICIPANTS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 60 : 0,
          }}
          transition={{
            delay: 0.65,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
<LiveParticipants joinedData={joinedData} />        </motion.div>

{/* FAMILY MESSAGES */}

<motion.div
  initial={{
    opacity: 0,
    y: 60,
  }}
  animate={{
    opacity: showIntro ? 0 : 1,
    y: showIntro ? 60 : 0,
  }}
  transition={{
    delay: 0.75,
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <FamilyMessages joinedData={joinedData} />
</motion.div>

{/* RSVP */}

<motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: showIntro ? 0 : 1,
            y: showIntro ? 60 : 0,
          }}
          transition={{
            delay: 0.85,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
<RSVPSection
  joinedData={joinedData}
  setJoinedData={setJoinedData}
/>          <Footer />
        </motion.div>
      </motion.div>
    </div>
  );
}
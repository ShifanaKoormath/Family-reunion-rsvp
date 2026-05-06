import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

import families from "../data/families";


import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";


export default function RSVPSection({
  joinedData,
  setJoinedData,
}) {
  const [step, setStep] = useState(null);

  const [showConfetti, setShowConfetti] =
    useState(false);

  const [formData, setFormData] = useState({
    family: "",
    submittedBy: "",
    memberCount: "",
    members: "",
    message: "",
  });

  // SUBMIT

const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.family ||
    !formData.submittedBy ||
    !formData.memberCount
  ) {
    alert("Please complete all required fields.");
    return;
  }

  try {
    await addDoc(
      collection(db, "participants"),
      {
        ...formData,
        memberCount: parseInt(
          formData.memberCount
        ),
        status: "yes",
        createdAt: serverTimestamp(),
      }
    );

    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    setFormData({
      family: "",
      submittedBy: "",
      memberCount: "",
      members: "",
      message: "",
    });

    setStep("success");
  } catch (error) {
    console.error(error);

    alert(
      "Something went wrong. Please try again."
    );
  }
};

  return (
    <section
      id="join"
      className="relative overflow-hidden py-28 px-6 bg-white"
    >
      {showConfetti && <Confetti />}

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#fffaf7] via-white to-[#fff7fb]"></div>

      {/* SOFT COLOR BLOBS */}

      <div className="absolute top-[-80px] left-[-40px] w-72 h-72 rounded-full bg-pink-200/25 blur-[90px]"></div>

      <div className="absolute bottom-[-100px] right-[-50px] w-80 h-80 rounded-full bg-blue-200/25 blur-[100px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="relative overflow-hidden rounded-[42px] bg-white border border-gray-100 shadow-[0_25px_80px_rgba(0,0,0,0.08)] p-8 md:p-14"
        >
          {/* TOP STRIP */}

          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-600 via-orange-500 to-blue-600"></div>

          {/* HEADING */}

          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black text-[#1f2f55] leading-tight">
              Join The Celebration
            </h2>

            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              Let us know if your family will be part of
              this beautiful gathering ❤️
            </p>
          </div>

          {/* OPTIONS */}

          {!step && (
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {/* YES */}

              <button
                onClick={() => setStep("yes")}
                className="rounded-[32px] bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition hover:scale-105"
              >
                <div className="text-5xl">
                  🎉
                </div>

                <h3 className="mt-5 text-2xl font-black">
                  We’ll Be There
                </h3>
              </button>

              {/* MAYBE */}

              <button
                onClick={() => setStep("maybe")}
                className="rounded-[32px] bg-gradient-to-r from-yellow-400 to-orange-500 p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition hover:scale-105"
              >
                <div className="text-5xl">
                  ✨
                </div>

                <h3 className="mt-5 text-2xl font-black">
                  Maybe
                </h3>
              </button>

              {/* NO */}

              <button
                onClick={() => setStep("no")}
                className="rounded-[32px] bg-gradient-to-r from-pink-500 to-rose-600 p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition hover:scale-105"
              >
                <div className="text-5xl">
                  💛
                </div>

                <h3 className="mt-5 text-2xl font-black">
                  Can’t Attend
                </h3>
              </button>
            </div>
          )}

          {/* YES FLOW */}

          <AnimatePresence>
            {step === "yes" && (
              <motion.form
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                onSubmit={handleSubmit}
                className="mt-16 space-y-7"
              >
                <div className="text-center">
                  <h3 className="text-4xl font-black text-green-600">
                    Wonderful ❤️
                  </h3>

                  <p className="mt-4 text-lg md:text-xl text-gray-600">
                    Let’s reserve your family’s place.
                  </p>
                </div>

                {/* FAMILY */}

                <select
                  required
                  value={formData.family}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      family: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-lg focus:border-pink-500 focus:outline-none"
                >
                  <option value="">
                    Select Your Family
                  </option>

                  {families.map((family) => (
                    <option key={family}>
                      {family}
                    </option>
                  ))}
                </select>

                {/* NAME */}

                <input
                  required
                  type="text"
                  placeholder="Who’s registering from your family?"
                  value={formData.submittedBy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      submittedBy: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-lg focus:border-orange-500 focus:outline-none"
                />

                {/* MEMBER COUNT */}

                <input
                  required
                  type="number"
                  min="1"
                  placeholder="Number of members joining"
                  value={formData.memberCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      memberCount: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-lg focus:border-blue-500 focus:outline-none"
                />

                {/* MEMBERS */}

                <textarea
                  rows={4}
                  placeholder="Member names (optional)"
                  value={formData.members}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      members: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-lg focus:border-green-500 focus:outline-none"
                />

                {/* MESSAGE */}

                <textarea
                  rows={4}
                  placeholder="Leave a message for the reunion wall ❤️"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border-2 border-gray-200 p-5 text-lg focus:border-pink-500 focus:outline-none"
                />

                {/* BUTTONS */}

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(null)}
                    className="flex-1 rounded-full border-2 border-[#1f3f95] py-5 text-lg font-bold text-[#1f3f95] transition hover:bg-[#1f3f95] hover:text-white"
                  >
                    Go Back
                  </button>

                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-gradient-to-r from-pink-600 via-orange-500 to-blue-600 py-5 text-lg font-black text-white shadow-[0_18px_50px_rgba(0,0,0,0.15)] transition hover:scale-[1.02]"
                  >
                    Join The Celebration 🎉
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* MAYBE */}

          {step === "maybe" && (
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-16 text-center"
            >
              <h3 className="text-4xl font-black text-yellow-500">
                No Worries 🌿
              </h3>

              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                We’ll reconnect as the event gets closer.
                <br />
                Hope to celebrate together soon ❤️
              </p>

              <button
                onClick={() => setStep(null)}
                className="mt-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 text-white font-bold shadow-xl transition hover:scale-105"
              >
                Back To Options
              </button>
            </motion.div>
          )}

          {/* NO */}

          {step === "no" && (
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-16 text-center"
            >
              <h3 className="text-4xl font-black text-pink-600">
                You’ll Truly Be Missed ❤️
              </h3>

              <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
                We completely understand.
                <br />
                Hope to see you at the next gathering.
              </p>

              <textarea
                rows={4}
                placeholder="Would you like to leave a message for the family?"
                className="w-full mt-10 rounded-2xl border-2 border-gray-200 p-5 text-lg focus:border-pink-500 focus:outline-none"
              />

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <button
                  onClick={() => setStep(null)}
                  className="rounded-full border-2 border-[#1f3f95] px-8 py-4 font-bold text-[#1f3f95] transition hover:bg-[#1f3f95] hover:text-white"
                >
                  Go Back
                </button>

                <button
                  onClick={() => setStep("declined")}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-8 py-4 font-bold text-white shadow-lg transition hover:scale-105"
                >
                  Send Response
                </button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}

          {step === "success" && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="mt-16 text-center"
            >
              <h3 className="text-5xl font-black text-green-600">
                Thank You 🎉
              </h3>

              <p className="mt-6 text-xl md:text-2xl text-gray-700 leading-relaxed">
                Your family is now part of the celebration ❤️
              </p>

              <button
                onClick={() => setStep(null)}
                className="mt-10 rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-blue-600 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105"
              >
                Back To Main Options
              </button>
            </motion.div>
          )}

          {/* DECLINED */}

          {step === "declined" && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="mt-16 text-center"
            >
              <h3 className="text-5xl font-black text-[#1f2f55]">
                Thank You ❤️
              </h3>

              <p className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed">
                Your response has been received.
                <br />
                Wishing to see you at the next family gathering ✨
              </p>

              <button
                onClick={() => setStep(null)}
                className="mt-10 rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-blue-600 px-8 py-4 font-bold text-white shadow-xl transition hover:scale-105"
              >
                Back To Options
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
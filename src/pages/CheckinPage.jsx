import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Html5QrcodeScanner,
} from "html5-qrcode";

import {
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function CheckinPage() {

  const [participant, setParticipant] =
    useState(null);

  const [loading, setLoading] =
    useState(false);
const [confirming, setConfirming] =
  useState(false);
const participantRef =
  useRef(null);

const lastScannedRef =
  useRef(null);
  
  useEffect(() => {

    const scanner =
      new Html5QrcodeScanner(
        "scanner",
        {
          fps: 5,
          qrbox: 250,
        },
        false
      );



   scanner.render(

  async (decodedText) => {

    try {

      const parsed =
        JSON.parse(decodedText);

      /* validate */

      if (!parsed.id) return;

      /* prevent repeated scans */

      if (
        lastScannedRef.current ===
        parsed.id
      ) {
        return;
      }

      lastScannedRef.current =
        parsed.id;

      /* reset cooldown */

      setTimeout(() => {

        lastScannedRef.current =
          null;

      }, 4000);

      setLoading(true);

      const response =
        await fetch(
          `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?id=${parsed.id}`
        );

      const data =
        await response.json();

      setParticipant(data);

      /* smooth auto scroll */

      setTimeout(() => {

        participantRef.current
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

      }, 200);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }

  },

  (error) => {

    // ignore scan errors

  }

);

    return () => {
scanner.clear().catch(() => {});    };

  }, []);




  return (

  <div className="min-h-screen bg-[#071739]">




    {/* TOP HEADER */}

    <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#071739]/90 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">

        <div>

          <p className="uppercase tracking-[0.35em] text-[11px] md:text-xs font-semibold text-white/60">
            Family Reunion 2026
          </p>

          <h1 className="text-2xl md:text-4xl font-black text-white mt-1">
            Event Check-In
          </h1>

        </div>




        <button

          onClick={() => {

            if (
              document.documentElement
                .requestFullscreen
            ) {

              document.documentElement
                .requestFullscreen();
            }
          }}

          className="shrink-0 bg-white text-[#071739] px-4 md:px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition"
        >

          Fullscreen

        </button>

      </div>

    </div>





    {/* MAIN CONTENT */}

    <div className="max-w-7xl mx-auto p-4 md:p-6">

      <div className="grid xl:grid-cols-2 gap-6 items-start">




        {/* SCANNER CARD */}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">




          {/* SCANNER HEADER */}

          <div className="p-5 md:p-6 border-b border-gray-100">

            <p className="uppercase tracking-[0.35em] text-[11px] md:text-xs font-semibold text-[#1f3f95]">
              QR Verification
            </p>

            <h2 className="mt-2 text-3xl md:text-4xl font-black text-[#071739]">
              Scan Ticket
            </h2>

            <p className="mt-3 text-gray-500 text-sm md:text-base">
              Point camera toward attendee QR ticket
            </p>

          </div>




          {/* SCANNER AREA */}

          <div className="p-4 md:p-6">

            <div className="bg-[#f8fafc] border-2 border-dashed border-gray-200 rounded-3xl p-4 md:p-5">

              <div
                id="scanner"
                className="overflow-hidden rounded-2xl"
              />

            </div>




            {/* GUIDE */}

            <div className="mt-5 grid grid-cols-3 gap-3">

              <div className="bg-gray-100 rounded-2xl p-4 text-center">

                <p className="text-2xl">
                  📷
                </p>

                <p className="mt-2 text-xs md:text-sm font-semibold text-gray-600">
                  Allow Camera
                </p>

              </div>



              <div className="bg-gray-100 rounded-2xl p-4 text-center">

                <p className="text-2xl">
                  🎟️
                </p>

                <p className="mt-2 text-xs md:text-sm font-semibold text-gray-600">
                  Scan QR Ticket
                </p>

              </div>



              <div className="bg-gray-100 rounded-2xl p-4 text-center">

                <p className="text-2xl">
                  ✅
                </p>

                <p className="mt-2 text-xs md:text-sm font-semibold text-gray-600">
                  Confirm Entry
                </p>

              </div>

            </div>

          </div>

        </div>





        {/* PARTICIPANT CARD */}

        <div   ref={participantRef}
 
        className={`rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          participant?.checkedIn === "YES"
            ? "bg-red-50 border border-red-200"
            : participant
            ? "bg-green-50 border border-green-200"
            : "bg-white"
        }`}>




          {/* HEADER */}

          <div className="p-5 md:p-6 border-b border-black/5">

            <p className="uppercase tracking-[0.35em] text-[11px] md:text-xs font-semibold text-[#1f3f95]">
              Attendee Preview
            </p>

            <h2 className="mt-2 text-3xl md:text-4xl font-black text-[#071739]">
              Participant Details
            </h2>

          </div>





          {/* LOADING */}

          {loading && (

            <div className="h-[420px] flex flex-col items-center justify-center text-center p-6">

              <div className="w-16 h-16 border-4 border-[#1f3f95]/20 border-t-[#1f3f95] rounded-full animate-spin" />

              <h2 className="mt-8 text-2xl font-black text-[#071739]">
                Loading Participant...
              </h2>

            </div>

          )}






          {/* EMPTY */}

          {!loading && !participant && (

            <div className="h-[420px] flex flex-col items-center justify-center text-center p-6">

              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-5xl">
                🎟️
              </div>

              <h2 className="mt-8 text-3xl font-black text-gray-400">
                Ready to Scan
              </h2>

              <p className="mt-3 text-gray-400 max-w-sm">
                Scan attendee QR ticket to view registration details instantly
              </p>

            </div>

          )}






          {/* PARTICIPANT FOUND */}

          {!loading &&
            participant &&
            !participant.error && (

            <div className="p-5 md:p-6">




              {/* STATUS */}

              <div className={`mb-6 rounded-2xl px-5 py-4 flex items-center gap-4 ${
                participant.checkedIn === "YES"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}>

                <div className="text-3xl">

                  {participant.checkedIn === "YES"
                    ? "⚠️"
                    : "✅"}

                </div>

                <div>

                  <h3 className="font-black text-lg">

                    {participant.checkedIn === "YES"
                      ? "Already Checked In"
                      : "Participant Found"}

                  </h3>

                  <p className="text-sm opacity-80 mt-1">

                    {participant.checkedIn === "YES"
                      ? participant.checkedInTime
                      : "Ready for confirmation"}

                  </p>

                </div>

              </div>





              {/* MAIN INFO */}

              <div>

                <p className="uppercase tracking-[0.25em] text-xs font-semibold text-gray-500">
                  Family
                </p>

                <h2 className="mt-2 text-3xl md:text-4xl font-black text-[#071739]">
                  {participant.family}
                </h2>

              </div>





              {/* REGISTERED BY */}

              <div className="mt-6">

                <p className="uppercase tracking-[0.25em] text-xs font-semibold text-gray-500">
                  Registered By
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#1f3f95]">
                  {participant.name}
                </h3>

              </div>





              {/* STATS */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

                <div className="bg-white rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Members
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-[#071739]">
                    {participant.members}
                  </h3>

                </div>



                <div className="bg-white rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Male
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-[#071739]">
                    {participant.male}
                  </h3>

                </div>



                <div className="bg-white rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Female
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-[#071739]">
                    {participant.female}
                  </h3>

                </div>



                <div className="bg-white rounded-2xl p-5">

                  <p className="text-sm text-gray-500">
                    Kids
                  </p>

                  <h3 className="mt-2 text-3xl font-black text-[#071739]">
                    {participant.kids}
                  </h3>

                </div>

              </div>





              {/* PLACE */}

              <div className="mt-6 bg-white rounded-2xl p-5">

                <p className="text-sm text-gray-500">
                  Place
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#071739]">
                  {participant.place}
                </h3>

              </div>





              {/* ACTION */}

              {participant.checkedIn !== "YES" && (

                <button

                  disabled={confirming}

                  onClick={async () => {

                    try {

                      setConfirming(true);

                      const response =
                        await fetch(
                          `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?checkin=true&id=${participant.id}`
                        );

                      const result =
                        await response.json();

                      if (result.success) {

                        setParticipant({
                          ...participant,
                          checkedIn: "YES",
                          checkedInTime:
                            new Date()
                              .toLocaleString(),
                        });

                        alert(
                          "Participation Confirmed ✅"
                        );
                      }

                    } catch (error) {

                      console.error(error);

                      alert(
                        "Check-in failed"
                      );

                    } finally {

                      setConfirming(false);
                    }

                  }}

                  className={`mt-8 w-full rounded-2xl py-5 text-lg md:text-xl font-black shadow-xl transition flex items-center justify-center gap-4 ${
                    confirming
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-[1.01]"
                  }`}
                >

                  <CheckCircle2 className="w-7 h-7" />

                  {confirming
                    ? "Confirming Participation..."
                    : "Confirm Participation"}

                </button>

              )}

            </div>

          )}

        </div>

      </div>

    </div>

  </div>
);
}
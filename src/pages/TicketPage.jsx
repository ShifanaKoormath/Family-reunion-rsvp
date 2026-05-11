import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

export default function TicketPage() {

  const { id } = useParams();

  const [participant, setParticipant] =
    useState(null);

  const [loading, setLoading] =
    useState(true);
const lastScannedRef =
  useRef(null);


  useEffect(() => {

    async function fetchParticipant() {

      try {

        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?id=${id}`
        );

        const data =
          await response.json();

        setParticipant(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    fetchParticipant();

  }, [id]);



  /* LOADING */

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071739]">

        <h1 className="text-3xl font-black text-white">
          Loading Ticket...
        </h1>

      </div>
    );
  }



  /* NOT FOUND */

  if (!participant || participant.error) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-white">

        <h1 className="text-4xl font-black text-red-500">
          Ticket Not Found
        </h1>

      </div>
    );
  }



  return (

<div className="min-h-screen bg-gradient-to-br from-[#071739] via-[#102c5c] to-[#1f3f95] flex items-center justify-center px-4 md:px-6 py-8 md:py-20">
      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">


        {/* HEADER */}

<div className="bg-gradient-to-r from-pink-600 via-orange-500 to-blue-700 px-6 md:px-10 py-6 md:py-10 text-white text-center">
          <p className="uppercase tracking-[0.4em] text-sm font-semibold opacity-80">
            Family Reunion 2026
          </p>

<h1 className="mt-4 text-3xl md:text-5xl font-black">            Entry Pass
          </h1>

          <p className="mt-3 text-base md:text-lg opacity-90">
            Please present this QR during entry
          </p>

        </div>



        {/* BODY */}

<div className="px-6 md:px-10 py-8 md:py-14">
<div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 items-center">

            {/* DETAILS */}

<div className="order-2 md:order-1 w-full">
  
<h2 className="text-3xl md:text-4xl font-black text-[#1f3f95] leading-tight">                {participant.family}
              </h2>

<div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
  
                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">
                    Registered By
                  </p>

                  <h3 className="text-2xl font-bold text-[#102c5c]">
                    {participant.name}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">
                    Members Joining
                  </p>

                  <h3 className="text-2xl font-bold text-[#102c5c]">
                    {participant.members}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">
                    Place
                  </p>

                  <h3 className="text-2xl font-bold text-[#102c5c]">
                    {participant.place}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">
                    Registration ID
                  </p>

                  <h3 className="text-xl font-black text-pink-600">
                    {participant.id}
                  </h3>
                </div>

              </div>

            </div>



            {/* QR */}

            <div className="flex flex-col items-center order-1 md:order-2">

              <div className="bg-white p-3 md:p-6 rounded-[24px] md:rounded-[30px] shadow-xl border border-gray-100">

                <QRCodeCanvas
                  value={JSON.stringify({
                    id: participant.id,
                  })}
                  size={
  window.innerWidth < 768
    ? 210
    : 240
}
                />

              </div>

              <p className="mt-4 md:mt-6 text-sm md:text-base text-center text-gray-600 leading-relaxed">
                This QR will be scanned during entry verification.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
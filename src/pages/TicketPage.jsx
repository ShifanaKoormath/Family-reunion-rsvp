import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { QRCodeCanvas } from "qrcode.react";

export default function TicketPage() {

  const { id } = useParams();

  const [participant, setParticipant] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

    <div className="min-h-screen bg-gradient-to-br from-[#071739] via-[#102c5c] to-[#1f3f95] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden">


        {/* HEADER */}

        <div className="bg-gradient-to-r from-pink-600 via-orange-500 to-blue-700 px-10 py-10 text-white text-center">

          <p className="uppercase tracking-[0.4em] text-sm font-semibold opacity-80">
            Family Reunion 2026
          </p>

          <h1 className="mt-4 text-5xl font-black">
            Entry Pass
          </h1>

          <p className="mt-3 text-lg opacity-90">
            Please present this QR during entry
          </p>

        </div>



        {/* BODY */}

        <div className="px-10 py-14">

          <div className="grid md:grid-cols-2 gap-10 items-center">


            {/* DETAILS */}

            <div>

              <h2 className="text-4xl font-black text-[#1f3f95]">
                {participant.family}
              </h2>

              <div className="mt-8 space-y-5">

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

            <div className="flex flex-col items-center">

              <div className="bg-white p-6 rounded-[30px] shadow-xl border border-gray-100">

                <QRCodeCanvas
                  value={JSON.stringify({
                    id: participant.id,
                  })}
                  size={240}
                />

              </div>

              <p className="mt-6 text-center text-gray-600 leading-relaxed">
                This QR will be scanned during entry verification.
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
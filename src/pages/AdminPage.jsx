import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  MessageCircle,
  CheckCircle2,
  Clock3,
  Users,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminPage() {

    const [showModal, setShowModal] =
  useState(false);

  const [savingEntry, setSavingEntry] =
  useState(false);

  const [search, setSearch] =
  useState("");

const [filter, setFilter] =
  useState("all");

const [sendingBulk, setSendingBulk] =
  useState(false);
const [showActions, setShowActions] =
  useState(false);

const [formData, setFormData] =
  useState({

    name: "",

    family: "",

    place: "",

    whatsapp: "",

    members: "",

    male: "",

    female: "",

    kids: "",

    support: "",

  });
  const [participants, setParticipants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchParticipants() {

      try {

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?list=true"
        );

        const data =
          await response.json();

        setParticipants(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    fetchParticipants();

  }, []);


useEffect(() => {

  function handleShortcut(event) {

    // CTRL + M

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "m"
    ) {

      event.preventDefault();

      setShowModal(true);
    }
  }

  window.addEventListener(
    "keydown",
    handleShortcut
  );



  return () => {

    window.removeEventListener(
      "keydown",
      handleShortcut
    );
  };

}, []);

  const totalFamilies =
    participants.length;

  const totalMembers =
    participants.reduce(
      (sum, p) =>
        sum + Number(p.members || 0),
      0
    );

  const checkedInCount =
    participants.filter(
      (p) =>
        p.checkedIn === "YES"
    ).length;




  if (loading) {

    return (
      <div className="min-h-screen bg-[#071739] flex items-center justify-center">

        <h1 className="text-white text-4xl font-black">
          Loading Dashboard...
        </h1>

      </div>
    );
  }


const filteredParticipants =
  participants.filter((p) => {

    const matchesSearch =

      p.family
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      p.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      p.id
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );



    if (filter === "pendingQR") {

      return (
        matchesSearch &&
        p.qrSent !== "YES"
      );
    }

    if (filter === "checkedIn") {

      return (
        matchesSearch &&
        p.checkedIn === "YES"
      );
    }

    if (filter === "pendingCheckin") {

      return (
        matchesSearch &&
        p.checkedIn !== "YES"
      );
    }

    return matchesSearch;
  });

  return (

  <div className="min-h-screen bg-gradient-to-br from-[#f5f7fb] to-[#eef2ff]">




    {/* TOP BAR */}

    <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 border-b border-black/5">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">




          {/* TITLE */}

          <div>

            <p className="uppercase tracking-[0.35em] text-[11px] md:text-xs font-semibold text-[#1f3f95]">
              Family Reunion 2026
            </p>

            <h1 className="mt-2 text-4xl md:text-5xl font-black text-[#071739] leading-none">
              Admin Dashboard
            </h1>

          </div>


{/* MOBILE ACTION MENU */}

<div className="md:hidden relative">




  {/* TOGGLE */}

  <button

    onClick={() =>
      setShowActions(
        !showActions
      )
    }

    className="w-full bg-[#071739] text-white rounded-2xl px-5 py-4 shadow-xl flex items-center justify-between"
  >

    <div>

      <p className="text-left text-lg font-black">
        Quick Actions
      </p>

      <p className="text-white/60 text-xs mt-1">
        Manage registrations & check-ins
      </p>

    </div>



    <div className="text-2xl">

      {showActions
        ? "−"
        : "+"}

    </div>

  </button>





  {/* ACTION PANEL */}

  {showActions && (

    <div className="absolute z-50 mt-4 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-3 space-y-3">




      {/* MANUAL ENTRY */}

      <button

        onClick={() => {

          setShowModal(true);

          setShowActions(false);
        }}

        className="w-full bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-100 rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition"
      >

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-600 to-orange-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">

          +

        </div>



        <div className="text-left">

          <h3 className="font-black text-[#071739]">
            Add Manual Entry
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Register walk-in participants
          </p>

        </div>

      </button>





      {/* DISPATCH */}

      <button

        onClick={async () => {

          setShowActions(false);

          try {

            setSendingBulk(true);

            const pending =
              participants.filter(
                (p) =>
                  p.qrSent !== "YES"
              );



            for (
              const participant
              of pending
            ) {

              window.open(
                participant.whatsappLink,
                "_blank"
              );



              await fetch(
                `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?sent=true&id=${participant.id}`
              );



              setParticipants(
                (prev) =>
                  prev.map((p) =>
                    p.id === participant.id
                      ? {
                          ...p,
                          qrSent: "YES",
                        }
                      : p
                  )
              );



              await new Promise(
                (resolve) =>
                  setTimeout(
                    resolve,
                    1200
                  )
              );
            }

            toast.success(
              "Pending QR tickets opened successfully ✅"
            );

          } catch (error) {

            console.error(error);

            toast.error(
              "QR dispatch failed"
            );

          } finally {

            setSendingBulk(false);
          }

        }}

        className="w-full bg-gradient-to-r from-[#eef2ff] to-[#f5f7ff] border border-[#dbe4ff] rounded-2xl p-4 flex items-center gap-4 active:scale-[0.98] transition"
      >

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#1f3f95] to-[#071739] text-white flex items-center justify-center text-lg shadow-lg">

          <MessageCircle className="w-5 h-5" />

        </div>



        <div className="text-left">

          <h3 className="font-black text-[#071739]">
            Dispatch Pending QR
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Send remaining QR tickets
          </p>

        </div>

      </button>





      {/* SCANNER */}

<Link

  to="/admin/checkin"

  target="_blank"

  rel="noopener noreferrer"

  onClick={() =>
    setShowActions(false)
  }



        className="block w-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-4 active:scale-[0.98] transition"
      >

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg">

            <CheckCircle2 className="w-5 h-5" />

          </div>



          <div>

            <h3 className="font-black text-[#071739]">
              Open Scanner
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Verify attendee QR tickets
            </p>

          </div>

        </div>

      </Link>

    </div>

  )}

</div>

          {/* ACTIONS */}

<div className="hidden md:flex flex-wrap gap-3">



            {/* MANUAL ENTRY */}

            <button

              onClick={() =>
                setShowModal(true)
              }

              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-orange-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition"
            >

              <Plus className="w-5 h-5" />

              Add Manual Entry

            </button>





            {/* QR DISPATCH */}

            <button

              disabled={sendingBulk}

              onClick={async () => {

                try {

                  setSendingBulk(true);

                  const pending =
                    participants.filter(
                      (p) =>
                        p.qrSent !== "YES"
                    );



                  for (
                    const participant
                    of pending
                  ) {

                    window.open(
                      participant.whatsappLink,
                      "_blank"
                    );



                    await fetch(
                      `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?sent=true&id=${participant.id}`
                    );



                    setParticipants(
                      (prev) =>
                        prev.map((p) =>
                          p.id === participant.id
                            ? {
                                ...p,
                                qrSent: "YES",
                              }
                            : p
                        )
                    );



                    await new Promise(
                      (resolve) =>
                        setTimeout(
                          resolve,
                          1200
                        )
                    );
                  }

                  toast.success(
                    "Pending QR tickets opened successfully ✅"
                  );

                } catch (error) {

                  console.error(error);

                  toast.error(
                    "QR dispatch failed"
                  );

                } finally {

                  setSendingBulk(false);
                }

              }}

              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold shadow-lg transition ${
                sendingBulk
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#1f3f95] to-[#071739] text-white hover:scale-[1.02]"
              }`}
            >

              <MessageCircle className="w-5 h-5" />

              {sendingBulk
                ? "Opening..."
                : "Dispatch Pending QR"}

            </button>





           {/* CHECK-IN */}

<Link
  to="/admin/checkin"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:scale-[1.02] transition"
>

  <CheckCircle2 className="w-5 h-5" />

  Open Scanner

</Link>

          </div>

        </div>

      </div>

    </div>






    {/* PAGE CONTENT */}

    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-[30px] p-8 shadow-xl">

          <Users className="w-10 h-10 text-pink-600" />

          <h2 className="mt-5 text-5xl font-black text-[#071739]">
            {totalFamilies}
          </h2>

          <p className="mt-3 text-gray-500">
            Families Registered
          </p>

        </div>


        <div className="bg-white rounded-[30px] p-8 shadow-xl">

          <Ticket className="w-10 h-10 text-orange-500" />

          <h2 className="mt-5 text-5xl font-black text-[#071739]">
            {totalMembers}
          </h2>

          <p className="mt-3 text-gray-500">
            Members Joining
          </p>

        </div>


        <div className="bg-white rounded-[30px] p-8 shadow-xl">

          <CheckCircle2 className="w-10 h-10 text-green-600" />

          <h2 className="mt-5 text-5xl font-black text-[#071739]">
            {checkedInCount}
          </h2>

          <p className="mt-3 text-gray-500">
            Checked In
          </p>

        </div>

      </div>


{/* SEARCH + FILTERS */}

<div className="mt-12 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">




  {/* SEARCH */}

  <input

    placeholder="Search family, name or ID..."

    value={search}

    onChange={(e) =>
      setSearch(e.target.value)
    }

    className="flex-1 bg-white rounded-2xl px-6 py-5 shadow-xl outline-none border border-gray-100 focus:border-[#1f3f95]"
  />




  {/* FILTER */}

  <select

    value={filter}

    onChange={(e) =>
      setFilter(e.target.value)
    }

    className="bg-white rounded-2xl px-6 py-5 shadow-xl outline-none border border-gray-100 focus:border-[#1f3f95]"
  >

    <option value="all">
      All Participants
    </option>

    <option value="pendingQR">
      Pending QR Send
    </option>

    <option value="checkedIn">
      Checked In
    </option>

    <option value="pendingCheckin">
      Pending Check-In
    </option>

  </select>






</div>



      {/* TABLE */}

<div className="mt-12 bg-white rounded-[35px] shadow-xl overflow-hidden">

  <div className="overflow-x-auto">

    <table className="w-full min-w-[1400px]">

      <thead className="bg-[#071739] text-white">

        <tr>

          <th className="px-6 py-5 text-left">
            Family
          </th>

          <th className="px-6 py-5 text-left">
            Registered By
          </th>

          <th className="px-6 py-5 text-left">
            Members
          </th>

          <th className="px-6 py-5 text-left">
            Place
          </th>

          <th className="px-6 py-5 text-left">
            QR Status
          </th>

          <th className="px-6 py-5 text-left">
            QR Delivery
          </th>

          <th className="px-6 py-5 text-left">
            Attendance
          </th>

        </tr>

      </thead>




      <tbody>

        {filteredParticipants.map((participant) => (

          <tr
            key={participant.id}
            className="border-b border-gray-100 hover:bg-gray-50 transition"
          >




            {/* FAMILY */}

            <td className="px-6 py-5">

              <div>

                <h2 className="font-black text-[#071739] text-lg">
                  {participant.family}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {participant.id}
                </p>

              </div>

            </td>




            {/* REGISTERED BY */}

            <td className="px-6 py-5">

              <div>

                <h2 className="font-bold text-[#1f3f95]">
                  {participant.name}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {participant.whatsapp}
                </p>

              </div>

            </td>




            {/* MEMBERS */}

            <td className="px-6 py-5">

              <div className="flex flex-col gap-1">

                <span className="font-black text-2xl text-[#071739]">
                  {participant.members}
                </span>

                <span className="text-sm text-gray-500">
                  👨 {participant.male}
                  {" • "}
                  👩 {participant.female}
                  {" • "}
                  🧒 {participant.kids}
                </span>

              </div>

            </td>




            {/* PLACE */}

            <td className="px-6 py-5">

              <span className="font-semibold text-gray-700">
                {participant.place}
              </span>

            </td>




            {/* QR STATUS */}

            <td className="px-6 py-5">

              {participant.ticketUrl ? (

                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">

                  <CheckCircle2 className="w-4 h-4" />

                  QR Ready

                </span>

              ) : (

                <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold">

                  <Clock3 className="w-4 h-4" />

                  Pending

                </span>

              )}

            </td>




            {/* QR DELIVERY */}

            <td className="px-6 py-5">

              <div className="flex items-center gap-4">

                <a
                  href={participant.whatsappLink}
                  target="_blank"
                  rel="noreferrer"

                  onClick={async () => {

                    try {

                      await fetch(
                        `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?sent=true&id=${participant.id}`
                      );

                      setParticipants((prev) =>
                        prev.map((p) =>
                          p.id === participant.id
                            ? {
                                ...p,
                                qrSent: "YES",
                              }
                            : p
                        )
                      );

                    } catch (error) {

                      console.error(error);
                    }
                  }}

                  className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
                >

                  <MessageCircle className="w-6 h-6" />

                </a>



                {participant.qrSent === "YES" ? (

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
                    Sent
                  </span>

                ) : (

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-sm">
                    Pending
                  </span>

                )}

              </div>

            </td>




            {/* ATTENDANCE */}

            <td className="px-6 py-5">

              {participant.checkedIn === "YES" ? (

                <div className="flex flex-col gap-2">

                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold w-fit">

                    <CheckCircle2 className="w-4 h-4" />

                    Checked In

                  </span>

                  <span className="text-xs text-gray-400">
                    {participant.checkedInTime}
                  </span>

                </div>

              ) : (

                <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">

                  Pending

                </span>

              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
</div>
{/* MANUAL ENTRY MODAL */}

{
  showModal && (

    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-3xl rounded-[35px] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">

        <h2 className="text-4xl font-black text-[#071739]">
          Add Manual Entry
        </h2>



        <div className="grid md:grid-cols-2 gap-5 mt-8">

          {[
            ["name", "Name"],
            ["family", "Family Name"],
            ["place", "Place"],
            ["whatsapp", "WhatsApp"],
            ["members", "Members"],
            ["male", "Male"],
            ["female", "Female"],
            ["kids", "Kids"],
          ].map(([key, label]) => (

            <input
              key={key}

              placeholder={label}

              value={formData[key]}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  [key]:
                    e.target.value,
                })
              }

              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#1f3f95]"
            />

          ))}

        </div>



        <textarea

          placeholder="Support Needed"

          value={formData.support}

          onChange={(e) =>
            setFormData({
              ...formData,
              support:
                e.target.value,
            })
          }

          className="mt-5 w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#1f3f95]"
        />



        {/* BUTTONS */}

        <div className="flex gap-4 mt-8">

          <button

            onClick={() =>
              setShowModal(false)
            }

            className="flex-1 border-2 border-[#1f3f95] text-[#1f3f95] py-4 rounded-2xl font-black"
          >

            Cancel

          </button>



         <button

  disabled={savingEntry}

  onClick={async () => {

    try {

      setSavingEntry(true);

      const params =
        new URLSearchParams({

          action:
            "manualEntry",

          ...formData,
        });

      const response =
        await fetch(
          `https://script.google.com/macros/s/AKfycbydj1ZSvtXhNWuiSfAbvzsq6fkDZiSUMlIe1jNTjnE7VWHvGpYcxkAEwWK_N1VfGZiH/exec?${params}`
        );

      const result =
        await response.json();

      if (result.success) {

        // INSTANT LOCAL UPDATE

        setParticipants((prev) => [

          ...prev,

          {
            ...formData,

            id: result.id,

            ticketUrl:
              result.ticketUrl,

            qrGenerated:
              "YES",

            qrSent: "",

            checkedIn: "",

            checkedInTime: "",

            manualEntry:
              "YES",
          },
        ]);



        // RESET FORM

        setFormData({

          name: "",

          family: "",

          place: "",

          whatsapp: "",

          members: "",

          male: "",

          female: "",

          kids: "",

          support: "",
        });



        setShowModal(false);

        toast.success(
          "Manual entry added successfully ✅"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to add entry"
      );

    } finally {

      setSavingEntry(false);
    }
  }}

  className={`flex-1 py-4 rounded-2xl font-black shadow-xl transition ${
    savingEntry
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
  }`}
>

  {savingEntry
    ? "Saving Entry..."
    : "Save Entry"}

</button>

        </div>

      </div>

    </div>

  )
}
    </div>
  );
}
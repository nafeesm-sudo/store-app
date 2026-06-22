import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Search } from "lucide-react";

const locations = [
  "Dhaka, Bangladesh",
  "Chittagong, Bangladesh",
  "Sylhet, Bangladesh",
  "Rajshahi, Bangladesh",
  "Khulna, Bangladesh",
];

export default function LocationPage() {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = locations.filter(l => l.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center font-[Poppins,sans-serif] p-8">
      <div className="w-full max-w-lg">
        {/* Map visual */}
        <div className="w-full h-56 bg-gradient-to-br from-[#e8f5ee] to-[#c8e6d4] rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(0deg, #53B175 0, #53B175 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #53B175 0, #53B175 1px, transparent 1px, transparent 40px)"
          }} />
          <div className="relative z-10 text-center">
            <div className="w-14 h-14 bg-[#53B175] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <MapPin className="text-white" size={24} />
            </div>
            <span className="text-[#53B175] font-semibold text-sm">
              {selected || "Select your location"}
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#181725] mb-2">Select your location</h1>
        <p className="text-[#7C7C7C] mb-6">Switch on your location to stay in tune with what&apos;s happening in your area</p>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#F2F3F2] rounded-xl px-4 py-3 mb-4">
          <Search size={18} className="text-[#7C7C7C]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search location..."
            className="bg-transparent outline-none flex-1 text-[#181725] placeholder:text-[#7C7C7C] text-sm"
          />
        </div>

        {/* Location list */}
        <div className="space-y-2 mb-6">
          {filtered.map(loc => (
            <button
              key={loc}
              onClick={() => setSelected(loc)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all border-2 ${
                selected === loc
                  ? "border-[#53B175] bg-[#f0faf5] text-[#53B175]"
                  : "border-transparent bg-[#F2F3F2] text-[#181725] hover:border-[#53B175]/30"
              }`}
            >
              <MapPin size={16} className={selected === loc ? "text-[#53B175]" : "text-[#7C7C7C]"} />
              {loc}
            </button>
          ))}
        </div>

        <button
          disabled={!selected}
          onClick={() => navigate("/home")}
          className="w-full bg-[#53B175] disabled:bg-gray-200 disabled:text-gray-400 text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#3d9a5f] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

import { Link } from "react-router";
import { MapPin, Phone, Package, CheckCircle2, Truck, Clock } from "lucide-react";

const steps = [
  { icon: CheckCircle2, label: "Order Placed", time: "10:02 AM", done: true },
  { icon: Package, label: "Packing Items", time: "10:08 AM", done: true },
  { icon: Truck, label: "On the Way", time: "10:15 AM", done: true },
  { icon: MapPin, label: "Delivered", time: "Pending", done: false },
];

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-[#F2F3F2] font-[Poppins,sans-serif] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#181725]">Track Order</h1>
          <span className="bg-[#53B175]/10 text-[#53B175] text-sm font-semibold px-4 py-1.5 rounded-full">
            #ORD-2024-001
          </span>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-56 bg-gradient-to-br from-[#e8f5ee] to-[#c8e6d4] rounded-3xl flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(0deg, #53B175 0, #53B175 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #53B175 0, #53B175 1px, transparent 1px, transparent 40px)"
          }} />
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-3 animate-bounce">🚚</div>
            <p className="text-[#53B175] font-semibold text-sm">On the way to you</p>
          </div>
          {/* Destination pin */}
          <div className="absolute bottom-6 right-12 flex flex-col items-center">
            <div className="w-8 h-8 bg-[#181725] rounded-full flex items-center justify-center">
              <MapPin size={14} className="text-white" />
            </div>
            <div className="text-xs text-[#181725] font-semibold mt-1">Your location</div>
          </div>
        </div>

        {/* Delivery time */}
        <div className="bg-white rounded-2xl p-5 mb-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#53B175]/10 rounded-full flex items-center justify-center">
            <Clock size={20} className="text-[#53B175]" />
          </div>
          <div>
            <p className="text-xs text-[#7C7C7C]">Estimated Arrival</p>
            <p className="font-bold text-[#181725]">15 – 25 minutes</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h3 className="font-bold text-[#181725] mb-5">Order Status</h3>
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    step.done ? "bg-[#53B175] text-white" : "bg-[#F2F3F2] text-[#7C7C7C]"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${step.done ? "text-[#181725]" : "text-[#7C7C7C]"}`}>{step.label}</p>
                    <p className="text-xs text-[#7C7C7C]">{step.time}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`absolute ml-5 mt-10 w-0.5 h-6 ${step.done ? "bg-[#53B175]" : "bg-gray-200"}`} style={{ position: "relative", left: -163 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery person */}
        <div className="bg-white rounded-2xl p-5 mb-6 flex items-center gap-4">
          <div className="w-14 h-14 bg-[#53B175] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
            D
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[#181725]">Daniel Austin</p>
            <p className="text-xs text-[#7C7C7C]">Your delivery partner</p>
          </div>
          <a
            href="tel:+1234567890"
            className="w-12 h-12 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
          >
            <Phone size={18} />
          </a>
        </div>

        <Link
          to="/home"
          className="block w-full bg-[#53B175] text-white py-4 rounded-2xl font-semibold text-center hover:bg-[#3d9a5f] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

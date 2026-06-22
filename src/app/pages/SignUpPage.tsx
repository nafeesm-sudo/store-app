import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/location");
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen flex font-[Poppins,sans-serif]">
      {/* Left */}
      <div className="w-2/5 bg-[#53B175] flex flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-1/4 -translate-x-1/4" />
        <div className="relative z-10 text-center">
          <div className="text-8xl mb-8">🥑</div>
          <h2 className="text-white text-3xl font-bold mb-3">Join nectar<br />today</h2>
          <p className="text-white/80 text-base">Fresh produce & groceries<br />delivered fast</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 bg-white flex flex-col justify-center px-16 py-12">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 bg-[#53B175] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">N</span>
          </div>
          <span className="text-xl font-bold text-[#181725]">nectar</span>
        </Link>

        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-[#181725] mb-2">Create account</h1>
          <p className="text-[#7C7C7C] mb-8">Fill in the details below to get started</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full name", field: "name", type: "text", placeholder: "John Doe" },
              { label: "Email address", field: "email", type: "email", placeholder: "john@example.com" },
              { label: "Phone number", field: "phone", type: "tel", placeholder: "+1 555 000 0000" },
              { label: "Password", field: "password", type: "password", placeholder: "••••••••" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-[#181725] mb-2">{label}</label>
                <input
                  type={type}
                  value={form[field as keyof typeof form]}
                  onChange={set(field)}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[#181725] placeholder:text-[#B3B3B3] focus:outline-none focus:border-[#53B175] focus:ring-2 focus:ring-[#53B175]/20 transition-all"
                />
              </div>
            ))}

            <label className="flex items-start gap-3 text-sm text-[#7C7C7C] cursor-pointer pt-1">
              <input type="checkbox" className="accent-[#53B175] mt-0.5" required />
              I agree to the{" "}
              <span className="text-[#53B175] font-medium">Terms of Service</span>
              {" "}and{" "}
              <span className="text-[#53B175] font-medium">Privacy Policy</span>
            </label>

            <button
              type="submit"
              className="w-full bg-[#53B175] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#3d9a5f] transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-[#7C7C7C] mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#53B175] font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

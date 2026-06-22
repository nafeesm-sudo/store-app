import { Link } from "react-router";
import { Package, Plus } from "lucide-react";
import Layout from "../components/Layout";
import { products } from "../data";
import { useApp } from "../store";

const wholesaleItems = products.map(p => ({ ...p, bulkPrice: p.price * 0.75, minQty: 10 }));

export default function WholesalePage() {
  const { addToCart } = useApp();

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#53B175] to-[#2D6A4F] rounded-3xl p-8 mb-8 flex items-center justify-between text-white">
          <div>
            <h2 className="text-2xl font-bold mb-2">Wholesale Store</h2>
            <p className="text-white/80">Buy in bulk and save up to 25% on all products</p>
            <div className="flex gap-4 mt-4">
              {["Free delivery", "Best prices", "Bulk discounts"].map(tag => (
                <span key={tag} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <div className="text-7xl">📦</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Min. order", value: "10 units" },
            { label: "Savings", value: "Up to 25%" },
            { label: "Delivery", value: "Free" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 text-center">
              <p className="text-2xl font-bold text-[#53B175]">{stat.value}</p>
              <p className="text-sm text-[#7C7C7C] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <h3 className="text-lg font-bold text-[#181725] mb-4">Wholesale Products</h3>
        <div className="space-y-3">
          {wholesaleItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
              <Link to={`/product/${item.id}`} className="w-16 h-16 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-3xl shrink-0">
                {item.emoji}
              </Link>
              <div className="flex-1">
                <p className="font-semibold text-[#181725]">{item.name}</p>
                <p className="text-xs text-[#7C7C7C]">{item.unit} · Min. {item.minQty} units</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#7C7C7C] line-through">${item.price.toFixed(2)}</p>
                <p className="font-bold text-[#53B175] text-lg">${item.bulkPrice.toFixed(2)}</p>
                <p className="text-xs text-[#F8A44C] font-medium">25% OFF</p>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

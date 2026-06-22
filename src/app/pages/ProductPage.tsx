import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, Star, Heart, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Layout from "../components/Layout";
import { products } from "../data";
import { useApp } from "../store";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleMyList, myList } = useApp();
  const product = products.find(p => p.id === Number(id)) ?? products[0];
  const [qty, setQty] = useState(1);
  const isWished = myList.find(p => p.id === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="p-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#181725] font-medium mb-6 hover:text-[#53B175] transition-colors">
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="bg-[#F2F3F2] rounded-3xl flex items-center justify-center h-96 text-[10rem]">
            {product.emoji}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.badge && (
              <span className="self-start bg-[#F8A44C] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl font-bold text-[#181725] mb-2">{product.name}</h1>
            <p className="text-[#7C7C7C] mb-4">{product.unit}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                />
              ))}
              <span className="text-[#7C7C7C] text-sm ml-1">{product.rating} (142 reviews)</span>
            </div>

            {/* Description */}
            <p className="text-[#7C7C7C] text-sm leading-relaxed mb-6">
              Fresh and high quality {product.name.toLowerCase()} sourced directly from local farms.
              Packed with nutrients and naturally grown without pesticides. Perfect for your healthy lifestyle.
            </p>

            <div className="border-t border-gray-100 pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-[#181725]">${(product.price * qty).toFixed(2)}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 border-2 border-[#53B175] rounded-full flex items-center justify-center text-[#53B175] hover:bg-[#f0faf5] transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold text-[#181725] w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); navigate("/cart"); }}
                className="flex-1 bg-[#53B175] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#3d9a5f] transition-colors"
              >
                <ShoppingCart size={18} />
                Add to basket
              </button>
              <button
                onClick={() => toggleMyList(product)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors ${
                  isWished ? "border-red-400 bg-red-50 text-red-400" : "border-gray-200 text-[#7C7C7C] hover:border-red-300 hover:text-red-400"
                }`}
              >
                <Heart size={20} fill={isWished ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-[#181725] mb-4">Related Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map(p => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white rounded-2xl p-4 hover:shadow-md transition-shadow flex flex-col gap-2"
                >
                  <div className="w-full h-24 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-4xl">
                    {p.emoji}
                  </div>
                  <p className="font-semibold text-[#181725] text-sm">{p.name}</p>
                  <p className="text-[#53B175] font-bold">${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}

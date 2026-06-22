import { Link, useNavigate } from "react-router";
import { Plus, Minus, Trash2, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import Layout from "../components/Layout";
import { useApp } from "../store";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const delivery = cartTotal > 0 ? 2.00 : 0;
  const total = cartTotal - discount + delivery;

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#181725] mb-6">My Cart</h2>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-[#F2F3F2] rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={36} className="text-[#7C7C7C]" />
            </div>
            <h3 className="text-xl font-bold text-[#181725] mb-2">Your cart is empty</h3>
            <p className="text-[#7C7C7C] mb-6">Add some products to get started</p>
            <Link to="/home" className="bg-[#53B175] text-white px-8 py-3 rounded-2xl font-semibold hover:bg-[#3d9a5f] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {/* Items list */}
            <div className="col-span-2 space-y-3">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#181725] truncate">{product.name}</p>
                    <p className="text-xs text-[#7C7C7C]">{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(product.id, quantity - 1)}
                      className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center text-[#7C7C7C] hover:border-[#53B175] hover:text-[#53B175] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-[#181725]">{quantity}</span>
                    <button
                      onClick={() => updateQty(product.id, quantity + 1)}
                      className="w-8 h-8 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right min-w-[64px]">
                    <p className="font-bold text-[#181725]">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-bold text-[#181725] mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7C7C7C]">Subtotal</span>
                    <span className="font-medium text-[#181725]">${cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#53B175]">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#7C7C7C]">Delivery</span>
                    <span className="font-medium text-[#181725]">${delivery.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-[#181725]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="flex gap-2 mb-5">
                  <div className="flex-1 flex items-center gap-2 bg-[#F2F3F2] rounded-xl px-3 py-2.5">
                    <Tag size={14} className="text-[#7C7C7C]" />
                    <input
                      value={promo}
                      onChange={e => setPromo(e.target.value)}
                      placeholder="Promo code"
                      className="bg-transparent outline-none text-sm flex-1 text-[#181725] placeholder:text-[#7C7C7C]"
                    />
                  </div>
                  <button
                    onClick={() => { if (promo) setPromoApplied(true); }}
                    className="bg-[#53B175] text-white px-4 rounded-xl text-sm font-medium hover:bg-[#3d9a5f] transition-colors"
                  >
                    Apply
                  </button>
                </div>

                <button
                  onClick={() => navigate("/order-confirmed")}
                  className="w-full bg-[#53B175] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#3d9a5f] transition-colors"
                >
                  Place Order — ${total.toFixed(2)}
                </button>
              </div>

              {/* Delivery info */}
              <div className="bg-white rounded-2xl p-5">
                <h4 className="font-semibold text-[#181725] mb-3 text-sm">Delivery Details</h4>
                <div className="space-y-2 text-xs text-[#7C7C7C]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#53B175] rounded-full" />
                    Express delivery in 1 hour
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#53B175] rounded-full" />
                    Free delivery on orders over $30
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#53B175] rounded-full" />
                    Track your order in real-time
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

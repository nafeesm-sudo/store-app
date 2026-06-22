import { Link } from "react-router";
import { Plus } from "lucide-react";
import Layout from "../components/Layout";
import { categories, products, exclusiveOffers } from "../data";
import { useApp } from "../store";

function ProductCard({ product }: { product: typeof products[0] }) {
  const { addToCart } = useApp();
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-28 bg-[#F2F3F2] rounded-xl flex items-center justify-center text-5xl mb-1 relative">
          {product.emoji}
          {product.badge && (
            <span className="absolute top-2 left-2 bg-[#F8A44C] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-[#7C7C7C]">{product.unit}</p>
        <p className="font-semibold text-[#181725] text-sm mt-0.5">{product.name}</p>
      </Link>
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-[#181725]">${product.price.toFixed(2)}</span>
        <button
          onClick={() => addToCart(product)}
          className="w-8 h-8 bg-[#53B175] rounded-full flex items-center justify-center text-white hover:bg-[#3d9a5f] transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Banner */}
        <div className="w-full bg-[#53B175] rounded-3xl p-8 flex items-center justify-between overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="relative z-10">
            <p className="text-white/80 text-sm mb-1">Welcome back!</p>
            <h2 className="text-white text-2xl font-bold mb-3">Get your groceries<br />in as fast as 1 hour</h2>
            <Link
              to="/browse"
              className="inline-block bg-white text-[#53B175] px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Shop now
            </Link>
          </div>
          <div className="relative z-10 text-8xl">🛒</div>
        </div>

        {/* Exclusive offers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#181725]">Exclusive Offer</h3>
            <Link to="/browse" className="text-[#53B175] text-sm font-medium hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {exclusiveOffers.map(offer => (
              <div
                key={offer.id}
                style={{ backgroundColor: offer.color }}
                className="rounded-2xl p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs text-[#7C7C7C] mb-1">From our farm</p>
                  <h4 className="font-bold text-[#181725] text-base">{offer.name}</h4>
                  <span className="inline-block mt-2 bg-[#53B175] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {offer.discount}
                  </span>
                </div>
                <div className="text-5xl">{offer.emoji}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Selling */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#181725]">Best Selling</h3>
            <Link to="/browse" className="text-[#53B175] text-sm font-medium hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(0, 5).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#181725]">Groceries</h3>
            <Link to="/browse" className="text-[#53B175] text-sm font-medium hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to="/browse"
                style={{ backgroundColor: cat.color }}
                className="rounded-2xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="font-medium text-[#181725] text-sm leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* More products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#181725]">All Products</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.slice(5).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </Layout>
  );
}

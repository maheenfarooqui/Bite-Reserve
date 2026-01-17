const Promo = () => (
  <div className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
      <div className="p-8 bg-white rounded-[2rem] shadow-sm">
        <div className="text-4xl mb-4 text-primary">🚀</div>
        <h3 className="text-xl font-black mb-2">Fast Delivery</h3>
        <p className="text-gray-500 text-sm">Under 30 minutes or it's free!</p>
      </div>
      <div className="p-8 bg-white rounded-[2rem] shadow-sm border-2 border-primary/10">
        <div className="text-4xl mb-4 text-primary">🥦</div>
        <h3 className="text-xl font-black mb-2">Fresh Quality</h3>
        <p className="text-gray-500 text-sm">100% Organic ingredients used.</p>
      </div>
      <div className="p-8 bg-white rounded-[2rem] shadow-sm">
        <div className="text-4xl mb-4 text-primary">🎧</div>
        <h3 className="text-xl font-black mb-2">24/7 Support</h3>
        <p className="text-gray-500 text-sm">Always here for your hunger.</p>
      </div>
    </div>
  </div>
);

export default Promo;
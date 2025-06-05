import React from "react";

const products = [
  {
    id: 1,
    title: "Oil Balancing Moisturizer",
    video:
      "https://foxtale.in/cdn/shop/files/quinn_yuoh8u8nek9botl6hwbhkvqr.mp4#t=0.1",
    iconBg: "bg-pink-200",
  },
  {
    id: 2,
    title: "Super Glow Face Wash",
    video:
      "https://foxtale.in/cdn/shop/files/quinn_z3akkloew7el3ij8m1aza7iy.mp4#t=0.1",
    iconBg: "bg-orange-200",
  },
  {
    id: 3,
    title: "Lip Sleeping Mask with Maracuja Oil",
    video:
      "https://foxtale.in/cdn/shop/files/quinn_dn33udichscupca2jldp8gl4.mp4#t=0.1",
    iconBg: "bg-red-200",
  },
  {
    id: 4,
    title: "Lip Sleeping Mask with Maracuja Oil",
    video:
      "https://foxtale.in/cdn/shop/files/quinn_egyphvskvgh7njvvppzf375i.mp4#t=0.1",
    iconBg: "bg-red-200",
  },
];

const LatestLaunches = () => {
  return (
    <section className="px-4 py-10 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Dive into our latest launches
        </h2>

        {/* Grid layout for all screens, 2 columns on small devices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-xl overflow-hidden shadow-md group transition-transform hover:scale-105"
            >
              <video
                src={product.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-t-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white p-4 flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-md ${product.iconBg} flex items-center justify-center text-white text-sm font-bold shadow`}
                >
                  🎥
                </div>
                <p className="text-sm font-medium">{product.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;

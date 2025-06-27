import React, { useState } from "react";

const LatestLaunches = ({ products = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const videoProducts = products.filter((p) => p.videoUrl);

  const closeModal = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : videoProducts.length - 1));
  const showNext = () =>
    setSelectedIndex((prev) => (prev < videoProducts.length - 1 ? prev + 1 : 0));

  const getPrevIndex = () =>
    selectedIndex === 0 ? videoProducts.length - 1 : selectedIndex - 1;
  const getNextIndex = () =>
    selectedIndex === videoProducts.length - 1 ? 0 : selectedIndex + 1;

  if (videoProducts.length === 0) return null;

  return (
    <section className="px-4 py-10 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Dive into our latest launches
        </h2>

        <div className="md:grid md:grid-cols-4 md:gap-6 overflow-x-auto flex gap-4 scroll-smooth hidden-scrollbar">
          {videoProducts.map((product, index) => (
            <div
              key={product._id}
              className="min-w-[250px] md:min-w-0 rounded-xl overflow-hidden shadow-md hover:scale-105 transition relative"
            >
              <video
                src={product.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-t-2xl cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white p-4 flex items-center gap-2 pointer-events-none">
                <div className="w-8 h-8 rounded-md bg-black/50 flex items-center justify-center text-white text-sm font-bold shadow">
                  🎥
                </div>
                <p className="text-sm font-medium">{product.heading}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4 py-6">
          <button
            onClick={closeModal}
            className="absolute top-10 right-8 text-white text-xl bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 z-50"
          >
            ✕
          </button>

          <button
            onClick={showPrev}
            className="absolute left-4 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 z-40"
          >
            ←
          </button>

          <div className="flex items-center justify-center gap-6 w-full max-w-7xl">
            <div className="hidden md:block w-1/5 opacity-50">
              <video
                src={videoProducts[getPrevIndex()].videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>

            <div className="flex flex-col md:flex-row w-full md:w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden">
              <video
                src={videoProducts[selectedIndex].videoUrl}
                autoPlay
                loop
                muted
                controls
                className="w-full md:w-1/2 h-auto object-cover"
              />

              <div className="p-4 md:p-6 flex flex-col justify-between w-full md:w-1/2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {videoProducts[selectedIndex].heading}
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{videoProducts[selectedIndex].price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {videoProducts[selectedIndex].subDescription
                      ?.split(" ")
                      .slice(0, 20)
                      .join(" ") + "..."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="border border-black px-4 py-2 text-sm rounded hover:bg-gray-100 hidden sm:block">
                    More info
                  </button>
                  <button className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800">
                    Add to cart 🛒
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-1/5 opacity-50">
              <video
                src={videoProducts[getNextIndex()].videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

          <button
            onClick={showNext}
            className="absolute right-4 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 z-40"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestLaunches;

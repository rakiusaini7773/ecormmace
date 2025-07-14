// import React, { useRef, useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { addToCart } from "../redux/slices/cartSlice";

// const LatestLaunches = ({ products = [] }) => {
//   const dispatch = useDispatch();
//   const videoProducts = products.filter((p) => p.videoUrl);
//   const videoRefs = useRef([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const closeModal = () => setSelectedIndex(null);
//   const showPrev = () =>
//     setSelectedIndex((prev) => (prev > 0 ? prev - 1 : videoProducts.length - 1));
//   const showNext = () =>
//     setSelectedIndex((prev) => (prev < videoProducts.length - 1 ? prev + 1 : 0));

//   const getPrevIndex = () =>
//     selectedIndex === 0 ? videoProducts.length - 1 : selectedIndex - 1;
//   const getNextIndex = () =>
//     selectedIndex === videoProducts.length - 1 ? 0 : selectedIndex + 1;

//   const getUserId = () => sessionStorage.getItem("userId");

//   const handleAddToCart = (e, product) => {
//     e.stopPropagation();
//     const userId = getUserId();
//     if (!userId) {
//       toast.warning("Please login to add items to your cart.");
//       return;
//     }
//     dispatch(addToCart(product));
//   };

//   // ✅ Reels-like autoplay observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             videoRefs.current.forEach((v) => {
//               if (v && v !== video) v.pause();
//             });
//             video.play().catch(() => {});
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.75 }
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       videoRefs.current.forEach((video) => {
//         if (video) observer.unobserve(video);
//       });
//     };
//   }, [videoProducts]);

//   useEffect(() => {
//     document.body.style.overflow = selectedIndex !== null ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [selectedIndex]);

//   // ✅ Reset refs on rerender
//   videoRefs.current = new Array(videoProducts.length).fill(null);

//   if (videoProducts.length === 0) return null;

//   return (
//     <section className="bg-white">
//       {/* ✅ Desktop Grid View */}
//       <div className="hidden md:block px-4 py-10 md:px-12 lg:px-20">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
//             Dive into our latest launches
//           </h2>
//           <div className="grid md:grid-cols-4 gap-6">
//             {videoProducts.map((product, index) => (
//               <div
//                 key={product._id}
//                 className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition relative cursor-pointer"
//               >
//                 <video
//                   src={product.videoUrl}
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   className="w-full h-auto rounded-t-2xl"
//                   onClick={() => setSelectedIndex(index)}
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white p-4 flex items-center gap-2 pointer-events-none">
//                   <div className="w-8 h-8 rounded-md bg-black/50 flex items-center justify-center text-white text-sm font-bold shadow">
//                     🎥
//                   </div>
//                   <p className="text-sm font-medium">{product.heading}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ✅ Mobile Reels View */}
//       <div className="md:hidden h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
//         {videoProducts.map((product, index) => (
//           <div
//             key={product._id}
//             className="snap-start w-full h-screen flex flex-col justify-end relative"
//           >
//             <video
//               ref={(el) => (videoRefs.current[index] = el)}
//               src={product.videoUrl}
//               loop
//               muted
//               playsInline
//               className="w-full h-full object-cover"
//               onContextMenu={(e) => e.preventDefault()}
//               controls={false}
//               preload="auto"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
//               <h3 className="text-lg font-semibold text-white mb-1">
//                 {product.heading}
//               </h3>
//               <p className="text-md font-bold text-white mb-3">₹{product.price}</p>
//               <div className="flex gap-3">
//                 <button className="border border-white px-4 py-2 text-sm rounded hover:bg-white hover:text-black w-1/2">
//                   More info
//                 </button>
//                 <button
//                   onClick={(e) => handleAddToCart(e, product)}
//                   className="bg-white text-black px-4 py-2 text-sm rounded hover:bg-gray-200 w-1/2"
//                 >
//                   Add to cart 🛒
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Modal (Shared for Mobile + Desktop) */}
//       {selectedIndex !== null && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-4 py-6">
//           <button
//             onClick={closeModal}
//             className="absolute top-4 right-4 text-white text-xl bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 z-50"
//           >
//             ✕
//           </button>

//           {/* 🖥️ Desktop Modal */}
//           <div className="hidden md:flex items-center justify-center gap-6 w-full max-w-7xl relative">
//             <button
//               onClick={showPrev}
//               className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl font-bold px-4 py-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 z-50"
//             >
//               ←
//             </button>

//             <div className="hidden md:block w-1/5 opacity-50">
//               <video
//                 src={videoProducts[getPrevIndex()].videoUrl}
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="w-full h-auto object-cover rounded-xl"
//               />
//             </div>

//             <div className="relative flex flex-col md:flex-row w-full md:w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="relative w-full md:w-1/2">
//                 <video
//                   src={videoProducts[selectedIndex].videoUrl}
//                   autoPlay
//                   loop
//                   muted
//                   controls
//                   className="w-full h-full object-cover"
//                   onContextMenu={(e) => e.preventDefault()}
//                   onPause={(e) => e.target.play()}
//                 />
//               </div>
//               <div className="hidden md:flex flex-col justify-between w-full md:w-1/2 p-6 gap-4">
//                 <div className="space-y-2">
//                   <h3 className="text-2xl font-semibold text-gray-800">
//                     {videoProducts[selectedIndex].heading}
//                   </h3>
//                   <p className="text-xl font-bold text-gray-900">
//                     ₹{videoProducts[selectedIndex].price}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {videoProducts[selectedIndex].subDescription
//                       ?.split(" ")
//                       .slice(0, 20)
//                       .join(" ") + "..."}
//                   </p>
//                 </div>
//                 <div className="flex gap-3">
//                   <button className="border border-black px-4 py-2 text-sm rounded hover:bg-gray-100">
//                     More info
//                   </button>
//                   <button
//                     onClick={(e) =>
//                       handleAddToCart(e, videoProducts[selectedIndex])
//                     }
//                     className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800"
//                   >
//                     Add to cart 🛒
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="hidden md:block w-1/5 opacity-50">
//               <video
//                 src={videoProducts[getNextIndex()].videoUrl}
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="w-full h-auto object-cover rounded-xl"
//               />
//             </div>

//             <button
//               onClick={showNext}
//               className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl font-bold px-4 py-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 z-50"
//             >
//               →
//             </button>
//           </div>

//           {/* 📱 Mobile Modal */}
//           <div className="md:hidden w-full h-full overflow-y-auto">
//             <div className="flex flex-col items-center py-6 min-h-screen">
//               <video
//                 src={videoProducts[selectedIndex].videoUrl}
//                 autoPlay
//                 loop
//                 muted
//                 controls
//                 playsInline
//                 className="w-full h-[60vh] object-cover rounded-xl"
//                 onContextMenu={(e) => e.preventDefault()}
//                 onPause={(e) => e.target.play()}
//               />
//               <div className="w-full bg-white px-4 py-4 rounded-xl mt-4 flex flex-col gap-2">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {videoProducts[selectedIndex].heading}
//                 </h3>
//                 <p className="text-md font-bold text-gray-900">
//                   ₹{videoProducts[selectedIndex].price}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {videoProducts[selectedIndex].subDescription}
//                 </p>
//                 <div className="flex gap-3 pt-4">
//                   <button className="border border-black px-4 py-2 text-sm rounded hover:bg-gray-100 w-1/2">
//                     More info
//                   </button>
//                   <button
//                     onClick={(e) =>
//                       handleAddToCart(e, videoProducts[selectedIndex])
//                     }
//                     className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 w-1/2"
//                   >
//                     Add to cart 🛒
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default LatestLaunches;


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
          {/* Mobile Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-xl bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 md:hidden z-50"
          >
            ✕
          </button>

          {/* Desktop Close Button */}
          <button
            onClick={closeModal}
            className="hidden md:flex absolute top-10 right-8 text-white text-xl bg-gray-800 rounded-full w-8 h-8 items-center justify-center hover:bg-gray-700 z-50"
          >
            ✕
          </button>

          {/* Prev Button */}
          <button
            onClick={showPrev}
            className="absolute left-4 text-white text-3xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 z-40"
          >
            ←
          </button>

          <div className="flex items-center justify-center gap-6 w-full max-w-7xl relative">
            {/* Previous preview (Desktop only) */}
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

            {/* Main Video and Text */}
            <div className="relative flex flex-col md:flex-row w-full md:w-3/5 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative w-full md:w-1/2">
                <video
                  src={videoProducts[selectedIndex].videoUrl}
                  autoPlay
                  loop
                  muted
                  controls
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                  onPause={(e) => e.target.play()} // Auto resume if user pauses
                />

                {/* Mobile Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-4 flex flex-col gap-3 md:hidden z-10">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {videoProducts[selectedIndex].heading}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ₹{videoProducts[selectedIndex].price}
                  </p>
                  <p className="text-sm text-gray-600">
                    {videoProducts[selectedIndex].subDescription
                      ?.split(" ")
                      .slice(0, 20)
                      .join(" ") + "..."}
                  </p>
                  <div className="flex gap-3">
                    <button className="border border-black px-4 py-2 text-sm rounded hover:bg-gray-100">
                      More info
                    </button>
                    <button className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800">
                      Add to cart 🛒
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Text Block */}
              <div className="hidden md:flex flex-col justify-between w-full md:w-1/2 p-6 gap-4">
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

                <div className="flex gap-3">
                  <button className="border border-black px-4 py-2 text-sm rounded hover:bg-gray-100">
                    More info
                  </button>
                  <button className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800">
                    Add to cart 🛒
                  </button>
                </div>
              </div>
            </div>

            {/* Next preview (Desktop only) */}
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

          {/* Next Button */}
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

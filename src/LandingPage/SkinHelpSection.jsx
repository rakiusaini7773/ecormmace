// import React from "react";

// const skinConcerns = [
//   {
//     label: "Detan",
//     image: "https://foxtale.in/cdn/shop/files/DETAN.png?v=1746191818&width=300",
//   },
//   {
//     label: "Hydration",
//     image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-08.png?v=1721905699&width=300",
//   },
//   {
//     label: "Hyperpigmentation",
//     image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-10.png?v=1721905700&width=300",
//   },
//   {
//     label: "Anti Ageing",
//     image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-09.png?v=1721905699&width=300",
//   },
//   {
//     label: "Acne",
//     image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-07.png?v=1721905699&width=300",
//   },
// ];



// const SkinHelpSection = () => {
//   return (
//     <section className="px-4 py-10 md:px-12 lg:px-20 ">
//       <h2 className="text-4xl md:text-5xl  text-gray-900 mb-14 ">
//         What does your skin need help with?
//       </h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center ">
//         {skinConcerns.map((item, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <img
//               src={item.image}
//               alt={item.label}
//               className="w-96 h-48  object-contain mb-2"
//             />
//             <p className="font-semibold text-gray-800 text-sm md:text-base">
//               {item.label}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SkinHelpSection;


import React from "react";

const skinConcerns = [
  {
    label: "Detan",
    image: "https://foxtale.in/cdn/shop/files/DETAN.png?v=1746191818&width=300",
  },
  {
    label: "Hydration",
    image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-08.png?v=1721905699&width=300",
  },
  {
    label: "Hyperpigmentation",
    image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-10.png?v=1721905700&width=300",
  },
  {
    label: "Anti Ageing",
    image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-09.png?v=1721905699&width=300",
  },
  {
    label: "Acne",
    image: "https://foxtale.in/cdn/shop/files/Homepage_-_Concerns-07.png?v=1721905699&width=300",
  },
];

const SkinHelpSection = () => {
  return (
    <section className="py-12 m-6">
      <h2 className="text-4xl md:text-5xl text-gray-900 mb-14">
        What does your skin need help with?
      </h2>

      {/* Grid layout for large screens */}
      <div className="hidden lg:grid gap-8 grid-cols-5">
        {skinConcerns.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.image}
              alt={item.label}
              className="w-[200px] h-[150px] object-contain mb-2"
            />
            <p className="font-semibold text-gray-800 text-sm md:text-base text-center">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Horizontal scroll for mobile/tablet */}
      <div className="lg:hidden overflow-x-auto hidden-scrollbar">
        <div className="flex gap-6 w-max px-4">
          {skinConcerns.map((item, index) => (
            <div key={index} className="min-w-[160px] flex flex-col items-center">
              <img
                src={item.image}
                alt={item.label}
                className="w-[140px] h-[120px] object-contain mb-2"
              />
              <p className="font-semibold text-gray-800 text-sm text-center">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinHelpSection;

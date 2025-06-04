


// import React from 'react';
// import { FaStar, FaClock, FaWater, FaCircle, FaHeart, FaPlus, FaShieldAlt } from 'react-icons/fa';

// const products = [
//     {
//         id: 1,
//         title: 'High-Performing',
//         subtitle: 'Visible results from the 1st use',
//         bgColor: '#c4a6ff',
//         imgSrc: 'https://foxtale.in/cdn/shop/files/1_793e50d8-a306-4ab3-8bbd-721810d04a4d.gif?v=1721909956&width=300',
//         alt: 'Face application',
//         points: [
//             {
//                 icon: <FaStar className="text-black text-[24px]" />,
//                 text: "Skincare shows results when you're consistent. Visible improvement every day improves consistency.",
//             },
//             {
//                 icon: <FaClock className="text-black text-[24px]" />,
//                 text: "Our fast-acting formulas and unique ingredient story ensure visible improvement from the very first use.",
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: 'Innovative',
//         subtitle: 'Unique Dermal Delivery Systems',
//         bgColor: '#dac7ff',
//         imgSrc: 'https://foxtale.in/cdn/shop/files/2.gif?v=1721909910&width=300',
//         alt: 'Skin layers',
//         points: [
//             {
//                 icon: <FaWater className="text-black text-[24px]" />,
//                 text: 'Different concerns show up in different layers of skin.',
//             },
//             {
//                 icon: <FaCircle className="text-black text-[24px]" />,
//                 text: 'Our unique Active Delivery Systems ensure the actives reach the necessary layers and tackle skin concerns like increased melanin production, dehydration, collagen loss, and wrinkles.',
//             },
//         ],
//     },
//     {
//         id: 3,
//         title: 'Safe',
//         subtitle: 'Boosted Skin Health Enhancers',
//         bgColor: '#ebe3ff',
//         imgSrc: 'https://foxtale.in/cdn/shop/files/3.gif?v=1721909952&width=300',
//         alt: 'Safe skincare',
//         points: [
//             {
//                 icon: <FaHeart className="text-black text-[24px]" />,
//                 text: 'Healthy Skin = Glowing Skin',
//             },
//             {
//                 icon: <FaPlus className="text-black text-[24px]" />,
//                 text: 'Our products are formulated with skin health enhancers that complement actives for targeted solutions.',
//             },
//             {
//                 icon: <FaShieldAlt className="text-black text-[24px]" />,
//                 text: "They increase skin's moisture levels and support barrier function to give you a lit-from-within glow.",
//             },
//         ],
//     },
// ];

// const ProductPlaybook = () => {
//     return (
//         <section className="px-4 md:px-8 lg:px-16 py-12 bg-white text-gray-800 m-6 max-w-7xl mx-auto">
//             <h2 className="text-xl md:text-2xl lg:text-2xl font-bold mb-5 max-w-xs mx-auto sm:mx-0 text-start whitespace-nowrap">
//                 Our Product Playbook
//             </h2>

//             {/* Large screens: grid layout */}
//             <div className="hidden lg:grid gap-10 grid-cols-3">
//                 {products.map(({ id, title, subtitle, bgColor, imgSrc, alt, points }) => (
//                     <div
//                         key={id}
//                         className="rounded-2xl text-center shadow-md p-[24px_28px_0px]"
//                         style={{ backgroundColor: bgColor }}
//                     >
//                         <h3 className="text-4xl font-[500] mb-3">{title}</h3>
//                         <p className="text-2xl font-bold mb-5">{subtitle}</p>
//                         <img
//                             src={imgSrc}
//                             alt={alt}
//                             className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
//                         />
//                         <div className="flex flex-col items-start gap-6 text-left text-sm md:text-base lg:text-lg">
//                             {points.map(({ icon, text }, idx) => (
//                                 <div key={idx} className="flex items-start gap-4">
//                                     <div>{icon}</div>
//                                     <div className="text-[17px] font-[500]">{text}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Mobile and tablet: horizontal scroll */}
//             <div className="lg:hidden overflow-x-auto hidden-scrollbar">
//                 <div className="flex gap-6 w-min px-4">
//                     {products.map(({ id, title, subtitle, bgColor, imgSrc, alt, points }) => (
//                         <div
//                             key={id}
//                             className="min-w-[320px] rounded-2xl text-center shadow-md p-[24px_28px_0px]"
//                             style={{ backgroundColor: bgColor }}
//                         >
//                             <h3 className="text-3xl font-[500] mb-3">{title}</h3>
//                             <p className="text-xl font-bold mb-5">{subtitle}</p>
//                             <img
//                                 src={imgSrc}
//                                 alt={alt}
//                                 className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
//                             />
//                             <div className="flex flex-col items-start gap-4 text-left text-sm md:text-base">
//                                 {points.map(({ icon, text }, idx) => (
//                                     <div key={idx} className="flex items-start gap-3">
//                                         <div>{icon}</div>
//                                         <div className="text-[15px] font-[500]">{text}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ProductPlaybook;


import React, { useState, useRef, useEffect } from 'react';
import {
    FaStar,
    FaClock,
    FaWater,
    FaCircle,
    FaHeart,
    FaPlus,
    FaShieldAlt,
    FaArrowLeft,
    FaArrowRight,
} from 'react-icons/fa';

const products = [
    {
        id: 1,
        title: 'High-Performing',
        subtitle: 'Visible results from the 1st use',
        bgColor: '#c4a6ff',
        imgSrc:
            'https://foxtale.in/cdn/shop/files/1_793e50d8-a306-4ab3-8bbd-721810d04a4d.gif?v=1721909956&width=300',
        alt: 'Face application',
        points: [
            {
                icon: <FaStar className="text-black text-[24px]" />,
                text: "Skincare shows results when you're consistent. Visible improvement every day improves consistency.",
            },
            {
                icon: <FaClock className="text-black text-[24px]" />,
                text: 'Our fast-acting formulas and unique ingredient story ensure visible improvement from the very first use.',
            },
        ],
    },
    {
        id: 2,
        title: 'Innovative',
        subtitle: 'Unique Dermal Delivery Systems',
        bgColor: '#dac7ff',
        imgSrc: 'https://foxtale.in/cdn/shop/files/2.gif?v=1721909910&width=300',
        alt: 'Skin layers',
        points: [
            {
                icon: <FaWater className="text-black text-[24px]" />,
                text: 'Different concerns show up in different layers of skin.',
            },
            {
                icon: <FaCircle className="text-black text-[24px]" />,
                text: 'Our unique Active Delivery Systems ensure the actives reach the necessary layers and tackle skin concerns like increased melanin production, dehydration, collagen loss, and wrinkles.',
            },
        ],
    },
    {
        id: 3,
        title: 'Safe',
        subtitle: 'Boosted Skin Health Enhancers',
        bgColor: '#ebe3ff',
        imgSrc: 'https://foxtale.in/cdn/shop/files/3.gif?v=1721909952&width=300',
        alt: 'Safe skincare',
        points: [
            {
                icon: <FaHeart className="text-black text-[24px]" />,
                text: 'Healthy Skin = Glowing Skin',
            },
            {
                icon: <FaPlus className="text-black text-[24px]" />,
                text: 'Our products are formulated with skin health enhancers that complement actives for targeted solutions.',
            },
            {
                icon: <FaShieldAlt className="text-black text-[24px]" />,
                text: "They increase skin's moisture levels and support barrier function to give you a lit-from-within glow.",
            },
        ],
    },
];

const ProductPlaybook = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const scrollToCard = (index) => {
        const container = containerRef.current;
        if (container && container.children[index]) {
            container.children[index].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    };

    useEffect(() => {
        scrollToCard(currentIndex);
    }, [currentIndex]);

    return (
        <section className="px-4 md:px-8 lg:px-16 py-12 bg-white text-gray-800 m-6 max-w-7xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-bold mb-5 max-w-xs mx-auto sm:mx-0 text-start whitespace-nowrap">
                Our Product Playbook
            </h2>

            {/* Large screens: grid layout */}
            <div className="hidden lg:grid gap-10 grid-cols-3">
                {products.map(({ id, title, subtitle, bgColor, imgSrc, alt, points }) => (
                    <div
                        key={id}
                        className="rounded-2xl text-center shadow-md p-[24px_28px_0px]"
                        style={{ backgroundColor: bgColor }}
                    >
                        <h3 className="text-4xl font-[500] mb-3">{title}</h3>
                        <p className="text-2xl font-bold mb-5">{subtitle}</p>
                        <img
                            src={imgSrc}
                            alt={alt}
                            className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
                        />
                        <div className="flex flex-col items-start gap-6 text-left text-sm md:text-base lg:text-lg">
                            {points.map(({ icon, text }, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div>{icon}</div>
                                    <div className="text-[17px] font-[500]">{text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile and tablet: horizontal scroll */}
            <div className="lg:hidden overflow-x-auto hidden-scrollbar">
                <div
                    ref={containerRef}
                    className="flex gap-6 w-min px-4 mobile-scroll-container scroll-smooth snap-x snap-mandatory"
                >
                    {products.map(({ id, title, subtitle, bgColor, imgSrc, alt, points }) => (
                        <div
                            key={id}
                            className="min-w-[320px] rounded-2xl text-center shadow-md p-[24px_28px_0px] snap-start"
                            style={{ backgroundColor: bgColor }}
                        >
                            <h3 className="text-3xl font-[500] mb-3">{title}</h3>
                            <p className="text-xl font-bold mb-5">{subtitle}</p>
                            <img
                                src={imgSrc}
                                alt={alt}
                                className="mx-auto mb-5 w-52 h-40 object-cover rounded-full"
                            />
                            <div className="flex flex-col items-start gap-4 text-left text-sm md:text-base">
                                {points.map(({ icon, text }, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div>{icon}</div>
                                        <div className="text-[15px] font-[500]">{text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Pagination Controls (like image) */}
            <div className="lg:hidden flex items-center justify-between mt-6 px-6">
                <button
                    onClick={() =>
                        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
                    }
                    className="p-2 border rounded-full"
                >
                    <FaArrowLeft />
                </button>

                <div className="flex items-center gap-1 text-sm">
                    <span className="text-black font-semibold">
                        {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="mx-1">—</span>
                    <span className="text-gray-400">
                        {String(products.length).padStart(2, '0')}
                    </span>
                </div>

                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % products.length)}
                    className="p-2 border rounded-full"
                >
                    <FaArrowRight />
                </button>
            </div>
        </section>
    );
};

export default ProductPlaybook;

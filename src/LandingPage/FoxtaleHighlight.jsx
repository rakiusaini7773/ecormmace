import React from "react";

const FoxtaleHighlight = () => {
    return (
        <section className="px-4 py-10 md:px-12 lg:px-20">
            {/* Section Heading Below */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
                Peek into Foxtale HQ
            </h2>
            <div className="relative w-full ">
                <div className="w-full rounded-xl overflow-hidden " >
                    <img
                        src="https://foxtale.in/cdn/shop/files/GSS_DESKTOP.jpg?v=1746193661&width=2200"
                        alt="Rohit Saraf post"
                        className="w-full rounded-xl shadow-lg"
                    />
                </div>

                <div className="absolute top-[50%] translate-y-[-50%] p-4 md:p-6 w-[70%] h-[30%] bg-gradient-to-r from-white via-[#ffffff99] to-[#ffffff00]">
                    <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2">
                        Meet the main character!
                    </h2>
                    <p className="text-xl  text-gray-700 mb-4 font-bold ">
                        The lead in Rohit Saraf’s <br  />
                        glow story? Glow Sunscreen!
                    </p>
                    <div className="flex space-x-2">
                        <span className="w-2 h-2 bg-black rounded-full"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    </div>
                </div>

            </div>


        </section>
    );
};

export default FoxtaleHighlight;

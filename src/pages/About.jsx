import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { WonderWomenSection } from '../components/WonderWomenSection';
import FiveImageGrid from '../components/FiveImageGrid';

export const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Navbar />

      {/* Show WonderWomenSection only when no image is selected */}
      {!selectedImage && (
        <div className="overflow-x-hidden relative min-h-[400px] flex items-center justify-center">
          <WonderWomenSection />
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center animate-fadeIn"
          onClick={handleCloseImage}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-full object-contain animate-zoomIn"
            onClick={(e) => e.stopPropagation()} // Prevent closing on image click
          />
        </div>
      )}

      {/* Always visible image grid */}
      <div>
        <FiveImageGrid onImageClick={handleImageClick} />
      </div>

      <Footer />
    </div>
  );
};

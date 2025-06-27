import React, { useRef, useState } from "react";

const ImageMagnifier = ({ src, zoom = 3.5, width = "500px", height = "500px" }) => {
  const containerRef = useRef(null);
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [showMagnifier, setShowMagnifier] = useState(false);

  const handleMouseMove = (e) => {
    const { top, left, width, height } = containerRef.current.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      ref={containerRef}
      className="border shadow-xl rounded-xl overflow-hidden"
      style={{ width, height, position: "relative" }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt="Zoom"
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />

      {/* Zoomed View */}
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition,
            border: "1px solid #eee",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;

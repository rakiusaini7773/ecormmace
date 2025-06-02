import React from "react";

const Reviews = ({ reviews }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <>
        {Array(fullStars)
          .fill("★")
          .map((_, i) => (
            <span key={i} className="text-yellow-500 text-sm">★</span>
          ))}
        {halfStar && <span className="text-yellow-500 text-sm">½</span>}
      </>
    );
  };

  const getAvatarUrl = (name) => {
    const seed = encodeURIComponent(name || "user");
    return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=ffc300`;
  };

  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No reviews available.</p>;
  }

  return (
    <section className="w-full">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center sm:text-left">
        Customer Reviews
      </h3>
      <div className="flex flex-col gap-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="w-full border rounded-lg p-5 bg-white shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={getAvatarUrl(review.reviewer)}
                alt={review.reviewer}
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Review content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-800">{review.reviewer}</span>
                    <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded-full text-white font-medium">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>

                {/* Rating */}
                <div className="mb-2">{renderStars(review.rating)}</div>

                {/* Title */}
                {review.title && (
                  <h4 className="text-md font-semibold text-gray-800 mb-1">
                    {review.title}
                  </h4>
                )}

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{review.comment}</p>

                {/* Optional review image */}
                {review.image && (
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-28 h-auto rounded shadow border"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;

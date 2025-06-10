import React from "react";

const PagesBannerView = ({ title }) => {
  return (
    <div
      className="relative h-[250px] w-full ps-40
     bg-cover bg-bottom flex justify-start items-center ps-52"
      style={{ backgroundImage: "url('/images/pages_banner_background.jpg')" }}
    >
        <p className="text-White text-4xl">{title}</p>
    </div>
  );
};

export default PagesBannerView;

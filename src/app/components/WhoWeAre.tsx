import React from "react";
import Image from "next/image";

const WhoWeAre = () => {
  return (
    <div>
      <div className=" text-center text-3xl font-semibold">- WHO WE ARE -</div>
      <div className="flex justify-between gap-8 items-center px-10">
        <div max-w-lg>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa officiis
          consequatur nobis, cupiditate consequuntur maiores dolor sapiente cum
          repudiandae quidem. Saepe, provident aliquam. Aspernatur doloremque
          nesciunt magni quos dolorum maxime?
        </div>
        <div>
          <Image src="/grilled.png" alt="grilled" width={0} height={20} className="max-w-full"/>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;

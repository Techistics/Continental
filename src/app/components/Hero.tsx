// import React from "react";
// import Image from "next/image";

// const Hero = () => {
//   return (
//     <section className="relative h-screen flex bg-transparent ">
//       {/* Left 60% - Orange with Text */}
//       <div className="w-[50%]  flex flex-col justify-center px-20 pt-10 text-white">
//         <div className="flex items-center gap-8">
//           <div className="font-bold">
//             Crispy, Crunchy, Veggie Deliciousness!
//           </div>
//           <Image src="/Vector.png" alt="Background" width={145} height={0} />
//         </div>

//         <div className="flex gap-25"></div>
//         <h1 className="text-5xl font-bold mb-6">
//           Burgers That
//           <br />
//           Love the Earth!
//         </h1>
//         <p className="text-lg max-w-md">
//           Freshly made burgers with the best ingredients. Order now and taste
//           the difference!
//         </p>
//         <div className="flex gap-4 mt-4">
//           <button className="font-semibold bg-white rounded text-[#FF9B43] px-12">
//             Explore
//           </button>
//           <button className=" flex text-white text-xl px-6 py-2 rounded pl-10">
//             <Image src="/play.png" alt="Background" width={35} height={0} />
//             &nbsp;&nbsp;&nbsp;How To Get Order...
//           </button>
//         </div>
//       </div>

//       {/* Right 40% - Background image + overlapping burger */}
//       <div className="w-[50%] relative h-[540px] ">
//         {/* Background image */}
//         <Image
//           src="/Rectangl.png"
//           alt="Background"
//           fill
//           className="object-top object-contain bg-top scale-x-[-1]"
//           priority
//         />

//         {/* Overlapping burger image */}
//         <div className="absolute inset-0 flex items-center justify-start pt-30 ">
//           <Image
//             src="/hero_burger.svg"
//             alt="Burger"
//             width={550}
//             height={350}
//             className="drop-shadow-2xl -translate-x-[20%]"
//           />
//         </div>

//         {/* Discount badge */}
//         <div className="absolute top-28 right-144 bg-white text-[#FD9031] font-extrabold text-lg w-20 h-20 rounded-full flex items-center justify-center -rotate-12 shadow-xl">
//           <span className="text-center leading-tight">
//             75% <br /> OFF
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}
    >
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">Eat Sleep And</p>

          <h2 className="h1 hero-title">Supper delicious Burger in town!</h2>

          <p className="hero-text">
            Food is any substance consumed to provide nutritional support for an
            organism.
          </p>

          <button className="btn">Book A Table</button>
        </div>

        <figure className="hero-banner">
          <Image
            src="/assets/images/hero-banner-bg.png"
            width={820}
            height={716}
            alt=""
            aria-hidden="true"
            className="w-100 hero-img-bg"
          />

          <Image
            src="/assets/images/hero-banner.png"
            width={700}
            height={637}
            alt="Burger"
            loading="lazy"
            className="w-100 hero-img"
          />
        </figure>
      </div>
    </section>
  );
}

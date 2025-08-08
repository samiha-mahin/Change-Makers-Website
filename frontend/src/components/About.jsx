import React from "react";

const About = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-5 max-w-7xl mx-auto my-10 px-4">
        <h1 className="text-4xl font-bold my-5 text-center">
          About <span className="text-[#467057]">Us</span>
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img
            src="/images/july2.jpg"
            alt=""
            className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg"
          />
          <p className="text-center md:text-left text-lg leading-relaxed">
            Our website was created to honor the spirit of the July Revolution of Bangladesh — a historic movement that showcased the power of unity, courage, and determination for positive change. Inspired by this legacy, we connect passionate volunteers with meaningful opportunities to serve their communities and make a real difference.
            <br />
            e believe that every act of volunteering, big or small, contributes to building a stronger, more compassionate society. Join us in continuing the revolutionary spirit by offering your time, skills, and heart to causes that matter.
            <br/>Together, we can create lasting impact — just as those before us did.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
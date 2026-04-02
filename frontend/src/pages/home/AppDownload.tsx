import React from "react";

const AppDownload = () => {
  const driveLink =
    "https://drive.google.com/file/d/1894ObiK_D7ffo9sudJ1l_DFf2NMkdmNj/view?usp=sharing"; // replace this

  return (
    <section className="bg-white text-black py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto border border-black rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sewamahe Mobile App
          </h2>

          <p className="text-gray-700 text-base md:text-lg mb-6">
            Download the Sewamahe Android app to access services faster, stay
            connected in real-time, and manage everything on the go.
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8 text-sm md:text-base">
            <li>✔ Fast & smooth experience</li>
            <li>✔ Real-time updates</li>
            <li>✔ Simple and user-friendly interface</li>
          </ul>

          {/* Button */}
          <a
            href={driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
            Download APK
          </a>

          {/* Note */}
          <p className="text-xs text-gray-500 mt-4">
            *Enable "Install from unknown sources" to install the app.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;

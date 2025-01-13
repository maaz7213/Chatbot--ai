import  { useState } from "react";

function Message() {
  const [explanation, setExplanation] = useState("");

  const explanations = {
    simple: `
      Imagine you have a slide in a playground. When you slide down, you can go really fast 
      because the slide is smooth and slippery. Now, think about electricity like little cars 
      driving on a road. Normally, the road has bumps and cracks, so the cars can't go super fast 
      and sometimes get stuck.
    `,
    detailed: `
      Superconductors are materials that exhibit zero electrical resistance and the expulsion of 
      magnetic fields when cooled below a characteristic critical temperature. This phenomenon 
      was first discovered by Heike Kamerlingh Onnes in 1911 in mercury at 4.2 K. In a normal conductor, 
      electrical resistance arises due to the scattering of electrons by impurities, lattice vibrations 
      (phonons), and other electrons. However, in a superconductor, below its critical temperature, 
      electrons form Cooper pairs due to an attractive interaction mediated by lattice vibrations. These 
      Cooper pairs condense into a macroscopic quantum state described by a single wavefunction.
    `,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Explain Superconductors</h1>
      <div className="space-x-4">
        <button
          onClick={() => setExplanation("simple")}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Explain like I'm five
        </button>
        <button
          onClick={() => setExplanation("detailed")}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Explain like I'm a physicist
        </button>
      </div>

      {explanation && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg max-w-2xl">
          <p className="text-lg leading-relaxed">
            {explanation === "simple" ? explanations.simple : explanations.detailed}
          </p>
        </div>
      )}
    </div>
  );
}

export default Message;

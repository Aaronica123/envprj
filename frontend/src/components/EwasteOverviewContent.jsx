import React from 'react';

function EwasteOverviewContent() {
  return (
    <div className="container mx-auto p-6 md:p-8 lg:p-10 bg-white shadow-xl rounded-xl mt-10 mb-10 border border-green-200">
      {/* Main heading for the overview */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 text-center leading-tight tracking-tight">
        Understanding E-Waste Collection
      </h1>

      {/* Introduction paragraph */}
      <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
        E-waste, or electronic waste, refers to discarded electrical or electronic devices. This includes everything
        from old cell phones and laptops to refrigerators and televisions. As technology rapidly advances and
        consumer electronics become more affordable, the volume of e-waste generated globally is growing at an alarming rate.
      </p>

      {/* Section: Why E-Waste Collection is Crucial */}
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-2">
        Why E-Waste Collection is Crucial
      </h2>

      <ul className="space-y-6 mb-8 text-gray-800 text-base md:text-lg">
        {/* Environmental Protection */}
        <li className="flex items-start">
          <span className="flex-shrink-0 mr-3 text-green-600">🌿</span>
          <div>
            <strong className="font-semibold text-green-900">Environmental Protection:</strong> Electronic devices contain toxic substances like lead, mercury, cadmium, and beryllium. When e-waste is improperly disposed of, these harmful chemicals can leach into the soil and water, contaminating ecosystems and posing severe risks to human health. Recycling prevents this pollution.
          </div>
        </li>
        {/* Resource Conservation */}
        <li className="flex items-start">
          <span className="flex-shrink-0 mr-3 text-green-600">♻️</span>
          <div>
            <strong className="font-semibold text-green-900">Resource Conservation:</strong> E-waste contains valuable and finite resources such as gold, silver, copper, platinum, and rare earth elements. Recycling these materials reduces the need for virgin resource extraction, conserving natural resources and significantly decreasing energy consumption associated with mining and processing.
          </div>
        </li>
        {/* Economic Benefits */}
        <li className="flex items-start">
          <span className="flex-shrink-0 mr-3 text-green-600">💰</span>
          <div>
            <strong className="font-semibold text-green-900">Economic Benefits:</strong> The e-waste recycling industry creates green jobs in collection, sorting, dismantling, and material recovery. Furthermore, recovering valuable materials can provide a steady supply for manufacturing, reducing reliance on imports and stabilizing raw material costs.
          </div>
        </li>
        {/* Health and Safety */}
        <li className="flex items-start">
          <span className="flex-shrink-0 mr-3 text-green-600">⚕️</span>
          <div>
            <strong className="font-semibold text-green-900">Health and Safety:</strong> Informal e-waste recycling practices in many developing countries often involve burning electronics or using acid baths to extract metals. These dangerous methods expose workers and surrounding communities to toxic fumes and chemicals, leading to severe health problems. Responsible recycling ensures safer practices.
          </div>
        </li>
      </ul>

      {/* Section: The Collection Process */}
      <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-2">
        The Collection Process
      </h2>

      <ul className="list-disc list-inside space-y-4 mb-8 text-gray-800 text-base md:text-lg">
        <li>
          <strong className="font-semibold text-green-900">Designated Drop-off Points:</strong> Collection centers, retail take-back programs, and municipal facilities where consumers can responsibly dispose of their old electronics.
        </li>
        <li>
          <strong className="font-semibold text-green-900">Collection Drives:</strong> Community events organized to gather e-waste from residents.
        </li>
        <li>
          <strong className="font-semibold text-green-900">Corporate Recycling Programs:</strong> Businesses often have specific programs to handle their own electronic waste.
        </li>
        <li>
          <strong className="font-semibold text-green-900">Responsible Recycling Facilities:</strong> Once collected, e-waste is transported to certified recycling facilities where it is safely dismantled, separated, and processed to recover valuable materials and neutralize hazardous components.
        </li>
      </ul>

      {/* Concluding statement */}
      <p className="text-lg md:text-xl text-gray-700 text-center font-medium leading-relaxed">
        By actively participating in e-waste collection and supporting certified recyclers, we contribute to a cleaner environment, a more sustainable economy, and a healthier future for everyone.
      </p>
    </div>
  );
}

export default EwasteOverviewContent;

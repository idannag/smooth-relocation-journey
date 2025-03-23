
import React from 'react';

const ServicesContent = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Consultation Services</h3>
          <p className="text-gray-600 mb-4">
            Personalized consultation to help you understand your relocation options, requirements, and create a tailored plan.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
            <li>Initial assessment of your needs</li>
            <li>Custom relocation timeline</li>
            <li>Budget planning assistance</li>
            <li>Documentation guidance</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Housing & Accommodation</h3>
          <p className="text-gray-600 mb-4">
            Comprehensive support for finding and securing your new home abroad, from temporary to permanent housing.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
            <li>Property search assistance</li>
            <li>Neighborhood guides</li>
            <li>Lease negotiation support</li>
            <li>Utility setup coordination</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Immigration Support</h3>
          <p className="text-gray-600 mb-4">
            Expert guidance through the visa and immigration process for your destination country.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
            <li>Visa application assistance</li>
            <li>Document preparation</li>
            <li>Application tracking</li>
            <li>Residence permit guidance</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Family Relocation</h3>
          <p className="text-gray-600 mb-4">
            Specialized services for families moving abroad, with special attention to children's needs.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
            <li>School search and application</li>
            <li>Family healthcare setup</li>
            <li>Cultural adaptation guidance</li>
            <li>Spouse career support</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Moving & Logistics</h3>
          <p className="text-gray-600 mb-4">
            Coordination of all aspects of your physical move, from packing to customs clearance.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
            <li>Moving company coordination</li>
            <li>Shipping and customs guidance</li>
            <li>Insurance recommendations</li>
            <li>Pet relocation assistance</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
          <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">Settlement Services</h3>
          <p className="text-gray-600 mb-4">
            Essential support for the first weeks and months in your new country.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
            <li>Banking setup assistance</li>
            <li>Local registration support</li>
            <li>Healthcare enrollment</li>
            <li>Community integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesContent;

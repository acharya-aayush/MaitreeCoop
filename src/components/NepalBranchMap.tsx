import React, { useState } from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  location: string;
  phone: string;
  address: string;
  coordinates: { x: number; y: number };
  googleMapsUrl?: string;
}

const NepalBranchMap: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const branches: Branch[] = [
    {
      id: 'tamghas',
      name: 'Head Office',
      location: 'Tamghas',
      phone: '079-520678',
      address: 'Resunga Municipality-8, Gulmi',
      coordinates: { x: 320, y: 180 },
      googleMapsUrl: 'https://maps.google.com/?q=28.06633,83.24750'
    },
    {
      id: 'dhurkot',
      name: 'Dhurkot Branch',
      location: 'Dhurkot',
      phone: '9765875701',
      address: 'Dhurkot, Gulmi',
      coordinates: { x: 310, y: 170 },
      googleMapsUrl: 'https://maps.google.com/?q=28.10733,83.15792'
    },
    {
      id: 'ishma',
      name: 'Ishma Branch',
      location: 'Ishma',
      phone: '9765875702',
      address: 'Ishma, Gulmi',
      coordinates: { x: 330, y: 160 },
      googleMapsUrl: 'https://maps.google.com/?q=28.19005,83.20319'
    },
    {
      id: 'purkot',
      name: 'Purkot Branch',
      location: 'Purkot',
      phone: '9765875703',
      address: 'Purkot, Gulmi',
      coordinates: { x: 300, y: 185 },
      googleMapsUrl: 'https://maps.google.com/?q=28.14386,83.07331'
    },
    {
      id: 'aapchaur',
      name: 'Aapchaur Branch',
      location: 'Aapchaur',
      phone: '9765875705',
      address: 'Aapchaur, Gulmi',
      coordinates: { x: 340, y: 175 },
      googleMapsUrl: 'https://maps.google.com/?q=28.11953,83.34686'
    },
    {
      id: 'kalikanagar',
      name: 'Kalikanagar Branch',
      location: 'Kalikanagar',
      phone: '974804507',
      address: 'Kalikanagar, Gulmi',
      coordinates: { x: 280, y: 220 },
      googleMapsUrl: 'https://maps.google.com/?q=27.67970,83.46094'
    },
    {
      id: 'baletaksar',
      name: 'Baletaksar Branch',
      location: 'Baletaksar',
      phone: '079410078',
      address: 'Baletaksar, Gulmi',
      coordinates: { x: 290, y: 200 },
      googleMapsUrl: 'https://maps.google.com/?q=27.99127,83.38925'
    },
    {
      id: 'sandhikharkha',
      name: 'Sandhikharkha Branch',
      location: 'Sandhikharkha',
      phone: '077590678',
      address: 'Sandhikharkha, Gulmi',
      coordinates: { x: 270, y: 190 },
      googleMapsUrl: undefined
    }
  ];

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
  };

  const openGoogleMaps = (branch: Branch) => {
    if (branch.googleMapsUrl) {
      window.open(branch.googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Our Service Centers</h2>
        <p className="text-green-100">Find us at these locations across Gulmi District</p>
      </div>

      {/* Map Section */}
      <div className="p-6">
        <div className="relative bg-gray-50 rounded-lg p-4">
          <svg 
            viewBox="0 0 600 300" 
            className="w-full h-auto max-w-4xl mx-auto"
            style={{ minHeight: '300px' }}
          >
            {/* Nepal Outline (Simplified) */}
            <path
              d="M50,150 L100,120 L150,110 L200,105 L250,100 L300,98 L350,100 L400,105 L450,110 L500,120 L540,140 L550,160 L545,180 L535,200 L520,220 L500,235 L480,245 L450,250 L400,248 L350,245 L300,240 L250,235 L200,230 L150,225 L100,215 L70,200 L55,180 L50,150 Z"
              fill="#e8f5e8"
              stroke="#22c55e"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
            
            {/* Branch Markers */}
            {branches.map((branch, index) => (
              <g key={branch.id}>
                {/* Marker Circle */}
                <circle
                  cx={branch.coordinates.x}
                  cy={branch.coordinates.y}
                  r={selectedBranch?.id === branch.id ? "12" : "8"}
                  fill={selectedBranch?.id === branch.id ? "#dc2626" : "#22c55e"}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 hover:r-10 drop-shadow-md"
                  onClick={() => handleBranchClick(branch)}
                />
                
                {/* Branch Label */}
                <text
                  x={branch.coordinates.x}
                  y={branch.coordinates.y - 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                >
                  {branch.location}
                </text>
                
                {/* Pulse Animation for Selected */}
                {selectedBranch?.id === branch.id && (
                  <circle
                    cx={branch.coordinates.x}
                    cy={branch.coordinates.y}
                    r="15"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Branch Office</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-gray-600">Selected</span>
            </div>
          </div>
        </div>

        {/* Selected Branch Info */}
        {selectedBranch && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-800 mb-1">
                  {selectedBranch.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-green-700">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{selectedBranch.address}</span>
                  </div>
                  <div className="flex items-center text-green-700">
                    <Phone className="h-4 w-4 mr-2" />
                    <a 
                      href={`tel:${selectedBranch.phone}`}
                      className="text-sm hover:text-green-800 transition-colors"
                    >
                      {selectedBranch.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              {selectedBranch.googleMapsUrl && (
                <button
                  onClick={() => openGoogleMaps(selectedBranch)}
                  className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Directions
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Branch Cards Grid */}
      <div className="border-t border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedBranch?.id === branch.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
              }`}
              onClick={() => handleBranchClick(branch)}
            >
              <h4 className="font-medium text-gray-900 mb-2">{branch.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{branch.location}</p>
              <p className="text-sm text-green-600 font-medium">{branch.phone}</p>
              
              {branch.googleMapsUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGoogleMaps(branch);
                  }}
                  className="mt-2 text-xs text-green-600 hover:text-green-800 flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Get Directions
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NepalBranchMap;
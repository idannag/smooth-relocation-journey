
import { Globe, Banknote, Calendar, MapPin, Info, Languages, Users, FileText, FileCheck } from 'lucide-react';
import { Destination } from './types';

interface DestinationInfoProps {
  activeDestination: Destination;
}

const DestinationInfo = ({ activeDestination }: DestinationInfoProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-4">
        {activeDestination.city}, {activeDestination.country}
      </h3>
      
      <p className="text-gray-700 mb-6">{activeDestination.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-2">
          <Globe className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">General:</h4>
            <p className="text-sm text-gray-600">Population: {activeDestination.population || 'Not available'}</p>
            <p className="text-sm text-gray-600">Area: {(activeDestination as any)?.area || 'Not available'}</p>
            <p className="text-sm text-gray-600">Population Density: {(activeDestination as any)?.populationDensity || 'Not available'}</p>
            <p className="text-sm text-gray-600">GDP per Capita: {(activeDestination as any)?.gdpPerCapita || 'Not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Languages className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Language:</h4>
            <p className="text-sm text-gray-600">Official Language: {activeDestination.language || 'Not available'}</p>
            <p className="text-sm text-gray-600">Predominant Languages: {(activeDestination as any)?.predominantLanguages || 'Not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Banknote className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Financial:</h4>
            <p className="text-sm text-gray-600">Currency: {activeDestination.currency || 'Not available'}</p>
            <p className="text-sm text-gray-600">Average Cost: {activeDestination.averageCost || 'Not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Time & Best Visit:</h4>
            <p className="text-sm text-gray-600">Time Zone: {activeDestination.timeZone || 'Not available'}</p>
            <p className="text-sm text-gray-600">Best Time to Visit: {activeDestination.bestTimeToVisit || 'Anytime is great!'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Attractions:</h4>
            <p className="text-sm text-gray-600">{activeDestination.popularAttractions || 'Explore and discover!'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <FileCheck className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Visa & Immigration:</h4>
            <p className="text-sm text-gray-600">{(activeDestination as any)?.visaImmigrationConditions || 'Contact local embassy for details'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Users className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Religious Communities:</h4>
            <p className="text-sm text-gray-600">{(activeDestination as any)?.religiousCommunities || 'Data not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <FileText className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Unique Relocation Facts:</h4>
            <p className="text-sm text-gray-600">{(activeDestination as any)?.uniqueRelocationFacts || 'Nothing specific noted'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationInfo;

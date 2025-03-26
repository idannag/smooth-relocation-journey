import { Globe, Banknote, Calendar, MapPin, Languages, Users, FileText, FileCheck } from 'lucide-react';
import { Destination } from './types';
interface DestinationInfoProps {
  activeDestination: Destination;
}
const DestinationInfo = ({
  activeDestination
}: DestinationInfoProps) => {
  return <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent mb-4">
        {activeDestination.city}, {activeDestination.country}
      </h3>
      
      <p className="text-gray-700 mb-6">{activeDestination.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Information */}
        {(activeDestination.population || activeDestination.area || activeDestination.populationDensity || activeDestination.gdpPerCapita) && <div className="flex items-start gap-2">
            <Globe className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">General:</h4>
              {activeDestination.population && <p className="text-sm text-gray-600">Population: {activeDestination.population}</p>}
              {activeDestination.area && <p className="text-sm text-gray-600">Area: {activeDestination.area}</p>}
              {activeDestination.populationDensity && <p className="text-sm text-gray-600">Population Density: {activeDestination.populationDensity}</p>}
              {activeDestination.gdpPerCapita && <p className="text-sm text-gray-600">GDP per Capita: {activeDestination.gdpPerCapita}</p>}
            </div>
          </div>}
        
        {/* Language Information */}
        {(activeDestination.language || activeDestination.predominantLanguages) && <div className="flex items-start gap-2">
            <Languages className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Language:</h4>
              {activeDestination.language && <p className="text-sm text-gray-600">Official Language: {activeDestination.language}</p>}
              {activeDestination.predominantLanguages && <p className="text-sm text-gray-600">Predominant Languages: {activeDestination.predominantLanguages}</p>}
            </div>
          </div>}
        
        {/* Financial Information */}
        {(activeDestination.currency || activeDestination.averageCost) && <div className="flex items-start gap-2">
            <Banknote className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Financial:</h4>
              {activeDestination.currency && <p className="text-sm text-gray-600">Currency: {activeDestination.currency}</p>}
              {activeDestination.averageCost && <p className="text-sm text-gray-600">Average Cost: {activeDestination.averageCost}</p>}
            </div>
          </div>}
        
        {/* Time and Visit Information */}
        {(activeDestination.timeZone || activeDestination.bestTimeToVisit) && <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Time:</h4>
              {activeDestination.timeZone && <p className="text-sm text-gray-600">Time Zone: {activeDestination.timeZone}</p>}
              {activeDestination.bestTimeToVisit && <p className="text-sm text-gray-600">Best Time to Visit: {activeDestination.bestTimeToVisit}</p>}
            </div>
          </div>}
        
        {/* Popular Attractions */}
        {activeDestination.popularAttractions && <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Attractions:</h4>
              <p className="text-sm text-gray-600">{activeDestination.popularAttractions}</p>
            </div>
          </div>}
        
        {/* Visa & Immigration */}
        {activeDestination.visaImmigrationConditions && <div className="flex items-start gap-2">
            <FileCheck className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Visa & Immigration:</h4>
              <p className="text-sm text-gray-600">{activeDestination.visaImmigrationConditions}</p>
            </div>
          </div>}
        
        {/* Religious Communities */}
        {activeDestination.religiousCommunities && <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Religious Communities:</h4>
              <p className="text-sm text-gray-600">{activeDestination.religiousCommunities}</p>
            </div>
          </div>}
        
        {/* Unique Relocation Facts */}
        {activeDestination.uniqueRelocationFacts && <div className="flex items-start gap-2">
            <FileText className="w-5 h-5 text-[#2C5AAE] mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold">Unique Relocation Facts:</h4>
              <p className="text-sm text-gray-600">{activeDestination.uniqueRelocationFacts}</p>
            </div>
          </div>}
      </div>
    </div>;
};
export default DestinationInfo;
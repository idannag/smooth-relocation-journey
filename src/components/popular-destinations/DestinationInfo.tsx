
import { Globe, Banknote, Calendar, MapPin, Info } from 'lucide-react';
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
      
      <p className="text-gray-700 mb-4">{activeDestination.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-2">
          <Globe className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
          <div>
            <h4 className="font-semibold">General:</h4>
            <p className="text-sm text-gray-600">Population: {activeDestination.population || 'Not available'}</p>
            <p className="text-sm text-gray-600">Language: {activeDestination.language || 'Not available'}</p>
            <p className="text-sm text-gray-600">Time Zone: {activeDestination.timeZone || 'Not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Banknote className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
          <div>
            <h4 className="font-semibold">Financial:</h4>
            <p className="text-sm text-gray-600">Currency: {activeDestination.currency || 'Not available'}</p>
            <p className="text-sm text-gray-600">Average Cost: {activeDestination.averageCost || 'Not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <Calendar className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
          <div>
            <h4 className="font-semibold">Best Time to Visit:</h4>
            <p className="text-sm text-gray-600">{activeDestination.bestTimeToVisit || 'Anytime is great!'}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <MapPin className="w-5 h-5 text-[#2C5AAE] mt-0.5" />
          <div>
            <h4 className="font-semibold">Popular Attractions:</h4>
            <p className="text-sm text-gray-600">{activeDestination.popularAttractions || 'Explore and discover!'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationInfo;


import { Globe, Banknote, Calendar, MapPin, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Destination } from './types';

interface DestinationInfoProps {
  activeDestination: Destination;
}

const DestinationInfo = ({ activeDestination }: DestinationInfoProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
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
        </TabsContent>
        
        <TabsContent value="map">
          <div className="h-[300px] rounded-lg overflow-hidden">
            {activeDestination.mapUrl ? (
              <iframe 
                src={activeDestination.mapUrl}
                className="w-full h-full border-none"
                loading="lazy"
                allowFullScreen
                title={`Map of ${activeDestination.city}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <Info className="w-6 h-6 text-gray-400 mr-2" />
                <span className="text-gray-500">Map not available</span>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DestinationInfo;

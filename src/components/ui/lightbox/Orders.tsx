
import { useState } from 'react';
import { ShoppingCart, Headphones } from 'lucide-react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'services'>('services');
  
  const orderItems = [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      service: "Visa Consultation",
      status: "Completed",
      amount: "$150.00"
    },
    {
      id: "ORD-12346",
      date: "2023-05-02",
      service: "Housing Search",
      status: "In Progress",
      amount: "$350.00"
    },
    {
      id: "ORD-12347",
      date: "2023-05-10",
      service: "School Registration",
      status: "Pending",
      amount: "$200.00"
    },
    {
      id: "ORD-12348",
      date: "2023-06-01",
      service: "Airport Pickup",
      status: "Scheduled",
      amount: "$75.00"
    }
  ];

  const availableServices = [
    {
      id: "SRV-001",
      service: "Visa & Immigration Support",
      description: "Expert assistance with visa applications, work permits, and immigration procedures",
      price: "$300",
      duration: "2-4 weeks"
    },
    {
      id: "SRV-002",
      service: "Home Finding",
      description: "Personalized housing search based on your preferences and budget",
      price: "$500",
      duration: "1-3 weeks"
    },
    {
      id: "SRV-003",
      service: "School Search",
      description: "Finding the right schools or educational institutions for your children",
      price: "$350",
      duration: "1-2 weeks"
    },
    {
      id: "SRV-004",
      service: "Area Orientation",
      description: "Guided tour of your new city with insights on neighborhoods, amenities, and local culture",
      price: "$200",
      duration: "1 day"
    },
    {
      id: "SRV-005",
      service: "Document Translation",
      description: "Professional translation of important documents for local authorities",
      price: "$25 per page",
      duration: "3-5 days"
    },
    {
      id: "SRV-006",
      service: "Banking Setup",
      description: "Assistance with opening bank accounts and setting up financial services",
      price: "$150",
      duration: "1 week"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 max-w-4xl mx-auto h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-center mb-8 font-inter bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] bg-clip-text text-transparent">
        Client Services
      </h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'services'
                ? 'text-[#2C5AAE] border-b-2 border-[#2C5AAE]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('services')}
          >
            <Headphones className="inline-block mr-2 h-4 w-4" />
            Available Services
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'orders'
                ? 'text-[#2C5AAE] border-b-2 border-[#2C5AAE]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingCart className="inline-block mr-2 h-4 w-4" />
            My Orders
          </button>
        </div>
        
        {activeTab === 'orders' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-[#2C5AAE]/10 to-[#40E0D0]/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-[#2C5AAE] hover:text-[#40E0D0] transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableServices.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-[#2C5AAE]">{service.service}</h3>
                <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                <div className="flex justify-between mt-4">
                  <span className="text-sm">
                    <strong>Price:</strong> {service.price}
                  </span>
                  <span className="text-sm">
                    <strong>Duration:</strong> {service.duration}
                  </span>
                </div>
                <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md text-sm hover:opacity-90 transition-opacity">
                  Order Service
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="px-6 py-4 bg-gray-50">
          <button className="w-full py-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] text-white rounded-md font-medium hover:opacity-95 transition-opacity">
            {activeTab === 'orders' ? 'Request Custom Service' : 'View All Services'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;

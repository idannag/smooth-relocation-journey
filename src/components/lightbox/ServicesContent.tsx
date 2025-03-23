
import React, { useState } from 'react';
import { ChevronRight, Mail, MessageSquare, Phone, UserRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ServicesContent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectService = (serviceName: string) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    // Scroll to form
    document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Form submitted successfully",
        description: `Thank you for your interest in our ${formData.service || 'services'}. We'll get back to you shortly.`,
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: ''
      });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Relocation Consultation */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Relocation Consultation</h3>
            <p className="text-white text-opacity-90 text-sm">
              Expert guidance for your relocation journey
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#2C5AAE] shrink-0 mt-0.5" />
                <span className="text-sm">Personalized relocation planning</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#2C5AAE] shrink-0 mt-0.5" />
                <span className="text-sm">Custom timeline creation</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#2C5AAE] shrink-0 mt-0.5" />
                <span className="text-sm">Budget assessment</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Relocation Consultation')}
              className="w-full bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Housing Solutions */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Housing Solutions</h3>
            <p className="text-white text-opacity-90 text-sm">
              Find your perfect home in a new location
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#2C5AAE] shrink-0 mt-0.5" />
                <span className="text-sm">Property search assistance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#2C5AAE] shrink-0 mt-0.5" />
                <span className="text-sm">Neighborhood guides</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#2C5AAE] shrink-0 mt-0.5" />
                <span className="text-sm">Rental agreement support</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Housing Solutions')}
              className="w-full bg-gradient-to-r from-[#2C5AAE] to-[#517cc7] hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Immigration Assistance */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-[#517cc7] to-[#33C3F0] p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Immigration Assistance</h3>
            <p className="text-white text-opacity-90 text-sm">
              Navigate visa and immigration processes
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#517cc7] shrink-0 mt-0.5" />
                <span className="text-sm">Visa application guidance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#517cc7] shrink-0 mt-0.5" />
                <span className="text-sm">Documentation assistance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#517cc7] shrink-0 mt-0.5" />
                <span className="text-sm">Immigration timeline planning</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Immigration Assistance')}
              className="w-full bg-gradient-to-r from-[#517cc7] to-[#33C3F0] hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Family Support */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-[#40E0D0] to-[#2C5AAE] p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Family Support</h3>
            <p className="text-white text-opacity-90 text-sm">
              Comprehensive solutions for families
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#40E0D0] shrink-0 mt-0.5" />
                <span className="text-sm">School search and enrollment</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#40E0D0] shrink-0 mt-0.5" />
                <span className="text-sm">Healthcare setup assistance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#40E0D0] shrink-0 mt-0.5" />
                <span className="text-sm">Spousal employment support</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Family Support')}
              className="w-full bg-gradient-to-r from-[#40E0D0] to-[#2C5AAE] hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Settling-In Services */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-[#33C3F0] to-[#517cc7] p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Settling-In Services</h3>
            <p className="text-white text-opacity-90 text-sm">
              Make your new location feel like home
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#33C3F0] shrink-0 mt-0.5" />
                <span className="text-sm">Local orientation</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#33C3F0] shrink-0 mt-0.5" />
                <span className="text-sm">Banking & utilities setup</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-[#33C3F0] shrink-0 mt-0.5" />
                <span className="text-sm">Cultural adaptation support</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Settling-In Services')}
              className="w-full bg-gradient-to-r from-[#33C3F0] to-[#517cc7] hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="service-form" className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
            Request Service Information
          </h3>
          <p className="text-gray-600 mb-6">
            {formData.service ? 
              `Tell us more about your needs for ${formData.service}` :
              'Select a service above or fill out this form to learn more about our relocation services'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <UserRound className="h-5 w-5" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Phone className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
              <div className="relative">
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your relocation needs..."
                  required
                  className="min-h-[120px] pl-10 pt-3"
                />
                <div className="absolute left-3 top-[1.1rem] text-gray-500">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicesContent;

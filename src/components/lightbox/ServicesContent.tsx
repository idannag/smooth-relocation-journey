
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
        {/* Consultation Services */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-blue-500 to-cyan-400 p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Consultation Services</h3>
            <p className="text-white text-opacity-90 text-sm">
              Get personalized advice on your relocation journey
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm">Initial relocation assessment</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm">Custom relocation timeline</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm">Budget planning assistance</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Consultation Services')}
              className="w-full bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Immigration Support */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-400 p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Immigration Support</h3>
            <p className="text-white text-opacity-90 text-sm">
              Expert guidance through visa and immigration processes
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-sm">Visa application assistance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-sm">Document preparation</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span className="text-sm">Application tracking</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Immigration Support')}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-400 hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Housing & Accommodation */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-green-500 to-teal-400 p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Housing & Accommodation</h3>
            <p className="text-white text-opacity-90 text-sm">
              Find and secure the perfect home in your new location
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Property search assistance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Neighborhood guides</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm">Lease negotiation support</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Housing & Accommodation')}
              className="w-full bg-gradient-to-r from-green-500 to-teal-400 hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Family Relocation */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-amber-500 to-yellow-400 p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Family Relocation</h3>
            <p className="text-white text-opacity-90 text-sm">
              Specialized services for families moving abroad
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">School search and application</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">Family healthcare setup</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm">Cultural adaptation guidance</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Family Relocation')}
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 transition-opacity"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Moving & Logistics */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow group">
          <div className="h-48 bg-gradient-to-r from-red-500 to-orange-400 p-6 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-white">Moving & Logistics</h3>
            <p className="text-white text-opacity-90 text-sm">
              Coordination of all aspects of your physical move
            </p>
          </div>
          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm">Moving company coordination</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm">Shipping and customs guidance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm">Pet relocation assistance</span>
              </li>
            </ul>
            <Button 
              onClick={() => selectService('Moving & Logistics')}
              className="w-full bg-gradient-to-r from-red-500 to-orange-400 hover:opacity-90 transition-opacity"
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

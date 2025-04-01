import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, UserRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
const ServicesContent = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const selectService = (serviceName: string) => {
    setFormData(prev => ({
      ...prev,
      service: serviceName
    }));
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      document.getElementById('service-form')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Form submitted successfully",
        description: `Thank you for your interest in our ${formData.service || 'services'}. We'll get back to you shortly.`
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: ''
      });
      setShowForm(false);
    }, 1500);
  };
  const services = [{
    id: 1,
    title: "Taxes – Filing & Advisory",
    description: "Filing tax reports and providing tax consultation for returning residents.",
    color: "#2C5AAE"
  }, {
    id: 2,
    title: "Shipping & Logistics",
    description: "Handling international and domestic shipping, including customs and delivery.",
    color: "#33C3F0"
  }, {
    id: 3,
    title: "Property Search – Temporary, Rental & Purchase",
    description: "Finding suitable housing for short-term stays, rentals, or purchases.",
    color: "#2C5AAE"
  }, {
    id: 4,
    title: "Tools for Coping with Change – Expert Psychologist",
    description: "Providing practical tools and guidance from a specialist to manage transitions.",
    color: "#33C3F0"
  }, {
    id: 5,
    title: "Storage Solutions",
    description: "Secure short-term and long-term storage options for personal and household items.",
    color: "#2C5AAE"
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {services.map(service => <Card key={service.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div style={{
              backgroundColor: service.color
            }} className="flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold bg-sky-900">
                  {service.id}
                </div>
                <h3 className="text-xl font-semibold text-[#2C5AAE]">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <Button onClick={() => selectService(service.title)} className="w-full bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 transition-opacity">
                Order Service
              </Button>
            </div>
          </Card>)}
      </div>

      {/* Contact Form - Only shown after clicking a service */}
      {showForm && <div id="service-form" className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] bg-clip-text text-transparent">
              Request Service Information
            </h3>
            <p className="text-gray-600 mb-6">
              {formData.service ? `Tell us more about your needs for ${formData.service}` : 'Select a service above or fill out this form to learn more about our relocation services'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">Your Name</label>
                  <div className="relative">
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Smith" required className="pl-10" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <UserRound className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required className="pl-10" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Mail className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" className="pl-10" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <Phone className="h-5 w-5" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
                <div className="relative">
                  <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your relocation needs..." required className="min-h-[120px] pl-10 pt-3" />
                  <div className="absolute left-3 top-[1.1rem] text-gray-500">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                </div>
              </div>
              
              <div className="pt-2 flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-[#2C5AAE] to-[#40E0D0] hover:opacity-90 transition-opacity">
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default ServicesContent;
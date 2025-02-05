const PopularDestinations = () => {
const destinations = [
  {
    city: "Berlin",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "Discover relocation opportunities"
  },
  {
    city: "Toronto",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    description: "Discover relocation opportunities"
  },
  {
    city: "Sydney",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Discover relocation opportunities"
  }
];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Popular Destinations</h2>
        <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="flex-none w-80 snap-center relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in"
            >
              <img
                src={destination.image}
                alt={destination.city}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{destination.city}</h3>
                  <p className="text-sm opacity-90">{destination.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;

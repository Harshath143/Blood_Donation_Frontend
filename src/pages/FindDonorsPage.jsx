import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useUserStore } from '../store/userStore';
import { useBloodSearch } from '../hooks/useBloodSearch';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DonorCard } from '../components/ui/DonorCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Map, Grid, Search, SlidersHorizontal, MapPin, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// CDN URLs to prevent Vite resolution issues for Leaflet marker assets
const donorIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const centerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper component to center map coordinates dynamically
const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 12);
    }
  }, [coords, map]);
  return null;
};

export const FindDonorsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, donors } = useUserStore();

  // Parse URL query parameter if arriving from a BloodGroupCard link (e.g. ?type=O-)
  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get('type');

  // Filters State
  const [selectedTypes, setSelectedTypes] = useState(typeParam ? [typeParam] : []);
  const [searchQuery, setSearchQuery] = useState('Chennai');
  const [radiusKm, setRadiusKm] = useState(15);
  const [availability, setAvailability] = useState('All');
  const [lastDonated, setLastDonated] = useState("Doesn't matter");
  
  // Mobile toggle between map and grid list view
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid' | 'map'
  const [isMobile, setIsMobile] = useState(false);

  // Default coordinate center (Chennai)
  const defaultCoords = { lat: 13.0827, lng: 80.2707 };

  // Detect responsive screen changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('grid'); // Default mobile view is List Grid
      } else {
        setViewMode('split'); // Desktop splits map and list
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter blood donors using custom hook
  const filteredDonors = useBloodSearch({
    items: donors,
    searchQuery,
    selectedTypes,
    userCoords: defaultCoords,
    radiusKm,
    filters: {
      availability,
      lastDonated
    }
  });

  const toggleBloodType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleContactDonor = () => {
    toast.error("Please login to contact donors securely.", {
      duration: 3000,
      position: 'top-right'
    });
    navigate('/login?redirect=find-donors');
  };

  const handleAutoExpand = () => {
    setRadiusKm(50);
    toast.success("Radius expanded to 50 km.");
  };

  const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  return (
    <PageWrapper>
      {/* 1. Page Header */}
      <section className="bg-brand-charcoal text-white py-8 md:py-10 border-b border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Find Matching Donors</h1>
            <p className="text-xs text-stone-400 mt-1">Locate verified blood donors within a sliding distance radius.</p>
          </div>
          {isMobile && (
            <div className="inline-flex p-1 bg-stone-800 rounded-full border border-stone-700">
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none flex items-center gap-1.5 ${
                  viewMode === 'grid' ? 'bg-brand-primary text-white' : 'text-stone-400'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> List View
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none flex items-center gap-1.5 ${
                  viewMode === 'map' ? 'bg-brand-primary text-white' : 'text-stone-400'
                }`}
              >
                <Map className="w-3.5 h-3.5" /> Map View
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 2. Filter Section */}
      <section className="bg-white border-b border-stone-200 py-6 sticky top-[68px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Blood Type Selector */}
          <div className="lg:col-span-4 text-left">
            <span className="text-xs font-bold text-brand-charcoal block mb-2">Blood Types Needed</span>
            <div className="flex flex-wrap gap-1.5">
              {BLOOD_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => toggleBloodType(type)}
                  className={`w-10 h-9 font-mono font-bold text-xs border rounded transition-all focus:outline-none ${
                    selectedTypes.includes(type)
                      ? 'bg-brand-primary border-brand-primary text-white shadow-sm scale-105'
                      : 'bg-stone-50 border-stone-200 text-brand-charcoal hover:bg-stone-100'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Location & Radius Slider */}
          <div className="lg:col-span-4 text-left space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-brand-charcoal">Location Radius</span>
              <span className="font-mono font-bold text-brand-primary">{radiusKm} km</span>
            </div>
            
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="City, State"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-stone-300 rounded-input text-xs outline-none bg-stone-50 focus:bg-white focus:ring-2 focus:ring-brand-warm transition-all text-brand-charcoal font-semibold"
                />
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="w-24 accent-brand-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Availability & Last Donated Selectors */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 text-left">
            <div>
              <label htmlFor="availability" className="text-xs font-bold text-brand-charcoal block mb-1.5">Availability</label>
              <select
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full border border-stone-300 rounded-input px-3 py-2 text-xs bg-stone-50 focus:bg-white text-brand-charcoal font-semibold outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Available Now">Available Now</option>
                <option value="Emergency Only">Emergency Only</option>
              </select>
            </div>

            <div>
              <label htmlFor="lastDonated" className="text-xs font-bold text-brand-charcoal block mb-1.5">Last Donated</label>
              <select
                id="lastDonated"
                value={lastDonated}
                onChange={(e) => setLastDonated(e.target.value)}
                className="w-full border border-stone-300 rounded-input px-3 py-2 text-xs bg-stone-50 focus:bg-white text-brand-charcoal font-semibold outline-none"
              >
                <option value="Doesn't matter">Doesn't Matter</option>
                <option value="2+ months ago">2+ Months Ago</option>
                <option value="3+ months ago">3+ Months Ago</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Split View Layout */}
      <section className="bg-stone-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Map Column (shows on desktop split/map, hidden on mobile list) */}
          {(!isMobile || viewMode === 'map') && (
            <div className={`lg:col-span-6 h-[500px] sticky top-[200px] rounded-card overflow-hidden shadow-elevation border border-stone-200 z-10 ${
              viewMode === 'grid' ? 'hidden' : 'block'
            }`}>
              <MapContainer 
                center={[defaultCoords.lat, defaultCoords.lng]} 
                zoom={12} 
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Search center pin */}
                <Marker position={[defaultCoords.lat, defaultCoords.lng]} icon={centerIcon}>
                  <Popup>
                    <div className="font-sans text-xs">
                      <strong className="text-brand-charcoal block">Chennai Search Center</strong>
                      <span className="text-stone-400">Radius calculations begin here.</span>
                    </div>
                  </Popup>
                </Marker>

                {/* Donors pins */}
                {filteredDonors.map(donor => (
                  <Marker 
                    key={donor.id} 
                    position={[donor.lat, donor.lng]} 
                    icon={donorIcon}
                  >
                    <Popup>
                      <div className="font-sans text-xs space-y-1.5 p-1 max-w-[200px]">
                        <div className="flex justify-between items-center border-b pb-1">
                          <strong className="text-brand-charcoal font-bold">{donor.fullName}</strong>
                          <span className="font-mono font-extrabold text-brand-primary text-xs ml-2 bg-red-50 px-1 border border-red-100 rounded">{donor.bloodType}</span>
                        </div>
                        <p className="text-stone-400 flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-primary" /> {donor.city}</p>
                        <p className="text-[10px] text-stone-400">Availability: <span className="font-semibold text-brand-charcoal">{donor.availability}</span></p>
                        
                        {user ? (
                          <div className="pt-1.5 border-t border-dashed mt-1 space-y-1 font-mono text-[10px] text-brand-charcoal">
                            <p>📞 {donor.phone}</p>
                            <p>✉️ {donor.email}</p>
                          </div>
                        ) : (
                          <button 
                            onClick={handleContactDonor}
                            className="w-full text-center text-[10px] font-bold text-white bg-brand-primary hover:bg-brand-warm py-1.5 rounded-input mt-1.5"
                          >
                            Login to Contact
                          </button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
                
                {/* Custom Map View Updater */}
                <ChangeMapView coords={defaultCoords} />
              </MapContainer>
            </div>
          )}

          {/* Donor Grid Column */}
          {(!isMobile || viewMode === 'grid') && (
            <div className={`lg:col-span-6 space-y-6 ${
              viewMode === 'map' ? 'hidden' : 'block'
            }`}>
              <div className="flex justify-between items-center text-xs font-semibold px-1">
                <span className="text-brand-grey">
                  Showing {filteredDonors.length} Matching Donors
                </span>
              </div>

              {filteredDonors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredDonors.map(donor => (
                    <DonorCard 
                      key={donor.id}
                      fullName={donor.fullName}
                      bloodType={donor.bloodType}
                      city={donor.city}
                      distance={donor.distance}
                      lastDonatedDate={donor.lastDonatedDate}
                      availability={donor.availability}
                      phone={donor.phone}
                      email={donor.email}
                      initials={donor.initials}
                      isLoggedIn={!!user}
                      onContactClick={handleContactDonor}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-card border border-stone-200 p-10 text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-brand-primary mx-auto">
                    <AlertCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="max-w-xs mx-auto space-y-2">
                    <h4 className="text-base font-bold text-brand-charcoal">No Donors Found</h4>
                    <p className="text-xs text-brand-grey leading-relaxed">
                      We couldn't locate donors in {searchQuery} matching those filters within {radiusKm} km.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                    <Button variant="secondary" size="sm" onClick={() => {
                      setSearchQuery('Chennai');
                      setSelectedTypes([]);
                      setRadiusKm(15);
                      setAvailability('All');
                      setLastDonated("Doesn't matter");
                    }}>
                      Reset Filters
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleAutoExpand}>
                      Expand Search to 50km
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </PageWrapper>
  );
};

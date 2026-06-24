import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { PageWrapper } from '../components/layout/PageWrapper';
import { mockBloodBanks } from '../data/mockDonors';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Map, Grid, Search, Compass, MapPin, Phone, MessageSquare, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

// CDN Icons
const bankIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 12);
    }
  }, [coords, map]);
  return null;
};

export const BloodBanksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'grid' | 'map'
  const [isMobile, setIsMobile] = useState(false);

  const defaultCoords = { lat: 13.0601, lng: 80.2520 };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setViewMode('grid');
      } else {
        setViewMode('split');
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter blood banks
  const filteredBanks = mockBloodBanks.filter(bank => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      bank.name.toLowerCase().includes(query) || 
      bank.address.toLowerCase().includes(query) ||
      bank.city.toLowerCase().includes(query)
    );
  });

  const getDirections = (lat, lng) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const handleWhatsApp = (whatsappNum, bankName) => {
    const msg = `Hello, I'm checking blood stock availability at ${bankName} via LifeDrop.`;
    window.open(`https://wa.me/${whatsappNum.replace(/\s+/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  return (
    <PageWrapper>
      {/* Page Header */}
      <section className="bg-brand-charcoal text-white py-8 md:py-10 border-b border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Blood Banks Directory</h1>
            <p className="text-xs text-stone-400 mt-1">Search hospitals and blood banks holding verified emergency stock.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Hospital name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-stone-700 rounded-input text-xs outline-none bg-stone-800 text-white font-semibold focus:ring-2 focus:ring-brand-warm focus:border-brand-warm"
              />
            </div>
            
            {isMobile && (
              <div className="inline-flex p-1 bg-stone-800 rounded-full border border-stone-700 shrink-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none ${
                    viewMode === 'grid' ? 'bg-brand-primary text-white' : 'text-stone-400'
                  }`}
                >
                  List
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none ${
                    viewMode === 'map' ? 'bg-brand-primary text-white' : 'text-stone-400'
                  }`}
                >
                  Map
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main split view */}
      <section className="bg-stone-50 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Map Column */}
          {(!isMobile || viewMode === 'map') && (
            <div className={`lg:col-span-6 h-[520px] sticky top-[150px] rounded-card overflow-hidden shadow-elevation border border-stone-200 z-10 ${
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

                {filteredBanks.map(bank => (
                  <Marker 
                    key={bank.id} 
                    position={[bank.lat, bank.lng]} 
                    icon={bankIcon}
                  >
                    <Popup>
                      <div className="font-sans text-xs space-y-1.5 p-1 max-w-[220px]">
                        <div className="border-b pb-1">
                          <strong className="text-brand-charcoal font-bold block leading-tight">{bank.name}</strong>
                          <span className="text-[10px] text-brand-primary font-bold mt-0.5 block">{bank.hours}</span>
                        </div>
                        <p className="text-stone-400 leading-tight">{bank.address}</p>
                        <div className="pt-2 flex gap-1.5">
                          <button
                            onClick={() => getDirections(bank.lat, bank.lng)}
                            className="flex-1 bg-brand-primary hover:bg-brand-warm text-white font-bold py-1 rounded text-[10px] text-center"
                          >
                            Directions
                          </button>
                          <a
                            href={`tel:${bank.phone}`}
                            className="flex-1 bg-brand-charcoal text-white font-bold py-1 rounded text-[10px] text-center flex items-center justify-center gap-0.5"
                          >
                            <Phone className="w-2.5 h-2.5" /> Call
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                <ChangeMapView coords={defaultCoords} />
              </MapContainer>
            </div>
          )}

          {/* List Column */}
          {(!isMobile || viewMode === 'grid') && (
            <div className={`lg:col-span-6 space-y-4 ${
              viewMode === 'map' ? 'hidden' : 'block'
            }`}>
              <div className="text-xs font-semibold px-1 text-brand-grey text-left">
                Found {filteredBanks.length} Blood Banks & Hospitals
              </div>

              {filteredBanks.map(bank => (
                <div 
                  key={bank.id}
                  className="bg-white p-6 rounded-card border border-stone-200 shadow-sm transition-all duration-300 hover:shadow-elevation flex flex-col justify-between text-left space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 text-brand-primary border border-red-100 flex items-center justify-center shrink-0">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-charcoal text-base leading-snug">{bank.name}</h3>
                        <p className="text-xs text-brand-grey flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-brand-primary" /> {bank.address}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <Badge variant={bank.isOpenNow ? 'success' : 'grey'} className="text-[10px] uppercase font-bold tracking-wider">
                        {bank.isOpenNow ? 'Open Now' : 'Closed'}
                      </Badge>
                      <span className="text-[10px] text-stone-400 font-mono flex items-center gap-0.5"><Clock className="w-3 h-3" /> {bank.hours}</span>
                    </div>
                  </div>

                  {/* Stock Badges */}
                  <div>
                    <span className="text-[11px] font-bold text-brand-charcoal block mb-2 uppercase tracking-wide">Available Blood Stock</span>
                    <div className="flex flex-wrap gap-1.5">
                      {BLOOD_TYPES.map(type => {
                        const stock = bank.stocks[type];
                        const hasStock = stock && stock.available && stock.units > 0;
                        return (
                          <span 
                            key={type}
                            className={`font-mono text-xs px-2.5 py-1 rounded border font-semibold flex flex-col items-center min-w-[42px] ${
                              hasStock 
                                ? 'bg-red-50/50 border-brand-warm/30 text-brand-primary' 
                                : 'bg-stone-50 border-stone-150 text-stone-300'
                            }`}
                          >
                            <span>{type}</span>
                            <span className="text-[9px] font-mono opacity-85 mt-0.5">{hasStock ? `${stock.units}u` : '0u'}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-stone-100">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleWhatsApp(bank.whatsapp, bank.name)}
                      className="text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp
                    </Button>
                    <a href={`tel:${bank.phone}`} className="flex-1">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-4 h-4" /> Call Hospital
                      </Button>
                    </a>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => getDirections(bank.lat, bank.lng)}
                      className="text-xs font-bold"
                    >
                      Get Directions
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </PageWrapper>
  );
};

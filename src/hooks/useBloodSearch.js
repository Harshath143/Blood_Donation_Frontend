import { useMemo } from 'react';

// Haversine formula to compute distance between two coordinates in km
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useBloodSearch = ({
  items = [],
  searchQuery = '',
  selectedTypes = [],
  userCoords = null,
  radiusKm = 100,
  filters = {}
}) => {
  return useMemo(() => {
    return items
      .map(item => {
        const distance = userCoords
          ? calculateDistance(userCoords.lat, userCoords.lng, item.lat, item.lng)
          : (item.distance || 0);
        return { ...item, distance };
      })
      .filter(item => {
        // 1. Filter by Blood Type
        if (selectedTypes.length > 0 && !selectedTypes.includes(item.bloodType)) {
          // If the item is a blood bank, check if it has stock of any selected blood type
          if (item.stocks) {
            const hasStock = selectedTypes.some(type => item.stocks[type]?.available && item.stocks[type]?.units > 0);
            if (!hasStock) return false;
          } else {
            return false;
          }
        }

        // 2. Filter by Location Search query (Name, City or State)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesName = item.fullName?.toLowerCase().includes(query) || item.name?.toLowerCase().includes(query);
          const matchesCity = item.city?.toLowerCase().includes(query);
          const matchesState = item.state?.toLowerCase().includes(query);
          const matchesPin = item.pinCode?.includes(query) || item.address?.toLowerCase().includes(query);
          if (!matchesName && !matchesCity && !matchesState && !matchesPin) {
            return false;
          }
        }

        // 3. Filter by Radius
        if (userCoords && radiusKm < 100) {
          if (item.distance > radiusKm) {
            return false;
          }
        }

        // 4. Filter by Availability
        if (filters.availability && filters.availability !== 'All') {
          if (filters.availability === 'Available Now' && item.availability !== 'Available Now') {
            return false;
          }
          if (filters.availability === 'Emergency Only' && item.availability !== 'Emergency Only' && item.availability !== 'Available Now') {
            // Available Now is also eligible for emergency
            return false;
          }
        }

        // 5. Filter by Last Donated date
        if (filters.lastDonated) {
          if (item.lastDonatedDate === 'Never') {
            // Never donated is always available
          } else if (filters.lastDonated === '2+ months ago') {
            // Check if last donation was more than 56 days ago
            const days = Math.floor((new Date() - new Date(item.lastDonatedDate)) / (1000 * 60 * 60 * 24));
            if (days < 56) return false;
          } else if (filters.lastDonated === '3+ months ago') {
            // Check if last donation was more than 90 days ago
            const days = Math.floor((new Date() - new Date(item.lastDonatedDate)) / (1000 * 60 * 60 * 24));
            if (days < 90) return false;
          }
        }

        return true;
      });
  }, [items, searchQuery, selectedTypes, userCoords, radiusKm, filters]);
};

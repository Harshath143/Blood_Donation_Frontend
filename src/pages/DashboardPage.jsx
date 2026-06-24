import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useRequestStore } from '../store/requestStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { User, Calendar, Award, Bell, Settings, FileText, Plus, Heart, MapPin, CheckCircle2, Lock } from 'lucide-react';
import { differenceInDays, addDays, format, parseISO } from 'date-fns';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/formatters';

export const DashboardPage = () => {
  const { user, addDonation, markNotificationsAsRead } = useUserStore();
  const requests = useRequestStore(state => state.requests);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'history' | 'requests' | 'badges' | 'settings'

  // Modal State for adding a donation
  const [showAddDonation, setShowAddDonation] = useState(false);
  const [donationLocation, setDonationLocation] = useState('');

  if (!user) {
    return (
      <PageWrapper>
        <div className="py-20 text-center space-y-4">
          <div className="w-12 h-12 bg-red-50 text-brand-primary rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-brand-charcoal">Access Denied</h2>
          <p className="text-xs text-brand-grey">Please login to view your personal dashboard.</p>
        </div>
      </PageWrapper>
    );
  }

  // Calculate Next Eligibility Date
  const getLastDonationDate = () => {
    if (!user.donations || user.donations.length === 0) return null;
    return user.donations[0].date;
  };

  const getEligibilityInfo = () => {
    const lastDateStr = getLastDonationDate();
    if (!lastDateStr) {
      return { eligible: true, date: null, daysLeft: 0 };
    }
    const lastDate = parseISO(lastDateStr);
    const daysSince = differenceInDays(new Date(), lastDate);
    const eligibleDate = addDays(lastDate, 56);
    
    if (daysSince < 56) {
      return {
        eligible: false,
        date: format(eligibleDate, 'yyyy-MM-dd'),
        daysLeft: 56 - daysSince
      };
    }
    return { eligible: true, date: null, daysLeft: 0 };
  };

  const eligibility = getEligibilityInfo();

  // Find requests matching user's blood type (O+ in demo)
  const matchingRequests = requests.filter(req => req.bloodType === user.bloodType && req.status === 'Searching');

  const handleRecordDonation = (e) => {
    e.preventDefault();
    if (!donationLocation.trim()) {
      toast.error("Please enter donation center location.");
      return;
    }
    
    // Add donation updates counts and triggers achievements in userStore
    addDonation(donationLocation);
    setShowAddDonation(false);
    setDonationLocation('');
    toast.success("Donation recorded successfully! Check your stats.");
  };

  const handleDownloadCertificate = (id) => {
    toast.success(`Donation certificate downloaded for record #${id}`);
  };

  // Sidebar link styles
  const sidebarItem = (id, label, icon) => {
    const active = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          if (id === 'home') markNotificationsAsRead();
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-input transition-all outline-none border-l-0 ${
          active 
            ? 'bg-red-50 text-brand-primary border-l-4 border-brand-primary' 
            : 'text-brand-grey hover:bg-stone-50 hover:text-brand-charcoal'
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <PageWrapper>
      <section className="bg-brand-bg py-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
          <div>
            <h1 className="font-display text-3xl font-bold">Donor Dashboard</h1>
            <p className="text-xs text-brand-grey mt-1">Manage your profiles, track donation achievements, and review matched requests.</p>
          </div>
          
          <Button 
            variant="primary" 
            size="sm" 
            className="font-bold flex items-center gap-1"
            onClick={() => setShowAddDonation(true)}
          >
            <Plus className="w-4 h-4" /> Record a Donation
          </Button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Left Column */}
          <div className="lg:col-span-3 bg-white p-4 rounded-card border border-stone-200 shadow-sm space-y-2 text-left">
            <span className="text-[10px] font-bold text-stone-400 block mb-2 px-4 uppercase tracking-wider">Navigation</span>
            {sidebarItem('home', 'Dashboard Home', <User className="w-4 h-4" />)}
            {sidebarItem('history', 'Donation History', <Calendar className="w-4 h-4" />)}
            {sidebarItem('requests', 'Matched Requests', <Bell className="w-4 h-4" />)}
            {sidebarItem('badges', 'My Achievements', <Award className="w-4 h-4" />)}
            {sidebarItem('settings', 'Profile Settings', <Settings className="w-4 h-4" />)}
          </div>

          {/* Main Dashboard Panel Right */}
          <div className="lg:col-span-9 space-y-8 text-left">

            {activeTab === 'home' && (
              <div className="space-y-6">
                
                {/* Stats Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Lives Saved */}
                  <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 text-brand-primary rounded-full flex items-center justify-center shrink-0 border border-red-100">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-grey font-semibold">Lives Saved</p>
                      <h3 className="text-3xl font-mono font-bold text-brand-charcoal mt-1">
                        {user.donationCount * 3}
                      </h3>
                      <p className="text-[10px] text-stone-400 mt-1">Based on {user.donationCount} donations</p>
                    </div>
                  </div>

                  {/* Card 2: Next Eligibility */}
                  <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 text-brand-primary rounded-full flex items-center justify-center shrink-0 border border-red-100">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-grey font-semibold">Eligibility</p>
                      {eligibility.eligible ? (
                        <div className="mt-1">
                          <Badge variant="success" size="sm" className="font-bold">ELIGIBLE TODAY</Badge>
                          <p className="text-[10px] text-brand-green font-medium mt-1">Ready to donate whole blood</p>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <h3 className="text-lg font-bold text-brand-charcoal font-mono leading-tight">{eligibility.daysLeft} Days</h3>
                          <p className="text-[10px] text-brand-amber font-semibold mt-0.5">Deferral until {formatDate(eligibility.date)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card 3: Blood Group Profile */}
                  <div className="bg-brand-charcoal text-white p-6 rounded-card shadow-md flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                      <User className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-stone-400 font-semibold">My Blood Type</p>
                        <Badge variant="danger" className="text-[10px] font-mono font-bold">{user.bloodType}</Badge>
                      </div>
                      <h4 className="text-sm font-bold mt-2">{user.fullName}</h4>
                      <p className="text-[10px] text-stone-400">Regular Volunteer • {user.city}</p>
                    </div>
                  </div>
                </div>

                {/* Notifications & Matches split grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Matching Requests Near Me */}
                  <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider pb-2 border-b">
                      Critical Matches in {user.city}
                    </h3>
                    
                    <div className="space-y-3">
                      {matchingRequests.length > 0 ? (
                        matchingRequests.slice(0, 2).map(req => (
                          <div key={req.id} className="p-3 bg-red-50/40 border border-brand-primary/10 rounded-input flex justify-between items-center text-xs">
                            <div>
                              <strong className="text-brand-charcoal font-semibold">{req.hospitalName}</strong>
                              <p className="text-stone-400 mt-0.5">Patient: {req.patientName} • {req.unitsRequired} units needed</p>
                            </div>
                            <Badge variant="danger" className="font-mono">{req.bloodType}</Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-brand-grey py-4 text-center">No pending matching requests at this time.</p>
                      )}
                    </div>
                  </div>

                  {/* Notification Center */}
                  <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider pb-2 border-b">
                      Notification Center
                    </h3>
                    
                    <div className="space-y-3">
                      {user.notifications.slice(0, 3).map(notif => (
                        <div 
                          key={notif.id} 
                          className={`p-3 rounded-input text-xs border ${
                            notif.read ? 'bg-stone-50 border-stone-150 text-brand-grey' : 'bg-red-50/20 border-brand-primary/10 text-brand-charcoal'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <strong className="font-semibold">{notif.title}</strong>
                            <span className="text-[9px] text-stone-400">{notif.date}</span>
                          </div>
                          <p className="text-[11px] text-brand-grey mt-1 leading-relaxed">{notif.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-charcoal">My Donation Timeline</h3>
                  <p className="text-xs text-brand-grey">A record of your life-saving contributions</p>
                </div>

                {user.donations && user.donations.length > 0 ? (
                  <div className="space-y-6 relative border-l border-stone-200 pl-6 mt-4">
                    {user.donations.map((don, idx) => (
                      <div key={don.id} className="relative group">
                        {/* Timeline Node */}
                        <div className="absolute left-[-30px] top-1.5 w-4 h-4 rounded-full bg-brand-primary border-4 border-white shadow-sm" />
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-stone-50 p-4 border border-stone-150 rounded-input hover:bg-stone-100/50 transition-colors">
                          <div>
                            <span className="text-[10px] font-bold text-brand-primary font-mono block">{formatDate(don.date)}</span>
                            <strong className="text-sm font-bold text-brand-charcoal mt-1 block">{don.location}</strong>
                            <p className="text-xs text-brand-grey">Donated: {don.units} Unit(s) Whole Blood</p>
                          </div>
                          <Button 
                            variant="outlineRed" 
                            size="sm" 
                            className="text-xs py-1.5 px-4 font-semibold flex items-center gap-1.5 bg-white shrink-0"
                            onClick={() => handleDownloadCertificate(don.id)}
                          >
                            <FileText className="w-3.5 h-3.5" /> Certificate
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-brand-grey py-8 text-center">No donations recorded yet. Start by scheduling your first donation!</p>
                )}
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-display">Matched Requests</h3>
                  <p className="text-xs text-brand-grey">Emergency alerts matching your blood group ({user.bloodType}) in {user.city}</p>
                </div>

                <div className="space-y-4">
                  {matchingRequests.length > 0 ? (
                    matchingRequests.map(req => (
                      <div key={req.id} className="p-4 bg-stone-50 border border-stone-200 rounded-input flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="danger" className="font-mono">{req.id}</Badge>
                            <Badge variant="amber" className="text-[9px] font-bold">{req.urgencyLevel}</Badge>
                          </div>
                          <h4 className="font-bold text-brand-charcoal text-sm mt-1">{req.hospitalName}</h4>
                          <p className="text-brand-grey">Patient: {req.patientName} • Units: {req.unitsRequired} • Needed By: {req.requiredDate}</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto shrink-0">
                          <a href={`tel:${req.phone}`} className="flex-1 sm:flex-none">
                            <Button variant="outlineRed" size="sm" className="w-full text-xs font-bold bg-white">
                              Accept Match
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-brand-grey py-8 text-center">No pending matching requests at this time.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-display">Achievements & Badges</h3>
                  <p className="text-xs text-brand-grey">Milestone recognitions for community blood contributions</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {user.achievements.map((badge, idx) => (
                    <div 
                      key={badge.id}
                      className={`p-5 rounded-card border transition-all ${
                        badge.unlocked 
                          ? 'bg-amber-50/30 border-amber-300 shadow-sm' 
                          : 'bg-stone-50/50 border-stone-200 opacity-60'
                      } flex items-start gap-4`}
                    >
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border shadow-inner ${
                        badge.unlocked
                          ? 'bg-amber-100 border-amber-300 text-brand-amber text-lg animate-pulse'
                          : 'bg-stone-200 border-stone-300 text-stone-400'
                      }`}>
                        {badge.unlocked ? <Award className="w-7 h-7 stroke-[2.5]" /> : <Lock className="w-6 h-6" />}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-brand-charcoal">{badge.title}</h4>
                          {badge.unlocked && <Badge variant="success" size="sm">UNLOCKED</Badge>}
                        </div>
                        <p className="text-xs text-brand-grey leading-relaxed">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-charcoal font-display">Profile Settings</h3>
                  <p className="text-xs text-brand-grey">Update contact coordinates and availability status</p>
                </div>

                <div className="max-w-md space-y-4 text-xs font-semibold text-brand-charcoal">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block mb-1 text-stone-400">Full Name</span>
                      <p className="bg-stone-50 border p-2.5 rounded text-brand-charcoal font-semibold">{user.fullName}</p>
                    </div>
                    <div>
                      <span className="block mb-1 text-stone-400">Email Address</span>
                      <p className="bg-stone-50 border p-2.5 rounded text-brand-charcoal font-semibold">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <span className="block mb-1 text-stone-400">Blood Type</span>
                    <p className="bg-stone-50 border p-2.5 rounded text-brand-primary font-bold font-mono">{user.bloodType}</p>
                  </div>
                  <div>
                    <span className="block mb-1 text-stone-400">Registered City</span>
                    <p className="bg-stone-50 border p-2.5 rounded text-brand-charcoal font-semibold">{user.city}</p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex justify-end">
                    <Button variant="secondary" size="sm" onClick={() => toast.success("Feature on roadmap!")}>
                      Edit Profile details
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Record Donation Modal Dialog */}
      {showAddDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-card shadow-elevation overflow-hidden w-full max-w-md p-6 relative border border-stone-200 text-left"
          >
            <h3 className="text-lg font-bold text-brand-charcoal border-b pb-2 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-brand-green" /> Record a Donation
            </h3>
            
            <form onSubmit={handleRecordDonation} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-charcoal" htmlFor="donationLocation">Donation Center / Hospital Location</label>
                <input 
                  type="text" 
                  id="donationLocation"
                  className="border border-stone-300 rounded-input px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-warm text-brand-charcoal font-semibold"
                  placeholder="e.g. Apollo Blood Bank, Chennai"
                  value={donationLocation}
                  onChange={(e) => setDonationLocation(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 text-xs">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => setShowAddDonation(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  variant="primary" 
                  size="sm"
                  className="font-bold"
                >
                  Save Record
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </PageWrapper>
  );
};

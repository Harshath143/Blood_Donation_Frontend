import React, { useState, useEffect } from 'react';
import { useRequestStore } from '../store/requestStore';
import { PageWrapper } from '../components/layout/PageWrapper';
import { BloodRequestForm } from '../components/forms/BloodRequestForm';
import { Phone, Share2, Compass, AlertCircle, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const RequestBloodPage = () => {
  const [submittedId, setSubmittedId] = useState(null);
  const submitRequest = useRequestStore(state => state.submitRequest);
  const requests = useRequestStore(state => state.requests);
  
  // Find current active request if submitted
  const activeRequest = requests.find(r => r.id === submittedId);

  const handleFormSubmit = (formData) => {
    const id = submitRequest(formData);
    setSubmittedId(id);
    toast.success("Emergency blood request submitted!");
  };

  const getEstimatedMatchTime = (urgency) => {
    switch (urgency) {
      case 'CRITICAL': return 'Under 15 minutes';
      case 'URGENT': return 'Under 2 hours';
      default: return 'Under 12 hours';
    }
  };

  const handleShare = () => {
    if (!activeRequest) return;
    const msg = `🩸 EMERGENCY BLOOD REQUEST: Patients needs ${activeRequest.bloodType} blood at ${activeRequest.hospitalName}, ${activeRequest.city}. Units needed: ${activeRequest.unitsRequired}. Required by: ${activeRequest.requiredDate}. Contact: ${activeRequest.contactName} (${activeRequest.phone}). Request ID: ${activeRequest.id}. Share and save a life!`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(shareUrl, '_blank');
  };

  // Mock stock levels for Chennai
  const mockStocks = [
    { type: 'O-', level: 20, isLow: true },
    { type: 'O+', level: 85, isLow: false },
    { type: 'A-', level: 40, isLow: false },
    { type: 'A+', level: 75, isLow: false },
    { type: 'B-', level: 15, isLow: true },
    { type: 'B+', level: 60, isLow: false },
    { type: 'AB-', level: 10, isLow: true },
    { type: 'AB+', level: 90, isLow: false }
  ];

  return (
    <PageWrapper>
      <section className="bg-brand-charcoal text-white py-12 md:py-16 text-center border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white">Request Emergency Blood</h1>
          <p className="text-sm md:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
            Fill out patient details and hospital address to alert nearby registered donors instantly.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!submittedId ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Left */}
            <div className="lg:col-span-8">
              <BloodRequestForm onSubmitSuccess={handleFormSubmit} />
            </div>

            {/* Side Panel Info Right */}
            <div className="lg:col-span-4 space-y-6">
              {/* Emergency Hotline */}
              <div className="bg-brand-primary text-white p-6 rounded-card border border-brand-warm/30 shadow-md relative overflow-hidden group">
                <div className="absolute right-[-20px] bottom-[-20px] text-white/5 pointer-events-none transform group-hover:scale-110 transition-transform duration-500">
                  <Phone className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-lg font-bold">Can't Wait for Match?</h3>
                  <p className="text-xs text-red-150 leading-relaxed">
                    If the patient's case is critical and needs immediate blood stock transport, please dial our emergency coordinators directly.
                  </p>
                  <div className="pt-2">
                    <p className="text-xs text-red-200">Emergency Dispatch Hotline</p>
                    <a href="tel:108" className="text-2xl font-mono font-bold tracking-wider hover:underline block mt-0.5">
                      108
                    </a>
                  </div>
                </div>
              </div>

              {/* Blood stock meters */}
              <div className="bg-white p-6 rounded-card border border-stone-200 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-brand-charcoal">Chennai Blood Stock Levels</h3>
                  <p className="text-[10px] text-brand-grey">Estimated across partner hospitals</p>
                </div>

                <div className="space-y-3.5">
                  {mockStocks.map(stock => (
                    <div key={stock.type} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-brand-charcoal">{stock.type}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-brand-charcoal">{stock.level}%</span>
                          {stock.isLow && (
                            <Badge variant="amber" size="sm">LOW</Badge>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-200/50">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            stock.isLow ? 'bg-brand-primary' : 'bg-brand-green'
                          }`}
                          style={{ width: `${stock.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Request Submitted / Live Status Tracker Screen */
          activeRequest && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-card border border-stone-200 shadow-elevation p-6 md:p-10 max-w-3xl mx-auto space-y-8"
            >
              <div className="text-center space-y-3 border-b border-stone-100 pb-6">
                <div className="w-16 h-16 bg-red-50 border border-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto">
                  <Send className="w-8 h-8 animate-pulse" />
                </div>
                <h2 className="text-3xl font-display font-bold text-brand-charcoal">Request Broadcast Active</h2>
                <div className="flex justify-center items-center gap-2">
                  <span className="text-xs text-brand-grey font-semibold">Request ID:</span>
                  <span className="font-mono font-bold text-brand-primary text-sm px-2.5 py-0.5 bg-red-50 border border-red-100 rounded">{activeRequest.id}</span>
                </div>
              </div>

              {/* Status Tracker */}
              <div className="py-4">
                <h3 className="text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-6 text-center">Live Status Tracker</h3>
                <div className="grid grid-cols-4 gap-2 relative">
                  {/* Progress Line */}
                  <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-[3px] bg-stone-100 z-0">
                    <div 
                      className="bg-brand-green h-full transition-all duration-1000"
                      style={{ 
                        width: 
                          activeRequest.status === 'Searching' ? '0%' : 
                          activeRequest.status === 'Matched' ? '33.3%' : 
                          activeRequest.status === 'Confirmed' ? '66.6%' : '100%' 
                      }}
                    />
                  </div>

                  {/* Step 1: Searching */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      ['Searching', 'Matched', 'Confirmed', 'Donated'].includes(activeRequest.status)
                        ? 'bg-brand-green border-brand-green text-white shadow-sm'
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}>
                      {activeRequest.status === 'Searching' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-brand-charcoal mt-2.5">Searching</span>
                    <span className="text-[9px] text-stone-400 mt-0.5">Broadcasting details</span>
                  </div>

                  {/* Step 2: Matched */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      ['Matched', 'Confirmed', 'Donated'].includes(activeRequest.status)
                        ? 'bg-brand-green border-brand-green text-white shadow-sm'
                        : activeRequest.status === 'Searching'
                        ? 'bg-white border-brand-primary text-brand-primary animate-pulse'
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}>
                      {activeRequest.status === 'Searching' ? (
                        <Compass className="w-4.5 h-4.5" />
                      ) : activeRequest.status === 'Matched' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-brand-charcoal mt-2.5">Matched</span>
                    <span className="text-[9px] text-stone-400 mt-0.5">Donors notified</span>
                  </div>

                  {/* Step 3: Confirmed */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      ['Confirmed', 'Donated'].includes(activeRequest.status)
                        ? 'bg-brand-green border-brand-green text-white shadow-sm'
                        : activeRequest.status === 'Matched'
                        ? 'bg-white border-brand-primary text-brand-primary animate-pulse'
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}>
                      {activeRequest.status === 'Confirmed' ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-brand-charcoal mt-2.5">Confirmed</span>
                    <span className="text-[9px] text-stone-400 mt-0.5">Donor in transit</span>
                  </div>

                  {/* Step 4: Donated */}
                  <div className="flex flex-col items-center text-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      activeRequest.status === 'Donated'
                        ? 'bg-brand-green border-brand-green text-white shadow-sm'
                        : activeRequest.status === 'Confirmed'
                        ? 'bg-white border-brand-primary text-brand-primary animate-pulse'
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-charcoal mt-2.5">Donated</span>
                    <span className="text-[9px] text-stone-400 mt-0.5">Units received</span>
                  </div>
                </div>
              </div>

              {/* Patient Brief Details */}
              <div className="border-y border-stone-100 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block font-semibold">Patient:</span>
                  <span className="text-brand-charcoal font-bold">{activeRequest.patientName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-semibold">Blood Group:</span>
                  <span className="text-brand-primary font-bold font-mono text-sm">{activeRequest.bloodType}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-semibold">Required By:</span>
                  <span className="text-brand-charcoal font-bold">{activeRequest.requiredDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-semibold">Hospital:</span>
                  <span className="text-brand-charcoal font-bold truncate block" title={activeRequest.hospitalName}>{activeRequest.hospitalName}</span>
                </div>
              </div>

              {/* Quick Matches notification info */}
              <div className="bg-red-50/50 border border-brand-primary/10 p-5 rounded-card flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <div className="text-xs text-brand-grey space-y-1">
                  <span className="font-bold text-brand-charcoal block">Searching Chennai Database...</span>
                  <p>Estimated Match Time: <span className="font-semibold text-brand-primary">{getEstimatedMatchTime(activeRequest.urgencyLevel)}</span></p>
                  <p>Our matching engine automatically sends targeted app notifications and WhatsApp coordinates to matching registered donors who live near {activeRequest.city}. Keep your phone close to receive coordinates confirmation.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                <Button 
                  variant="outlineRed"
                  onClick={() => setSubmittedId(null)}
                  className="w-full sm:w-auto font-bold"
                >
                  Submit Another Request
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleShare}
                  className="w-full sm:w-auto gap-2 font-bold"
                >
                  <Share2 className="w-4 h-4" /> Share on WhatsApp
                </Button>
              </div>
            </motion.div>
          )
        )}
      </section>
    </PageWrapper>
  );
};

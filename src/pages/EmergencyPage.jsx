import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useRequestStore } from '../store/requestStore';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Phone, Share2, Compass, Radio, AlertTriangle, Send, HeartCrack } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate } from '../utils/formatters';

export const EmergencyPage = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodType: 'O-',
    unitsRequired: 1,
    hospitalName: '',
    phone: '',
    autoBroadcast: true
  });
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  const submitRequest = useRequestStore(state => state.submitRequest);
  const requests = useRequestStore(state => state.requests);

  // Filter for only CRITICAL/URGENT requests for live feed
  const emergencyRequests = requests.filter(req => req.urgencyLevel === 'CRITICAL' || req.urgencyLevel === 'URGENT');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.hospitalName || !formData.phone) {
      toast.error("Please fill all fields.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const id = submitRequest({
        patientName: formData.patientName,
        age: 35,
        bloodType: formData.bloodType,
        unitsRequired: formData.unitsRequired,
        hospitalName: formData.hospitalName,
        city: 'Chennai',
        state: 'Tamil Nadu',
        requiredDate: new Date().toISOString().split('T')[0],
        urgencyLevel: 'CRITICAL',
        contactName: 'Relative',
        phone: formData.phone,
        description: 'Emergency critical request submitted via emergency portal.'
      });
      setLoading(false);
      setSubmittedId(id);
      toast.success("Emergency broadcast active!");
    }, 1500);
  };

  const handleWhatsApp = (req) => {
    const msg = `🚨 EMERGENCY CRITICAL BLOOD NEEDED: Patient needs ${req.bloodType} blood at ${req.hospitalName}. Units: ${req.unitsRequired}. Call Attendant immediately: ${req.phone}. Request ID: ${req.id}. Share immediately!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const inputStyles = "w-full border border-red-750/30 rounded-input px-3.5 py-2.5 text-brand-charcoal bg-white focus:ring-2 focus:ring-brand-primary outline-none transition-all text-xs";
  const labelStyles = "text-xs font-semibold text-stone-200 block mb-1";

  return (
    <PageWrapper>
      {/* 1. Urgent Pulsing Banner */}
      <section className="bg-brand-darkRed text-white py-16 text-center border-b border-brand-primary/20 relative overflow-hidden">
        {/* Pulsing circular backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full radial-emergency-pulse pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full radial-emergency-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="inline-flex p-3 bg-brand-primary text-white rounded-full border border-white/20 animate-bounce">
            <Radio className="w-8 h-8 animate-pulse" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none">
            EMERGENCY PORTAL
          </h1>
          <p className="text-sm md:text-base text-red-150 max-w-xl mx-auto leading-relaxed">
            Submit critical blood requests instantly. LifeDrop coordinates immediate broadcasts to matching available donors within 15 minutes.
          </p>
        </div>
      </section>

      {/* 2. Quick Form & Hotlines */}
      <section className="py-12 md:py-16 bg-brand-darkRed text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Request Form (Left) */}
          <div className="lg:col-span-8 bg-red-950/40 p-6 md:p-8 rounded-card border border-brand-primary/20 text-left">
            {!submittedId ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <h3 className="text-lg font-bold border-b border-brand-primary/20 pb-2 mb-4 flex items-center gap-2 text-white">
                  <AlertTriangle className="w-5 h-5 text-brand-primary animate-pulse" /> Quick Alert Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Patient Name */}
                  <div>
                    <label className={labelStyles} htmlFor="patientName">Patient Name</label>
                    <input 
                      type="text" 
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      className={inputStyles} 
                      placeholder="Name of patient"
                      required
                    />
                  </div>

                  {/* Blood Type */}
                  <div>
                    <label className={labelStyles} htmlFor="bloodType">Blood Type Needed</label>
                    <select 
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleInputChange}
                      className={inputStyles}
                    >
                      {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Units Required */}
                  <div>
                    <label className={labelStyles} htmlFor="unitsRequired">Units Needed (Whole Blood)</label>
                    <input 
                      type="number" 
                      id="unitsRequired"
                      name="unitsRequired"
                      min="1"
                      max="10"
                      value={formData.unitsRequired}
                      onChange={handleInputChange}
                      className={inputStyles}
                      required
                    />
                  </div>

                  {/* Attendant Phone */}
                  <div>
                    <label className={labelStyles} htmlFor="phone">Contact Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`${inputStyles} font-mono`} 
                      placeholder="e.g. 9840123456"
                      required
                    />
                  </div>

                  {/* Hospital */}
                  <div className="sm:col-span-2">
                    <label className={labelStyles} htmlFor="hospitalName">Hospital Name & Branch (Chennai)</label>
                    <input 
                      type="text" 
                      id="hospitalName"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className={inputStyles} 
                      placeholder="e.g. Government General Hospital, Park Town"
                      required
                    />
                  </div>

                  {/* Auto broadcast toggle */}
                  <div className="sm:col-span-2 bg-brand-primary/20 border border-brand-primary/10 p-4 rounded-input flex items-center justify-between mt-2">
                    <div>
                      <span className="text-xs font-bold block text-white">Auto Broadcast Alert</span>
                      <span className="text-[10px] text-red-200">Broadcast SMS/WhatsApp alerts instantly to matching available donors</span>
                    </div>
                    <input 
                      type="checkbox" 
                      name="autoBroadcast"
                      checked={formData.autoBroadcast}
                      onChange={handleInputChange}
                      className="w-5 h-5 accent-brand-primary shrink-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full font-bold shadow-md bg-brand-primary border-none hover:bg-brand-warm py-3.5 flex items-center justify-center gap-2"
                    loading={loading}
                  >
                    <Send className="w-4 h-4" /> Broadcast Emergency Request
                  </Button>
                </div>
              </form>
            ) : (
              /* Submission Success view */
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 bg-brand-primary border border-white/20 rounded-full flex items-center justify-center text-white mx-auto">
                  <Compass className="w-8 h-8 animate-spin" />
                </div>
                <h3 className="text-2xl font-bold">Broadcast Dispatch Active</h3>
                <p className="text-xs text-red-100 max-w-sm mx-auto leading-relaxed">
                  Your request has been successfully assigned ID <span className="font-mono font-bold text-white bg-brand-primary px-2 py-0.5 border border-white/10 rounded">{submittedId}</span>. All available donors matching blood type <span className="font-mono font-bold">{formData.bloodType}</span> in Chennai are being alerted via WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <Button 
                    variant="outlineRed" 
                    className="border-white text-white hover:bg-white hover:text-brand-darkRed font-bold"
                    onClick={() => setSubmittedId(null)}
                  >
                    Submit Another Request
                  </Button>
                  <Button 
                    variant="primary"
                    className="bg-brand-primary border-none hover:bg-brand-warm font-bold flex items-center justify-center gap-1.5"
                    onClick={() => handleWhatsApp({ id: submittedId, bloodType: formData.bloodType, hospitalName: formData.hospitalName, unitsRequired: formData.unitsRequired, phone: formData.phone })}
                  >
                    <Share2 className="w-4 h-4" /> One-Tap WhatsApp Share
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Emergency Hotlines Panel (Right) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="bg-red-950/40 p-6 rounded-card border border-brand-primary/20 space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2 border-b border-brand-primary/20 pb-2">
                <Phone className="w-5 h-5 text-brand-primary" /> Instant Hotlines
              </h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-red-200">National Dispatch Hotline</p>
                  <a href="tel:108" className="text-2xl font-mono font-bold text-brand-primary hover:underline block mt-0.5">108</a>
                </div>
                
                <div>
                  <p className="text-red-200">Government Blood helpline</p>
                  <a href="tel:1910" className="text-xl font-mono font-bold text-white hover:underline block mt-0.5">1910</a>
                </div>

                <div>
                  <p className="text-red-200">LifeDrop Coordinator Cell</p>
                  <a href="tel:+914428005555" className="text-sm font-semibold font-mono text-white block mt-0.5">+91 44 2800 5555</a>
                </div>

                <p className="text-[10px] text-red-200/75 leading-relaxed pt-2">
                  Dial the numbers above to communicate directly with municipal blood banks if matching coordinate responses are delayed.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Live Emergency Request Feed Log */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-charcoal flex items-center gap-2">
            <HeartCrack className="w-7 h-7 text-brand-primary" /> Active Emergency Requests
          </h2>
          <p className="text-xs text-brand-grey mt-1">Live broadcasts sent out in Chennai matching critical medical guidelines.</p>
        </div>

        <div className="space-y-4">
          {emergencyRequests.map(req => (
            <div 
              key={req.id}
              className="bg-white p-5 rounded-card border border-stone-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-md"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="danger" className="text-[10px] font-mono font-bold">{req.id}</Badge>
                  <Badge variant="amber" className="text-[9px] uppercase font-bold">{req.urgencyLevel}</Badge>
                  <span className="text-[10px] text-stone-400 font-mono">{formatDate(req.createdAt)}</span>
                </div>
                <h4 className="text-sm font-bold text-brand-charcoal">
                  Patient: {req.patientName} ({req.unitsRequired} units required)
                </h4>
                <p className="text-xs text-brand-grey font-medium leading-relaxed">
                  Hospital: <span className="text-brand-charcoal font-semibold">{req.hospitalName}</span> • Contact: {req.contactName}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto shrink-0 md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                <div className="text-center font-mono font-extrabold text-brand-primary text-xl bg-red-50 px-3 py-1.5 border border-red-100 rounded min-w-[50px]">
                  {req.bloodType}
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <a href={`tel:${req.phone}`} className="flex-1 md:flex-none">
                    <Button variant="secondary" size="sm" className="w-full text-xs font-semibold py-2">
                      Call Attendant
                    </Button>
                  </a>
                  <Button 
                    variant="success" 
                    size="sm"
                    className="flex-1 md:flex-none py-2"
                    onClick={() => handleWhatsApp(req)}
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </PageWrapper>
  );
};

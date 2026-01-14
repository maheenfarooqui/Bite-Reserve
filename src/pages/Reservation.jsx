import { useState } from 'react';
import { db, auth } from '../app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    name: '',
    requests: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return setMessage("Please login!");

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: new Date()
      });
      setMessage("Congratulations! Booking successful! 🎉");
      setFormData({ date: '', time: '', guests: '2', name: '', requests: '' });
    } catch (error) {
      setMessage("Error: Booking failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        {/* Left Side: Info */}
        {/* Left Side: Info */}
<div className="bg-primary p-12 text-white md:w-[40%] flex flex-col justify-center">
  <h2 className="text-5xl font-black mb-6 leading-tight">
    Book a Table
  </h2>
  <p className="text-lg opacity-90 italic font-light max-w-xs mb-10">
    Secure your spot at Karachi's most loved restaurant. Experience flavors like never before.
  </p>
  
  <div className="space-y-8">
    {/* Location */}
    <div className="flex items-start gap-4">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <FiMapPin size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest font-bold opacity-60">Location</p>
        <p className="text-sm font-medium">123 Food Street, Phase 6, Karachi</p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex items-start gap-4">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <FiPhone size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest font-bold opacity-60">Phone</p>
        <p className="text-sm font-medium">+92 300 1234567</p>
      </div>
    </div>

    {/* Timing */}
    <div className="flex items-start gap-4">
      <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
        <FiClock size={20} className="text-white" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest font-bold opacity-60">Open Hours</p>
        <p className="text-sm font-medium">Mon - Sun: 12:00 PM - 12:00 AM</p>
      </div>
    </div>
  </div>
</div>

        {/* Right Side: Form */}
        <div className="p-10 md:w-2/3">
          {message && <p className={`mb-4 p-3 rounded-xl text-center font-bold ${message.includes('Error') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>{message}</p>}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input type="text" required placeholder="Your Name" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} value={formData.name} />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Number of Guests</label>
              <select className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none" 
                onChange={(e) => setFormData({...formData, guests: e.target.value})} value={formData.guests}>
                {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num}>{num} Persons</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Date</label>
              <input type="date" required className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none"
                onChange={(e) => setFormData({...formData, date: e.target.value})} value={formData.date} />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Time</label>
              <input type="time" required className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none"
                onChange={(e) => setFormData({...formData, time: e.target.value})} value={formData.time} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold mb-2">Special Requests (Optional)</label>
              <textarea rows="3" placeholder="Birthday celebration, window seat, etc." className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none"
                onChange={(e) => setFormData({...formData, requests: e.target.value})} value={formData.requests}></textarea>
            </div>

            <button disabled={loading} className="md:col-span-2 bg-primary text-white py-4 rounded-2xl font-black text-xl hover:shadow-lg transition-all active:scale-95 disabled:bg-gray-300">
              {loading ? "Booking..." : "Confirm Reservation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg'; // Apni image ka sahi path check karlein

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-12 md:py-20">
      
      {/* Left Side: Text */}
      <div className="space-y-6">
        <span className="text-primary font-bold tracking-widest uppercase text-sm">Delicious Experience</span>
        <h1 className="text-5xl md:text-7xl font-display font-black leading-tight">
          Skip the Wait, <br /> 
          <span className="text-secondary">Savor the Plate.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-md italic">
          "Experience fine dining at your fingertips. Reserve a table or order your favorite meals in seconds."
        </p>
        <div className="flex gap-4 pt-4">
          <Link to="/menu" className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            Order Food
          </Link>
          <Link to="/reserve" className="bg-white text-foreground border-2 border-muted px-8 py-4 rounded-full font-bold hover:bg-muted transition-all">
            Book a Table
          </Link>
        </div>
      </div>

      {/* Right Side: Image Placeholder */}
      <div className="relative">
        <img 
          src={heroImg} 
          alt="Delicious Food" 
          className="w-full h-[400px] md:h-[500px] object-cover rounded-[40px] shadow-2xl"
        />
        {/* Floating Card */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="bg-accent/10 p-3 rounded-full text-accent">⭐ 4.9</div>
          <div>
            <p className="font-bold text-sm">Top Rated</p>
            <p className="text-xs text-gray-400">Trusted by 5k+ users</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero; // 👈 Ye sab se zaroori line hai
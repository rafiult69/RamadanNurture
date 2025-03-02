
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const PRESETS = [
  { name: "SubhanAllah", target: 33 },
  { name: "Alhamdulillah", target: 33 },
  { name: "Allahu Akbar", target: 34 },
  { name: "La ilaha illallah", target: 100 },
  { name: "Astaghfirullah", target: 100 },
  { name: "Custom", target: 0 }
];

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [currentPreset, setCurrentPreset] = useState(PRESETS[0].name);
  const [customTarget, setCustomTarget] = useState(33);
  const [vibrate, setVibrate] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('tasbihState');
    if (savedState) {
      const { count, target, currentPreset, customTarget, vibrate, completedCycles } = JSON.parse(savedState);
      setCount(count || 0);
      setTarget(target || 33);
      setCurrentPreset(currentPreset || PRESETS[0].name);
      setCustomTarget(customTarget || 33);
      setVibrate(vibrate !== undefined ? vibrate : true);
      setCompletedCycles(completedCycles || 0);
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage
    localStorage.setItem('tasbihState', JSON.stringify({
      count, target, currentPreset, customTarget, vibrate, completedCycles
    }));
  }, [count, target, currentPreset, customTarget, vibrate, completedCycles]);

  useEffect(() => {
    if (count === target && count !== 0) {
      if (vibrate && navigator.vibrate) {
        navigator.vibrate(200);
      }
      
      // Play a subtle sound
      const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");
      audio.play().catch(e => console.log("Audio play failed:", e));
      
      // Increment completed cycles
      setCompletedCycles(prev => prev + 1);
    }
  }, [count, target, vibrate]);

  const increment = () => {
    if (count < target || target === 0) {
      setCount(prev => prev + 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  const handlePresetChange = (preset) => {
    const selectedPreset = PRESETS.find(p => p.name === preset);
    setCurrentPreset(preset);
    
    if (preset === "Custom") {
      setTarget(customTarget);
    } else {
      setTarget(selectedPreset.target);
    }
    
    setCount(0);
  };

  const handleCustomTargetChange = (value) => {
    const newTarget = parseInt(value) || 0;
    setCustomTarget(newTarget);
    if (currentPreset === "Custom") {
      setTarget(newTarget);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <a className="inline-flex items-center mb-4 text-primary hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>
      </Link>
      
      <h1 className="text-3xl font-bold mb-6 text-center">Digital Tasbih</h1>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="flex justify-between items-center p-4 bg-primary text-white">
          <span className="font-medium">{currentPreset}</span>
          <div className="flex items-center">
            <span className="mr-2">Vibration</span>
            <button 
              onClick={() => setVibrate(!vibrate)} 
              className={`w-10 h-6 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${vibrate ? 'bg-green-400 justify-end' : 'bg-gray-400 justify-start'}`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
            </button>
          </div>
        </div>
        
        <div className="px-8 py-12 flex flex-col items-center">
          <div className="text-7xl font-bold mb-4">{count}</div>
          <div className="text-gray-500 mb-6">
            {target > 0 ? `Target: ${target}` : 'No limit'}
          </div>
          
          <button 
            onClick={increment}
            className="w-40 h-40 rounded-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center text-3xl font-semibold shadow-lg transition-transform active:scale-95 mb-8"
          >
            Tap
          </button>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <button 
              onClick={reset}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center font-medium"
            >
              Reset
            </button>
            <div className="flex items-center justify-center bg-gray-100 rounded-md px-4 py-2">
              <span className="mr-2">Cycles:</span>
              <span className="font-semibold">{completedCycles}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-4 bg-primary text-white">
          <h2 className="text-xl font-semibold">Dhikr Presets</h2>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetChange(preset.name)}
                className={`px-4 py-3 rounded-md font-medium text-sm sm:text-base ${
                  currentPreset === preset.name 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {preset.name}
                {preset.name !== "Custom" && <span className="ml-2 opacity-70">({preset.target})</span>}
              </button>
            ))}
          </div>
          
          {currentPreset === "Custom" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Count Target
              </label>
              <input
                type="number"
                min="0"
                value={customTarget}
                onChange={(e) => handleCustomTargetChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="mt-1 text-xs text-gray-500">Set to 0 for unlimited counting</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">About Tasbih</h3>
        <p className="mb-4">
          Tasbih (Arabic: تَسْبِيح) is a form of dhikr or remembrance of Allah in Islam that 
          involves repeating sacred phrases. Common forms include reciting "SubhanAllah" (Glory be to Allah), 
          "Alhamdulillah" (All praise is due to Allah), and "Allahu Akbar" (Allah is the Greatest).
        </p>
        <p>
          The Prophet Muhammad (peace be upon him) encouraged Muslims to recite these phrases 33 times each after prayers, 
          totaling 99 repetitions, which corresponds to the 99 Names of Allah.
        </p>
      </div>
    </div>
  );
}

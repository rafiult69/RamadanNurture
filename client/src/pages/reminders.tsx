
import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const DEFAULT_REMINDERS = [
  { id: 1, title: "Morning Adhkar", time: "06:00", enabled: true },
  { id: 2, title: "Evening Adhkar", time: "18:00", enabled: true },
  { id: 3, title: "Quran Reading", time: "12:00", enabled: false },
];

export default function Reminders() {
  const [reminders, setReminders] = useState(DEFAULT_REMINDERS);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("12:00");
  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
    // Load reminders from localStorage
    const savedReminders = localStorage.getItem('islamicReminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }
  }, []);
  
  useEffect(() => {
    // Save reminders to localStorage
    localStorage.setItem('islamicReminders', JSON.stringify(reminders));
  }, [reminders]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing reminder
      setReminders(reminders.map(reminder => 
        reminder.id === editingId 
          ? { ...reminder, title, time } 
          : reminder
      ));
      setEditingId(null);
    } else {
      // Add new reminder
      const newReminder = {
        id: Date.now(),
        title,
        time,
        enabled: true
      };
      setReminders([...reminders, newReminder]);
    }
    
    // Reset form
    setTitle("");
    setTime("12:00");
  };
  
  const editReminder = (reminder) => {
    setTitle(reminder.title);
    setTime(reminder.time);
    setEditingId(reminder.id);
  };
  
  const deleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };
  
  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id 
        ? { ...reminder, enabled: !reminder.enabled } 
        : reminder
    ));
  };
  
  const cancelEdit = () => {
    setTitle("");
    setTime("12:00");
    setEditingId(null);
  };

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }
    
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };
  
  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
      
      <h1 className="text-3xl font-bold mb-6 text-center">Daily Reminders</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-4 bg-primary text-white">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Reminder" : "Create Reminder"}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Morning Adhkar"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {editingId ? "Update" : "Add"} Reminder
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">About Reminders</h3>
            <p className="mb-4">
              Setting up daily reminders can help you establish a consistent routine for your Islamic practices. 
              Whether it's morning and evening adhkar, Quran reading, or prayer times, regular reminders can help strengthen your faith.
            </p>
            <p>
              You can set up notifications for different times of the day to remind you of these important acts of worship.
            </p>
          </div>
        </div>
        
        <div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 bg-primary text-white">
              <h2 className="text-xl font-semibold">Your Reminders</h2>
            </div>
            
            {reminders.length > 0 ? (
              <div className="divide-y">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center border ${
                          reminder.enabled 
                            ? 'bg-primary border-primary' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {reminder.enabled && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </button>
                      
                      <div>
                        <h3 className="font-medium">{reminder.title}</h3>
                        <p className="text-sm text-gray-500">{reminder.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editReminder(reminder)}
                        className="p-2 text-gray-500 hover:text-primary focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No reminders yet. Create your first reminder!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

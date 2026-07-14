import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, FileSpreadsheet, Download, RefreshCw, Trash2, CheckCircle, XCircle, Heart, Users, Utensils, Calendar } from 'lucide-react';
import { RSVPResponse } from '../types';

interface AdminPanelProps {
  updateTrigger?: number;
}

export default function AdminPanel({ updateTrigger = 0 }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [rsvps, setRsvps] = useState<RSVPResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'yes' | 'no'>('all');

  const CORRECT_PIN = '2026'; // Auspicious wedding year PIN

  useEffect(() => {
    if (isOpen) {
      loadRSVPs();
    }
  }, [isOpen, updateTrigger]);

  const loadRSVPs = () => {
    const raw = localStorage.getItem('wedding_rsvps');
    if (raw) {
      try {
        setRsvps(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse RSVPs:', e);
      }
    } else {
      setRsvps([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadRSVPs();
    } else {
      setErrorMsg('Incorrect Access PIN. Hint: Auspicious Wedding Year (4 digits).');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this RSVP entry?')) {
      const updated = rsvps.filter((r) => r.id !== id);
      localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
      setRsvps(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('WARNING: Are you sure you want to delete ALL RSVPs permanently? This action cannot be undone.')) {
      localStorage.removeItem('wedding_rsvps');
      setRsvps([]);
    }
  };

  // Calculations for dashboard counters
  const totalRsvpsCount = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attendance === 'yes');
  const attendingCount = attendingRsvps.length;
  const decliningCount = rsvps.filter((r) => r.attendance === 'no').length;

  const totalGuestsCount = attendingRsvps.reduce((sum, r) => sum + r.guests, 0);
  
  const vegCount = attendingRsvps.filter((r) => r.mealPreference === 'veg').reduce((sum, r) => sum + r.guests, 0);
  const nonVegCount = attendingRsvps.filter((r) => r.mealPreference === 'non-veg').reduce((sum, r) => sum + r.guests, 0);

  // Event breakdowns
  const eventCounts: { [key: string]: number } = {
    Muhurtham: 0,
    Reception: 0,
  };

  attendingRsvps.forEach((r) => {
    if (r.events && Array.isArray(r.events)) {
      r.events.forEach((evt) => {
        if (eventCounts[evt] !== undefined) {
          eventCounts[evt] += r.guests;
        }
      });
    }
  });

  // Filtered list for display
  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.phone.includes(searchTerm);
    const matchesAttendance = attendanceFilter === 'all' || r.attendance === attendanceFilter;
    return matchesSearch && matchesAttendance;
  });

  // Export as CSV
  const downloadCSV = () => {
    if (rsvps.length === 0) {
      alert('No RSVP data to export.');
      return;
    }
    
    const headers = ['Name', 'Phone', 'Attending', 'Guests Count', 'Dietary Preference', 'Events', 'Blessing Message', 'Timestamp'];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.attendance === 'yes' ? 'Attending' : 'Declined',
      r.attendance === 'yes' ? r.guests : 0,
      r.attendance === 'yes' ? r.mealPreference.toUpperCase() : 'N/A',
      r.attendance === 'yes' ? `"${r.events.join(', ')}"` : 'N/A',
      r.blessing ? `"${r.blessing.replace(/"/g, '""')}"` : 'N/A',
      new Date(r.timestamp).toLocaleString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'wedding_rsvps_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Small floating Admin key at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-[#0a0514]/85 hover:bg-[#0a0514] border border-[#d4af37]/30 text-[#d4af37] rounded-full hover:border-[#d4af37]/80 hover:text-[#d4af37]/95 transition-all duration-300 backdrop-blur-md flex items-center justify-center shadow-lg group cursor-pointer"
          id="btn-admin-panel"
        >
          <Shield className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-28 group-hover:ml-2 transition-all duration-300 text-xs font-sans font-medium tracking-wide whitespace-nowrap text-[#d4af37]">
            Admin Portal
          </span>
        </button>
      </div>

      {/* Main Admin Portal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center p-4 backdrop-blur-md"
          >
            {/* Outer Modal Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="royal-card w-full max-w-5xl rounded-3xl p-6 sm:p-8 border border-[#d4af37]/25 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ornate-corner ornate-corner-tl" />
              <div className="ornate-corner ornate-corner-tr" />
              <div className="ornate-corner ornate-corner-bl" />
              <div className="ornate-corner ornate-corner-br" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#d4af37]/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#d4af37]" />
                  <h2 className="font-royal text-lg sm:text-2xl font-bold text-yellow-100 tracking-wide uppercase">
                    Wedding Organizer Portal
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-full text-stone-400 hover:text-white transition-all cursor-pointer"
                  id="btn-close-admin"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Login State */}
              {!isAuthenticated ? (
                <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/25 flex items-center justify-center mb-4 text-[#d4af37]">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg text-yellow-100 font-semibold mb-2">
                    Enter Organizer PIN
                  </h3>
                  <p className="text-stone-400 text-xs font-sans text-center mb-6 leading-relaxed">
                    Please provide the 4-digit Wedding Organizer PIN to view RSVPs, banquet meal counts, and guest blessings.
                    <br />
                    <span className="text-[#d4af37]/85 font-medium">Hint: PIN is 2026</span>
                  </p>

                  <form onSubmit={handleLogin} className="w-full space-y-4">
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                      placeholder="• • • •"
                      className="w-full bg-[#0a0514]/80 border border-[#d4af37]/25 rounded-xl py-3 text-center text-xl tracking-[0.4em] font-mono text-[#d4af37] placeholder-stone-700 focus:outline-none focus:border-[#d4af37] transition"
                      required
                      autoFocus
                    />

                    {errorMsg && (
                      <p className="text-red-400 text-xs font-sans text-center">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#fcf6ba] to-[#b8860b] text-black font-sans font-bold text-xs tracking-wider rounded-xl transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.01]"
                      id="btn-admin-login"
                    >
                      AUTHORIZE ACCESS
                    </button>
                  </form>
                </div>
              ) : (
                /* Authenticated State - Organizer Dashboard */
                <div className="space-y-6">
                  {/* Dashboard Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* RSVPs Received */}
                    <div className="bg-[#0a0514]/70 p-4 rounded-xl border border-[#d4af37]/15 text-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#d4af37]/10 text-[#d4af37] mx-auto mb-2">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <span className="text-2xl font-bold font-royal text-[#d4af37] block">{totalRsvpsCount}</span>
                      <span className="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">RSVPs Received</span>
                    </div>

                    {/* Attending count */}
                    <div className="bg-[#0a0514]/70 p-4 rounded-xl border border-[#d4af37]/15 text-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto mb-2">
                        <Users className="w-4 h-4" />
                      </div>
                      <span className="text-2xl font-bold font-royal text-emerald-400 block">{totalGuestsCount}</span>
                      <span className="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Total Attending</span>
                      <span className="text-[9px] font-sans text-stone-500">From {attendingCount} parties</span>
                    </div>

                    {/* Meal preference stats */}
                    <div className="bg-[#0a0514]/70 p-4 rounded-xl border border-[#d4af37]/15 text-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 mx-auto mb-2">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <span className="text-lg font-semibold font-royal text-indigo-300 block">
                        V: {vegCount} | NV: {nonVegCount}
                      </span>
                      <span className="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Banquet Meals</span>
                      <span className="text-[9px] font-sans text-stone-500">Veg / Non-Veg plate counts</span>
                    </div>

                    {/* Declined stats */}
                    <div className="bg-[#0a0514]/70 p-4 rounded-xl border border-[#d4af37]/15 text-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-400 mx-auto mb-2">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <span className="text-2xl font-bold font-royal text-red-400 block">{decliningCount}</span>
                      <span className="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Declined invites</span>
                    </div>
                  </div>

                  {/* Schedule Event Plate Breakdown */}
                  <div className="royal-card rounded-2xl p-4 sm:p-5 border border-[#d4af37]/15 bg-[#d4af37]/5">
                    <h4 className="font-serif text-sm text-[#d4af37] font-semibold mb-3 flex items-center gap-1.5 justify-center">
                      <Calendar className="w-4 h-4" /> Event-wise Estimated Guest Footfall
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      {[
                        { label: 'Muhurtham', count: eventCounts.Muhurtham },
                        { label: 'Reception', count: eventCounts.Reception },
                      ].map((evt) => (
                        <div key={evt.label} className="bg-black/20 p-2.5 rounded-lg border border-[#d4af37]/10">
                          <span className="text-xs text-stone-400 font-sans uppercase tracking-wider block">{evt.label}</span>
                          <span className="text-lg font-bold text-[#d4af37] mt-1 block">{evt.count} pax</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Controls / Filter row */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                    {/* Search bar */}
                    <input
                      type="text"
                      placeholder="Search guests by name or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-72 bg-[#0a0514]/80 border border-[#d4af37]/20 rounded-xl px-4 py-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37] transition"
                    />

                    {/* Actions and logout */}
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                      {/* Attendance filters */}
                      <select
                        value={attendanceFilter}
                        onChange={(e: any) => setAttendanceFilter(e.target.value)}
                        className="bg-[#0a0514]/85 border border-[#d4af37]/20 rounded-xl px-3 py-2 text-xs text-stone-300 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All RSVP statuses</option>
                        <option value="yes">Attending Only</option>
                        <option value="no">Declined Only</option>
                      </select>

                      {/* Download CSV */}
                      <button
                        onClick={downloadCSV}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-md"
                        id="btn-admin-download-csv"
                      >
                        <Download className="w-3.5 h-3.5" /> CSV EXPORT
                      </button>

                      {/* Clear All */}
                      <button
                        onClick={handleClearAll}
                        className="px-4 py-2 bg-red-950/60 hover:bg-red-900 border border-red-500/20 text-red-300 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow-md"
                        id="btn-admin-clear-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> RESET DATA
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="px-3 py-2 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white rounded-xl text-xs font-bold font-sans cursor-pointer transition"
                        id="btn-admin-logout"
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>

                  {/* RSVP List Table */}
                  <div className="border border-[#d4af37]/15 rounded-xl overflow-hidden bg-black/40">
                    <div className="overflow-x-auto max-h-64">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-900 border-b border-[#d4af37]/15 text-[#d4af37] font-sans uppercase tracking-wider font-semibold text-[10px]">
                            <th className="p-3">Guest Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Attendance</th>
                            <th className="p-3">Guests</th>
                            <th className="p-3">Diet Preference</th>
                            <th className="p-3">Events Attending</th>
                            <th className="p-3">Wishes / Blessings</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-900/80 font-sans text-stone-300">
                          {filteredRsvps.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-stone-500 font-serif italic">
                                No RSVP responses match your search.
                              </td>
                            </tr>
                          ) : (
                            filteredRsvps.map((rsvp) => (
                              <tr key={rsvp.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-3 font-semibold text-yellow-100">{rsvp.name}</td>
                                <td className="p-3 font-mono text-stone-400">{rsvp.phone}</td>
                                <td className="p-3">
                                  {rsvp.attendance === 'yes' ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
                                      <CheckCircle className="w-3 h-3" /> Yes
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium">
                                      <XCircle className="w-3 h-3" /> No
                                    </span>
                                  )}
                                </td>
                                <td className="p-3 font-bold">{rsvp.attendance === 'yes' ? rsvp.guests : '-'}</td>
                                <td className="p-3">
                                  {rsvp.attendance === 'yes' ? (
                                    rsvp.mealPreference === 'veg' ? (
                                      <span className="text-emerald-400 font-medium">Veg</span>
                                    ) : (
                                      <span className="text-amber-400 font-medium font-semibold">Non-Veg</span>
                                    )
                                  ) : '-'}
                                </td>
                                <td className="p-3">
                                  {rsvp.attendance === 'yes' ? (
                                    <p className="max-w-40 truncate text-stone-400" title={rsvp.events.join(', ')}>
                                      {rsvp.events.join(', ')}
                                    </p>
                                  ) : '-'}
                                </td>
                                <td className="p-3 max-w-48">
                                  <p className="truncate font-serif italic text-yellow-100/70" title={rsvp.blessing}>
                                    {rsvp.blessing || <span className="text-stone-600 not-italic font-sans text-[10px]">No message left</span>}
                                  </p>
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => handleDelete(rsvp.id)}
                                    className="p-1 text-stone-500 hover:text-red-400 transition"
                                    title="Delete entry"
                                    id={`btn-delete-rsvp-${rsvp.id}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Blessings Showcase Section */}
                  <div className="pt-2">
                    <h4 className="font-serif text-sm text-[#d4af37] font-semibold mb-3 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> Recent Blessings Gallery
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {rsvps.filter(r => r.blessing).slice(0, 6).map((r, i) => (
                        <div key={i} className="bg-[#0a0514]/70 p-4 rounded-xl border border-[#d4af37]/15 font-serif italic text-xs leading-relaxed text-stone-300 relative">
                          <span className="text-2xl text-[#d4af37]/20 absolute top-1 left-2 font-serif select-none">“</span>
                          <p className="relative z-10 pl-2 pr-2">{r.blessing}</p>
                          <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#d4af37]/85 text-right mt-3 not-italic">
                            — {r.name}
                          </p>
                        </div>
                      ))}
                      {rsvps.filter(r => r.blessing).length === 0 && (
                        <p className="text-xs font-serif text-stone-500 text-center italic col-span-3 py-4">
                          No blessing messages left yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

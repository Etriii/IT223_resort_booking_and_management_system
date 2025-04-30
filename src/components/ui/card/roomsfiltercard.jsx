import React, { useState, useCallback } from 'react';
import { Users } from 'lucide-react';

const FilterCard = ({
  initialBudget,
  onBudgetChange,
  onDateChange,
  onFiltersChange,
}) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [budget, setBudget] = useState(initialBudget || [0, 50000]);
  const [roomType, setRoomType] = useState('All');
  const [guests, setGuests] = useState('');

  const handleBudgetChange = useCallback((index, value) => {
    const newBudget = [...budget];
    newBudget[index] = Number(value);
    setBudget(newBudget);
    onBudgetChange?.(newBudget);
    onFiltersChange?.({
      budget: newBudget,
      checkInDate,
      checkOutDate,
      roomType,
      guests,
    });
  }, [budget, checkInDate, checkOutDate, roomType, guests, onBudgetChange, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    const updatedFilters = {
      budget,
      checkInDate,
      checkOutDate,
      roomType,
      guests,
      [key]: value,
    };

    switch (key) {
      case 'checkInDate':
        setCheckInDate(value);
        onDateChange?.(value, checkOutDate);
        break;
      case 'checkOutDate':
        setCheckOutDate(value);
        onDateChange?.(checkInDate, value);
        break;
      case 'roomType':
        setRoomType(value);
        break;
      case 'guests':
        setGuests(value);
        break;
      default:
        break;
    }

    onFiltersChange?.(updatedFilters);
  };

  return (
    <div className="w-full sticky h-fit text-black px-6 rounded-xl border border-white/20">
      <h1 className="text-xl font-bold mb-2">Filter by</h1>
      <hr className="w-full border-t border-neutral-400 my-2" />

      {/* Budget */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold py-2">Your Budget (per night)</h2>
        <div className="flex gap-4 mt-2">
          <div className="flex flex-col w-1/2">
            <label className="text-sm mb-1">Min</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              max="50000"
              step="100"
              value={budget[0]}
              onChange={(e) => handleBudgetChange(0, e.target.value)}
              className="w-full p-2 text-black border border-black/20 rounded-md"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-sm mb-1">Max</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              max="50000"
              step="100"
              value={budget[1]}
              onChange={(e) => handleBudgetChange(1, e.target.value)}
              className="w-full p-2 text-black border border-black/20 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Check-in */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-2">Check-in</h2>
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => handleFilterChange('checkInDate', e.target.value)}
          className="w-full p-2 rounded-md text-black border border-black/20"
        />
      </div>

      {/* Check-out */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold mb-2">Check-out</h2>
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => handleFilterChange('checkOutDate', e.target.value)}
          className="w-full p-2 rounded-md text-black border border-black/20"
        />
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">Room Type</label>
        <select
          className="w-full p-2 rounded-md border border-black/20 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roomType}
          onChange={(e) => handleFilterChange('roomType', e.target.value)}
        >
          {[
            'All', 'King Size', 'Queen Size', 'Twin Bed', 
            'Deluxe Suite', 'Family Room', 'Penthouse Suite', 'Bungalow Villa',
          ].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Guests */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
          Maximum Number of Guests
          <Users className="w-4 h-4" />
        </h2>
        <input
          type="number"
          placeholder="Enter number"
          value={guests}
          onChange={(e) =>
            handleFilterChange('guests', e.target.value ? parseInt(e.target.value, 10) : '')
          }
          className="w-full p-2 rounded-md text-black border border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default FilterCard;

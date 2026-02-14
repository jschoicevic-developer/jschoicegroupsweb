'use client';

import { useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { PlanPartnersBudgetItem, BudgetFrequencyType } from '@/types/ndis';
import Link from 'next/link';

interface Props {
  item: PlanPartnersBudgetItem;
  onUpdate: (id: string, updates: Partial<PlanPartnersBudgetItem>) => void;
  onDelete: (id: string) => void;
  mobile?: boolean;
}

const FREQUENCY_OPTIONS: BudgetFrequencyType[] = ['Week', 'Fortnight', 'Month', 'Year', 'Day', 'One-off'];

/**
 * Calculation Row - Editable budget item
 * Live cost calculation: Price × Quantity × Frequency Number
 */
export default function CalculationRow({ item, onUpdate, onDelete, mobile = false }: Props) {
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  const handlePriceChange = (value: string) => {
    const price = parseFloat(value) || 0;
    onUpdate(item.id, { price });
  };

  const handleQuantityChange = (value: string) => {
    const quantity = parseFloat(value) || 0;
    onUpdate(item.id, { quantity });
  };

  const handleFrequencyNumberChange = (value: string) => {
    const frequencyNumber = parseInt(value) || 0;
    onUpdate(item.id, { frequencyNumber });
  };

  const handleFrequencyTypeChange = (frequencyType: BudgetFrequencyType) => {
    // Update frequency number based on type
    const defaultFrequencies: Record<BudgetFrequencyType, number> = {
      'Week': 52,
      'Fortnight': 26,
      'Month': 12,
      'Year': 1,
      'Day': 1,
      'One-off': 1
    };

    onUpdate(item.id, {
      frequencyType,
      frequencyNumber: defaultFrequencies[frequencyType]
    });
  };

  const inputClasses = "w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-semibold text-[#2D3748]";

  // Mobile card view
  if (mobile) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative overflow-hidden">
        {/* Item Name */}
        <div className="mb-6 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {item.supportItem.support_item_number}
            </span>
          </div>
          <Link
            href={`/tools/ndis-price-guide/${item.supportItem.support_item_number}`}
            target="_blank"
            className="text-[#2D3748] hover:text-primary font-bold text-lg leading-tight flex items-start gap-1 transition-colors"
          >
            <span className="flex-1">{item.supportItem.support_item_name}</span>
            <ExternalLink className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
          </Link>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
          {/* Price */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
              <input
                type="number"
                step="0.01"
                value={item.price}
                onChange={(e) => handlePriceChange(e.target.value)}
                onFocus={() => setIsEditingPrice(true)}
                onBlur={() => setIsEditingPrice(false)}
                className={`${inputClasses} pl-6`}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">/{item.supportItem.unit}</p>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Quantity</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className={inputClasses}
            />
            <p className="text-[10px] text-gray-400 mt-1 font-medium">{item.supportItem.unit}</p>
          </div>
        </div>

        {/* Frequency */}
        <div className="mb-6 relative z-10">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Frequency</label>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              value={item.frequencyNumber}
              onChange={(e) => handleFrequencyNumberChange(e.target.value)}
              className={`${inputClasses} w-20 text-center`}
            />
            <select
              value={item.frequencyType}
              onChange={(e) => handleFrequencyTypeChange(e.target.value as BudgetFrequencyType)}
              className={`${inputClasses} flex-1 appearance-none cursor-pointer`}
            >
              {FREQUENCY_OPTIONS.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cost and Delete */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 relative z-10">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Cost</p>
            <p className="text-2xl font-black text-primary">
              ${item.cost.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 group/del"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5 group-hover/del:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // Desktop table row view
  return (
    <tr className="hover:bg-primary/5 transition-colors group border-b border-gray-50 last:border-0">
      {/* Support Item */}
      <td className="px-6 py-6">
        <Link
          href={`/tools/ndis-price-guide/${item.supportItem.support_item_number}`}
          target="_blank"
          className="text-[#2D3748] hover:text-primary font-bold flex items-start gap-1 transition-colors text-base"
        >
          <span className="flex-1 line-clamp-2">{item.supportItem.support_item_name}</span>
          <ExternalLink className="w-3 h-3 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">{item.supportItem.support_item_number}</p>
      </td>

      {/* Price */}
      <td className="px-6 py-6">
        <div className="flex items-center relative">
          <span className="absolute left-3 text-gray-400 font-bold text-sm">$</span>
          <input
            type="number"
            step="0.01"
            value={item.price}
            onChange={(e) => handlePriceChange(e.target.value)}
            onFocus={() => setIsEditingPrice(true)}
            onBlur={() => setIsEditingPrice(false)}
            className={`${inputClasses} pl-6 w-28`}
          />
        </div>
        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Per {item.supportItem.unit}</p>
      </td>

      {/* Quantity */}
      <td className="px-6 py-6">
        <input
          type="number"
          step="0.01"
          min="0"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className={`${inputClasses} w-20 text-center`}
        />
        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{item.supportItem.unit}</p>
      </td>

      {/* Frequency */}
      <td className="px-6 py-6">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={item.frequencyNumber}
            onChange={(e) => handleFrequencyNumberChange(e.target.value)}
            className={`${inputClasses} w-16 text-center`}
          />
          <div className="relative flex-1">
            <select
              value={item.frequencyType}
              onChange={(e) => handleFrequencyTypeChange(e.target.value as BudgetFrequencyType)}
              className={`${inputClasses} w-full appearance-none cursor-pointer pr-8`}
            >
              {FREQUENCY_OPTIONS.map(freq => (
                <option key={freq} value={freq}>{freq}</option>
              ))}
            </select>
          </div>
        </div>
      </td>

      {/* Cost */}
      <td className="px-6 py-6 text-right">
        <span className="text-xl font-black text-[#2D3748]">
          ${item.cost.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </td>

      {/* Delete */}
      <td className="px-6 py-6 text-center">
        <button
          onClick={() => onDelete(item.id)}
          className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
          title="Delete item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
}

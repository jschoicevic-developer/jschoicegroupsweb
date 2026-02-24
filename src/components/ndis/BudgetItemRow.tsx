import { Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { PlanPartnersBudgetItem, BudgetFrequencyType } from '@/types/ndis';

interface BudgetItemRowProps {
  item: PlanPartnersBudgetItem;
  onUpdate: (id: string, updates: Partial<PlanPartnersBudgetItem>) => void;
  onRemove: (id: string) => void;
}

export default function BudgetItemRow({ item, onUpdate, onRemove }: BudgetItemRowProps) {

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value) || 0;
    const cost = price * item.quantity * item.frequencyNumber;
    onUpdate(item.id, { price, cost });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value) || 0;
    const cost = item.price * quantity * item.frequencyNumber;
    onUpdate(item.id, { quantity, cost });
  };

  const handleFrequencyNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frequencyNumber = parseFloat(e.target.value) || 0;
    const cost = item.price * item.quantity * frequencyNumber;
    onUpdate(item.id, { frequencyNumber, cost });
  };

  const handleFrequencyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequencyType = e.target.value as BudgetFrequencyType;
    let newFrequencyNumber = item.frequencyNumber;

    // Auto-set frequency number based on type
    switch (frequencyType) {
      case 'Week':
        newFrequencyNumber = 52;
        break;
      case 'Fortnight':
        newFrequencyNumber = 26;
        break;
      case 'Month':
        newFrequencyNumber = 12;
        break;
      case 'Day':
        newFrequencyNumber = 1;
        break;
      case 'Year':
        newFrequencyNumber = 1;
        break;
      case 'One-off':
        newFrequencyNumber = 1;
        break;
      default:
        break;
    }

    const cost = item.price * item.quantity * newFrequencyNumber;
    onUpdate(item.id, { frequencyType, frequencyNumber: newFrequencyNumber, cost });
  };

  return (
    <div className="grid grid-cols-12 gap-4 p-6 items-start bg-white border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      {/* Support Item */}
      <div className="col-span-12 lg:col-span-4 pr-4">
        <Link
          href={`/tools/ndis-price-guide/${item.supportItem.support_item_number}`}
          target="_blank" rel="noopener noreferrer"
          className="font-bold text-[#805AD5] hover:text-[#6B46C1] hover:underline flex items-start gap-2 mb-1 leading-tight"
        >
          {item.supportItem.support_item_name}
          <ExternalLink className="w-3 h-3 flex-shrink-0 mt-1" />
        </Link>
        <div className="text-gray-500 font-medium text-sm">
          {item.supportItem.support_item_number}
        </div>
      </div>

      {/* Price */}
      <div className="col-span-6 lg:col-span-2">
        <div className="flex items-center gap-2 mb-1">
          <label className="lg:hidden text-xs font-bold text-gray-500 uppercase">Price</label>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
          <input
            type="number"
            value={item.price}
            onChange={handlePriceChange}
            className="w-full pl-6 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            step="0.01"
          />
        </div>
        <span className="text-xs text-gray-400 font-medium mt-1 block pl-1">Per {item.supportItem.unit}</span>
      </div>

      {/* Quantity */}
      <div className="col-span-6 lg:col-span-1">
        <div className="flex items-center gap-2 mb-1">
          <label className="lg:hidden text-xs font-bold text-gray-500 uppercase">Qty</label>
        </div>
        <div className="relative">
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            step="0.01"
          />
        </div>
        <span className="text-xs text-gray-400 font-medium mt-1 block pl-1">{item.supportItem.unit}</span>
      </div>

      {/* Frequency */}
      <div className="col-span-12 lg:col-span-3">
        <div className="flex items-center gap-2 mb-1">
          <label className="lg:hidden text-xs font-bold text-gray-500 uppercase">Frequency</label>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={item.frequencyNumber}
            onChange={handleFrequencyNumberChange}
            className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          <select
            value={item.frequencyType}
            onChange={handleFrequencyTypeChange}
            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
          >
            <option value="Week">Week</option>
            <option value="Fortnight">Fortnight</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
            <option value="Day">Day</option>
            <option value="One-off">One-off</option>
          </select>
        </div>
      </div>

      {/* Cost & Delete */}
      <div className="col-span-12 lg:col-span-2 flex items-start justify-between lg:justify-end gap-4">
        <div className="lg:text-right">
          <label className="lg:hidden text-xs font-bold text-gray-500 uppercase block mb-1">Cost</label>
          <span className="text-lg font-black text-[#2C7A7B]">
            ${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 self-center lg:self-start"
          title="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

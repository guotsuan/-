import React from 'react';
import { Calculator, Wallet } from 'lucide-react';

interface CalculatorInputProps {
  total: number;
  equipment: number;
  onTotalChange: (val: number) => void;
  onEquipmentChange: (val: number) => void;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  total,
  equipment,
  onTotalChange,
  onEquipmentChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Calculator size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">经费录入</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            总经费 (万元)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <span className="font-bold">¥</span>
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={total || ''}
              onChange={(e) => onTotalChange(parseFloat(e.target.value) || 0)}
              className="pl-8 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 transition-colors"
              placeholder="请输入总经费"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">项目获批的总金额</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            购置设备费 (万元)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Wallet size={16} />
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={equipment || ''}
              onChange={(e) => onEquipmentChange(parseFloat(e.target.value) || 0)}
              className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 transition-colors"
              placeholder="请输入设备费"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">用于购买硬件设备的预算</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorInput;
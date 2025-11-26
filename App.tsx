import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Info } from 'lucide-react';
import CalculatorInput from './components/CalculatorInput';
import ResultCard from './components/ResultCard';
import BudgetChart from './components/BudgetChart';
import AIAnalysis from './components/AIAnalysis';
import { BudgetResult } from './types';

function App() {
  const [total, setTotal] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);

  // Logic to ensure equipment does not exceed total
  useEffect(() => {
    if (equipment > total) {
      setEquipment(total);
    }
  }, [total, equipment]);

  const result: BudgetResult = useMemo(() => {
    // Math Logic based on updated regulations (30%, 25%, 20%)
    // Let X = Total - Equipment (T - E)
    //
    // Case 1: A-E <= 500
    // Rates: 30%
    // Threshold in T-E space: 500 * 1.3 = 650
    // Formula: B <= [ (T-E) * 0.30 ] / 1.30
    //
    // Case 2: 500 < A-E <= 1000
    // Rates: 500 * 30% + (A-E-500) * 25%
    // Threshold in T-E space: 500 + 500 + (150 + 125) = 1275
    // Formula: B <= [ 150 + (T-E-500)*0.25 ] / 1.25
    //
    // Case 3: A-E > 1000
    // Rates: 500 * 30% + 500 * 25% + (A-E-1000) * 20%
    // Formula: B <= [ 275 + (T-E-1000)*0.20 ] / 1.20

    const effectiveBase = Math.max(0, total - equipment);
    let maxIndirect = 0;

    if (effectiveBase <= 650) {
      // Case 1
      maxIndirect = (effectiveBase * 0.30) / 1.30;
    } else if (effectiveBase <= 1275) {
      // Case 2
      // Fixed base for first 500 (direct) is 150 (indirect)
      maxIndirect = (150 + (effectiveBase - 500) * 0.25) / 1.25;
    } else {
      // Case 3
      // Fixed base for first 1000 (direct) is 150 + 125 = 275 (indirect)
      maxIndirect = (275 + (effectiveBase - 1000) * 0.20) / 1.20;
    }

    // Safety check for negative calculation
    maxIndirect = Math.max(0, maxIndirect);

    const direct = total - maxIndirect;
    const otherDirect = Math.max(0, direct - equipment);

    return {
      total,
      equipment,
      maxIndirect,
      direct,
      otherDirect,
      effectiveBase,
    };
  }, [total, equipment]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
              <Calculator size={20} />
            </div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              科研经费计算器
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
            <Info size={14} />
            <span>基于最新管理规定</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Input and Results */}
          <div className="lg:col-span-5 space-y-6">
            <CalculatorInput 
              total={total}
              equipment={equipment}
              onTotalChange={setTotal}
              onEquipmentChange={setEquipment}
            />
            
            <ResultCard result={result} />

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info size={16}/> 间接经费计算规则
              </h4>
              <ul className="space-y-1 list-disc list-inside opacity-80 text-xs">
                <li>扣除设备费后，500万元及以下部分：<span className="font-bold">30%</span></li>
                <li>超过500万元至1000万元部分：<span className="font-bold">25%</span></li>
                <li>超过1000万元以上部分：<span className="font-bold">20%</span></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Visualization and AI */}
          <div className="lg:col-span-7 space-y-6">
            <BudgetChart data={result} />
            <AIAnalysis result={result} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
import React from 'react';
import { ArrowRight, Coins, PieChart as PieIcon, AlertCircle } from 'lucide-react';
import { BudgetResult } from '../types';

interface ResultCardProps {
  result: BudgetResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5"></div>
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white opacity-5"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Coins className="text-blue-200" size={24} />
            <h2 className="text-xl font-bold">计算结果</h2>
          </div>
          <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-blue-100 backdrop-blur-sm">
            实时更新
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">间接经费上限 (Max Indirect Costs)</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight">
                {result.maxIndirect.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
              <span className="text-blue-200">万元</span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-blue-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-300 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${result.total > 0 ? (result.maxIndirect / result.total) * 100 : 0}%` }}
              ></div>
            </div>
            <p className="text-right text-xs text-blue-200 mt-1">
              占总经费 {result.total > 0 ? ((result.maxIndirect / result.total) * 100).toFixed(2) : 0}%
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="text-blue-200 text-xs mb-1 flex items-center gap-1">
                <ArrowRight size={12} /> 直接经费
              </p>
              <p className="text-lg font-semibold">
                {result.direct.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </p>
            </div>
            <div>
              <p className="text-blue-200 text-xs mb-1 flex items-center gap-1">
                <PieIcon size={12} /> 有效基数 (T-E)
              </p>
              <p className="text-lg font-semibold">
                {result.effectiveBase.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
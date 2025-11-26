import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BudgetResult, ChartData } from '../types';

interface BudgetChartProps {
  data: BudgetResult;
}

const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
  const chartData: ChartData[] = [
    { name: '间接经费 (Indirect)', value: Number(data.maxIndirect.toFixed(2)), fill: '#6366f1' }, // Indigo 500
    { name: '购置设备费 (Equipment)', value: Number(data.equipment.toFixed(2)), fill: '#06b6d4' }, // Cyan 500
    { name: '其他直接经费 (Other Direct)', value: Number(data.otherDirect.toFixed(2)), fill: '#3b82f6' }, // Blue 500
  ].filter(item => item.value > 0);

  return (
    <div className="w-full h-80 bg-white rounded-xl shadow-sm p-4 border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">经费构成分析</h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} 万元`, '金额']}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetChart;
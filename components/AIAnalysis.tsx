import React, { useState } from 'react';
import { Sparkles, RefreshCw, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BudgetResult } from '../types';
import { generateBudgetReport } from '../services/geminiService';

interface AIAnalysisProps {
  result: BudgetResult;
}

const AIAnalysis: React.FC<AIAnalysisProps> = ({ result }) => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async () => {
    if (result.total === 0) return;
    setLoading(true);
    const text = await generateBudgetReport(result);
    setAnalysis(text);
    setLoading(false);
    setHasGenerated(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-600" size={20} />
          <h3 className="font-bold text-slate-800">AI 智能分析助手</h3>
        </div>
        {!loading && (
          <button
            onClick={handleGenerate}
            disabled={result.total === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              result.total === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
            }`}
          >
            {hasGenerated ? <><RefreshCw size={16} /> 重新生成</> : <><FileText size={16} /> 生成预算说明</>}
          </button>
        )}
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="text-slate-500 text-sm animate-pulse">正在分析数据并生成合规性报告...</p>
          </div>
        ) : analysis ? (
          <div className="prose prose-sm prose-slate max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sparkles size={24} className="text-slate-300" />
            </div>
            <p className="text-sm">点击上方按钮，利用 Gemini AI 生成详细的预算编制说明和合规性建议。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
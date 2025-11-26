import { GoogleGenAI } from "@google/genai";
import { BudgetResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateBudgetReport = async (budget: BudgetResult): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  const prompt = `
    作为一名科研经费预算专家，请根据以下数据生成一份简要的预算编制说明：
    
    总经费：${budget.total}万元
    购置设备费：${budget.equipment}万元
    计算出的间接经费上限：${budget.maxIndirect.toFixed(4)}万元
    直接经费：${budget.direct.toFixed(4)}万元
    
    请解释间接经费的计算依据（依据：扣除设备购置费后，500万及以下部分为30%，超过500万至1000万的部分为25%，超过1000万的部分为20%）。
    请确认该计算结果是否合规，并给出一条简短的财务建议。
    请使用Markdown格式输出，保持专业、简洁。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text || "无法生成报告，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成报告时发生错误，请检查网络或API Key配置。";
  }
};
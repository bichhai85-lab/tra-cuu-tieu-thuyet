import React from 'react';
import { PenTool, Search, BookOpen, BarChart3, GraduationCap } from 'lucide-react';

interface Props {
  activeTab: 'grade' | 'lookup' | 'rubric' | 'stats';
  setActiveTab: (tab: 'grade' | 'lookup' | 'rubric' | 'stats') => void;
  recordCount: number;
}

export const Header: React.FC<Props> = ({ activeTab, setActiveTab, recordCount }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* School & Teacher Banner */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white py-3 px-4 sm:px-8 border-b border-red-950/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-base sm:text-lg uppercase">
                  TRƯỜNG THPT TỊNH BIÊN
                </span>
                <span className="bg-amber-400 text-red-950 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Ngữ Văn THPT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200 font-medium mt-0.5">
                GV hướng dẫn: <strong className="text-white font-semibold">Đặng Thị Bích Hải</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/15 flex items-center gap-1.5 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-red-100 font-medium">Đề tham chiếu:</span>
              <strong className="text-white">Đoạn trích Số Đỏ (Vũ Trọng Phụng)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between overflow-x-auto py-2">
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-max">
            <button
              onClick={() => setActiveTab('grade')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'grade'
                  ? 'bg-red-50 text-red-700 shadow-xs border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PenTool className="w-4 h-4 text-red-600" />
              Chấm điểm bài làm
            </button>

            <button
              onClick={() => setActiveTab('lookup')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'lookup'
                  ? 'bg-red-50 text-red-700 shadow-xs border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-red-600" />
              Tra cứu & Sổ điểm
              <span className="ml-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                {recordCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rubric')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'rubric'
                  ? 'bg-red-50 text-red-700 shadow-xs border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-red-600" />
              Đáp án & Thang điểm
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'stats'
                  ? 'bg-red-50 text-red-700 shadow-xs border border-red-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-red-600" />
              Thống kê & Phổ điểm
            </button>
          </div>

          <div className="hidden lg:flex items-center text-xs text-slate-500 font-medium pl-4">
            <span>Khuôn mẫu nhận xét chuẩn • Thang điểm 10.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

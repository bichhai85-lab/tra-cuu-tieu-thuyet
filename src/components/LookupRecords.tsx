import React, { useState, useMemo } from 'react';
import { GradingRecord } from '../types';
import { Search, Filter, Trash2, Eye, Download, Copy, Check, UserCheck, BookOpen, RotateCcw } from 'lucide-react';
import { StandardResultCard } from './StandardResultCard';

interface Props {
  records: GradingRecord[];
  onDeleteRecord: (id: string) => void;
  onResetDefault: () => void;
}

export const LookupRecords: React.FC<Props> = ({ records, onDeleteRecord, onResetDefault }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [scoreFilter, setScoreFilter] = useState<'ALL' | 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'BELOW'>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<GradingRecord | null>(records[0] || null);

  // Extract unique classes
  const classes = useMemo(() => {
    const list = Array.from(new Set(records.map(r => r.studentClass).filter(Boolean)));
    return list.sort();
  }, [records]);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      // Search text
      const matchesSearch =
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.studentCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchQuery.toLowerCase());

      // Class filter
      const matchesClass = selectedClass === 'ALL' || r.studentClass === selectedClass;

      // Score filter
      let matchesScore = true;
      if (scoreFilter === 'EXCELLENT') matchesScore = r.totalScore >= 8.0;
      else if (scoreFilter === 'GOOD') matchesScore = r.totalScore >= 6.5 && r.totalScore < 8.0;
      else if (scoreFilter === 'AVERAGE') matchesScore = r.totalScore >= 5.0 && r.totalScore < 6.5;
      else if (scoreFilter === 'BELOW') matchesScore = r.totalScore < 5.0;

      return matchesSearch && matchesClass && matchesScore;
    });
  }, [records, searchQuery, selectedClass, scoreFilter]);

  // Export full table to CSV
  const exportToCSV = () => {
    const headers = ['Mã HS', 'Họ và tên', 'Lớp', 'Điểm', 'Nhận xét', 'Thời gian'];
    const rows = filteredRecords.map(r => [
      `"${r.studentCode}"`,
      `"${r.studentName}"`,
      `"${r.studentClass}"`,
      `"${r.formattedScore}"`,
      `"${r.comment.replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `So_diem_THPT_Tinh_Bien_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter toolbar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu theo họ tên học sinh, mã số học sinh (TB-1201), từ khóa nhận xét..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Xuất CSV / Excel
            </button>
            <button
              onClick={onResetDefault}
              title="Khôi phục danh sách mẫu ban đầu"
              className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Dữ liệu mẫu
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Lọc theo điểm:
          </span>

          <button
            onClick={() => setScoreFilter('ALL')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              scoreFilter === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả ({records.length})
          </button>

          <button
            onClick={() => setScoreFilter('EXCELLENT')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              scoreFilter === 'EXCELLENT'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            Giỏi (≥ 8.0)
          </button>

          <button
            onClick={() => setScoreFilter('GOOD')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              scoreFilter === 'GOOD'
                ? 'bg-blue-700 text-white'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            Khá (6.5 - 7.9)
          </button>

          <button
            onClick={() => setScoreFilter('AVERAGE')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              scoreFilter === 'AVERAGE'
                ? 'bg-amber-700 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Trung bình (5.0 - 6.4)
          </button>

          <button
            onClick={() => setScoreFilter('BELOW')}
            className={`px-2.5 py-1 rounded-md font-medium transition ${
              scoreFilter === 'BELOW'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            Dưới TB (&lt; 5.0)
          </button>

          {/* Class Filter */}
          <div className="ml-auto flex items-center gap-2">
            <span className="font-semibold text-slate-500">Lớp:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2 py-1 text-slate-700 text-xs font-medium"
            >
              <option value="ALL">Tất cả các lớp</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Student List & Detail Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table / List View */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-red-700" />
              Danh sách bài làm ({filteredRecords.length})
            </h3>
            <span className="text-[11px] text-slate-500">Click để xem phiếu chuẩn</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[620px] overflow-y-auto">
            {filteredRecords.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                Không tìm thấy bài làm nào phù hợp với điều kiện tìm kiếm.
              </div>
            ) : (
              filteredRecords.map((r) => {
                const isSelected = selectedRecord?.id === r.id;
                const score = r.totalScore;
                const scoreBadge = score >= 8.0 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : score >= 6.5 
                  ? 'bg-blue-100 text-blue-800' 
                  : score >= 5.0 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-rose-100 text-rose-800';

                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRecord(r)}
                    className={`p-4 cursor-pointer transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-red-50/60 border-l-4 border-l-red-700'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm truncate">{r.studentName}</span>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-sm">
                          {r.studentClass}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 italic">
                        {r.comment}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{r.studentCode}</span>
                        <span>•</span>
                        <span>{r.submittedAt}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`px-2.5 py-1 rounded-lg font-bold text-sm ${scoreBadge}`}>
                        {r.formattedScore}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Bạn có chắc muốn xóa bài chấm của học sinh ${r.studentName}?`)) {
                            onDeleteRecord(r.id);
                            if (selectedRecord?.id === r.id) {
                              setSelectedRecord(null);
                            }
                          }
                        }}
                        title="Xóa bài này"
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Record Detail Viewer */}
        <div className="lg:col-span-7">
          {selectedRecord ? (
            <div className="space-y-4">
              <StandardResultCard record={selectedRecord} />
            </div>
          ) : (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-slate-700">Chọn một học sinh từ danh sách để xem phiếu xuất kết quả</p>
              <p className="text-xs text-slate-400 mt-1">Đầy đủ khuôn dạng chuẩn của Trường THPT Tịnh Biên</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

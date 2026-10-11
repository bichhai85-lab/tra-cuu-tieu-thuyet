import React, { useState, useEffect, useMemo } from 'react';
import { Search, GraduationCap, Check, Copy, Printer, Download, BookOpen, ChevronDown, ChevronUp, Plus, AlertCircle, AlertTriangle, CheckCircle2, Users, Sparkles } from 'lucide-react';
import { INITIAL_STUDENTS_DATA } from './data/rubric';
import { GradingRecord } from './types';
import { GradingForm } from './components/GradingForm';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState<GradingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('tinhbien_grading_records_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_STUDENTS_DATA.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading records from localStorage:', e);
    }
    return INITIAL_STUDENTS_DATA;
  });

  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<GradingRecord | null>(null);
  const [multipleMatches, setMultipleMatches] = useState<GradingRecord[]>([]);
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<'ALL' | '12A11' | '12A3'>('ALL');

  // Sync records to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tinhbien_grading_records_v4', JSON.stringify(records));
    } catch (e) {
      console.error('Error saving records:', e);
    }
  }, [records]);

  // Handle Search
  const handleSearch = (nameToSearch?: string) => {
    const query = (nameToSearch !== undefined ? nameToSearch : searchTerm).trim();
    if (!query) {
      setSearchError('Vui lòng nhập họ và tên học sinh để tra cứu.');
      setHasSearched(false);
      setSearchResult(null);
      setMultipleMatches([]);
      return;
    }

    setSearchError('');
    setHasSearched(true);

    // Normalize vietnamese string for soft matching
    const normalize = (str: string) =>
      str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    const normalizedQuery = normalize(query);

    // Exact or partial match
    const matches = records.filter(
      r => normalize(r.studentName).includes(normalizedQuery) ||
           normalize(r.studentCode).includes(normalizedQuery)
    );

    if (matches.length === 1) {
      setSearchResult(matches[0]);
      setMultipleMatches([]);
    } else if (matches.length > 1) {
      // If one matches exactly the name
      const exact = matches.find(r => normalize(r.studentName) === normalizedQuery);
      if (exact) {
        setSearchResult(exact);
        setMultipleMatches([]);
      } else {
        setSearchResult(matches[0]);
        setMultipleMatches(matches);
      }
    } else {
      setSearchResult(null);
      setMultipleMatches([]);
    }
  };

  const handleCopy = () => {
    if (!searchResult) return;
    navigator.clipboard.writeText(searchResult.standardOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    if (!searchResult) return;
    const blob = new Blob([searchResult.standardOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ket_qua_${searchResult.studentName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!searchResult) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Kết Quả Tra Cứu - ${searchResult.studentName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; line-height: 1.6; }
            .box { border: 2px solid #222; padding: 25px; border-radius: 6px; max-width: 650px; margin: 0 auto; white-space: pre-wrap; font-family: monospace; font-size: 15px; }
          </style>
        </head>
        <body>
          <div class="box">${searchResult.standardOutput}</div>
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleNewRecordAdded = (newRec: GradingRecord) => {
    setRecords(prev => [newRec, ...prev.filter(r => r.id !== newRec.id)]);
    setShowAddModal(false);
    setSearchTerm(newRec.studentName);
    setSearchResult(newRec);
    setMultipleMatches([]);
    setHasSearched(true);
  };

  // Filtered student list for quick click
  const filteredStudents = useMemo(() => {
    if (selectedClassFilter === 'ALL') return records;
    return records.filter(r => r.studentClass === selectedClassFilter);
  }, [records, selectedClassFilter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header: Trường & Giáo viên */}
      <header className="bg-gradient-to-r from-red-900 via-red-800 to-amber-900 text-white py-4 px-4 sm:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h1 className="font-extrabold tracking-wider text-base sm:text-lg uppercase">
                TRƯỜNG THPT TỊNH BIÊN
              </h1>
              <p className="text-xs sm:text-sm text-amber-200 font-medium">
                GV hướng dẫn: <strong className="text-white font-semibold">Đặng Thị Bích Hài</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="text-xs bg-white/15 hover:bg-white/25 text-white font-semibold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Chấm thêm bài mới</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        {/* Search Input Section - Prominent & Minimal */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              TRA CỨU BÀI LÀM VĂN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Đề tham chiếu: <span className="font-medium text-red-800">Đoạn trích Số Đỏ (Vũ Trọng Phụng)</span>
            </p>
          </div>

          {/* Form with Name Input and Search Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex flex-col sm:flex-row gap-2.5 pt-1"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setHasSearched(false);
                  setSearchResult(null);
                  setMultipleMatches([]);
                  if (searchError) setSearchError('');
                }}
                placeholder="Nhập họ và tên học sinh (ví dụ: Lý Trinh Trinh, Lê Thị Nhựt Linh)..."
                className="w-full text-base sm:text-sm pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition shadow-inner font-medium"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setHasSearched(false);
                    setSearchResult(null);
                    setMultipleMatches([]);
                  }}
                  className="absolute right-3 top-3.5 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold rounded-xl text-base sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Tra cứu</span>
            </button>
          </form>

          {/* Error notice */}
          {searchError && (
            <div className="text-xs text-rose-600 font-medium flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Quick Click Suggestions by Class */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-red-700" />
                Chọn học sinh vào ô tìm kiếm ({records.length} học sinh):
              </span>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setSelectedClassFilter('ALL')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${
                    selectedClassFilter === 'ALL'
                      ? 'bg-red-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả ({records.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedClassFilter('12A11')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${
                    selectedClassFilter === '12A11'
                      ? 'bg-red-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Lớp 12A11
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedClassFilter('12A3')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${
                    selectedClassFilter === '12A3'
                      ? 'bg-red-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Lớp 12A3
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50/70 rounded-xl border border-slate-200">
              {filteredStudents.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setSearchTerm(r.studentName);
                    setHasSearched(false);
                    setSearchResult(null);
                    setMultipleMatches([]);
                    if (searchError) setSearchError('');
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition border flex items-center gap-1.5 ${
                    searchTerm === r.studentName
                      ? 'bg-red-700 text-white border-red-700 shadow-xs'
                      : 'bg-white hover:bg-red-50 hover:text-red-700 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{r.studentName}</span>
                  <span className={`text-[10px] font-mono px-1 py-0.2 rounded-sm ${
                    searchTerm === r.studentName ? 'bg-red-800 text-red-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {r.studentClass}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * Nhấp chọn tên học sinh ở trên hoặc tự nhập họ tên, sau đó ấn nút <strong>"Tra cứu"</strong> để hiển thị thông tin bài làm.
            </p>
          </div>
        </div>

        {/* RESULTS SECTION: Only displays when user clicks "Tra cứu" */}
        {hasSearched && (
          <div className="space-y-6 animate-fadeIn">
            {/* If multiple students match search query */}
            {multipleMatches.length > 1 && (
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs space-y-2">
                <span className="font-bold text-amber-900">
                  Tìm thấy {multipleMatches.length} học sinh trùng khớp. Hãy chọn học sinh cần xem:
                </span>
                <div className="flex flex-wrap gap-2">
                  {multipleMatches.map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSearchResult(m);
                        setSearchTerm(m.studentName);
                      }}
                      className={`px-3 py-1.5 rounded-lg border font-medium transition ${
                        searchResult?.id === m.id
                          ? 'bg-amber-700 text-white border-amber-700 font-bold'
                          : 'bg-white hover:bg-amber-100 text-slate-800 border-amber-300'
                      }`}
                    >
                      {m.studentName} ({m.studentClass}) - {m.formattedScore}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResult ? (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                {/* Header of Result */}
                <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-bold text-sm sm:text-base tracking-wide">
                      KẾT QUẢ TRA CỨU & CHẤM ĐIỂM
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                        copied
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Đã sao chép!' : 'Sao chép kết quả'}</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      title="In phiếu"
                      className="p-1.5 bg-white/15 hover:bg-white/25 text-white rounded-lg transition"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDownloadTxt}
                      title="Tải văn bản .txt"
                      className="p-1.5 bg-white/15 hover:bg-white/25 text-white rounded-lg transition"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* EXACT REQUIRED OUTPUT TEMPLATE */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Khuôn dạng văn bản chuẩn THPT Tịnh Biên
                      </span>
                    </div>

                    <div className="relative bg-slate-950 text-slate-100 p-5 rounded-xl font-mono text-sm leading-relaxed border border-slate-800 shadow-inner overflow-x-auto selection:bg-amber-500 selection:text-black">
                      <pre className="whitespace-pre-wrap font-mono select-all">
{searchResult.standardOutput}
                      </pre>

                      <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs flex items-center gap-1 transition"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500">Họ và tên học sinh</p>
                      <h4 className="font-bold text-slate-900 text-base mt-0.5">{searchResult.studentName}</h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Lớp: <strong className="text-slate-800">{searchResult.studentClass}</strong> {searchResult.studentCode ? `• SBD: ${searchResult.studentCode}` : ''}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Điểm số</p>
                        <h4 className="font-extrabold text-2xl text-red-700 mt-0.5">{searchResult.formattedScore}</h4>
                        <p className="text-[11px] text-slate-400">Thang điểm 10.0</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        searchResult.totalScore >= 8.0
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchResult.totalScore >= 6.5
                          ? 'bg-blue-100 text-blue-800'
                          : searchResult.totalScore >= 5.0
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {searchResult.totalScore >= 8.0 ? 'Loại Giỏi' : searchResult.totalScore >= 6.5 ? 'Loại Khá' : searchResult.totalScore >= 5.0 ? 'Trung bình' : 'Dưới TB'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500">Thời gian chấm</p>
                      <h4 className="font-semibold text-slate-800 text-sm mt-0.5">{searchResult.submittedAt}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Đề: Số Đỏ (5 câu)</p>
                    </div>
                  </div>

                  {/* Detailed Student Submission & Question Breakdown */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setShowBreakdown(!showBreakdown)}
                      className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-left font-bold text-slate-800 text-sm transition"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-red-700" />
                        Chi tiết bài làm từng câu (Câu 1 đến Câu 5)
                      </span>
                      {showBreakdown ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {showBreakdown && (
                      <div className="p-5 space-y-4 bg-white border-t border-slate-200">
                        {/* Q1 */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                              Câu 1 (Thang điểm: 1.0đ) • Ngôi kể thứ ba
                            </span>
                            <span className={`px-2 py-0.5 font-bold text-xs rounded-md ${
                              searchResult.q1Score === 1.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {searchResult.q1Score} / 1.0đ
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800">
                            <strong>Bài làm của học sinh:</strong> {searchResult.answers?.q1 || '(Không có)'}
                          </div>
                          {searchResult.q1Feedback && (
                            <p className="text-xs text-slate-500 italic">Nhận xét: {searchResult.q1Feedback}</p>
                          )}
                          {searchResult.q1Score < 1.0 ? (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                              </div>
                              <p className="text-rose-900 font-medium pl-5 leading-relaxed">
                                {searchResult.q1MissingReason || 'Chưa xác định đúng ngôi kể thứ ba (Đáp án chuẩn: Ngôi kể thứ ba).'}
                              </p>
                            </div>
                          ) : (
                            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center gap-1.5 text-emerald-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Đạt điểm tối đa (1.0/1.0đ) - Xác định chính xác ngôi kể thứ ba.</span>
                            </div>
                          )}
                        </div>

                        {/* Q2 */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                              Câu 2 (Thang điểm: 2.0đ) • 2 chi tiết hoàn cảnh nhân vật
                            </span>
                            <span className={`px-2 py-0.5 font-bold text-xs rounded-md ${
                              searchResult.q2Score === 2.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {searchResult.q2Score} / 2.0đ
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800">
                            <strong>Bài làm của học sinh:</strong> {searchResult.answers?.q2 || '(Không có)'}
                          </div>
                          {searchResult.q2Feedback && (
                            <p className="text-xs text-slate-500 italic">Nhận xét: {searchResult.q2Feedback}</p>
                          )}
                          {searchResult.q2Score < 2.0 ? (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                              </div>
                              <p className="text-rose-900 font-medium pl-5 leading-relaxed">
                                {searchResult.q2MissingReason || 'Chưa trích dẫn đủ 2 chi tiết hoàn cảnh cụ thể (mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm các nghề vặt mưu sinh) để đạt trọn 2.0đ.'}
                              </p>
                            </div>
                          ) : (
                            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center gap-1.5 text-emerald-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Đạt điểm tối đa (2.0/2.0đ) - Nêu đủ 2 chi tiết hoàn cảnh chính xác theo đoạn trích.</span>
                            </div>
                          )}
                        </div>

                        {/* Q3 */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                              Câu 3 (Thang điểm: 2.0đ) • 2 nguyên nhân tin lời thầy bói
                            </span>
                            <span className={`px-2 py-0.5 font-bold text-xs rounded-md ${
                              searchResult.q3Score === 2.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {searchResult.q3Score} / 2.0đ
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800">
                            <strong>Bài làm của học sinh:</strong> {searchResult.answers?.q3 || '(Không có)'}
                          </div>
                          {searchResult.q3Feedback && (
                            <p className="text-xs text-slate-500 italic">Nhận xét: {searchResult.q3Feedback}</p>
                          )}
                          {searchResult.q3Score < 2.0 ? (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                              </div>
                              <p className="text-rose-900 font-medium pl-5 leading-relaxed">
                                {searchResult.q3MissingReason || 'Chưa nêu trọn vẹn cả 2 nguyên nhân (cần đủ: thầy bói đoán trúng chi tiết thực tế VÀ tâm lý ham danh vọng, khao khát đổi đời của Xuân).'}
                              </p>
                            </div>
                          ) : (
                            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center gap-1.5 text-emerald-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Đạt điểm tối đa (2.0/2.0đ) - Nêu trọn vẹn cả 2 nguyên nhân thực tế và tâm lý đổi đời.</span>
                            </div>
                          )}
                        </div>

                        {/* Q4 */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                              Câu 4 (Thang điểm: 2.0đ) • Giọng điệu trào phúng, mỉa mai
                            </span>
                            <span className={`px-2 py-0.5 font-bold text-xs rounded-md ${
                              searchResult.q4Score === 2.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {searchResult.q4Score} / 2.0đ
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800">
                            <strong>Bài làm của học sinh:</strong> {searchResult.answers?.q4 || '(Không có)'}
                          </div>
                          {searchResult.q4Feedback && (
                            <p className="text-xs text-slate-500 italic">Nhận xét: {searchResult.q4Feedback}</p>
                          )}
                          {searchResult.q4Score < 2.0 ? (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                              </div>
                              <p className="text-rose-900 font-medium pl-5 leading-relaxed">
                                {searchResult.q4MissingReason || 'Chưa gọi tên và làm nổi bật đặc trưng "giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo" của Vũ Trọng Phụng.'}
                              </p>
                            </div>
                          ) : (
                            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center gap-1.5 text-emerald-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Đạt điểm tối đa (2.0/2.0đ) - Nhận diện chính xác giọng điệu trào phúng, mỉa mai, châm biếm.</span>
                            </div>
                          )}
                        </div>

                        {/* Q5 */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                              Câu 5 (Thang điểm: 3.0đ) • Đoạn văn 5-7 dòng (tác hại mê tín & tự rèn luyện)
                            </span>
                            <span className={`px-2 py-0.5 font-bold text-xs rounded-md ${
                              searchResult.q5Score === 3.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {searchResult.q5Score} / 3.0đ
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                            <strong>Bài làm của học sinh:</strong> {searchResult.answers?.q5 || '(Không có)'}
                          </div>
                          {searchResult.q5Feedback && (
                            <p className="text-xs text-slate-500 italic">Nhận xét: {searchResult.q5Feedback}</p>
                          )}
                          {searchResult.q5Score < 3.0 ? (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                              </div>
                              <p className="text-rose-900 font-medium pl-5 leading-relaxed">
                                {searchResult.q5MissingReason || 'Đoạn văn cần bảo đảm dung lượng 5-7 dòng và phân tích sâu cả 2 vế: tác hại mê tín cùng ý nghĩa tự rèn luyện bản thân.'}
                              </p>
                            </div>
                          ) : (
                            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs flex items-center gap-1.5 text-emerald-800 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Đạt điểm tối đa (3.0/3.0đ) - Đoạn văn chuẩn mực 5-7 dòng, lập luận sâu sắc, tư tưởng giáo dục rõ nét.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                <h3 className="font-bold text-slate-800 text-base">
                  Không tìm thấy bài làm của học sinh "{searchTerm}"
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Chưa có bài thi nào được chấm với tên này trong cơ sở dữ liệu của Trường THPT Tịnh Biên. Bạn có thể chọn tên từ danh sách gợi ý hoặc nhấp vào "Chấm bài mới" để thêm bài làm.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
                  >
                    Chấm bài làm mới cho học sinh này
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal: Chấm bài mới (nếu giáo viên muốn nạp thêm bài) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-10">
              <h3 className="font-bold text-sm">Chấm bài làm văn học sinh mới - Đề Số Đỏ</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <GradingForm onGraded={handleNewRecordAdded} />
            </div>
          </div>
        </div>
      )}

      {/* School Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-bold text-slate-800">
            TRƯỜNG THPT TỊNH BIÊN
          </p>
          <p className="text-slate-600">
            GV hướng dẫn: <strong>Đặng Thị Bích Hài</strong>
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Hệ thống hỗ trợ tra cứu kết quả bài làm văn môn Ngữ văn THPT
          </p>
        </div>
      </footer>
    </div>
  );
}

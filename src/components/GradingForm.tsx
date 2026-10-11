import React, { useState } from 'react';
import { SAMPLE_STUDENT_PRESETS } from '../data/rubric';
import { GradingRecord } from '../types';
import { Send, Sparkles, BookOpen, User, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  onGraded: (record: GradingRecord) => void;
}

export const GradingForm: React.FC<Props> = ({ onGraded }) => {
  const [studentName, setStudentName] = useState('Nguyễn Văn An');
  const [studentClass, setStudentClass] = useState('12A1');
  const [studentCode, setStudentCode] = useState('TB-1209');

  const [inputMode, setInputMode] = useState<'stepByStep' | 'fullText'>('stepByStep');

  // Question answers
  const [q1, setQ1] = useState('Đoạn trích được kể theo ngôi kể thứ ba.');
  const [q2, setQ2] = useState('Hoàn cảnh của nhân vật Xuân Tóc Đỏ: là đứa trẻ mồ côi cả cha lẫn mẹ, từng đi ở nhờ nhưng sau đó bị đuổi; hắn phải lấy đầu hè góc phố làm nhà và làm đủ nghề vặt để kiếm sống.');
  const [q3, setQ3] = useState('Xuân Tóc Đỏ tin lời thầy bói vì hai lý do: thầy bói đã đoán trúng một số chi tiết thực tế về cảnh ngộ nghèo khó trước đây của hắn, đồng thời xuất phát từ tâm lý ham danh vọng, khao khát đổi đời của bản thân.');
  const [q4, setQ4] = useState('Tác giả sử dụng giọng điệu trào phúng, mỉa mai và châm biếm sâu sắc.');
  const [q5, setQ5] = useState('Mê tín dị đoan và việc chỉ biết trông chờ vào vận may rủi là suy nghĩ tiêu cực, làm thui chột ý chí phấn đấu của mỗi người. Thay vì đặt tương lai vào những điều hão huyền, mỗi học sinh cần nhận thức rõ tầm quan trọng của việc tự rèn luyện bản thân, nỗ lực học tập và rèn luyện nhân cách. Tương lai bền vững chỉ được tạo dựng từ chính mồ hôi và năng lực thực sự của chúng ta.');

  const [fullText, setFullText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Preset selection
  const handleSelectPreset = (index: number) => {
    const preset = SAMPLE_STUDENT_PRESETS[index];
    if (!preset) return;
    setStudentName(preset.name);
    setStudentClass(preset.className);
    setStudentCode(preset.code);
    setQ1(preset.answers.q1);
    setQ2(preset.answers.q2);
    setQ3(preset.answers.q3);
    setQ4(preset.answers.q4);
    setQ5(preset.answers.q5);
    setFullText([
      `Họ và tên: ${preset.name}`,
      `Lớp: ${preset.className}`,
      `Câu 1: ${preset.answers.q1}`,
      `Câu 2: ${preset.answers.q2}`,
      `Câu 3: ${preset.answers.q3}`,
      `Câu 4: ${preset.answers.q4}`,
      `Câu 5: ${preset.answers.q5}`
    ].join('\n\n'));
  };

  const handleClear = () => {
    setStudentName('');
    setStudentClass('');
    setStudentCode('');
    setQ1('');
    setQ2('');
    setQ3('');
    setQ4('');
    setQ5('');
    setFullText('');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('Vui lòng nhập họ và tên học sinh trước khi chấm điểm.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        studentName: studentName.trim(),
        studentClass: studentClass.trim(),
        q1: inputMode === 'stepByStep' ? q1 : '',
        q2: inputMode === 'stepByStep' ? q2 : '',
        q3: inputMode === 'stepByStep' ? q3 : '',
        q4: inputMode === 'stepByStep' ? q4 : '',
        q5: inputMode === 'stepByStep' ? q5 : '',
        fullText: inputMode === 'fullText' ? fullText : '',
      };

      const response = await fetch('/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      const newRecord: GradingRecord = {
        id: `rec-${Date.now()}`,
        studentName: studentName.trim(),
        studentClass: studentClass.trim() || '12',
        studentCode: studentCode.trim() || `TB-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleString('vi-VN'),
        answers: {
          q1: inputMode === 'stepByStep' ? q1 : 'Theo bài nộp tổng hợp',
          q2: inputMode === 'stepByStep' ? q2 : 'Theo bài nộp tổng hợp',
          q3: inputMode === 'stepByStep' ? q3 : 'Theo bài nộp tổng hợp',
          q4: inputMode === 'stepByStep' ? q4 : 'Theo bài nộp tổng hợp',
          q5: inputMode === 'stepByStep' ? q5 : fullText,
        },
        q1Score: Number(data.q1Score ?? 0),
        q1Feedback: data.q1Feedback || '',
        q1MissingReason: data.q1MissingReason || '',
        q2Score: Number(data.q2Score ?? 0),
        q2Feedback: data.q2Feedback || '',
        q2MissingReason: data.q2MissingReason || '',
        q3Score: Number(data.q3Score ?? 0),
        q3Feedback: data.q3Feedback || '',
        q3MissingReason: data.q3MissingReason || '',
        q4Score: Number(data.q4Score ?? 0),
        q4Feedback: data.q4Feedback || '',
        q4MissingReason: data.q4MissingReason || '',
        q5Score: Number(data.q5Score ?? 0),
        q5Feedback: data.q5Feedback || '',
        q5MissingReason: data.q5MissingReason || '',
        totalScore: Number(data.totalScore ?? 0),
        formattedScore: data.formattedScore || `${data.totalScore}/10`,
        comment: data.comment || '',
        standardOutput: data.standardOutput || '',
        goodPoints: data.goodPoints,
        missingPoints: data.missingPoints,
        notGoodPoints: data.notGoodPoints,
        improvementPoints: data.improvementPoints,
      };

      onGraded(newRecord);
    } catch (err: any) {
      console.error('Lỗi khi chấm điểm:', err);
      setErrorMsg('Không thể kết nối đến máy chủ chấm điểm. Vui lòng thử lại sau ít phút.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
      {/* Form Header */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-700" />
            Nhập bài làm của học sinh - Đề "Số Đỏ"
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hệ thống đối chiếu trực tiếp với thang điểm 5 câu và quy chuẩn nhận xét THPT Tịnh Biên
          </p>
        </div>

        {/* Preset Sample Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Bài nộp mẫu:</span>
          <select
            onChange={(e) => {
              if (e.target.value !== '') {
                handleSelectPreset(Number(e.target.value));
              }
            }}
            defaultValue=""
            className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
          >
            <option value="" disabled>-- Chọn bài làm mẫu thử nghiệm --</option>
            {SAMPLE_STUDENT_PRESETS.map((p, idx) => (
              <option key={idx} value={idx}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Student metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Họ và tên học sinh <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full text-sm pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Lớp học
            </label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              placeholder="Ví dụ: 12A1"
              className="w-full text-sm px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Mã học sinh / Số báo danh
            </label>
            <input
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="Ví dụ: TB-1209"
              className="w-full text-sm px-3 py-2 bg-slate-50/70 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
            />
          </div>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setInputMode('stepByStep')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${
              inputMode === 'stepByStep'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Nhập bài làm từng câu (Câu 1 - Câu 5)
          </button>
          <button
            type="button"
            onClick={() => setInputMode('fullText')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 transition ${
              inputMode === 'fullText'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Dán nhanh toàn bộ văn bản bài làm
          </button>
        </div>

        {/* Question Answers Input */}
        {inputMode === 'stepByStep' ? (
          <div className="space-y-4">
            {/* Question 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">1</span>
                  Câu 1: Xác định ngôi kể của đoạn trích
                </label>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Thang điểm: 1.0đ
                </span>
              </div>
              <textarea
                rows={2}
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                placeholder="Nhập câu trả lời của học sinh cho câu 1 (Đáp án chuẩn: Ngôi kể thứ ba)..."
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            {/* Question 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">2</span>
                  Câu 2: Nêu 2 chi tiết về hoàn cảnh của nhân vật Xuân Tóc Đỏ
                </label>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Thang điểm: 2.0đ (Mỗi ý 1.0đ)
                </span>
              </div>
              <textarea
                rows={3}
                value={q2}
                onChange={(e) => setQ2(e.target.value)}
                placeholder="Nhập câu trả lời của học sinh cho câu 2 (mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm đủ nghề vặt kiếm sống...)..."
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            {/* Question 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">3</span>
                  Câu 3: Nêu 2 nguyên nhân Xuân Tóc Đỏ tin vào lời phán của thầy bói
                </label>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Thang điểm: 2.0đ (Mỗi ý 1.0đ)
                </span>
              </div>
              <textarea
                rows={3}
                value={q3}
                onChange={(e) => setQ3(e.target.value)}
                placeholder="Nhập câu trả lời cho câu 3 (Thầy đoán trúng chi tiết thực tế; Tâm lý ham danh vọng, muốn đổi đời)..."
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            {/* Question 4 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">4</span>
                  Câu 4: Nhận xét giọng điệu của tác giả trong đoạn trích
                </label>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Thang điểm: 2.0đ
                </span>
              </div>
              <textarea
                rows={2}
                value={q4}
                onChange={(e) => setQ4(e.target.value)}
                placeholder="Nhập câu trả lời cho câu 4 (Giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo)..."
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            {/* Question 5 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">5</span>
                  Câu 5: Đoạn văn ngắn (5 - 7 dòng) về tác hại mê tín & tự rèn luyện bản thân
                </label>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Thang điểm: 3.0đ
                </span>
              </div>
              <textarea
                rows={5}
                value={q5}
                onChange={(e) => setQ5(e.target.value)}
                placeholder="Nhập đoạn văn của học sinh (yêu cầu từ 5 đến 7 dòng, nêu rõ tác hại của mê tín/may rủi và tầm quan trọng của việc tự rèn luyện bản thân)..."
                className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Dán toàn bộ văn bản bài làm (Bao gồm Câu 1 đến Câu 5)
            </label>
            <textarea
              rows={12}
              value={fullText}
              onChange={(e) => setFullText(e.target.value)}
              placeholder="Dán toàn bộ bài làm của học sinh tại đây. Hệ thống sẽ tự động bóc tách từng câu để chấm điểm chi tiết theo thang điểm 10.0..."
              className="w-full text-sm p-3.5 bg-white border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 font-mono"
            />
          </div>
        )}

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Xóa trắng biểu mẫu
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-md flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang chấm điểm theo thang điểm...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Chấm điểm & Xuất kết quả chuẩn</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

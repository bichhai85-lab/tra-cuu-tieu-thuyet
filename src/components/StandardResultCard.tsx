import React, { useState } from 'react';
import { GradingRecord } from '../types';
import { Check, Copy, Download, Printer, ChevronDown, ChevronUp, FileText, User, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  record: GradingRecord;
  onSaveToRecords?: () => void;
  isAlreadySaved?: boolean;
}

export const StandardResultCard: React.FC<Props> = ({ record, onSaveToRecords, isAlreadySaved }) => {
  const [copied, setCopied] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(record.standardOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([record.standardOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ket_qua_cham_${record.studentName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Phiếu Chấm Điểm - ${record.studentName}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; line-height: 1.6; }
            .box { border: 2px solid #222; padding: 25px; border-radius: 6px; max-width: 650px; margin: 0 auto; white-space: pre-wrap; font-family: monospace; font-size: 15px; }
            h2 { text-align: center; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="box">${record.standardOutput}</div>
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Color theme according to score
  const scoreNum = record.totalScore;
  const scoreBadgeBg = scoreNum >= 8.0 
    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
    : scoreNum >= 6.5 
    ? 'bg-blue-100 text-blue-800 border-blue-300' 
    : scoreNum >= 5.0 
    ? 'bg-amber-100 text-amber-800 border-amber-300' 
    : 'bg-rose-100 text-rose-800 border-rose-300';

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-amber-700 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-xs">
            <Award className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-semibold text-lg tracking-wide">KẾT QUẢ TRA CỨU & CHẤM ĐIỂM CHUẨN</h3>
            <p className="text-xs text-red-100">TRƯỜNG THPT TỊNH BIÊN • GV: ĐẶNG THỊ BÍCH HÀI</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSaveToRecords && !isAlreadySaved && (
            <button
              onClick={onSaveToRecords}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-lg text-xs font-semibold shadow-xs transition flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Lưu vào sổ điểm
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
              copied 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : 'bg-white/15 text-white hover:bg-white/25 border-white/20'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Đã sao chép!' : 'Sao chép khuôn dạng'}
          </button>
          <button
            onClick={handleDownloadTxt}
            title="Tải văn bản .txt"
            className="p-1.5 bg-white/15 hover:bg-white/25 text-white rounded-lg transition"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrint}
            title="In kết quả"
            className="p-1.5 bg-white/15 hover:bg-white/25 text-white rounded-lg transition"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Exact Required Standard Output Block */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Khuôn dạng giao diện xuất ra (Quy chuẩn THPT Tịnh Biên)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Định dạng văn bản hành chính giáo dục</span>
          </div>
          
          <div className="relative bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-sm leading-relaxed border border-slate-700 shadow-inner overflow-x-auto selection:bg-amber-500 selection:text-black">
            <pre className="whitespace-pre-wrap font-mono select-all">
{record.standardOutput}
            </pre>

            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-md text-xs flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Đã chép' : 'Sao chép'}
            </button>
          </div>
        </div>

        {/* Visual Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Họ và tên học sinh</p>
              <h4 className="font-bold text-slate-800 text-base">{record.studentName}</h4>
              <p className="text-xs text-slate-500">{record.studentClass ? `Lớp: ${record.studentClass}` : 'THPT Tịnh Biên'}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border ${scoreBadgeBg}`}>
              {record.formattedScore}
            </div>
            <div>
              <p className="text-xs text-slate-500">Điểm số bài thi</p>
              <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md border ${scoreBadgeBg}`}>
                {scoreNum >= 8.0 ? 'Loại Giỏi' : scoreNum >= 6.5 ? 'Loại Khá' : scoreNum >= 5.0 ? 'Trung bình' : 'Dưới trung bình'}
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">Thang điểm 10.0</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              ĐSĐ
            </div>
            <div>
              <p className="text-xs text-slate-500">Đề tham chiếu</p>
              <h4 className="font-semibold text-slate-800 text-sm">Đoạn trích Số Đỏ</h4>
              <p className="text-xs text-slate-500">Vũ Trọng Phụng (5 câu)</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Toggle */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full px-5 py-3.5 flex items-center justify-between text-left font-semibold text-slate-700 hover:bg-slate-100/70 transition"
          >
            <span className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-red-700" />
              Chi tiết biểu điểm từng câu (1 đến 5) & Cấu trúc nhận xét
            </span>
            {showBreakdown ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {showBreakdown && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-4">
              {/* Question breakdown grid */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Câu 1 (Tối đa 1.0đ):</span>
                      <span className="text-slate-600 text-xs ml-2">Ngôi kể thứ ba</span>
                      {record.q1Feedback && <p className="text-xs text-slate-500 mt-0.5">{record.q1Feedback}</p>}
                    </div>
                    <span className={`font-bold px-2.5 py-1 rounded-md text-xs whitespace-nowrap self-start sm:self-auto border ${
                      record.q1Score === 1.0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {record.q1Score} / 1.0 điểm
                    </span>
                  </div>
                  {record.q1Score < 1.0 ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                      </div>
                      <p className="text-rose-900 font-medium pl-5">{record.q1MissingReason || 'Chưa xác định đúng ngôi kể thứ ba.'}</p>
                    </div>
                  ) : (
                    <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Đạt điểm tối đa (1.0/1.0đ) - Trả lời chính xác ngôi kể thứ ba.</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Câu 2 (Tối đa 2.0đ):</span>
                      <span className="text-slate-600 text-xs ml-2">2 chi tiết hoàn cảnh mồ côi, ở nhờ bị đuổi, lấy đầu hè làm nhà, làm nghề vặt</span>
                      {record.q2Feedback && <p className="text-xs text-slate-500 mt-0.5">{record.q2Feedback}</p>}
                    </div>
                    <span className={`font-bold px-2.5 py-1 rounded-md text-xs whitespace-nowrap self-start sm:self-auto border ${
                      record.q2Score === 2.0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {record.q2Score} / 2.0 điểm
                    </span>
                  </div>
                  {record.q2Score < 2.0 ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                      </div>
                      <p className="text-rose-900 font-medium pl-5">{record.q2MissingReason || 'Chưa trích dẫn đủ 2 chi tiết hoàn cảnh cụ thể từ đoạn trích.'}</p>
                    </div>
                  ) : (
                    <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Đạt điểm tối đa (2.0/2.0đ) - Nêu đủ 2 chi tiết hoàn cảnh đúng theo đoạn trích.</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Câu 3 (Tối đa 2.0đ):</span>
                      <span className="text-slate-600 text-xs ml-2">2 nguyên nhân: thầy đoán trúng thực tế & tâm lý ham danh vọng đổi đời</span>
                      {record.q3Feedback && <p className="text-xs text-slate-500 mt-0.5">{record.q3Feedback}</p>}
                    </div>
                    <span className={`font-bold px-2.5 py-1 rounded-md text-xs whitespace-nowrap self-start sm:self-auto border ${
                      record.q3Score === 2.0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {record.q3Score} / 2.0 điểm
                    </span>
                  </div>
                  {record.q3Score < 2.0 ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                      </div>
                      <p className="text-rose-900 font-medium pl-5">{record.q3MissingReason || 'Chưa nêu đủ 2 nguyên nhân (cần đủ: thầy bói nói trúng chi tiết thực tế VÀ tâm lý ham đổi đời của Xuân).'}</p>
                    </div>
                  ) : (
                    <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Đạt điểm tối đa (2.0/2.0đ) - Nêu trọn vẹn cả 2 nguyên nhân thực tế và tâm lý đổi đời.</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Câu 4 (Tối đa 2.0đ):</span>
                      <span className="text-slate-600 text-xs ml-2">Giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo</span>
                      {record.q4Feedback && <p className="text-xs text-slate-500 mt-0.5">{record.q4Feedback}</p>}
                    </div>
                    <span className={`font-bold px-2.5 py-1 rounded-md text-xs whitespace-nowrap self-start sm:self-auto border ${
                      record.q4Score === 2.0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {record.q4Score} / 2.0 điểm
                    </span>
                  </div>
                  {record.q4Score < 2.0 ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                      </div>
                      <p className="text-rose-900 font-medium pl-5">{record.q4MissingReason || 'Chưa làm nổi bật giọng điệu trào phúng, mỉa mai, châm biếm sâu cay.'}</p>
                    </div>
                  ) : (
                    <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Đạt điểm tối đa (2.0/2.0đ) - Nhận diện chính xác giọng điệu trào phúng, mỉa mai, châm biếm.</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">Câu 5 (Tối đa 3.0đ):</span>
                      <span className="text-slate-600 text-xs ml-2">Đoạn văn 5-7 dòng: tác hại mê tín/may rủi & tầm quan trọng tự rèn luyện</span>
                      {record.q5Feedback && <p className="text-xs text-slate-500 mt-0.5">{record.q5Feedback}</p>}
                    </div>
                    <span className={`font-bold px-2.5 py-1 rounded-md text-xs whitespace-nowrap self-start sm:self-auto border ${
                      record.q5Score === 3.0 ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {record.q5Score} / 3.0 điểm
                    </span>
                  </div>
                  {record.q5Score < 3.0 ? (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-800">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Mặt chưa làm được (Lý do chưa trọn điểm):</span>
                      </div>
                      <p className="text-rose-900 font-medium pl-5">{record.q5MissingReason || 'Đoạn văn cần đạt đủ dung lượng 5-7 dòng và phân tích sâu cả 2 vế tác hại mê tín cùng ý nghĩa tự rèn luyện.'}</p>
                    </div>
                  ) : (
                    <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Đạt điểm tối đa (3.0/3.0đ) - Đoạn văn chuẩn mực 5-7 dòng, tư tưởng giáo dục sâu sắc.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Strict comment formula explanation */}
              <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  Công thức nhận xét chuẩn được áp dụng:
                </p>
                <div className="p-2.5 bg-white rounded-lg border border-amber-300 font-mono text-[12px] text-amber-900 leading-relaxed">
                  "Bài làm này được <span className="text-emerald-700 font-bold">[điểm tốt/đúng]</span>, thiếu <span className="text-amber-700 font-bold">[ý còn thiếu]</span>, chưa được <span className="text-rose-700 font-bold">[điểm chưa chuẩn/chưa sâu]</span>, cần <span className="text-blue-700 font-bold">[hướng khắc phục ngắn gọn]</span>."
                </div>
                <p className="text-[11px] text-amber-800 italic">
                  * Hệ thống tuân thủ nghiêm ngặt 3 quy tắc: Không xưng cô/thầy/AI; Không gắn chữ AI vào điểm số; Nhận xét duy nhất một khuôn mẫu quy định.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

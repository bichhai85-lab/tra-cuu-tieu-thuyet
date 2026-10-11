import React from 'react';
import { RUBRIC_SO_DO } from '../data/rubric';
import { BookOpen, ShieldAlert, Award, FileCode, CheckCircle, School } from 'lucide-react';

export const RubricGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Official Guidelines Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
              <School className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 uppercase">
                TRƯỜNG THPT TỊNH BIÊN
              </h2>
              <p className="text-sm font-semibold text-red-700">
                GV hướng dẫn: Đặng Thị Bích Hài
              </p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg text-xs text-amber-900 font-medium">
            Tài liệu hướng dẫn chấm thi môn Ngữ Văn • Kỳ thi THPT
          </div>
        </div>

        {/* 3 Strict Rules */}
        <div className="mt-5 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            3 Quy tắc nhận xét và xuất kết quả bắt buộc:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 text-[11px] font-bold rounded-md">
                Quy tắc 1
              </span>
              <h4 className="font-bold text-slate-800 text-sm">Không xưng danh xưng</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tuyệt đối <strong className="text-red-700">KHÔNG</strong> xưng "cô", "thầy" hay "AI" trong toàn bộ phần nhận xét và kết quả điểm số.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-md">
                Quy tắc 2
              </span>
              <h4 className="font-bold text-slate-800 text-sm">Mẫu nhận xét duy nhất</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nhận xét phải ngắn gọn, dùng công thức:
                <br />
                <span className="font-mono text-[11px] text-slate-800 font-medium bg-slate-100 px-1 py-0.5 rounded-sm block mt-1">
                  "Bài làm này được [mặt tốt], thiếu [ý thiếu], chưa được [mặt chưa tốt], cần [hướng cải thiện]."
                </span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-md">
                Quy tắc 3
              </span>
              <h4 className="font-bold text-slate-800 text-sm">Định dạng điểm số thuần túy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tuyệt đối <strong className="text-red-700">KHÔNG</strong> gắn chữ "AI" ở phần điểm số. Điểm chỉ ghi dạng số <span className="font-mono font-bold text-slate-800">X/10</span> hoặc <span className="font-mono font-bold text-slate-800">X.X/10</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Standard Template Preview */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-700">
          <p className="text-[11px] text-amber-400 font-sans font-bold uppercase mb-2">
            Khuôn dạng giao diện xuất ra (Chuẩn biểu mẫu):
          </p>
          <pre className="whitespace-pre-wrap select-all font-mono leading-relaxed">
{`==================================================
TRƯỜNG THPT TỊNH BIÊN
GV hướng dẫn: Đặng Thị Bích Hài
--------------------------------------------------
[KẾT QUẢ TRA CỨU & CHẤM ĐIỂM]
- Họ và tên học sinh: [Tên HS]
- Điểm: [Số điểm/10]
- Nhận xét: Bài làm này được [mặt tốt], thiếu [ý thiếu], chưa được [mặt chưa tốt], cần [hướng cải thiện].
==================================================`}
          </pre>
        </div>
      </div>

      {/* Detailed Rubric Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-700" />
            Đáp án & Thang điểm tham chiếu - Đề Số Đỏ (Tổng điểm 10.0đ)
          </h3>
          <span className="text-xs font-semibold text-slate-500">Tác phẩm: Vũ Trọng Phụng</span>
        </div>

        <div className="space-y-3">
          {RUBRIC_SO_DO.map((item) => (
            <div key={item.questionNumber} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold text-xs">
                    {item.questionNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold text-xs self-start sm:self-auto">
                  {item.maxScore.toFixed(1)} Điểm
                </span>
              </div>

              <div className="mt-3.5 space-y-3">
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Yêu cầu câu hỏi:</p>
                  <p className="text-sm text-slate-800 mt-0.5">{item.questionContent}</p>
                </div>

                <div className="p-3 bg-red-50/60 rounded-lg border border-red-100">
                  <p className="text-xs text-red-900 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-red-700" />
                    Đáp án chuẩn tham chiếu:
                  </p>
                  <p className="text-sm text-slate-900 font-medium mt-1 pl-5">{item.standardAnswer}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Tiêu chí phân hóa điểm số:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pl-1">
                    {item.criteria.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

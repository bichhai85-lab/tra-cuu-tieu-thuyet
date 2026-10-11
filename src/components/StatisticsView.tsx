import React, { useMemo } from 'react';
import { GradingRecord } from '../types';
import { BarChart3, Users, Award, TrendingUp, AlertTriangle, CheckCircle, School } from 'lucide-react';

interface Props {
  records: GradingRecord[];
}

export const StatisticsView: React.FC<Props> = ({ records }) => {
  const stats = useMemo(() => {
    if (records.length === 0) {
      return {
        count: 0,
        avg: 0,
        highest: 0,
        lowest: 0,
        excellent: 0,
        good: 0,
        average: 0,
        below: 0,
        q1Avg: 0,
        q2Avg: 0,
        q3Avg: 0,
        q4Avg: 0,
        q5Avg: 0,
      };
    }

    const count = records.length;
    const scores = records.map(r => r.totalScore);
    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / count) * 10) / 10;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);

    const excellent = records.filter(r => r.totalScore >= 8.0).length;
    const good = records.filter(r => r.totalScore >= 6.5 && r.totalScore < 8.0).length;
    const average = records.filter(r => r.totalScore >= 5.0 && r.totalScore < 6.5).length;
    const below = records.filter(r => r.totalScore < 5.0).length;

    const q1Avg = Math.round((records.reduce((acc, r) => acc + (r.q1Score || 0), 0) / count) * 10) / 10;
    const q2Avg = Math.round((records.reduce((acc, r) => acc + (r.q2Score || 0), 0) / count) * 10) / 10;
    const q3Avg = Math.round((records.reduce((acc, r) => acc + (r.q3Score || 0), 0) / count) * 10) / 10;
    const q4Avg = Math.round((records.reduce((acc, r) => acc + (r.q4Score || 0), 0) / count) * 10) / 10;
    const q5Avg = Math.round((records.reduce((acc, r) => acc + (r.q5Score || 0), 0) / count) * 10) / 10;

    return {
      count,
      avg,
      highest,
      lowest,
      excellent,
      good,
      average,
      below,
      q1Avg,
      q2Avg,
      q3Avg,
      q4Avg,
      q5Avg,
    };
  }, [records]);

  if (records.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        <BarChart3 className="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <p className="font-semibold text-slate-700">Chưa có bài làm nào trong sổ điểm</p>
        <p className="text-xs text-slate-400 mt-1">Hãy chấm bài mới hoặc nạp dữ liệu mẫu để xem thống kê phổ điểm</p>
      </div>
    );
  }

  const passRate = Math.round(((records.length - stats.below) / records.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Tổng số bài đã chấm</p>
            <h3 className="text-2xl font-black text-slate-900">{stats.count} bài</h3>
            <p className="text-[11px] text-slate-400">THPT Tịnh Biên</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Điểm trung bình</p>
            <h3 className="text-2xl font-black text-red-700">{stats.avg} / 10</h3>
            <p className="text-[11px] text-emerald-600 font-medium">Tỷ lệ đạt: {passRate}%</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Điểm cao nhất</p>
            <h3 className="text-2xl font-black text-emerald-700">{stats.highest} / 10</h3>
            <p className="text-[11px] text-slate-400">{stats.excellent} học sinh đạt giỏi</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Điểm thấp nhất</p>
            <h3 className="text-2xl font-black text-amber-700">{stats.lowest} / 10</h3>
            <p className="text-[11px] text-rose-600 font-medium">{stats.below} bài dưới 5.0</p>
          </div>
        </div>
      </div>

      {/* Distribution Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-red-700" />
            Phân bố xếp loại học lực (Thang điểm 10)
          </h3>

          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Giỏi (8.0 - 10.0đ)</span>
                <span className="text-slate-700 font-mono">{stats.excellent} bài ({Math.round((stats.excellent / stats.count) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.excellent / stats.count) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-700">Khá (6.5 - 7.9đ)</span>
                <span className="text-slate-700 font-mono">{stats.good} bài ({Math.round((stats.good / stats.count) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.good / stats.count) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">Trung bình (5.0 - 6.4đ)</span>
                <span className="text-slate-700 font-mono">{stats.average} bài ({Math.round((stats.average / stats.count) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.average / stats.count) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700">Dưới trung bình (&lt; 5.0đ)</span>
                <span className="text-slate-700 font-mono">{stats.below} bài ({Math.round((stats.below / stats.count) * 100)}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.below / stats.count) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Performance Breakdown */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-red-700" />
            Điểm trung bình từng câu hỏi (Đề Số Đỏ)
          </h3>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Câu 1 (Ngôi kể thứ ba - Max 1.0đ):</span>
              <span className="font-bold text-red-700 font-mono">{stats.q1Avg} / 1.0đ</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Câu 2 (2 chi tiết hoàn cảnh - Max 2.0đ):</span>
              <span className="font-bold text-red-700 font-mono">{stats.q2Avg} / 2.0đ</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Câu 3 (2 nguyên nhân tin thầy bói - Max 2.0đ):</span>
              <span className="font-bold text-red-700 font-mono">{stats.q3Avg} / 2.0đ</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Câu 4 (Giọng điệu trào phúng - Max 2.0đ):</span>
              <span className="font-bold text-red-700 font-mono">{stats.q4Avg} / 2.0đ</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="font-semibold text-slate-700">Câu 5 (Đoạn văn 5-7 dòng - Max 3.0đ):</span>
              <span className="font-bold text-red-700 font-mono">{stats.q5Avg} / 3.0đ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Insights from teacher Đặng Thị Bích Hài */}
      <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-xl space-y-2 text-xs text-amber-950">
        <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
          <School className="w-4 h-4 text-red-700" />
          Lưu ý nghiệp vụ của GV Đặng Thị Bích Hài (THPT Tịnh Biên):
        </h4>
        <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
          <li><strong>Lỗi câu 2 thường gặp:</strong> Học sinh chỉ nêu chung chung là "nghèo khó" mà quên dẫn 2 chi tiết cụ thể trong đoạn trích (mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm nghề vặt).</li>
          <li><strong>Lỗi câu 3 thường gặp:</strong> Học sinh thường chỉ nhớ chi tiết thầy bói đoán trúng hoàn cảnh thực tế mà bỏ quên nguyên nhân chủ quan cốt lõi (tâm lý ham danh vọng, khao khát đổi đời của Xuân).</li>
          <li><strong>Lỗi câu 5 thường gặp:</strong> Viết quá ngắn (dưới 5 dòng) hoặc chỉ nói về tác hại mê tín mà chưa khẳng định tầm quan trọng của việc tự rèn luyện bản thân.</li>
        </ul>
      </div>
    </div>
  );
};

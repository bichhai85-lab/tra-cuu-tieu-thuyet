import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Helper function to build the exact standard output format
function buildStandardOutput(studentName: string, formattedScore: string, comment: string): string {
  return [
    '==================================================',
    'TRƯỜNG THPT TỊNH BIÊN',
    'GV hướng dẫn: Đặng Thị Bích Hài',
    '--------------------------------------------------',
    '[KẾT QUẢ TRA CỨU & CHẤM ĐIỂM]',
    `- Họ và tên học sinh: ${studentName}`,
    `- Điểm: ${formattedScore}`,
    `- Nhận xét: ${comment}`,
    '=================================================='
  ].join('\n');
}

// Fallback rule-based grading in case of API failure or missing key
function gradeFallback(studentName: string, q1: string, q2: string, q3: string, q4: string, q5: string) {
  let q1Score = 0;
  const q1Lower = (q1 || '').toLowerCase();
  if (q1Lower.includes('ba') || q1Lower.includes('thứ ba') || q1Lower.includes('ngôi 3') || q1Lower.includes('ngôi ba')) {
    q1Score = 1.0;
  }

  let q2Score = 0;
  const q2Lower = (q2 || '').toLowerCase();
  const q2Details = [];
  if (q2Lower.includes('mồ côi') || q2Lower.includes('không cha mẹ') || q2Lower.includes('bố mẹ mất')) {
    q2Details.push('mồ côi');
  }
  if (q2Lower.includes('ở nhờ') || q2Lower.includes('bị đuổi') || q2Lower.includes('đuổi đi')) {
    q2Details.push('đi ở nhờ bị đuổi');
  }
  if (q2Lower.includes('đầu hè') || q2Lower.includes('vỉa hè') || q2Lower.includes('lấy đầu hè làm nhà')) {
    q2Details.push('lấy đầu hè làm nhà');
  }
  if (q2Lower.includes('nghề vặt') || q2Lower.includes('kiếm sống') || q2Lower.includes('nhặt banh') || q2Lower.includes('bán phá xa') || q2Lower.includes('quảng cáo')) {
    q2Details.push('làm nghề vặt kiếm sống');
  }
  if (q2Details.length >= 2) {
    q2Score = 2.0;
  } else if (q2Details.length === 1) {
    q2Score = 1.0;
  }

  let q3Score = 0;
  const q3Lower = (q3 || '').toLowerCase();
  let hasCaus1 = false;
  let hasCaus2 = false;
  if (q3Lower.includes('đoán trúng') || q3Lower.includes('nói trúng') || q3Lower.includes('chi tiết thực tế') || q3Lower.includes('đoán đúng')) {
    hasCaus1 = true;
  }
  if (q3Lower.includes('danh vọng') || q3Lower.includes('đổi đời') || q3Lower.includes('ham danh') || q3Lower.includes('tâm lý')) {
    hasCaus2 = true;
  }
  if (hasCaus1 && hasCaus2) {
    q3Score = 2.0;
  } else if (hasCaus1 || hasCaus2) {
    q3Score = 1.0;
  }

  let q4Score = 0;
  const q4Lower = (q4 || '').toLowerCase();
  if (q4Lower.includes('trào phúng') || q4Lower.includes('mỉa mai') || q4Lower.includes('châm biếm')) {
    q4Score = 2.0;
  } else if (q4Lower.includes('hài hước') || q4Lower.includes('chế giễu')) {
    q4Score = 1.0;
  }

  let q5Score = 0;
  const q5Lower = (q5 || '').toLowerCase();
  const q5Lines = (q5 || '').split('\n').filter(l => l.trim().length > 0).length || Math.ceil((q5 || '').length / 70);
  const mentionsSuperstition = q5Lower.includes('mê tín') || q5Lower.includes('may rủi') || q5Lower.includes('bói toán');
  const mentionsSelfTraining = q5Lower.includes('rèn luyện') || q5Lower.includes('bản thân') || q5Lower.includes('nỗ lực') || q5Lower.includes('học tập');

  if (mentionsSuperstition && mentionsSelfTraining && q5Lines >= 3) {
    q5Score = 3.0;
  } else if (mentionsSuperstition && mentionsSelfTraining) {
    q5Score = 2.5;
  } else if (mentionsSuperstition || mentionsSelfTraining) {
    q5Score = 1.5;
  } else if ((q5 || '').trim().length > 20) {
    q5Score = 1.0;
  }

  const rawTotal = Math.round((q1Score + q2Score + q3Score + q4Score + q5Score) * 10) / 10;
  const totalScore = Math.min(10, Math.max(0, rawTotal));
  const formattedScore = `${totalScore.toFixed(1).replace(/\.0$/, '')}/10`;

  let good = 'nắm được một số ý cơ bản';
  let missing = 'chi tiết hoàn cảnh hoặc nguyên nhân tâm lý';
  let notGood = 'lập luận còn sơ sài';
  let need = 'đọc kỹ văn bản, trả lời đầy đủ các vế và rèn luyện kỹ năng viết đoạn';

  if (totalScore >= 9.0) {
    good = 'xác định đúng ngôi kể, nêu đủ chi tiết hoàn cảnh, chỉ rõ 2 nguyên nhân và viết đoạn văn sâu sắc';
    missing = 'không đáng kể';
    notGood = 'diễn đạt còn đôi chỗ chưa thật gãy gọn';
    need = 'tiếp tục phát huy năng lực tư duy văn học';
  } else if (totalScore >= 7.0) {
    good = 'xác định đúng ngôi kể và giọng điệu trào phúng, nêu được tác hại của mê tín';
    missing = 'một vài ý nhỏ về hoàn cảnh nhân vật hoặc nguyên nhân tâm lý đổi đời';
    notGood = 'phần liên hệ đoạn văn chưa thật sâu sắc';
    need = 'bổ sung dẫn chứng chi tiết và triển khai đoạn văn chặt chẽ hơn';
  } else if (totalScore >= 5.0) {
    good = 'xác định được một số chi tiết về nhân vật và giọng điệu cơ bản';
    missing = 'nguyên nhân thầy bói đoán trúng và ý nghĩa tự rèn luyện bản thân';
    notGood = 'diễn đạt còn chung chung, đoạn văn chưa đủ dung lượng 5-7 dòng';
    need = 'chú ý bám sát câu hỏi, rèn luyện cách lập luận theo thang điểm';
  } else {
    good = 'có tinh thần hoàn thành bài làm';
    missing = 'nhiều nội dung trọng tâm về ngôi kể, hoàn cảnh và nguyên nhân';
    notGood = 'câu trả lời quá ngắn, chưa đúng trọng tâm yêu cầu đề bài';
    need = 'ôn tập kỹ kiến thức tác phẩm Số Đỏ và trau dồi kỹ năng viết đoạn văn';
  }

  const comment = `Bài làm này được ${good}, thiếu ${missing}, chưa được ${notGood}, cần ${need}.`;
  const standardOutput = buildStandardOutput(studentName, formattedScore, comment);

  const q1MissingReason = q1Score === 1.0 ? '' : 'Chưa xác định đúng ngôi kể thứ ba (đáp án chuẩn: Ngôi kể thứ ba).';
  const q2MissingReason = q2Score === 2.0 ? '' : q2Score === 1.0 
    ? 'Mới chỉ nêu được 1 chi tiết về hoàn cảnh nhân vật, thiếu 1 chi tiết (cần đủ 2 chi tiết: mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm các nghề vặt mưu sinh).'
    : 'Chưa trích dẫn đủ 2 chi tiết cụ thể trong đoạn trích thể hiện hoàn cảnh mồ côi, ở nhờ hoặc làm nghề vặt của nhân vật.';
  const q3MissingReason = q3Score === 2.0 ? '' : hasCaus1 
    ? 'Mới chỉ nêu nguyên nhân khách quan (thầy bói đoán trúng chi tiết thực tế), thiếu nguyên nhân chủ quan cốt lõi: tâm lý ham danh vọng, khát khao muốn đổi đời của Xuân.'
    : hasCaus2 
    ? 'Mới chỉ nêu tâm lý ham đổi đời giàu sang, thiếu nguyên nhân khách quan: thầy bói đã đoán trúng một số chi tiết thực tế về hoàn cảnh của Xuân.'
    : 'Chưa chỉ rõ đủ 2 nguyên nhân theo thang điểm: (1) Thầy đoán trúng chi tiết thực tế; (2) Tâm lý ham danh vọng, muốn đổi đời của Xuân.';
  const q4MissingReason = q4Score === 2.0 ? '' : 'Chưa nhận diện chính xác hoặc chưa làm nổi bật đặc trưng "giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo" của Vũ Trọng Phụng.';
  const q5MissingReason = q5Score === 3.0 ? '' : (!mentionsSuperstition 
    ? 'Đoạn văn chưa phân tích rõ tác hại của mê tín dị đoan và trông chờ vào may rủi.' 
    : !mentionsSelfTraining 
    ? 'Đoạn văn chưa khẳng định rõ tầm quan trọng của việc tự rèn luyện bản thân để làm chủ tương lai.'
    : q5Lines < 4 
    ? 'Dung lượng đoạn văn còn ngắn, chưa bảo đảm yêu cầu từ 5 đến 7 dòng.'
    : 'Lập luận và liên hệ bài học chưa thật sâu sắc để đạt trọn vẹn điểm tối đa.');

  return {
    q1Score,
    q1Feedback: q1Score === 1.0 ? 'Xác định đúng ngôi kể thứ ba.' : 'Chưa chỉ ra đúng ngôi kể thứ ba.',
    q1MissingReason,
    q2Score,
    q2Feedback: q2Score === 2.0 ? 'Nêu đủ 2 chi tiết về hoàn cảnh nhân vật.' : 'Chưa nêu đủ 2 chi tiết hoàn cảnh nhân vật.',
    q2MissingReason,
    q3Score,
    q3Feedback: q3Score === 2.0 ? 'Nêu đủ 2 nguyên nhân thực tế và tâm lý.' : 'Chưa chỉ rõ đủ 2 nguyên nhân.',
    q3MissingReason,
    q4Score,
    q4Feedback: q4Score === 2.0 ? 'Nêu đúng giọng điệu trào phúng, mỉa mai, châm biếm.' : 'Chưa nhận diện đúng giọng điệu trào phúng.',
    q4MissingReason,
    q5Score,
    q5Feedback: q5Score >= 2.5 ? 'Viết đoạn văn đạt yêu cầu về hình thức và nội dung.' : 'Đoạn văn cần bám sát tác hại mê tín và tự rèn luyện.',
    q5MissingReason,
    totalScore,
    formattedScore,
    comment,
    standardOutput,
    goodPoints: good,
    missingPoints: missing,
    notGoodPoints: notGood,
    improvementPoints: need,
  };
}

// API: Grading endpoint using Gemini 3.8 Flash
app.post('/api/grade', async (req, res) => {
  try {
    const { studentName = 'Học sinh', studentClass = '', q1 = '', q2 = '', q3 = '', q4 = '', q5 = '', fullText = '' } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not found in environment, falling back to rule-based evaluation.');
      const result = gradeFallback(studentName, q1, q2, q3, q4, q5);
      return res.json(result);
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const promptText = `
Bạn là hệ thống chấm điểm và đánh giá bài làm môn Ngữ văn cho học sinh THPT Tịnh Biên theo hướng dẫn của GV Đặng Thị Bích Hài.

[ĐÁP ÁN & THANG ĐIỂM THAM CHIẾU - ĐỀ SỐ ĐỎ]
- Câu 1 (1.0đ): Ngôi kể thứ ba. (Đúng ngôi kể thứ ba được 1.0đ; trả lời sai hoặc không nêu được 0đ).
- Câu 2 (2.0đ): Nêu đúng 2 chi tiết về hoàn cảnh của nhân vật Xuân Tóc Đỏ: mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm đủ nghề vặt kiếm sống... (Mỗi ý 1.0đ, tối đa 2.0đ).
- Câu 3 (2.0đ): Nêu được 2 nguyên nhân (Thầy đoán trúng một số chi tiết thực tế; Tâm lý ham danh vọng, muốn đổi đời của Xuân). (Mỗi ý 1.0đ, đủ 2 ý được 2.0đ).
- Câu 4 (2.0đ): Giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo. (Chỉ ra đúng giọng điệu trào phúng/mỉa mai/châm biếm được 2.0đ; nêu mờ nhạt được 1.0đ).
- Câu 5 (3.0đ): Viết đoạn văn 5-7 dòng, nêu rõ tác hại của mê tín/may rủi và tầm quan trọng của việc tự rèn luyện bản thân. (Đủ dung lượng đoạn văn 5-7 dòng 0.5đ, tác hại mê tín/may rủi 1.25đ, tầm quan trọng của việc tự rèn luyện bản thân 1.25đ. Tổng 3.0đ).
Tổng điểm: 10.0đ.

[QUY TẮC NHẬN XÉT VÀ XUẤT KẾT QUẢ - BẮT BUỘC TUÂN THỦ]
1. KHÔNG xưng "cô", "thầy" hay "AI" trong nhận xét và điểm số.
2. Nhận xét phải đơn giản, ngắn gọn, dùng mẫu chung DUY NHẤT:
   "Bài làm này được [điểm tốt/đúng], thiếu [ý còn thiếu], chưa được [điểm chưa chuẩn/chưa sâu], cần [hướng khắc phục ngắn gọn]."
   (Ví dụ: "Bài làm này được xác định đúng ngôi kể và giọng điệu trào phúng, thiếu phân tích tâm lý đổi đời ở câu 3, chưa được sâu sắc trong phần liên hệ rèn luyện bản thân, cần bám sát các vế hỏi và viết đoạn văn đủ độ dài.")
3. Tuyệt đối KHÔNG gắn chữ "AI" ở phần điểm số (Chỉ ghi số điểm dạng X/10 hoặc X.X/10, ví dụ: 7.5/10 hoặc 8/10 hoặc 9.0/10).

[BÀI LÀM CỦA HỌC SINH CẦN CHẤM]
- Họ và tên học sinh: ${studentName}
- Lớp: ${studentClass || '12'}
${fullText ? `- Toàn bộ bài làm:\n${fullText}` : ''}
- Câu 1: ${q1 || '(Không có câu trả lời)'}
- Câu 2: ${q2 || '(Không có câu trả lời)'}
- Câu 3: ${q3 || '(Không có câu trả lời)'}
- Câu 4: ${q4 || '(Không có câu trả lời)'}
- Câu 5: ${q5 || '(Không có câu trả lời)'}

Hãy chấm điểm thật khách quan, chính xác theo thang điểm và xuất kết quả theo định dạng JSON quy định.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: `Bạn là giám khảo chấm văn trường THPT Tịnh Biên (GV hướng dẫn: Đặng Thị Bích Hài). Tuân thủ nghiêm ngặt quy tắc nhận xét: bắt đầu bằng "Bài làm này được [mặt tốt], thiếu [ý thiếu], chưa được [mặt chưa tốt], cần [hướng khắc phục ngắn gọn].", KHÔNG xưng cô, thầy hay AI. Điểm số chỉ ghi dạng X/10 hoặc X.X/10 không kèm chữ AI.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            q1Score: { type: Type.NUMBER, description: 'Điểm câu 1 (0 đến 1.0)' },
            q1Feedback: { type: Type.STRING, description: 'Nhận xét chi tiết câu 1' },
            q1MissingReason: { type: Type.STRING, description: 'Nếu điểm chưa đạt tối đa 1.0đ, nêu rõ mặt chưa làm được (vì sao chưa trọn điểm); nếu đạt tối đa để rỗng' },
            q2Score: { type: Type.NUMBER, description: 'Điểm câu 2 (0 đến 2.0)' },
            q2Feedback: { type: Type.STRING, description: 'Nhận xét chi tiết câu 2' },
            q2MissingReason: { type: Type.STRING, description: 'Nếu điểm chưa đạt tối đa 2.0đ, nêu rõ mặt chưa làm được (ví dụ thiếu 1 trong 2 chi tiết hoàn cảnh); nếu đạt tối đa để rỗng' },
            q3Score: { type: Type.NUMBER, description: 'Điểm câu 3 (0 đến 2.0)' },
            q3Feedback: { type: Type.STRING, description: 'Nhận xét chi tiết câu 3' },
            q3MissingReason: { type: Type.STRING, description: 'Nếu điểm chưa đạt tối đa 2.0đ, nêu rõ mặt chưa làm được (ví dụ chỉ nêu thầy bói nói đúng nhưng thiếu tâm lý ham danh vọng đổi đời); nếu đạt tối đa để rỗng' },
            q4Score: { type: Type.NUMBER, description: 'Điểm câu 4 (0 đến 2.0)' },
            q4Feedback: { type: Type.STRING, description: 'Nhận xét chi tiết câu 4' },
            q4MissingReason: { type: Type.STRING, description: 'Nếu điểm chưa đạt tối đa 2.0đ, nêu rõ mặt chưa làm được (chưa làm rõ giọng điệu trào phúng châm biếm); nếu đạt tối đa để rỗng' },
            q5Score: { type: Type.NUMBER, description: 'Điểm câu 5 (0 đến 3.0)' },
            q5Feedback: { type: Type.STRING, description: 'Nhận xét chi tiết câu 5' },
            q5MissingReason: { type: Type.STRING, description: 'Nếu điểm chưa đạt tối đa 3.0đ, nêu rõ mặt chưa làm được (chưa đủ 5-7 dòng, thiếu vế tự rèn luyện hoặc tác hại mê tín); nếu đạt tối đa để rỗng' },
            totalScore: { type: Type.NUMBER, description: 'Tổng điểm từ 0 đến 10' },
            formattedScore: { type: Type.STRING, description: 'Định dạng điểm số dạng X/10 hoặc X.X/10 (tuyệt đối KHÔNG có chữ AI)' },
            comment: { type: Type.STRING, description: 'Nhận xét đúng mẫu: Bài làm này được [mặt tốt], thiếu [ý thiếu], chưa được [mặt chưa tốt], cần [hướng cải thiện].' },
            goodPoints: { type: Type.STRING, description: 'Điểm tốt/đúng' },
            missingPoints: { type: Type.STRING, description: 'Ý còn thiếu' },
            notGoodPoints: { type: Type.STRING, description: 'Điểm chưa chuẩn/chưa sâu' },
            improvementPoints: { type: Type.STRING, description: 'Hướng khắc phục ngắn gọn' },
          },
          required: ['q1Score', 'q2Score', 'q3Score', 'q4Score', 'q5Score', 'totalScore', 'formattedScore', 'comment'],
        },
      },
    });

    const text = response.text || '{}';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error('Error parsing JSON from Gemini, fallback to regex parse:', e);
      parsed = gradeFallback(studentName, q1, q2, q3, q4, q5);
    }

    // Sanitize formattedScore to remove any possible 'AI' mention
    let sanitizedScore = (parsed.formattedScore || `${parsed.totalScore}/10`).replace(/AI/gi, '').trim();
    if (!sanitizedScore.endsWith('/10')) {
      sanitizedScore = `${parsed.totalScore}/10`;
    }

    // Ensure comment conforms to the rule
    let sanitizedComment = parsed.comment || '';
    sanitizedComment = sanitizedComment.replace(/AI/gi, '').replace(/\bcô\b/gi, '').replace(/\bthầy\b/gi, '').trim();
    if (!sanitizedComment.startsWith('Bài làm này được')) {
      sanitizedComment = `Bài làm này được ${parsed.goodPoints || 'làm được một số ý'}, thiếu ${parsed.missingPoints || 'một số ý quan trọng'}, chưa được ${parsed.notGoodPoints || 'thật sâu sắc'}, cần ${parsed.improvementPoints || 'rèn luyện thêm'}.`;
    }

    const standardOutput = buildStandardOutput(studentName, sanitizedScore, sanitizedComment);

    return res.json({
      ...parsed,
      formattedScore: sanitizedScore,
      comment: sanitizedComment,
      standardOutput,
    });
  } catch (error: any) {
    console.error('Grading error:', error);
    // Graceful fallback so user always gets the evaluation
    const fallback = gradeFallback(
      req.body.studentName || 'Học sinh',
      req.body.q1 || '',
      req.body.q2 || '',
      req.body.q3 || '',
      req.body.q4 || '',
      req.body.q5 || ''
    );
    return res.json(fallback);
  }
});

// Start Express server and mount Vite middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

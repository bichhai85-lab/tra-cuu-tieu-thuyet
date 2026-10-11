import { RubricItem, GradingRecord } from '../types';

export const RUBRIC_SO_DO: RubricItem[] = [
  {
    questionNumber: 1,
    maxScore: 1.0,
    title: 'Câu 1: Xác định ngôi kể của đoạn trích',
    questionContent: 'Xác định ngôi kể được tác giả sử dụng trong đoạn trích tiểu thuyết "Số Đỏ".',
    standardAnswer: 'Ngôi kể thứ ba.',
    criteria: [
      'Nêu đúng "Ngôi kể thứ ba" hoặc "Ngôi thứ 3": 1.0 điểm.',
      'Nêu sai ngôi kể hoặc không trả lời: 0.0 điểm.'
    ]
  },
  {
    questionNumber: 2,
    maxScore: 2.0,
    title: 'Câu 2: Hoàn cảnh nhân vật Xuân Tóc Đỏ',
    questionContent: 'Chỉ ra 2 chi tiết thể hiện hoàn cảnh của nhân vật Xuân Tóc Đỏ được nhắc tới trong văn bản.',
    standardAnswer: 'Nêu đúng 2 chi tiết về hoàn cảnh: mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm đủ nghề vặt kiếm sống... (Mỗi ý 1.0đ).',
    criteria: [
      'Nêu được 1 chi tiết chính xác: 1.0 điểm.',
      'Nêu được 2 chi tiết chính xác: 2.0 điểm.',
      'Chi tiết hợp lệ: mồ côi từ nhỏ, đi ở nhờ nhà bác bị đuổi, lấy đầu hè xó chợ làm nhà, làm đủ nghề vặt (nhặt banh, bán phá xa, thổi loa quảng cáo, chạy hiệu rạp hát, bán cao đơn hoàn tán) để kiếm sống.'
    ]
  },
  {
    questionNumber: 3,
    maxScore: 2.0,
    title: 'Câu 3: Nguyên nhân Xuân Tóc Đỏ tin lời thầy bói',
    questionContent: 'Vì sao Xuân Tóc Đỏ lại tin vào lời phán của thầy bói?',
    standardAnswer: 'Nêu được 2 nguyên nhân: (1) Thầy đoán trúng một số chi tiết thực tế; (2) Tâm lý ham danh vọng, muốn đổi đời của Xuân. (Mỗi ý 1.0đ).',
    criteria: [
      'Nguyên nhân 1: Thầy bói nói trúng/đoán trúng một số chi tiết thực tế về hoàn cảnh của Xuân (1.0 điểm).',
      'Nguyên nhân 2: Tâm lý của Xuân ham danh vọng, khao khát đổi đời, mong muốn thoát khỏi cảnh nghèo hèn (1.0 điểm).'
    ]
  },
  {
    questionNumber: 4,
    maxScore: 2.0,
    title: 'Câu 4: Giọng điệu của tác giả',
    questionContent: 'Nhận xét về giọng điệu của tác giả Vũ Trọng Phụng trong đoạn trích.',
    standardAnswer: 'Giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo.',
    criteria: [
      'Nêu được đặc trưng "giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo": 2.0 điểm.',
      'Chỉ nêu chung chung là giọng hài hước, chế giễu nhưng chưa làm nổi bật tính trào phúng, châm biếm: 1.0 - 1.5 điểm.'
    ]
  },
  {
    questionNumber: 5,
    maxScore: 3.0,
    title: 'Câu 5: Đoạn văn nghị luận ngắn (5 - 7 dòng)',
    questionContent: 'Viết một đoạn văn ngắn (từ 5 đến 7 dòng) nêu rõ tác hại của mê tín, trông chờ may rủi và tầm quan trọng của việc tự rèn luyện bản thân.',
    standardAnswer: 'Viết đoạn văn 5-7 dòng, nêu rõ tác hại của mê tín/may rủi và tầm quan trọng của việc tự rèn luyện bản thân.',
    criteria: [
      'Đảm bảo hình thức đoạn văn, dung lượng 5-7 dòng, diễn đạt mạch lạc: 0.5 điểm.',
      'Nêu rõ tác hại của mê tín dị đoan, tư tưởng ỷ lại vào may rủi: 1.25 điểm.',
      'Khẳng định tầm quan trọng của việc tự rèn luyện bản thân, nỗ lực học tập và lao động để làm chủ tương lai: 1.25 điểm.'
    ]
  }
];

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

export function enrichWithMissingReasons(r: GradingRecord): GradingRecord {
  const q1Missing = r.q1Score >= 1.0 ? '' : (r.q1MissingReason || 'Chưa chỉ ra đúng ngôi kể thứ ba (đáp án chuẩn: Ngôi kể thứ ba).');
  
  const q2Missing = r.q2Score >= 2.0 ? '' : (r.q2MissingReason || (
    r.q2Score === 1.5 
      ? 'Chi tiết thứ hai còn chung chung theo lời thầy bói, chưa trích dẫn được chi tiết hoàn cảnh cụ thể từ văn bản (lấy đầu hè xó cửa làm nhà, làm các nghề vặt mưu sinh).'
      : 'Mới chỉ nêu được 1 chi tiết về hoàn cảnh nhân vật, còn thiếu 1 chi tiết (cần đủ 2 chi tiết: mồ côi, đi ở nhờ bị đuổi, lấy đầu hè làm nhà, làm các nghề vặt kiếm sống).'
  ));

  const q3Missing = r.q3Score >= 2.0 ? '' : (r.q3MissingReason || (
    (r.answers?.q3 || '').toLowerCase().includes('đổi đời') || 
    (r.answers?.q3 || '').toLowerCase().includes('giàu sang') || 
    (r.answers?.q3 || '').toLowerCase().includes('danh') || 
    (r.answers?.q3 || '').toLowerCase().includes('hi vọng')
      ? 'Mới chỉ nêu nguyên nhân chủ quan (tâm lý ham danh vọng, muốn đổi đời giàu sang), thiếu nguyên nhân khách quan: thầy bói đã đoán trúng một số chi tiết thực tế về hoàn cảnh của Xuân.'
      : 'Mới chỉ nêu nguyên nhân khách quan (thầy bói đoán trúng hoàn cảnh thực tế), thiếu nguyên nhân chủ quan cốt lõi: tâm lý ham danh vọng, khao khát muốn đổi đời của nhân vật Xuân.'
  ));

  const q4Missing = r.q4Score >= 2.0 ? '' : (r.q4MissingReason || 'Chưa gọi tên và làm nổi bật chính xác đặc trưng "giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo" của tác giả Vũ Trọng Phụng.');

  const q5Missing = r.q5Score >= 3.0 ? '' : (r.q5MissingReason || (
    r.q5Score <= 1.5 
      ? 'Dung lượng đoạn văn còn ngắn (dưới 5 dòng), chưa đạt yêu cầu từ 5 đến 7 dòng và chưa phân tích sâu cả 2 vế tác hại mê tín cùng tầm quan trọng của việc tự rèn luyện bản thân.'
      : r.q5Score <= 2.0 
      ? 'Đoạn văn còn thiếu dung lượng hoặc mới tập trung vào một vế (tác hại mê tín), chưa làm nổi bật sâu sắc tầm quan trọng của việc tự rèn luyện bản thân.'
      : 'Đoạn văn cơ bản đủ ý và đạt dung lượng nhưng diễn đạt cần sắc bén hơn, phần liên hệ hành động thực tế cần mở rộng sâu sắc hơn để đạt trọn vẹn 3.0đ.'
  ));

  return {
    ...r,
    q1MissingReason: q1Missing,
    q2MissingReason: q2Missing,
    q3MissingReason: q3Missing,
    q4MissingReason: q4Missing,
    q5MissingReason: q5Missing,
  };
}

const RAW_STUDENTS_DATA: GradingRecord[] = [
  {
    id: 'hs-linh-12a11',
    studentName: 'Lê Thị Nhựt Linh',
    studentClass: '12A11',
    studentCode: '12A11-03',
    submittedAt: '2026-10-10 14:05',
    answers: {
      q1: 'Đoạn trích trên được kể theo ngôi thứ ba.',
      q2: 'Hai chi tiết trong đoạn trích cho thấy hoàn cảnh tội nghiệp, khó khăn của nhân vật Xuân Tóc Đỏ: Xuân mồ côi từ nhỏ, phải sống nhờ sự nuôi dưỡng của những người bác họ; Xuân làm nhiều nghề như bán lạc rang, bán phá xa…',
      q3: 'Theo em, nhân vật Xuân Tóc Đỏ tin vào thầy bói là vì Xuân mong muốn đổi đời, mong giàu sang và danh tiếng. Những lời nói của thầy bói khiến Xuân nuôi hi vọng, đồng thời tác động đến suy nghĩ và tâm lí của Xuân.',
      q4: 'Đoạn trích thể hiện giọng điệu trào phúng, châm biếm qua việc miêu tả Xuân Tóc Đỏ cũng tin vào chuyện xem bói, đồng thời phê bình sự mê tín dị đoan và khát vọng đổi đời của tác giả, qua đó phê phán sự mê tín trong xã hội.',
      q5: 'Suy nghĩ của em về việc con người cần nên luyện bản thân để tránh sống dựa vào may rủi hoặc mê tín trong cuộc sống là: chăm chỉ tìm hiểu, tích lũy kiến thức và không ngừng hoàn thiện đạo đức; không nên quá tin vào bói toán hay trông chờ vào vận may. Bởi vì may mắn không tự đến, chỉ có ta là người quyết định. “Anh hùng tạo nên thời thế, nên cứ thế mà làm.”'
    },
    q1Score: 1.0,
    q1Feedback: 'Xác định đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đúng 2 chi tiết hoàn cảnh: mồ côi ở nhờ và làm nhiều nghề vặt kiếm sống.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được tâm lý mong muốn đổi đời giàu sang; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu trào phúng, châm biếm sâu cay.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đúng dung lượng, lập luận mạch lạc về ý thức tự rèn luyện bản thân.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được xác định đúng ngôi kể, phân tích tốt hoàn cảnh nhân vật và giọng điệu trào phúng, thiếu vế thầy bói đoán trúng chi tiết thực tế ở câu 3, chưa được phân tích toàn diện 2 nguyên nhân, cần chú ý đọc kỹ các vế câu hỏi để trả lời trọn vẹn.',
    standardOutput: buildStandardOutput(
      'Lê Thị Nhựt Linh',
      '8.5/10',
      'Bài làm này được xác định đúng ngôi kể, phân tích tốt hoàn cảnh nhân vật và giọng điệu trào phúng, thiếu vế thầy bói đoán trúng chi tiết thực tế ở câu 3, chưa được phân tích toàn diện 2 nguyên nhân, cần chú ý đọc kỹ các vế câu hỏi để trả lời trọn vẹn.'
    )
  },
  {
    id: 'hs-dina-12a3',
    studentName: 'Chau Đi Na',
    studentClass: '12A3',
    studentCode: '12A3-03',
    submittedAt: '2026-10-10 14:10',
    answers: {
      q1: 'Ngôi kể thứ ba.',
      q2: 'Bác nó nuôi nó thay đổi nó và được cả họ khen là nuôi đứa cháu mồ côi khi nó mới 9 tuổi. - Một hôm nó bị đánh một trận và bị đuổi đi.',
      q3: 'Tại vì Xuân Tóc Đỏ vốn có mộng tưởng có ngày được đại như ai, vì hắn mong mỏi đổi đời giàu sang và có địa vị trong xã hội.',
      q4: 'Tác giả thể hiện giọng điệu châm biếm và hài hước của tác giả. Tác giả chế giễu thói mê tín.',
      q5: 'Trong cuộc đời của mình phải tự mình rèn luyện bản thân để chúng ta có thể quyết định được số phận của mình thay vì dựa vào mê tín và sự hên xui may rủi, mỗi người phải chăm chỉ học tập, lao động để rèn luyện bản thân mình để có thể tự mình quyết định được số phận của chính chúng ta. Bên cạnh đó chúng ta phải tỉnh táo biết phân biệt đúng sai, không nên tin vào những lời nói thiếu căn cứ.'
    },
    q1Score: 1.0,
    q1Feedback: 'Xác định đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đúng 2 chi tiết: mồ côi ở nhờ nhà bác và bị đánh đuổi đi.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được mộng đổi đời giàu sang địa vị; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 1.5,
    q4Feedback: 'Nêu được giọng châm biếm, hài hước; cần làm nổi bật thêm tính trào phúng sắc sảo.',
    q5Score: 2.0,
    q5Feedback: 'Nêu được tầm quan trọng của tự rèn luyện; cần phân tích sâu hơn tác hại của mê tín.',
    totalScore: 7.5,
    formattedScore: '7.5/10',
    comment: 'Bài làm này được xác định đúng ngôi kể và dẫn chứng hoàn cảnh nhân vật chính xác, thiếu ý thầy bói nói trúng chi tiết thực tế ở câu 3, chưa được phân tích sâu sắc tác hại của mê tín ở đoạn văn câu 5, cần bổ sung đủ 2 vế nguyên nhân và mở rộng lý lẽ.',
    standardOutput: buildStandardOutput(
      'Chau Đi Na',
      '7.5/10',
      'Bài làm này được xác định đúng ngôi kể và dẫn chứng hoàn cảnh nhân vật chính xác, thiếu ý thầy bói nói trúng chi tiết thực tế ở câu 3, chưa được phân tích sâu sắc tác hại của mê tín ở đoạn văn câu 5, cần bổ sung đủ 2 vế nguyên nhân và mở rộng lý lẽ.'
    )
  },
  {
    id: 'hs-nam-12a3',
    studentName: 'Phạm Văn Nam',
    studentClass: '12A3',
    studentCode: '12A3-04',
    submittedAt: '2026-10-10 14:15',
    answers: {
      q1: 'Ngôi kể thứ ba.',
      q2: 'Lúc 9 tuổi, Xuân ở nhà bác họ, nhưng một hôm bị đánh đuổi đi. - Xuân lấy đầu hè xó cửa làm nhà, lấy ở hồ sấu ở các phố, cá hồ Hoàn kiếm làm cơm và vài ba nghề tiêu xài khác nữa.',
      q3: 'Vì Xuân tin vào lời thầy bói bởi hắn mong giàu sang và muốn có địa vị, nên lời thầy bói đã gieo hy vọng cho hắn.',
      q4: 'Cũng theo tác giả, truyện có yếu tố trào phúng, với lối kể châm biếm và hài hước. Qua đó thể hiện thái độ mỉa mai của xã hội thời đó.',
      q5: 'Con người cần rèn luyện bản thân, cố gắng để quyết định tương lai của mình, chứ không dựa vào may rủi hay mê tín. Cần phân biệt đúng sai, không nên tin vào thầy bói.'
    },
    q1Score: 1.0,
    q1Feedback: 'Xác định đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đủ 2 chi tiết: ở nhà bác bị đuổi, lấy đầu hè xó cửa làm nhà kiếm sống.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được mong muốn giàu sang địa vị; thiếu nguyên nhân thầy bói đoán trúng thực tế.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu trào phúng, châm biếm, mỉa mai.',
    q5Score: 1.5,
    q5Feedback: 'Đoạn văn hơi ngắn (khoảng 3 dòng), chưa bảo đảm đủ dung lượng 5-7 dòng.',
    totalScore: 7.5,
    formattedScore: '7.5/10',
    comment: 'Bài làm này được trả lời đúng ngôi kể, nêu chi tiết hoàn cảnh và nhận diện giọng trào phúng, thiếu vế thầy bói đoán trúng thực tế ở câu 3, chưa được đảm bảo dung lượng đoạn văn 5-7 dòng ở câu 5, cần viết đoạn văn đủ độ dài và lập luận sâu hơn.',
    standardOutput: buildStandardOutput(
      'Phạm Văn Nam',
      '7.5/10',
      'Bài làm này được trả lời đúng ngôi kể, nêu chi tiết hoàn cảnh và nhận diện giọng trào phúng, thiếu vế thầy bói đoán trúng thực tế ở câu 3, chưa được đảm bảo dung lượng đoạn văn 5-7 dòng ở câu 5, cần viết đoạn văn đủ độ dài và lập luận sâu hơn.'
    )
  },
  {
    id: 'hs-hao-12a11',
    studentName: 'Lê Quốc Hào',
    studentClass: '12A11',
    studentCode: '12A11-04',
    submittedAt: '2026-10-10 14:20',
    answers: {
      q1: 'Ngôi thứ ba',
      q2: 'Lúc 9 tuổi, nó đã phải đi ở nhờ nhà một người bác họ. Lấy được xe của nhà, nó đã băm phá ra, nhặt trộm, làm cháy hiệu rạp hát, bán cao đan hàn tán trên xe lửa.',
      q3: 'Vì những lời phán của thầy bói đã đúng hoàn toàn về số phận của Xuân.',
      q4: 'Tác giả đã bóc trần sự mê tín. Sự bịp bợm của thầy bói nói giữa tất cả mọi chuyện; những lí sự mê tín của Xuân và một phần nào đó, thầy bói đã nói đúng về hoàn cảnh thực tế của Xuân, càng làm cho Xuân tin vào thầy bói.',
      q5: 'Trong đoạn trích trên cho thấy Xuân tóc đỏ là một kẻ vô giáo dục, một mặt cho số phận đưa đẩy, tin vào những lời nói nhảm nhí của thầy bói, những chuyện may mắn, may rủi cũng chỉ là chuyện may rủi thôi. Qua mỗi người, nếu chỉ tin vào những lời phán không có chứng cứ, chúng ta sẽ mất đi khả năng chủ động kiểm soát cuộc đời mình. Tin vào những lời mê tín dị đoan ấy cũng đủ làm ta càng bất lực, vì vậy chúng ta cần tỉnh táo trước những lời bói toán. Chúng ta cần có niềm tin vào đôi tay của chúng ta, vì chính chúng ta mới tạo nên thành công trong cuộc sống và đừng nên tin vào những mê tín dị đoan ấy.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu được chi tiết ở nhờ nhà bác họ và làm các nghề vặt kiếm sống.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói đoán đúng thực tế; thiếu nguyên nhân tâm lý ham danh vọng đổi đời.',
    q4Score: 1.0,
    q4Feedback: 'Chưa gọi tên chính xác giọng điệu trào phúng, mỉa mai, châm biếm sắc sảo.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đủ dung lượng, phân tích tốt tác hại của mê tín và niềm tin tự lực.',
    totalScore: 7.5,
    formattedScore: '7.5/10',
    comment: 'Bài làm này được xác định đúng ngôi kể, dẫn chứng hoàn cảnh tốt và viết đoạn văn câu 5 sâu sắc, thiếu gọi tên cụ thể thuật ngữ giọng điệu trào phúng châm biếm ở câu 4, chưa được phân tích tâm lý ham danh vọng ở câu 3, cần nắm chắc thuật ngữ văn học và trả lời đủ 2 vế.',
    standardOutput: buildStandardOutput(
      'Lê Quốc Hào',
      '7.5/10',
      'Bài làm này được xác định đúng ngôi kể, dẫn chứng hoàn cảnh tốt và viết đoạn văn câu 5 sâu sắc, thiếu gọi tên cụ thể thuật ngữ giọng điệu trào phúng châm biếm ở câu 4, chưa được phân tích tâm lý ham danh vọng ở câu 3, cần nắm chắc thuật ngữ văn học và trả lời đủ 2 vế.'
    )
  },
  {
    id: 'hs-thien-12a3',
    studentName: 'Phan Trí Thiện',
    studentClass: '12A3',
    studentCode: '12A3-06',
    submittedAt: '2026-10-10 14:25',
    answers: {
      q1: 'Ngôi thứ ba',
      q2: 'Tuổi thơ khó khăn của nhân vật Xuân Tóc Đỏ: Lúc mới 9 tuổi, nó đã phải đi ở nhờ nhà một người bác họ, họ thúc bá. Thằng Xuân lấy đầu hè xó cửa làm nhà, lấy sấu ở các phố, cá hồ Hoàn Kiếm làm cơm.',
      q3: 'Vì hắn muốn ôm mộng giàu sang, mong muốn có địa vị trong xã hội nên lời nói của ông thầy số đã gieo vào lòng hắn niềm hi vọng, khiến hắn càng tin tưởng vào những điều thầy phán.',
      q4: 'Tác giả sử dụng giọng điệu trào phúng, kết hợp với lời lẽ châm biếm, hài hước, qua đó làm nổi bật những tình huống trớ trêu và phê phán thói mê tín, ham danh lợi của con người.',
      q5: 'Em rút ra là con người chúng ta cần rèn luyện bản thân để tránh sống dựa vào may rủi hay mê tín dị đoan. Vì những chuyện chưa xảy ra thì không thể biết trước kết quả, nên chúng ta cần chuẩn bị thật tốt, không nên chủ quan hay khinh thường thành bại. Mỗi người cần cố gắng, sống lương thiện và không khinh thường những người thấp hơn mình.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu chính xác 2 chi tiết: ở nhờ nhà bác họ và lấy đầu hè xó cửa làm nhà kiếm cơm.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được mộng giàu sang có địa vị; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng và đầy đủ giọng điệu trào phúng, châm biếm, hài hước sắc sảo.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đúng dung lượng 5-7 dòng, nêu được ý thức tự rèn luyện bản thân.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được chỉ rõ ngôi kể, dẫn chứng hoàn cảnh đắt giá và phân tích chuẩn giọng điệu trào phúng, thiếu vế thầy đoán trúng chi tiết thực tế ở câu 3, chưa được phân tích sâu thêm tác hại của mê tín ở câu 5, cần bổ sung trọn vẹn cả 2 nguyên nhân theo đáp án.',
    standardOutput: buildStandardOutput(
      'Phan Trí Thiện',
      '8.5/10',
      'Bài làm này được chỉ rõ ngôi kể, dẫn chứng hoàn cảnh đắt giá và phân tích chuẩn giọng điệu trào phúng, thiếu vế thầy đoán trúng chi tiết thực tế ở câu 3, chưa được phân tích sâu thêm tác hại của mê tín ở câu 5, cần bổ sung trọn vẹn cả 2 nguyên nhân theo đáp án.'
    )
  },
  {
    id: 'hs-dat-12a11',
    studentName: 'Nguyễn Thành Đạt',
    studentClass: '12A11',
    studentCode: '12A11-06',
    submittedAt: '2026-10-10 14:30',
    answers: {
      q1: 'Đoạn trích thuộc ngôi kể thứ ba.',
      q2: 'Trong đoạn trích, hoàn cảnh, tuổi thơ của nhân vật Xuân Tóc Đỏ: tuổi thơ khó khăn phải ở nhờ nhà một người bác họ và được nuôi thay cho đầy tớ nhưng sau một thời gian bị đánh rồi đuổi đi, sau đó phải lấy cửa làm nhà, lấy sấu ở các phố, cá hồ Hoàng Kiếm làm cơm, làm nhiều nghề khác nhau từ chạy hiệu rạp hát đến bán cao đan hoàng tán trên xe lửa.',
      q3: 'Theo em, vì thầy bói phán đúng về hoàn cảnh gia đình và một phần tuổi thơ khổ cực của Xuân Tóc Đỏ nên mới được tin tưởng.',
      q4: 'Giọng điệu của tác giả qua cách miêu tả nhân vật và tình huống xem bói thể hiện sự mỉa mai và muốn người đọc thấy được không nên dựa vào may rủi, mê tín trong cuộc sống mà phải cố gắng và phát triển bản thân hơn.',
      q5: 'Trong cuộc sống và xã hội hiện nay, rất dễ dàng tìm thấy các trò chơi may rủi hoặc mê tín trong cuộc sống, chúng ta phải tránh xa các trò chơi may rủi hoặc mê tín trong cuộc sống hiện nay, vậy để có thể tránh xa chúng để bản thân không sống dựa vào may rủi hoặc mê tín thì phải tiếp thu, trau dồi kiến thức và rèn luyện bản thân, để chúng ta nhận thức và thay đổi để không sống dựa vào may rủi hoặc mê tín trong cuộc sống.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đầy đủ và chi tiết về hoàn cảnh ở nhờ bị đuổi, lấy hè làm nhà và làm nhiều nghề vặt.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói phán đúng hoàn cảnh thực tế; thiếu nguyên nhân tâm lý ham danh vọng đổi đời.',
    q4Score: 1.5,
    q4Feedback: 'Nêu được giọng mỉa mai; cần nhấn mạnh thêm tính chất trào phúng, châm biếm sâu cay.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn triển khai tốt về tránh xa may rủi, trau dồi kiến thức rèn luyện bản thân.',
    totalScore: 8.0,
    formattedScore: '8/10',
    comment: 'Bài làm này được trình bày chi tiết về hoàn cảnh nhân vật và xác định đúng ngôi kể, thiếu nguyên nhân tâm lý ham đổi đời ở câu 3, chưa được làm nổi bật từ khóa giọng điệu trào phúng ở câu 4, cần bổ sung đủ 2 vế nguyên nhân và dùng chuẩn từ ngữ chuyên môn.',
    standardOutput: buildStandardOutput(
      'Nguyễn Thành Đạt',
      '8/10',
      'Bài làm này được trình bày chi tiết về hoàn cảnh nhân vật và xác định đúng ngôi kể, thiếu nguyên nhân tâm lý ham đổi đời ở câu 3, chưa được làm nổi bật từ khóa giọng điệu trào phúng ở câu 4, cần bổ sung đủ 2 vế nguyên nhân và dùng chuẩn từ ngữ chuyên môn.'
    )
  },
  {
    id: 'hs-hua-12a11',
    studentName: 'Chau Chanh Hua',
    studentClass: '12A11',
    studentCode: '12A11-05',
    submittedAt: '2026-10-10 14:35',
    answers: {
      q1: 'Ngôi thứ ba',
      q2: 'Năm 9 tuổi, Xuân phải ở nhờ nhà một người bác họ và được bác nuôi. Sau khi bị đuổi đi, bị đánh một trận và đuổi đi, Xuân lấy đầu hè xó cửa làm nhà, lấy sấu ở các phố, cá hồ Hoàn Kiếm làm cơm, tự kiếm sống bằng nhiều nghề như bán phá xa, bán nhật trình, làm chạy hiệu rạp hát và bán cao đơn hoàn tán.',
      q3: 'Xuân Tóc Đỏ rất tin vào lời bói của ông thầy số vì cậu có hoàn cảnh sống khó khăn, luôn mong muốn đổi đời và khát khao thành công.',
      q4: 'trào phúng, châm biếm ,mía mai',
      q5: 'Chúng ta cần rèn luyện bản thân để có thể tự quyết định tương lai của mình thay vì sống dựa vào may rủi hay mê tín. Mỗi người nên chăm chỉ học tập, tích lũy kiến thức và phát triển những kỹ năng cần thiết.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu dẫn chứng hoàn cảnh rất chi tiết và chính xác.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được tâm lý mong muốn đổi đời thành công; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 2.0,
    q4Feedback: 'Nêu chính xác 3 từ khóa: trào phúng, châm biếm, mỉa mai.',
    q5Score: 1.5,
    q5Feedback: 'Đoạn văn hơi ngắn (khoảng 3 dòng), chưa đủ dung lượng 5-7 dòng theo yêu cầu.',
    totalScore: 7.5,
    formattedScore: '7.5/10',
    comment: 'Bài làm này được nêu đúng ngôi kể, chi tiết hoàn cảnh phong phú và nhận diện đúng giọng điệu, thiếu nguyên nhân thầy bói đoán trúng chi tiết thực tế ở câu 3, chưa được đạt dung lượng đoạn văn 5-7 dòng ở câu 5, cần viết đoạn văn dài dặn và đầy đủ ý hơn.',
    standardOutput: buildStandardOutput(
      'Chau Chanh Hua',
      '7.5/10',
      'Bài làm này được nêu đúng ngôi kể, chi tiết hoàn cảnh phong phú và nhận diện đúng giọng điệu, thiếu nguyên nhân thầy bói đoán trúng chi tiết thực tế ở câu 3, chưa được đạt dung lượng đoạn văn 5-7 dòng ở câu 5, cần viết đoạn văn dài dặn và đầy đủ ý hơn.'
    )
  },
  {
    id: 'hs-van-12a11',
    studentName: 'Nguyễn Thị Hồng Vân',
    studentClass: '12A11',
    studentCode: '12A11-04B',
    submittedAt: '2026-10-10 14:40',
    answers: {
      q1: 'Ngôi thứ ba',
      q2: 'Lúc 9 tuổi, nó đã phải đi ở nhờ nhà một người bác họ. Xuân lấy đầu hè xó cửa làm nhà, nó bán phá xa, bán nhật trình, làm chạy hiệu rạp hát...',
      q3: 'Vì những lời của ông thầy bói nói với Xuân Tóc Đỏ đều đúng với hoàn cảnh của Xuân. Nên ông rất tin tưởng vào những gì của thầy bói nói.',
      q4: 'Thể hiện giọng điệu châm biếm của tác giả đối với cách miêu tả nhân vật và Xuân Tóc Đỏ.',
      q5: 'Hiện nay con người ta ai cũng tin vào những chuyện mê tín hoặc may rủi cả. Có nhiều người mù quáng tin vào chuyện mê tín để cho nó chi phối cuộc sống của mình. Cũng giống như may rủi vậy đó cứ hễ gặp chuyện gì thì lại nói hôm nay thật may rủi. Bởi vì vậy con người ta cần rèn luyện cho mình một thói quen là tránh sống dựa vào may rủi hoặc mê tín, chúng ta nên bình tĩnh và cố gắng vượt qua nó thay vì tin vào mọi chuyện đều do mê tín hoặc may rủi gây ra.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đúng 2 chi tiết: ở nhờ nhà bác họ và lấy đầu hè làm nhà làm nhiều nghề vặt.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói nói đúng hoàn cảnh; thiếu vế tâm lý ham danh vọng đổi đời.',
    q4Score: 1.5,
    q4Feedback: 'Nêu được giọng châm biếm; cần bổ sung tính trào phúng, mỉa mai sắc sảo.',
    q5Score: 2.0,
    q5Feedback: 'Đoạn văn viết được tác hại mê tín; cần nhấn mạnh sâu hơn tầm quan trọng của việc tự rèn luyện.',
    totalScore: 7.5,
    formattedScore: '7.5/10',
    comment: 'Bài làm này được trả lời đúng ngôi kể, nêu chi tiết hoàn cảnh đầy đủ và viết đoạn văn trôi chảy, thiếu nguyên nhân tâm lý ham danh vọng đổi đời ở câu 3, chưa được nhấn mạnh vai trò tự rèn luyện bản thân ở câu 5, cần bám sát yêu cầu đề bài để không sót ý.',
    standardOutput: buildStandardOutput(
      'Nguyễn Thị Hồng Vân',
      '7.5/10',
      'Bài làm này được trả lời đúng ngôi kể, nêu chi tiết hoàn cảnh đầy đủ và viết đoạn văn trôi chảy, thiếu nguyên nhân tâm lý ham danh vọng đổi đời ở câu 3, chưa được nhấn mạnh vai trò tự rèn luyện bản thân ở câu 5, cần bám sát yêu cầu đề bài để không sót ý.'
    )
  },
  {
    id: 'hs-thong-12a3',
    studentName: 'Lê Huỳnh Tấn Thông',
    studentClass: '12A3',
    studentCode: '12A3-03B',
    submittedAt: '2026-10-10 14:45',
    answers: {
      q1: 'Đoạn trích này sử dụng ngôi kể thứ 3',
      q2: 'Chi tiết khắc họa sự khó khăn của Xuân: “lúc mới 9 tuổi…họ thúc bá”, “Từ đấy, thằng Xuân…cá hồ Hoàn Kiếm làm cơm”.',
      q3: 'Theo em, vì nhân vật Xuân có một tuổi thơ cơ cực không được dạy dỗ đàng hoàng, nhận thức bị sai lệch, nên khi gặp ông thầy số nhận được những lời khen về số phận sau này, Xuân đã tin rằng tương lai bản thân sẽ được như lời bói.',
      q4: 'Qua cách miêu tả tình huống xem bói giọng điệu của tác giả là lời châm biếm, mỉa mai sự thiếu thốn của Xuân, khiến anh dần tin vào những lời bói sáo rỗng.',
      q5: 'Để phòng ngừa những quan niệm may rủi và mê tín dị đoan, mỗi người cần chủ động rèn luyện bản thân cả về nhận thức lẫn hành động. Trước hết, chúng ta phải có tư duy khoa học, biết suy nghĩ độc lập và kiểm chứng thông tin trước khi tin vào những điều chưa có căn cứ. Khi gặp khó khăn trong cuộc sống, thay vì phụ thuộc vào bói toán hay bùa chú, mỗi người nên bình tĩnh tìm cách giải quyết bằng sự nỗ lực của chính mình. Bên cạnh đó, chúng ta cần phân biệt giữa tín ngưỡng truyền thống tốt đẹp và mê tín dị đoan, đồng thời không ngừng học tập, trau dồi kiến thức và rèn luyện ý chí. Tóm lại, rèn luyện tư duy đúng đắn, sống tích cực và tin tưởng vào năng lực của bản thân chính là cách tốt nhất để phòng ngừa mê tín dị đoan và làm chủ cuộc sống.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu dẫn chứng hoàn cảnh chính xác, chọn lọc từ văn bản.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được tâm lý mong cầu tương lai tốt đẹp; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 1.5,
    q4Feedback: 'Nêu được giọng châm biếm, mỉa mai; cần bổ sung tính trào phúng.',
    q5Score: 3.0,
    q5Feedback: 'Đoạn văn xuất sắc, lập luận chặt chẽ, tư duy khoa học, đúng dung lượng và giàu tính giáo dục.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được viết đoạn văn câu 5 rất xuất sắc, xác định đúng ngôi kể và hoàn cảnh nhân vật, thiếu vế thầy bói đoán trúng chi tiết thực tế ở câu 3, chưa được gọi tên đầy đủ thuật ngữ giọng điệu trào phúng ở câu 4, cần đọc kỹ biểu điểm để bổ sung đầy đủ các vế.',
    standardOutput: buildStandardOutput(
      'Lê Huỳnh Tấn Thông',
      '8.5/10',
      'Bài làm này được viết đoạn văn câu 5 rất xuất sắc, xác định đúng ngôi kể và hoàn cảnh nhân vật, thiếu vế thầy bói đoán trúng chi tiết thực tế ở câu 3, chưa được gọi tên đầy đủ thuật ngữ giọng điệu trào phúng ở câu 4, cần đọc kỹ biểu điểm để bổ sung đầy đủ các vế.'
    )
  },
  {
    id: 'hs-hai-12a11',
    studentName: 'Nguyễn Chí Hải',
    studentClass: '12A11',
    studentCode: '12A11-04C',
    submittedAt: '2026-10-10 14:50',
    answers: {
      q1: 'Ngôi thứ ba',
      q2: 'Lúc mới 9 tuổi, nó đã phải đi ở nhờ nhà một bác họ, bán nhật trình, làm chạy hiệu rạp hát, bán cao đan hoàn tán trên xe lửa.',
      q3: 'Vì xuân tóc đỏ chỉ lo nghe thầy số hoang tưởng giàu sang, cuộc sống xa hoa qua những lời thầy số nói. Mà không chịu học hỏi và làm việc chỉ biết lang thang ngoài đường chỉ mê những trò đỏ đen, xui rủi.',
      q4: 'Giọng điệu của tác giả qua tình huống và cách miêu tả nhân vật thể hiện sự châm biếm, hài hước. Cũng nói lên sự mê rủi đỏ đen của con người.',
      q5: 'Luôn phải tìm kiếm học hỏi tránh xa những việc có tính đỏ đen. Phải luôn học để có tương lai và thành công tốt đẹp trong cuộc sống. Chỉ có hành động mới có kết quả việc chúng ta luôn nghĩ rằng làm ít, làm nhiều cũng không tốt những suy nghĩ đó cũng chẳng mang lại những lợi ích gì mà nó cho biết sự mê tín của mỗi chúng ta.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đúng 2 chi tiết: đi ở nhờ nhà bác họ và làm các nghề vặt mưu sinh.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được tâm lý hoang tưởng giàu sang xa hoa; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 1.0,
    q4Feedback: 'Nêu được châm biếm, hài hước; chưa làm nổi bật tính trào phúng, mỉa mai sâu sắc.',
    q5Score: 2.0,
    q5Feedback: 'Nêu được ý tránh xa đỏ đen, học hỏi rèn luyện; diễn đạt đôi chỗ còn lủng củng.',
    totalScore: 7.0,
    formattedScore: '7/10',
    comment: 'Bài làm này được xác định đúng ngôi kể và dẫn chứng hoàn cảnh nhân vật phù hợp, thiếu vế thầy bói đoán đúng chi tiết thực tế ở câu 3, chưa được diễn đạt gãy gọn và chưa làm nổi bật giọng điệu trào phúng ở câu 4, cần trau dồi cách diễn đạt và đọc kỹ câu hỏi.',
    standardOutput: buildStandardOutput(
      'Nguyễn Chí Hải',
      '7/10',
      'Bài làm này được xác định đúng ngôi kể và dẫn chứng hoàn cảnh nhân vật phù hợp, thiếu vế thầy bói đoán đúng chi tiết thực tế ở câu 3, chưa được diễn đạt gãy gọn và chưa làm nổi bật giọng điệu trào phúng ở câu 4, cần trau dồi cách diễn đạt và đọc kỹ câu hỏi.'
    )
  },
  {
    id: 'hs-bao-12a3',
    studentName: 'Lê Chí Bảo',
    studentClass: '12A3',
    studentCode: '12A3-02',
    submittedAt: '2026-10-10 14:55',
    answers: {
      q1: 'Đoạn trích trên được kể theo ngôi thứ 3',
      q2: 'Trong đoạn trích, hoàn cảnh tuổi thơ khó khăn của Xuân Tóc Đỏ thể hiện ở hai chi tiết đó là, lúc thiếu thời thì cậu vất vả lắm, đó là do thầy quẻ đã coi ra được, và lúc 9 tuổi Xuân Tóc Đỏ đã đi ở nhờ nhà ông bác họ.',
      q3: 'Theo em, vì Xuân Tóc Đỏ rất tin vào mê tín dị đoan, thấy ông thầy lại nói rất đúng về mình nên cảm thấy tin tưởng.',
      q4: 'Tác giả đã thể hiện giọng điệu mỉa mai và châm biếm.',
      q5: 'Xuân Tóc Đỏ là một kẻ mang bản chất cơ hội, lươn lẹo, tin vào mê tín dị đoan, trở nên thụ động và dễ sa ngã vào cạm bẫy lừa đảo. Thay vì chờ đợi quả ngọt đến, hãy chủ động rèn luyện bản thân, không ngừng trau dồi kiến thức, kỹ năng, phẩm chất đạo đức. Việc tự lập, vươn lên bằng chính đôi chân của mình là chìa khóa duy nhất giúp chúng ta làm chủ vận mệnh và xây dựng cuộc đời trọn vẹn, ý nghĩa.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 1.5,
    q2Feedback: 'Nêu được chi tiết ở nhờ nhà bác họ; chi tiết lúc thiếu thời vất vả còn chung chung theo lời thầy bói.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói nói rất đúng về mình; thiếu nguyên nhân tâm lý ham danh vọng đổi đời.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu mỉa mai và châm biếm.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn viết rất sâu sắc, liên hệ chặt chẽ giữa tác hại mê tín và tự lực vươn lên.',
    totalScore: 8.0,
    formattedScore: '8/10',
    comment: 'Bài làm này được viết đoạn văn nghị luận rất sắc sảo và nêu đúng giọng điệu mỉa mai châm biếm, thiếu nguyên nhân tâm lý ham đổi đời ở câu 3, chưa được dẫn chứng cụ thể chi tiết hoàn cảnh thực tế thứ hai ở câu 2, cần bám sát văn bản để lấy dẫn chứng trực tiếp.',
    standardOutput: buildStandardOutput(
      'Lê Chí Bảo',
      '8/10',
      'Bài làm này được viết đoạn văn nghị luận rất sắc sảo và nêu đúng giọng điệu mỉa mai châm biếm, thiếu nguyên nhân tâm lý ham đổi đời ở câu 3, chưa được dẫn chứng cụ thể chi tiết hoàn cảnh thực tế thứ hai ở câu 2, cần bám sát văn bản để lấy dẫn chứng trực tiếp.'
    )
  },
  {
    id: 'hs-bac-12a3',
    studentName: 'Ngô Thị Kim Bạc',
    studentClass: '12A3',
    studentCode: '12A3-04C',
    submittedAt: '2026-10-10 15:00',
    answers: {
      q1: 'Câu 1: Đoạn trích được kể theo ngôi kể thứ ba.',
      q2: 'Hai chi tiết trong đoạn trích cho thấy hoàn cảnh tuổi thơ khó khăn của nhân vật Xuân Tóc Đỏ là: “lúc mới 9 tuổi, nó đã phải đi ở nhờ một người bác họ, họ thúc bá. Bác nó nuôi nó thay đầy tớ và được cả họ khen là nuôi cháu mồ côi, nhưng một hôm nó bị đánh một trận và bị đuổi đi”. “Nó đã bán phá xa, bán nhật trình, làm chạy hiệu rạp hát, bán cao đơn hoàn tán trên xe lửa và vài ba nghề tiểu xảo khác nữa”.',
      q3: 'Nhân vật Xuân Tóc Đỏ tỏ ra rất tin vào lời bói của ông thầy số là vì thầy số đoán trúng hoàn cảnh: “cha mẹ ắt hẳn chơi tiên thuở nào. Nếu nói đúng giờ thì số này phải mồ côi sớm”, “lúc thiếu thời thì cậu vất vả lắm”.',
      q4: 'Qua cách miêu tả nhân vật và tình huống xem bói, đoạn trích thể hiện giọng điệu của tác giả là giọng điệu mỉa mai, tác giả phơi bày sự bịp bợm của thầy số, sự ngây thơ mê tín của Xuân Tóc Đỏ lộ bộ mặt lố lăng của thế giới thượng lưu.',
      q5: 'Hình ảnh nhân vật Xuân Tóc Đỏ trong đoạn trích chìm đắm trong lời bói là bài học đắt giá về cuộc sống dựa vào may rủi. Tương lai của mỗi người được quyết định bởi chính hành động và nỗ lực chứ không nằm ở những lời mê tín. Chỉ khi có năng lực thật sự chúng ta mới đủ tự tin làm chủ cuộc đời và vượt qua mọi khó khăn. Cần học tập tốt làm người công dân có ích cho xã hội và xây dựng đất nước ngày càng phát triển hơn.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Trích dẫn dẫn chứng hoàn cảnh rất chuẩn xác và đầy đủ.',
    q3Score: 1.0,
    q3Feedback: 'Nêu rất tốt việc thầy bói đoán trúng hoàn cảnh; thiếu vế tâm lý ham danh vọng, muốn đổi đời của Xuân.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu mỉa mai, châm biếm, phơi bày bản chất lố lăng.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đúng dung lượng, lập luận mạch lạc về tự nỗ lực làm chủ cuộc đời.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được trích dẫn dẫn chứng văn bản phong phú và phân tích tốt giọng điệu mỉa mai, thiếu nguyên nhân tâm lý khát khao đổi đời của Xuân ở câu 3, chưa được phân tích toàn diện 2 vế của câu hỏi nguyên nhân, cần chú ý bổ sung đủ 2 ý theo thang điểm.',
    standardOutput: buildStandardOutput(
      'Ngô Thị Kim Bạc',
      '8.5/10',
      'Bài làm này được trích dẫn dẫn chứng văn bản phong phú và phân tích tốt giọng điệu mỉa mai, thiếu nguyên nhân tâm lý khát khao đổi đời của Xuân ở câu 3, chưa được phân tích toàn diện 2 vế của câu hỏi nguyên nhân, cần chú ý bổ sung đủ 2 ý theo thang điểm.'
    )
  },
  {
    id: 'hs-tuan-12a3',
    studentName: 'Nguyễn Lâm Tuấn',
    studentClass: '12A3',
    studentCode: '12A3-05',
    submittedAt: '2026-10-10 15:05',
    answers: {
      q1: 'thứ 3',
      q2: 'Những câu văn miêu tả hoàn cảnh xuất thân của Xuân Tóc Đỏ: Lúc mới 9 tuổi, nó đã phải đi ở nhờ nhà một người bác họ, họ thúc bá. Bác nó nuôi nó thay đầy tớ và được cả họ khen là nuôi cháu mồ côi. Từ đấy, thằng Xuân lấy đầu hè xó cửa làm nhà, lấy sấu ở các phố, cá hồ Hoàn Kiếm làm cơm.',
      q3: 'Theo em, Xuân Tóc Đỏ tin vào lời ông thầy bói là do tuổi còn nhỏ, lần đầu đi xem bói nên thiếu kinh nghiệm để nhận ra sự khác biệt giữa thầy bói thật và thầy bói giả. Một phần nữa là ông thầy bói thật sự nói đúng về tuổi thơ gian khổ của Xuân Tóc Đỏ, thậm chí còn dự đoán đúng về tương lai của nó.',
      q4: 'Qua việc miêu tả nhân vật “ông thầy bói” với tình huống xem bói, tác giả đã thể hiện sự mỉa mai đối với tình trạng mê tín dị đoan, để lừa tiền người khác.',
      q5: 'Hình ảnh Xuân Tóc Đỏ trong đoạn trích là một thanh niên nghèo khổ, bất hạnh, sống bồng bềnh với những nghề tạm bợ và rất tin vào vận may. Đoạn văn cho thấy khi gặp khó khăn, con người thường dễ ỷ lại vào số mệnh, vận may. Tuy nhiên, nếu không có những thử thách đó thì con người không thể trưởng thành được. Chỉ có lao động, nỗ lực và ý chí vững vàng mới giúp ta vượt qua khó khăn. Cuộc đời Xuân Tóc Đỏ là lời cảnh tỉnh đối với hiện tượng chạy theo danh tiếng hão huyền và sự mê muội của một bộ phận người dân.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu dẫn chứng hoàn cảnh xuất sắc, chọn lọc câu văn tiêu biểu.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói nói đúng tuổi thơ gian khổ; thiếu nguyên nhân tâm lý ham danh vọng đổi đời.',
    q4Score: 1.5,
    q4Feedback: 'Nêu được sự mỉa mai đối với mê tín; cần bổ sung tính trào phúng, châm biếm sắc sảo.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn viết rất sâu sắc, bàn luận thấu đáo về lao động, nỗ lực và ý chí.',
    totalScore: 8.0,
    formattedScore: '8/10',
    comment: 'Bài làm này được trích dẫn hoàn cảnh chính xác và viết đoạn văn câu 5 có chiều sâu triết lý, thiếu nguyên nhân tâm lý ham đổi đời giàu sang ở câu 3, chưa được làm nổi bật thuật ngữ trào phúng ở câu 4, cần nắm chắc đáp án tham chiếu để đạt điểm tối đa.',
    standardOutput: buildStandardOutput(
      'Nguyễn Lâm Tuấn',
      '8/10',
      'Bài làm này được trích dẫn hoàn cảnh chính xác và viết đoạn văn câu 5 có chiều sâu triết lý, thiếu nguyên nhân tâm lý ham đổi đời giàu sang ở câu 3, chưa được làm nổi bật thuật ngữ trào phúng ở câu 4, cần nắm chắc đáp án tham chiếu để đạt điểm tối đa.'
    )
  },
  {
    id: 'hs-hoa-12a3',
    studentName: 'Nguyễn Phước Hoà',
    studentClass: '12A3',
    studentCode: '12A3-03C',
    submittedAt: '2026-10-10 15:10',
    answers: {
      q1: 'Đoạn trích được kể theo ngôi kể thứ ba.',
      q2: 'Hai chi tiết trong đoạn trích cho thấy hoàn cảnh éo le, khốn khó của nhân vật Xuân Tóc Đỏ là: “Lúc mới 9 tuổi, nó đã phải đi ở nhờ một người bác họ”; “Bác nuôi nó và được cả họ khen là nuôi cháu mồ côi”. Nhưng một hôm, nó bị đánh một trận và bị đuổi đi. “Nó đã bán phá xa, bán nhật trình, làm chạy hiệu rạp hát, bán cao đơn hoàn tán trên xe lửa”.',
      q3: 'Nhân vật Xuân Tóc Đỏ là một nhân vật tin vào lời bói của ông thầy số là vì thầy số đoán đúng hoàn cảnh: “cha mẹ ắt hẳn chơi tiên thuở nào... lúc thiếu thời thì cậu vất vả lắm”.',
      q4: 'Qua cách miêu tả nhân vật và tình huống xem bói, đoạn trích thể hiện giọng điệu mỉa mai, châm biếm, giễu cợt. Tác giả phê phán sự bịp bợm của thầy số, sự ngờ nghệch, mê tín của Xuân Tóc Đỏ, làm bộc lộ bản chất lố bịch của thế giới thượng lưu.',
      q5: 'Hình ảnh nhân vật Xuân Tóc Đỏ trong đoạn trích là bài học đáng giá về việc sống dựa vào may rủi. Thay vì mong chờ được giúp đỡ hay trông đợi vận may, bản thân mỗi người cần chủ động và nỗ lực chứ không nên ỷ lại vào mê tín. Chỉ khi có sự nỗ lực thực sự của chính ta mới đủ tự tin làm chủ cuộc đời và nhận ra giá trị của bản thân. Cần học tập, rèn luyện để làm người công dân có ích cho xã hội và xây dựng đất nước ngày càng phát triển hơn.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu dẫn chứng hoàn cảnh rất cụ thể, đạt trọn vẹn điểm.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói đoán đúng hoàn cảnh; thiếu vế tâm lý ham danh vọng đổi đời.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu mỉa mai, châm biếm, giễu cợt sắc sảo.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đúng dung lượng, lý lẽ thuyết phục về nỗ lực làm chủ cuộc đời.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được xác định đúng ngôi kể, phân tích chuẩn giọng điệu và dẫn chứng hoàn cảnh đầy đủ, thiếu vế tâm lý khát khao đổi đời của Xuân ở câu 3, chưa được phân tích đủ 2 nguyên nhân, cần chú ý trả lời trọn vẹn cả nguyên nhân khách quan và chủ quan.',
    standardOutput: buildStandardOutput(
      'Nguyễn Phước Hoà',
      '8.5/10',
      'Bài làm này được xác định đúng ngôi kể, phân tích chuẩn giọng điệu và dẫn chứng hoàn cảnh đầy đủ, thiếu vế tâm lý khát khao đổi đời của Xuân ở câu 3, chưa được phân tích đủ 2 nguyên nhân, cần chú ý trả lời trọn vẹn cả nguyên nhân khách quan và chủ quan.'
    )
  },
  {
    id: 'hs-kiet-12a3',
    studentName: 'Cao Quốc Kiệt',
    studentClass: '12A3',
    studentCode: '12A3-03D',
    submittedAt: '2026-10-10 15:15',
    answers: {
      q1: 'Ngôi kể thứ ba.',
      q2: 'Hai chi tiết hoàn cảnh: Âm dương tuần triệt cha mẹ chơi tiên thuở nào mồ côi; Thằng Xuân lấy đầu hè xó cửa làm nhà, lấy sấu ở các phố, cá hồ Hoàn Kiếm làm cơm.',
      q3: 'Theo em, ông thầy bói đoán cũng rất đúng khi nói đến đoạn không còn người nhà. Hắn đã gật gù khen đúng và lúc nói hắn đầu năm có số đào hoa vỗ tay đôm đốp, không phải một người xa lạ nào cũng hiểu Xuân như thế nên đạt được niềm tin.',
      q4: 'Tác giả sử dụng giọng điệu rất hài hước, châm biếm, mỉa mai, nói về một tầng lớp xã hội thối nát chỉ biết tin vào mê tín dị đoan và sự may rủi, dùng ngòi bút để miêu tả sự mục rữa của xã hội.',
      q5: 'Thành công thực sự phải được xây nên từ chính bản thân mỗi người. Các yếu tố tâm linh chỉ nên là điểm tựa tinh thần. Cuộc sống ngoài kia đòi hỏi chúng ta phải lao động bằng chính đôi tay và khối óc, tuyệt đối không đặt cược số phận vào sự may rủi mong manh. Để không trượt dài trong ảo vọng, con người cần trau dồi ý chí sắt đá, lòng dũng cảm, giữ tâm hồn trong sáng, lương thiện và sống trách nhiệm với bản thân lẫn cộng đồng.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đúng 2 chi tiết hoàn cảnh mồ côi và lấy đầu hè xó cửa làm nhà kiếm cơm.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được thầy bói đoán trúng chi tiết thực tế; thiếu vế tâm lý ham danh vọng đổi đời.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu châm biếm, mỉa mai sắc sảo.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn viết rất sâu sắc, lập luận chặt chẽ về lao động khối óc và ý chí sắt đá.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được thể hiện khả năng cảm thụ văn học tốt, lập luận câu 5 sắc sảo và ngôi kể đúng, thiếu vế tâm lý khao khát đổi đời của nhân vật ở câu 3, chưa được hoàn thiện đủ 2 nguyên nhân, cần bổ sung nguyên nhân chủ quan của Xuân Tóc Đỏ.',
    standardOutput: buildStandardOutput(
      'Cao Quốc Kiệt',
      '8.5/10',
      'Bài làm này được thể hiện khả năng cảm thụ văn học tốt, lập luận câu 5 sắc sảo và ngôi kể đúng, thiếu vế tâm lý khao khát đổi đời của nhân vật ở câu 3, chưa được hoàn thiện đủ 2 nguyên nhân, cần bổ sung nguyên nhân chủ quan của Xuân Tóc Đỏ.'
    )
  },
  {
    id: 'hs-trinh-12a3',
    studentName: 'Lý Trinh Trinh',
    studentClass: '12A3',
    studentCode: '12A3-01',
    submittedAt: '2026-10-10 15:20',
    answers: {
      q1: 'Ngôi kể thứ 3',
      q2: 'Hai chi tiết cho thấy hoàn cảnh tuổi thơ khó khăn của Xuân Tóc Đỏ là: Năm lên 9 tuổi, Xuân phải đi ở nhờ nhà người bác họ; Sau khi bị đánh và đuổi đi, Xuân phải lang thang kiếm sống bằng nhiều nghề như bán phá xa, bán nhật trình, làm chạy hiệu rạp hát, bán cao đơn hoàn tán.',
      q3: 'Xuân Tóc Đỏ tin vào lời bói của ông thầy số vì những lời phán về tương lai giàu sang, danh giá đã khơi dậy trong hắn niềm hi vọng và sự mơ tưởng về một cuộc sống tốt đẹp. Hơn nữa, xuất thân nghèo khó, phải lang thang kiếm sống khiến Xuân mong muốn đổi đời. Vì vậy, hắn dễ tin vào những lời bói toán có lợi cho mình.',
      q4: 'Đoạn trích thể hiện giọng điệu trào phúng, châm biếm và hài hước. Tác giả khắc họa Xuân Tóc Đỏ với vẻ tự tin, háo hức khi nghe những lời bói có lợi cho mình, qua đó tạo nên tình huống gây cười. Đồng thời, tác giả phê phán thói mê tín, tin vào bói toán và khát vọng đổi đời bằng may rủi của con người.',
      q5: 'Từ hình ảnh nhân vật Xuân Tóc Đỏ, em nhận ra rằng mỗi người muốn thành công cần phải không ngừng nỗ lực và hoàn thiện bản thân. Thay vì trông chờ vào may rủi hay tin tưởng mù quáng vào bói toán, chúng ta hãy chủ động học tập, rèn luyện ý chí và tích lũy kiến thức mỗi ngày. Bởi lẽ, không có lời tiên đoán nào có thể thay thế được sự cố gắng, cũng không có vận may nào bảo đảm cho thành công lâu dài nếu con người thiếu năng lực và quyết tâm. Khi gặp khó khăn, ta không nên buông xuôi hay phó mặc số phận mà cần dũng cảm đối mặt, kiên trì tìm cách vượt qua. May mắn có thể mở ra cho ta một cơ hội, nhưng chính sự nỗ lực và bản lĩnh mới giúp ta nắm chặt cơ hội ấy.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đầy đủ 2 chi tiết hoàn cảnh mồ côi ở nhờ và làm nhiều nghề vặt kiếm sống.',
    q3Score: 2.0,
    q3Feedback: 'Nêu trọn vẹn cả 2 nguyên nhân: lời phán đánh trúng hoàn cảnh và tâm lý ham danh vọng, khát khao đổi đời.',
    q4Score: 2.0,
    q4Feedback: 'Nêu chính xác và phân tích sâu sắc giọng điệu trào phúng, châm biếm, hài hước.',
    q5Score: 3.0,
    q5Feedback: 'Đoạn văn hoàn hảo về dung lượng, kết cấu, ngôn từ chuẩn mực và tư tưởng giáo dục sâu sắc.',
    totalScore: 10.0,
    formattedScore: '10/10',
    comment: 'Bài làm này được trả lời xuất sắc toàn bộ 5 câu hỏi, lập luận chặt chẽ và hành văn truyền cảm, thiếu không đáng kể, chưa được đôi chỗ rút gọn câu cho cô đọng hơn, cần tiếp tục phát huy phong độ và năng lực văn học nổi bật.',
    standardOutput: buildStandardOutput(
      'Lý Trinh Trinh',
      '10/10',
      'Bài làm này được trả lời xuất sắc toàn bộ 5 câu hỏi, lập luận chặt chẽ và hành văn truyền cảm, thiếu không đáng kể, chưa được đôi chỗ rút gọn câu cho cô đọng hơn, cần tiếp tục phát huy phong độ và năng lực văn học nổi bật.'
    )
  },
  {
    id: 'hs-nhut-12a11',
    studentName: 'Nguyễn Văn Nhựt',
    studentClass: '12A11',
    studentCode: '12A11-04D',
    submittedAt: '2026-10-10 15:25',
    answers: {
      q1: 'Đoạn trích được kể theo ngôi thứ ba vì người kể không xưng tôi mà ẩn mình gọi nhân vật bằng tên riêng.',
      q2: 'Đoạn trích trên có hai cảnh khốn khó của nhân vật Xuân Tóc Đỏ là: Thứ nhất, khi 9 tuổi Xuân phải ở nhờ nhà người bác họ và bị đối xử như đầy tớ; Thứ hai, Xuân bị bác đuổi đi, phải lang thang kiếm sống bằng nhiều nghề như bán phá xa, bán nhật trình, làm chạy hiệu rạp hát và bán cao đơn hoàn tán trên xe lửa.',
      q3: 'Theo em, lí do nhân vật Xuân Tóc Đỏ rất tin lời ông thầy số là do những lời phán đoán ấy rất đúng về cuộc đời của Xuân và đánh trúng khát vọng đổi đời của Xuân, mong muốn thoát khỏi thân phận thấp kém của mình.',
      q4: 'Qua cách miêu tả nhân vật và tình huống xem bói, đoạn trích thể hiện giọng điệu châm biếm và mỉa mai Xuân và xã hội thối nát. Nhà văn khắc họa Xuân Tóc Đỏ với những suy nghĩ đầy may rủi và mê tín, khát vọng đổi đời và niềm tin vào lời bói toán thể hiện tính cách lệ thuộc mê tín dị đoan.',
      q5: 'Qua đoạn trích Số Đỏ, hình ảnh nhân vật Xuân Tóc Đỏ giúp em hiểu được mỗi người cần không ngừng rèn luyện bản thân để làm chủ tương lai thay vì phó mặc cuộc đời cho may rủi hay mê tín. Khi may mắn không tới chúng ta sẽ mất đi những thứ mà chúng ta khao khát, nên muốn thành công không nên dựa vào may rủi hay mê tín mà phải dựa vào chính bản thân mình. Thời thế có thể tạo anh hùng, nhưng anh hùng vẫn phải chủ động nắm bắt thời thế bằng chính năng lực.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba, giải thích rõ đặc điểm.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đầy đủ 2 chi tiết hoàn cảnh mồ côi ở nhờ bị đuổi và làm nhiều nghề vặt.',
    q3Score: 2.0,
    q3Feedback: 'Nêu trọn vẹn 2 nguyên nhân: phán đúng thực tế và đánh trúng khát vọng đổi đời của Xuân.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu châm biếm, mỉa mai xã hội thối nát.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đúng dung lượng 5-7 dòng, lập luận sắc bén về tự rèn luyện làm chủ tương lai.',
    totalScore: 9.5,
    formattedScore: '9.5/10',
    comment: 'Bài làm này được trả lời đầy đủ chính xác cả 5 câu hỏi và nêu trọn vẹn 2 nguyên nhân ở câu 3, thiếu một chút diễn đạt chau chuốt ở câu kết đoạn văn, chưa được thật sự mượt mà ở vài từ nối, cần phát huy kỹ năng lập luận logic và hành văn sáng sủa.',
    standardOutput: buildStandardOutput(
      'Nguyễn Văn Nhựt',
      '9.5/10',
      'Bài làm này được trả lời đầy đủ chính xác cả 5 câu hỏi và nêu trọn vẹn 2 nguyên nhân ở câu 3, thiếu một chút diễn đạt chau chuốt ở câu kết đoạn văn, chưa được thật sự mượt mà ở vài từ nối, cần phát huy kỹ năng lập luận logic và hành văn sáng sủa.'
    )
  },
  {
    id: 'hs-thanh-12a3',
    studentName: 'Trần Thị Thái Thạnh',
    studentClass: '12A3',
    studentCode: '12A3-04D',
    submittedAt: '2026-10-10 15:30',
    answers: {
      q1: 'Ngôi kể thứ ba',
      q2: 'Lúc mới 9 tuổi, nó phải ở nhờ nhà một người bác họ, coi như chú cháu mồ côi và bị đánh đuổi đi. Bán phá xa, bán nhật trình, làm chạy hiệu rạp hát, và vài ba nghề tiểu xảo khác.',
      q3: 'Vì thầy nói trúng hoàn cảnh: “Cha mẹ ắt hẳn chơi tiên chỗ nào, lúc thiếu thời thì cậu vất vả lắm”; Thầy phán số đào hoa và tương lai có ngã rẽ mới: “Từ năm nay trở đi đã mở vận rồi đấy”.',
      q4: 'Châm biếm, mỉa mai. Tác giả đã cho thấy những lời bịp bợm của ông thầy bói và sự ngây thơ mê tín tin tưởng của Xuân Tóc Đỏ, cũng như bóc trần bộ mặt lố lăng của giới thượng lưu lúc bấy giờ.',
      q5: 'Hình ảnh của Xuân Tóc Đỏ mải mê đắm chìm vào lời của ông thầy bói là bài học đáng nhớ về việc sống chỉ biết dựa vào vận may rủi. Thực tế cuộc sống của mỗi người được quyết định bởi bản thân mình. Không nên tin tưởng vào vài lời bịp bợm của người khác mà luôn đắm chìm vào những lời mê tín ấy. Chỉ có năng lực thật sự của bản thân thì mới chủ động vượt qua mọi khó khăn.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu đúng 2 chi tiết hoàn cảnh mồ côi ở nhờ bị đuổi và làm các nghề vặt.',
    q3Score: 1.5,
    q3Feedback: 'Nêu được thầy nói trúng hoàn cảnh và mở vận tương lai; cần làm rõ hơn tâm lý chủ quan ham danh vọng của Xuân.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu châm biếm, mỉa mai, bóc trần bộ mặt lố lăng.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn mạch lạc, khẳng định năng lực thật sự để vượt qua khó khăn.',
    totalScore: 9.0,
    formattedScore: '9/10',
    comment: 'Bài làm này được xác định đúng ngôi kể, phân tích tốt giọng điệu mỉa mai châm biếm và viết đoạn văn sâu sắc, thiếu phân tích rõ nét tâm lý ham danh vọng đổi đời của Xuân ở câu 3, chưa được đào sâu nguyên nhân chủ quan, cần lưu ý tách bạch 2 nguyên nhân khách quan và chủ quan.',
    standardOutput: buildStandardOutput(
      'Trần Thị Thái Thạnh',
      '9/10',
      'Bài làm này được xác định đúng ngôi kể, phân tích tốt giọng điệu mỉa mai châm biếm và viết đoạn văn sâu sắc, thiếu phân tích rõ nét tâm lý ham danh vọng đổi đời của Xuân ở câu 3, chưa được đào sâu nguyên nhân chủ quan, cần lưu ý tách bạch 2 nguyên nhân khách quan và chủ quan.'
    )
  },
  {
    id: 'hs-khanh-12a11',
    studentName: 'Ngô Tuấn Khanh',
    studentClass: '12A11',
    studentCode: '12A11-03B',
    submittedAt: '2026-10-10 15:35',
    answers: {
      q1: 'ngôi thứ 3',
      q2: 'mồ côi cha mẹ từ nhỏ và phải lang thang kiếm sống bằng nhiều nghề vặt.',
      q3: 'Vì Xuân Tóc Đỏ có hoàn cảnh nghèo khổ, thiếu thốn tình thương và hiểu biết nên luôn mong muốn đổi đời, tin vào lời bói của ông thầy số để hi vọng có tương lai tốt đẹp.',
      q4: 'Đoạn trích thể hiện giọng điệu trào phúng, hài hước và châm biếm của tác giả, qua đó phê phán sự mê tín và thói tin vào số phận mù quáng.',
      q5: 'Em cho rằng mỗi người cần rèn luyện bản thân để tự quyết định tương lai của mình. Là học sinh, em cần chăm chỉ học tập, tích lũy kiến thức và không ngừng cố gắng. Em không nên quá tin vào may rủi hay mê tín mà phải biết suy nghĩ đúng đắn. Em hiểu rằng thành công chỉ đến khi bản thân có sự nỗ lực và quyết tâm. Vì vậy, em sẽ luôn chủ động học hỏi, hoàn thiện bản thân để đạt được mục tiêu trong tương lai.'
    },
    q1Score: 1.0,
    q1Feedback: 'Đúng ngôi kể thứ ba.',
    q2Score: 2.0,
    q2Feedback: 'Nêu được 2 chi tiết: mồ côi cha mẹ từ nhỏ và lang thang làm nhiều nghề vặt.',
    q3Score: 1.0,
    q3Feedback: 'Nêu được tâm lý mong muốn đổi đời; thiếu vế thầy bói đoán trúng chi tiết thực tế.',
    q4Score: 2.0,
    q4Feedback: 'Nêu đúng giọng điệu trào phúng, hài hước và châm biếm sắc sảo.',
    q5Score: 2.5,
    q5Feedback: 'Đoạn văn đúng dung lượng 5-7 dòng, liên hệ bản thân học sinh thiết thực và ý nghĩa.',
    totalScore: 8.5,
    formattedScore: '8.5/10',
    comment: 'Bài làm này được trả lời đúng ngôi kể, nhận diện chính xác giọng điệu trào phúng và liên hệ bản thân chân thành, thiếu vế thầy bói đoán đúng chi tiết thực tế ở câu 3, chưa được bổ sung đủ 2 nguyên nhân theo thang điểm, cần đọc kỹ đề để hoàn thiện đủ các ý.',
    standardOutput: buildStandardOutput(
      'Ngô Tuấn Khanh',
      '8.5/10',
      'Bài làm này được trả lời đúng ngôi kể, nhận diện chính xác giọng điệu trào phúng và liên hệ bản thân chân thành, thiếu vế thầy bói đoán đúng chi tiết thực tế ở câu 3, chưa được bổ sung đủ 2 nguyên nhân theo thang điểm, cần đọc kỹ đề để hoàn thiện đủ các ý.'
    )
  }
];

export const INITIAL_STUDENTS_DATA: GradingRecord[] = RAW_STUDENTS_DATA.map(enrichWithMissingReasons);

export const SAMPLE_STUDENT_PRESETS = INITIAL_STUDENTS_DATA.slice(0, 5).map(s => ({
  label: `${s.studentName} (${s.studentClass}) - ${s.formattedScore}`,
  name: s.studentName,
  className: s.studentClass,
  code: s.studentCode,
  answers: s.answers
}));

export interface QuestionAnswers {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
}

export interface GradingRecord {
  id: string;
  studentName: string;
  studentClass: string;
  studentCode: string;
  submittedAt: string;
  answers: QuestionAnswers;
  q1Score: number;
  q1Feedback: string;
  q1MissingReason?: string;
  q2Score: number;
  q2Feedback: string;
  q2MissingReason?: string;
  q3Score: number;
  q3Feedback: string;
  q3MissingReason?: string;
  q4Score: number;
  q4Feedback: string;
  q4MissingReason?: string;
  q5Score: number;
  q5Feedback: string;
  q5MissingReason?: string;
  totalScore: number;
  formattedScore: string;
  comment: string;
  standardOutput: string;
  goodPoints?: string;
  missingPoints?: string;
  notGoodPoints?: string;
  improvementPoints?: string;
}

export interface RubricItem {
  questionNumber: number;
  maxScore: number;
  title: string;
  questionContent: string;
  standardAnswer: string;
  criteria: string[];
}

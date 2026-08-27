import { UserProgress, AssessmentResult } from '../types';

export const evaluateUserPerformance = (progress: UserProgress): AssessmentResult => {
    const { vocabularyScore, exerciseCompletionRate, examReadinessScore } = progress;

    const overallScore = (vocabularyScore + exerciseCompletionRate + examReadinessScore) / 3;

    let assessment: AssessmentResult;

    if (overallScore >= 85) {
        assessment = { level: 'Excellent', ready: true };
    } else if (overallScore >= 70) {
        assessment = { level: 'Good', ready: true };
    } else if (overallScore >= 50) {
        assessment = { level: 'Satisfactory', ready: false };
    } else {
        assessment = { level: 'Needs Improvement', ready: false };
    }

    return assessment;
};

export const trackProgress = (userId: string, progress: UserProgress): void => {
    // Logic to save user progress to storage or database
    console.log(`Tracking progress for user ${userId}:`, progress);
};

export const assessExamReadiness = (progress: UserProgress): boolean => {
    const { examReadinessScore } = progress;
    return examReadinessScore >= 75; // Example threshold for readiness
};
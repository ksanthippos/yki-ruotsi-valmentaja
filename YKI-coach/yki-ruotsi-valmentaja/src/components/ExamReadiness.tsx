import React, { useEffect, useState } from 'react';
import { assessReadiness } from '../services/assessment';
import { Progress } from './ProgressDashboard';

const ExamReadiness: React.FC = () => {
    const [readinessScore, setReadinessScore] = useState<number | null>(null);
    const [progress, setProgress] = useState<Progress | null>(null);

    useEffect(() => {
        const score = assessReadiness();
        setReadinessScore(score);
        // Assume fetchProgress is a function that retrieves user's progress
        const userProgress = fetchProgress();
        setProgress(userProgress);
    }, []);

    return (
        <div className="exam-readiness">
            <h2>YKI Exam Readiness</h2>
            {readinessScore !== null ? (
                <div>
                    <p>Your readiness score: {readinessScore}</p>
                    <p>{readinessScore >= 75 ? 'You are ready for the exam!' : 'You may need more practice.'}</p>
                </div>
            ) : (
                <p>Loading readiness assessment...</p>
            )}
            {progress && (
                <div>
                    <h3>Your Progress</h3>
                    <p>Vocabulary learned: {progress.vocabularyLearned}</p>
                    <p>Exercises completed: {progress.exercisesCompleted}</p>
                </div>
            )}
        </div>
    );
};

export default ExamReadiness;
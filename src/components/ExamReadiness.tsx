import React from 'react';
import { listeningExercises, readingExercises, speakingPrompts, writingPrompts } from '../data/learningMaterials';
import { vocabulary } from '../data/vocabulary';
import { assessReadiness } from '../services/assessment';
import { getUserProgress } from '../services/storage';
import { ProgressArea } from '../types';

const ExamReadiness: React.FC = () => {
    const progress = getUserProgress();
    const totals: Record<ProgressArea, number> = {
        vocabulary: vocabulary.length,
        listening: listeningExercises.length,
        reading: readingExercises.length,
        writing: writingPrompts.length,
        speaking: speakingPrompts.length,
    };
    const readiness = progress ? assessReadiness(progress, totals) : null;

    return (
        <div className="exam-readiness">
            <h2>YKI-valmius</h2>
            {readiness ? (
                <div>
                    <p>Valmius: {readiness.overall} %</p>
                    <p>{readiness.level}</p>
                    <p>Seuraava painopiste: {readiness.recommendation}</p>
                </div>
            ) : (
                <p>Aloita harjoittelu nähdäksesi valmiusarvion.</p>
            )}
        </div>
    );
};

export default ExamReadiness;
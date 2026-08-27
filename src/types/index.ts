export interface User {
    id: string;
    name: string;
    progress: number;
    completedExercises: number;
    vocabularyKnown: number;
}

export interface Vocabulary {
    word: string;
    translation: string;
    context: string;
}

export interface Exercise {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface TeachingSubject {
    subjectName: string;
    terminology: string[];
}

export type ProgressArea = 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';

export interface ExerciseAttempt {
    area: ProgressArea;
    id: string;
    correct: boolean;
    completedAt: string;
}

export interface UserProgress {
    score: number;
    completed: Record<ProgressArea, string[]>;
    attempts: ExerciseAttempt[];
}
import { ProgressArea, UserProgress } from '../types';

const STORAGE_KEY = 'ykiUserProgress';

const emptyProgress: UserProgress = {
    score: 0,
    completed: {
        vocabulary: [],
        listening: [],
        reading: [],
        writing: [],
        speaking: [],
    },
    attempts: [],
};

function isProgressArea(value: string): value is ProgressArea {
    return ['vocabulary', 'listening', 'reading', 'writing', 'speaking'].includes(value);
}

export const saveUserProgress = (progress: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getUserProgress = (): UserProgress | null => {
    const storedProgress = localStorage.getItem(STORAGE_KEY);
    if (!storedProgress) return null;

    try {
        const parsed = JSON.parse(storedProgress) as Partial<UserProgress>;
        const completed = { ...emptyProgress.completed };

        if (parsed.completed && typeof parsed.completed === 'object') {
            Object.entries(parsed.completed).forEach(([area, ids]) => {
                if (isProgressArea(area) && Array.isArray(ids)) {
                    completed[area] = ids.filter((id): id is string => typeof id === 'string');
                }
            });
        }

        return {
            score: typeof parsed.score === 'number' ? parsed.score : 0,
            completed,
            attempts: Array.isArray(parsed.attempts) ? parsed.attempts.map((attempt) => ({
                ...attempt,
                points: typeof attempt.points === 'number' ? attempt.points : attempt.correct ? 10 : 0,
            })) : [],
        };
    } catch {
        return null;
    }
};

export const createEmptyProgress = (): UserProgress => ({
    score: emptyProgress.score,
    completed: {
        vocabulary: [],
        listening: [],
        reading: [],
        writing: [],
        speaking: [],
    },
    attempts: [],
});

export const clearUserProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
};
import { UserProgress } from '../types';

const STORAGE_KEY = 'ykiUserProgress';

export const saveUserProgress = (progress: UserProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getUserProgress = (): UserProgress | null => {
    const storedProgress = localStorage.getItem(STORAGE_KEY);
    return storedProgress ? JSON.parse(storedProgress) : null;
};

export const clearUserProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
};
import { ProgressArea, UserProgress } from '../types';

export interface ReadinessResult {
    overall: number;
    areas: Record<ProgressArea, number>;
    level: string;
    recommendation: ProgressArea;
}

const areaOrder: ProgressArea[] = [
    'vocabulary',
    'listening',
    'reading',
    'writing',
    'speaking',
];

export function assessReadiness(
    progress: UserProgress,
    totals: Record<ProgressArea, number>,
): ReadinessResult {
    const areas = areaOrder.reduce((result, area) => {
        const completed = progress.completed[area].length;
        const attempts = progress.attempts.filter((attempt) => attempt.area === area);
        const correct = attempts.filter((attempt) => attempt.correct).length;
        const completion = totals[area] > 0 ? (completed / totals[area]) * 100 : 0;
        const accuracy = attempts.length > 0 ? (correct / attempts.length) * 100 : 0;

        result[area] = Math.round((completion * 0.6) + (accuracy * 0.4));
        return result;
    }, {} as Record<ProgressArea, number>);

    const overall = Math.round(
        areaOrder.reduce((sum, area) => sum + areas[area], 0) / areaOrder.length,
    );
    const recommendation = areaOrder.reduce((lowest, area) => (
        areas[area] < areas[lowest] ? area : lowest
    ), areaOrder[0]);

    return {
        overall,
        areas,
        level: overall >= 75 ? 'Hyvä valmius' : overall >= 45 ? 'Kehittyvä valmius' : 'Perusta rakennetaan',
        recommendation,
    };
}
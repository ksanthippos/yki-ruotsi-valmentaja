import React, { useState, useEffect } from 'react';
import { Exercise } from '../types';
import { fetchExercises } from '../services/assessment';

const ExerciseView: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const loadExercises = async () => {
            const fetchedExercises = await fetchExercises();
            setExercises(fetchedExercises);
        };
        loadExercises();
    }, []);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const currentExercise = exercises[currentExerciseIndex];
        if (userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()) {
            setFeedback('Correct!');
        } else {
            setFeedback(`Incorrect. The correct answer is: ${currentExercise.answer}`);
        }
        setUserAnswer('');
        setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % exercises.length);
    };

    return (
        <div>
            <h2>Exercise View</h2>
            {exercises.length > 0 ? (
                <div>
                    <h3>{exercises[currentExerciseIndex].question}</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={handleAnswerChange}
                            placeholder="Your answer"
                        />
                        <button type="submit">Submit</button>
                    </form>
                    {feedback && <p>{feedback}</p>}
                </div>
            ) : (
                <p>Loading exercises...</p>
            )}
        </div>
    );
};

export default ExerciseView;
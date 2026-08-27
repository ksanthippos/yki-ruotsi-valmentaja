import React from 'react';

const ProgressDashboard: React.FC = () => {
    // Sample state for user progress
    const [vocabularyProgress, setVocabularyProgress] = React.useState(0);
    const [exerciseCompletion, setExerciseCompletion] = React.useState(0);

    // Function to simulate progress updates
    const updateProgress = () => {
        // Logic to update progress based on user actions
        setVocabularyProgress(prev => Math.min(prev + 10, 100));
        setExerciseCompletion(prev => Math.min(prev + 10, 100));
    };

    React.useEffect(() => {
        // Simulate progress update every 5 seconds
        const interval = setInterval(updateProgress, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="progress-dashboard">
            <h2>Your Progress</h2>
            <div className="progress-item">
                <h3>Vocabulary Mastery</h3>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${vocabularyProgress}%` }}></div>
                </div>
                <p>{vocabularyProgress}% mastered</p>
            </div>
            <div className="progress-item">
                <h3>Exercise Completion</h3>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${exerciseCompletion}%` }}></div>
                </div>
                <p>{exerciseCompletion}% completed</p>
            </div>
        </div>
    );
};

export default ProgressDashboard;
import React from 'react';

interface VocabularyCardProps {
    word: string;
    definition: string;
    example: string;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ word, definition, example }) => {
    return (
        <div className="vocabulary-card">
            <h3>{word}</h3>
            <p><strong>Definition:</strong> {definition}</p>
            <p><strong>Example:</strong> {example}</p>
        </div>
    );
};

export default VocabularyCard;
import React, { useState, useEffect } from 'react';
import useDetailActivityTimer from './hooks';
import { useGlobalStore } from '@/hooks/useGlobalStore';

type Props = {
    currentActivityIndex: number;
};

const DetailActivityTimer: React.FC<Props> = ({ currentActivityIndex }) => {
    const { activity, questionIndex } = useDetailActivityTimer({ currentActivityIndex });
    const setCurrentQuestion = useGlobalStore((state) => state.setCurrentQuestion);

    useEffect(() => {
        if (activity.questions && activity.indexQuestions) {
            let adjustedQuestionIndex = questionIndex;
            if (questionIndex >= 12) {
                adjustedQuestionIndex = 0;
            }

            if (
                Array.isArray(activity.indexQuestions) &&
                adjustedQuestionIndex >= 0 &&
                adjustedQuestionIndex < activity.indexQuestions.length &&
                Array.isArray(activity.indexQuestions[adjustedQuestionIndex]) &&
                activity.indexQuestions[adjustedQuestionIndex].length > 1
            ) {
                const currentQuestion = activity.indexQuestions[adjustedQuestionIndex][1];
                setCurrentQuestion(adjustedQuestionIndex, currentQuestion);
            } else {
                console.error('Invalid index or structure:', {
                    adjustedQuestionIndex,
                    indexQuestions: activity.indexQuestions,
                });
            }
        }
    }, [activity, questionIndex, setCurrentQuestion]);

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            {activity.name === 'Reflection' && (
                <>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">{activity.name}</h2>
                    <p className="text-base font-medium text-gray-600 mb-6 text-center">
                        Ask this question in prayer and join the conversation to write what you hear in the comments.
                    </p>
                </>
            )}
            {activity.text && (
                <div className='p-4 bg-gray-200 rounded shadow max-w-lg overflow-y-auto ml-10 mr-10 text-[12px] italic' style={{ height: '200px' }}>
                    <p className='whitespace-pre-line' dangerouslySetInnerHTML={{ __html: activity.text }}></p>
                </div>
            )}
            {activity.videoUrl && (
                <div className='relative w-full h-full bg-gray-200 rounded shadow overflow-hidden p-4' style={{ height: '100%' }}>
                    <iframe
                        width="560"
                        height="315"
                        className='absolute top-0 left-0 rounded-lg w-full h-full'
                        src={`${activity.videoUrl}`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            {activity.questions && activity.indexQuestions && questionIndex < activity.questions.length && questionIndex < activity.indexQuestions.length && (
                <div className='p-4 bg-gray-200 rounded shadow ml-10 mr-10 text-[12px] italic max-w-lg'>
                    <p>{activity.indexQuestions[questionIndex][1]}</p>
                </div>
            )}
        </div>
    );
};

export default DetailActivityTimer;

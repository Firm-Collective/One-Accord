import React, { useState, useEffect } from 'react';
import useDetailActivityTimer from './hooks';

type Props = {
    currentActivityIndex: number;
};

const DetailActivityTimer: React.FC<Props> = ({ currentActivityIndex }) => {
    const { activity, questionIndex } = useDetailActivityTimer({ currentActivityIndex })


    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            {activity.name == 'Reflection' && (
                <h2 className='text-2xl font-bold mb-4'>{activity.name}</h2>
            )}
            {activity.text && (
                <div className='p-4 bg-gray-200 rounded shadow max-w-lg overflow-y-auto ml-10 mr-10 text-[12px] italic' style={{ height: '200px' }}>
                    <p
                        className='whitespace-pre-line'
                        dangerouslySetInnerHTML={{ __html: activity.text }}
                    ></p>
                </div>
            )}
            {activity.videoUrl && (
                <div className='relative w-full bg-gray-200 rounded shadow overflow-hidden p-4' style={{ height: '100%' }}>
                    <iframe
                        className='absolute top-0 left-0 w-full h-full rounded-lg'
                        src={`${activity.videoUrl}?autoplay=1`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        referrerPolicy='strict-origin-when-cross-origin'
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            {activity.questions && (
                <div className='p-4 bg-gray-200 rounded shadow ml-10 mr-10 text-[12px] italic max-w-lg'>
                    <p>{activity.questions[questionIndex]}</p>
                </div>
            )}
        </div>
    );
};

export default DetailActivityTimer;

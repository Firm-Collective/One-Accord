import { useState } from 'react';
import axios from 'axios';

type Activity = {
    id: number;
    name: string;
    icon: string;
    timeLeft: number;
  };

export const useCountDownTimer = () => {

    const activities: Activity[] = [
        { id: 1, name: 'Shofar', icon: '/shofar-icon.svg', timeLeft: 0 },
        { id: 2, name: 'Worship', icon: '/worship-icon.svg', timeLeft: 0 },
        { id: 3, name: 'Prayer', icon: '/praying-icon.svg', timeLeft: 0 },
        { id: 4, name: 'Communion', icon: '/Communion-icon.svg', timeLeft: 0 },
      ];

    const formatTime = (time: number): string => {
        const minutes: number = Math.floor(time / 60);
        const seconds: number = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

    return {
        formatTime,
        activities,
    }
}
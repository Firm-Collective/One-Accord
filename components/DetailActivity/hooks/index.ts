import { useState, useEffect } from 'react';
import { activities } from '@/utils/data/activities';

type Props = {
    currentActivityIndex: number;
  };

const useDetailActivityTimer = ({currentActivityIndex}: Props) => {
    const activity = activities[currentActivityIndex]; 
    const [questionIndex, setQuestionIndex] = useState(0);
    const [shownQuestions, setShownQuestions] = useState<number[]>([]);
  
    const getRandomQuestionIndex = () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * activity.questions!?.length);
      } while (shownQuestions.includes(randomIndex) && shownQuestions.length < activity.questions!?.length);
  
      return randomIndex;
    };
  
    useEffect(() => {
      if (activity.name === 'Reflection' && activity.questions) {
        const interval = setInterval(() => {
          if (shownQuestions.length === activity.questions!.length) {
            setShownQuestions([]);
          } else {
            const newIndex = getRandomQuestionIndex();
            setQuestionIndex(newIndex);
            setShownQuestions((prev) => [...prev, newIndex]);
          }
        }, 300000); // 5 minutes
  
        return () => clearInterval(interval);
      }
    }, [currentActivityIndex, shownQuestions, activity.questions]);
  
    useEffect(() => {
      setQuestionIndex(getRandomQuestionIndex());
      setShownQuestions([questionIndex]);
    }, [currentActivityIndex]);


  return {
    activity,
    currentActivityIndex,
    questionIndex
  }

}

export default useDetailActivityTimer;

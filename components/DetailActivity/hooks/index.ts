import { useState, useEffect } from 'react';
import { activities } from '@/utils/data/activities';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { createClient } from '@/utils/supabase/client';
import { questionsAPI } from '../queries';

type Props = {
  currentActivityIndex: number;
  timeLeft: number;
};

type Question = {
  id: number;
  name: string;
};

const useDetailActivityTimer = ({ currentActivityIndex, timeLeft }: Props) => {
  const supaClient = createClient();
  const activity = activities[currentActivityIndex]; // Dynamically set the activity
  const queryClient = useQueryClient();

  const fetchBatchSize = 3; // Number of questions per batch
  const intervalTime = 10000; // 10 seconds in milliseconds for testing purposes

  const { data: lastQuestionIndexData, isFetching: isFetchingLastIndex } = useQuery<number>('lastQuestionIndex', async () => {
    const result = await questionsAPI.getLastQuestionIndex({ supaClient });
    console.log("🚀 ~ useQuery lastQuestionIndex ~ result:", result.data);
    return result.data;
  }, {
    enabled: activity.name === 'Reflection',
    initialData: 0, // Default value
  });

  const saveLastQuestionIndex = useMutation(
    async (lastQuestionIndex: number) => {
      console.log("🚀 ~ saveLastQuestionIndex ~ lastQuestionIndex:", lastQuestionIndex);
      return await questionsAPI.saveLastQuestionIndex({ supaClient, lastQuestionIndex });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lastQuestionIndex');
        console.log("🚀 ~ saveLastQuestionIndex ~ onSuccess");
      },
    }
  );

  const { data: questions, isFetching: isFetchingQuestions, isLoading: isLoadingQuestions } = useQuery<Question[]>('questions', async () => {
    const lastIndex = lastQuestionIndexData || 0;
    const result = await questionsAPI.getQuestionsData({ supaClient, lastIndex, range: fetchBatchSize });
    console.log("🚀 ~ useQuery questions ~ result:", result.data);
    return result.data || [];
  }, {
    enabled: activity.name === 'Reflection' && !isFetchingLastIndex,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activity.name === 'Reflection' && questions && questions.length > 0) {
      console.log("🚀 ~ useEffect ~ Interval setup for questions:", questions);

      interval = setInterval(() => {
        setCurrentQuestionIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % questions.length;
          console.log("🚀 ~ setInterval ~ nextIndex:", nextIndex);

          if (nextIndex === 0) {
            let newLastIndex = (lastQuestionIndexData || 0) + fetchBatchSize;
            if (newLastIndex >= 12) {
              newLastIndex = 0; // Reset to 0 if we reach the end
            }
            console.log("🚀 ~ setInterval ~ newLastIndex:", newLastIndex);
            saveLastQuestionIndex.mutate(newLastIndex, {
              onSuccess: () => {
                console.log("🚀 ~ saveLastQuestionIndex.mutate onSuccess");
                queryClient.invalidateQueries('questions');
              },
              onError: (error) => {
                console.error("🚀 ~ saveLastQuestionIndex.mutate onError:", error);
              }
            });
          }
          return nextIndex;
        });
      }, intervalTime);
    }

    return () => {
      if (interval) clearInterval(interval);
      console.log("🚀 ~ Interval cleared");
    };
  }, [activity.name, questions, lastQuestionIndexData, fetchBatchSize, saveLastQuestionIndex, queryClient, currentQuestionIndex]);

  useEffect(() => {
    if (activity.name === 'Reflection' && questions && questions.length > 0) {
      console.log("🚀 ~ useEffect [questions, activity.name] ~ Setting currentQuestionIndex to 0");
      setCurrentQuestionIndex(0);
    }
  }, [questions, activity.name]);

  return {
    activity,
    currentActivityIndex,
    question: questions?.[currentQuestionIndex]?.name || null,
  };
};

export default useDetailActivityTimer;

"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@/components/textField';
import useCreatePost from './hooks/useCreatePost';
import SendVector from './ui/SendVector';

type Props = {
  refetch: () => void;
};

export const CreatePost = ({ refetch }: Props) => {
  const [userPicture, setUserPicture] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const fetchUserId = async () => {
    try {
      const response = await axios.get('/api/user/getUserInfo');
      return response.data.user.user_metadata.picture;
    } catch (error) {
      console.error('Failed to fetch user ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const user = await fetchUserId();
      setUserPicture(user);
    };

    getUserId();
  }, []);

  const { onValid, onInvalid, form } = useCreatePost({ refetch, userPicture });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    form.setValue('content', e.target.value);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  return (
    <form
      className="w-[100%] h-[100%] rounded-[8px] bg-[#f1f1f1] flex items-center mr-3"
      onSubmit={form.handleSubmit(onValid, onInvalid)}
    >
      <TextField
        control={form.control}
        name="content"
        type="text"
        onChange={handleInputChange}
        onBlur={handleBlur}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'transparent !important',
          },
        }}
      />
      <button
        type="submit"
        disabled={form.formState.isSubmitSuccessful}
        className={`relative right-2 rounded-full p-2 transition-colors duration-300 ${
          isTyping ? 'bg-[#ED9385]' : 'bg-transparent'
        }`}
      >
        <SendVector color={isTyping ? 'white' : '#898A8D'} />
      </button>
    </form>
  );
};

import TextField from '@/components/textField';
import useCreatePost from './hooks/useCreatePost';
import SendVector from './ui/SendVector';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  refetch: () => void;
};

export const CreatePost = ({ refetch }: Props) => {
  const [userPicture, setUserPicture] = useState(null);


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

  return (
    <form
      className='w-[100%] h-100%] rounded-[8px] bg-[#f1f1f1] flex items-center mr-3'
      onSubmit={form.handleSubmit(onValid, onInvalid)}
    >
      <TextField
        control={form.control}
        name='content'
        type='text'
        sx={{
          '& .MuiInputBase-root': {
            border: 'none !important',
          },
        }}
      />
      <button type='submit' disabled={form.formState.isSubmitSuccessful}>
        <SendVector className={`relative right-8`} color='#898A8D' />
      </button>
    </form>
  );
};

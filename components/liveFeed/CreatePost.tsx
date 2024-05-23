import TextField from '@/components/textField';
import useCreatePost from './hooks/useCreatePost';

import { IcRoundSend } from './ui/icRoundSend';

type Props = {
  refetch: () => void;
};

export const CreatePost = ({ refetch }: Props) => {
  const { onValid, onInvalid, form } = useCreatePost({ refetch });

  return (
    <form
      className='w-[370px] h-[50px] rounded-[8px] bg-[#f1f1f1] relative flex items-center'
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

      <button type='submit'>
        <IcRoundSend  />
      </button>
    </form>
  );
};

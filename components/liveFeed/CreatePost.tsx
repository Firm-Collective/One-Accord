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

import TextField from '@/components/textField';
import useCreatePost from './hooks/useCreatePost';
import SendVector from './ui/SendVector';

type Props = {
  refetch: () => void;
};

export const CreatePost = ({ refetch }: Props) => {
  const { onValid, onInvalid, form } = useCreatePost({ refetch });

  return (
    <form
      className='w-[100%] h-100%] rounded-[8px] bg-[#f1f1f1] flex items-center'
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
        <SendVector className={`w-[18px] top-[32px] h-[18px] absolute left-[351px]`} color='#898A8D' />
      </button>
    </form>
  );
};

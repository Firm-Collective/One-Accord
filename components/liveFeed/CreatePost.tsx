import TextField from '@/components/textField';
import useCreatePost from './hooks/useCreatePost';
import SendVector from './ui/SendVector';

type Props = {
  refetch: () => void;
};

export const CreatePost =  ({ refetch }: Props) => {
  const { onValid, onInvalid, form } = useCreatePost({ refetch});

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

      <button type='submit' onClick={refetch}>
        <SendVector className={`w-[18px] top-[18px] h-[18px] absolute left-[340px]`} color='#898A8D' />
      </button>
    </form>
  );
};

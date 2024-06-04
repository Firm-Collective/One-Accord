export function InitialLoading() {
  return (
    <div
      role='status'
      className='max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'
    >
      {[...Array(5)].map((_, i) => (
        <div key={i} className='flex items-center justify-between pt-4'>
          <div>
            <div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
            <div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
          </div>
        </div>
      ))}
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export function LoadingPinnedPosts() {
  return (
    <div role='status' className='max-w-sm animate-pulse'>
      <div className='h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

export function LoadingOtherPosts() {
  return (
    <div role='status' className='max-w-sm animate-pulse pt-4'>
      <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5'></div>
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
      {[...Array(10)].map((_, i) => {
        return (
          <div
            key={i + 'load bar'}
            className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5'
          ></div>
        );
      })}
      <div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}

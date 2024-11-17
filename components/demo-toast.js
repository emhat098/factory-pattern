'use client';

import useToast from '@/hooks/use-toast';

const DemoToast = () => {
  const toast = useToast();

  return (
    <div className={'flex gap-2'}>
      <button
        className={'px-4 py-2 border rounded-xl bg-red-500'}
        onClick={() => toast.error('Something went wrong!')}
      >
        Error
      </button>
      <button
        className={'px-4 py-2 border rounded-xl bg-orange-500'}
        onClick={() => toast.warning('This is a warning message!')}
      >
        Warning
      </button>
      <button
        className={'px-4 py-2 border rounded-xl bg-blue-500'}
        onClick={() => toast.info('This is a information message')}
      >
        Information
      </button>
      <button
        className={'px-4 py-2 border rounded-xl bg-green-500'}
        onClick={() => toast.success('Action is successfully')}
      >
        Success
      </button>
    </div>
  );
};

export default DemoToast;

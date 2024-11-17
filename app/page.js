import DemoToast from '@/components/demo-toast';

export default function Home() {
  return (
    <div
      className={'flex flex-col items-center justify-center w-full h-screen'}
    >
      <div className={'border px-4 py-6 rounded-2xl shadow-sm'}>
        <h1 className={'text-4xl'}>{'Sona'}</h1>

        <div className={'my-2'}>
          <DemoToast />
        </div>
      </div>
    </div>
  );
}

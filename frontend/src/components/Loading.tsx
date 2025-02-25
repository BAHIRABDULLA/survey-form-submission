import { BlinkBlur } from 'react-loading-indicators'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BlinkBlur color="#3459ce" size="large" text="Please wait . .  ." textColor="" />    </div>
  );
};

export default Loading
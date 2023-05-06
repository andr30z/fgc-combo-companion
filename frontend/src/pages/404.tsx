import { AppLogo } from '@/common/components/app-logo';
import '../app/globals.css';
import { Button } from '@/common/components/__button';
import { AiFillHome } from 'react-icons/ai';
export default function Page404() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-2 bg-dark">
      <AppLogo />
      <h1 className="text-6xl font-bold text-light text-center">
        Ooops, route not found
      </h1>
      <Button
        leftIcon={<AiFillHome size={17} />}
        color="primary"
        renderAsInnerLink
        href="/"
        text="Return to Home"
      />
    </div>
  );
}

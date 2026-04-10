import {
  DollarSign,
  FolderEditIcon,
  MenuIcon,
  SparkleIcon,
  XIcon
} from 'lucide-react';
import {
  PrimaryButton
} from './Buttons';
import {
  useEffect,
  useState
} from 'react';
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import {
  useUser,
  useClerk,
  UserButton
} from '@clerk/clerk-react';
import Logo from './Logo';
import toast from 'react-hot-toast';
import { useAxios } from '../hooks/useAxios';

export default function Navbar() {
  const axios = useAxios();
  const { user } = useUser();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { openSignIn, openSignUp } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [credits, setCredits] = useState(0);

  const fetchCredits = async () => {
    try {
      const { data, status } = await axios.get('/api/users/credits');

      if (status === 200) {
        setCredits(data.credits);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }

  }

  useEffect(() => {
    if (!user) return;

    fetchCredits();
  }, [user, pathname]);

  const navLinks = [
    { name: 'Home', href: '/#' },
    { name: 'Create', href: '/generate' },
    { name: 'Plans', href: '/plans' },
  ];

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm'>
      <div className='max-w-6xl mx-auto flex items-center justify-between'>
        <Logo />

        <div className='hidden md:flex items-center gap-8 text-sm font-bold'>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/#' && pathname === '/');
            return (
              <Link
                to={link.href}
                key={link.name}
                className={`transition-colors relative py-1 ${isActive ? 'text-indigo-600' : 'text-zinc-500 hover:text-zinc-900'}`}
                onClick={() => scrollTo(0, 0)}
              >
                {link.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {user ? (
          <div className='flex items-center gap-4'>
            <div className='hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-100'>
              <div className="size-1.5 rounded-full bg-indigo-600" />
              <span className='text-xs font-bold text-zinc-600'>Credits: {credits}</span>
            </div>
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action label='Generate' labelIcon={<SparkleIcon size={14} />} onClick={() => navigate('/generate')} />
                <UserButton.Action label='My Generations' labelIcon={<FolderEditIcon size={14} />} onClick={() => navigate('/my-generations')} />
                <UserButton.Action label='Plans' labelIcon={<DollarSign size={14} />} onClick={() => navigate('/plans')} />
              </UserButton.MenuItems>
            </UserButton >
          </div>
        ) : (
          <div className='hidden md:flex items-center gap-4'>
            <button
              onClick={() => {
                setIsOpen(false);
                openSignIn();
              }}
              className='text-sm font-bold text-zinc-500 hover:text-zinc-900 transition'>
              Sign in
            </button>
            <PrimaryButton
              onClick={() => {
                setIsOpen(false);
                openSignUp();
              }}
              className='!py-2.5 !px-6 text-xs'>Get Started</PrimaryButton>
          </div>
        )}

        {!user && (
          <button onClick={() => setIsOpen(!isOpen)} className='md:hidden text-zinc-900'>
            <MenuIcon className='size-6' />
          </button>
        )}

      </div>
      <div className={`flex flex-col items-center justify-center gap-8 text-xl font-bold fixed inset-0 bg-white z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {navLinks.map((link) => (
          <Link key={link.name} to={link.href} className="text-zinc-900 hover:text-indigo-600 transition-colors" onClick={() => setIsOpen(false)}>
            {link.name}
          </Link>
        ))}

        <button onClick={() => { setIsOpen(false); openSignIn(); }} className='font-bold text-zinc-500 hover:text-zinc-900 transition'>
          Sign in
        </button>
        <PrimaryButton onClick={() => { setIsOpen(false); openSignUp(); }}>Get Started</PrimaryButton>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 rounded-full bg-zinc-100 p-3 text-zinc-900 hover:bg-zinc-200 transition-colors">
          <XIcon className="size-6" />
        </button>
      </div>
    </nav>
  );
};
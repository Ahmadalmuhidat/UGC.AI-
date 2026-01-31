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
import { motion } from 'framer-motion';
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { assets } from '../assets/assets';
import {
  useUser,
  useClerk,
  UserButton
} from '@clerk/clerk-react';
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
    <motion.nav className='fixed top-5 left-0 right-0 z-50 px-4'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}>
      <div className='max-w-6xl mx-auto flex items-center justify-between glass-panel !rounded-2xl p-3 border-white/10 ring-1 ring-white/5'>
        <Link to='/' onClick={() => scrollTo(0, 0)} className="hover:opacity-80 transition-opacity">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>

        <div className='hidden md:flex items-center gap-8 text-sm font-medium'>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/#' && pathname === '/');
            return (
              <Link
                to={link.href}
                key={link.name}
                className={`transition-colors relative py-1 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                onClick={() => scrollTo(0, 0)}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400 to-transparent"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {user ? (
          <div className='flex items-center gap-4'>
            <div className='hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10'>
              <div className="size-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className='text-xs font-medium text-gray-300'>Credits: {credits}</span>
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
              className='text-sm font-medium text-gray-400 hover:text-white transition'>
              Sign in
            </button>
            <PrimaryButton
              onClick={() => {
                setIsOpen(false);
                openSignUp();
              }}
              className='!py-2 !px-6 text-xs'>Get Started</PrimaryButton>
          </div>
        )}

        {!user && (
          <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
            <MenuIcon className='size-6' />
          </button>
        )}

      </div>
      <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
            {link.name}
          </a>
        ))}

        <button onClick={() => setIsOpen(false)} className='font-medium text-gray-300 hover:text-white transition'>
          Sign in
        </button>
        <PrimaryButton onClick={() => setIsOpen(false)}>Get Started</PrimaryButton>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md bg-white p-2 text-gray-800 ring-white active:ring-2">
          <XIcon />
        </button>
      </div>
    </motion.nav>
  );
};
import Link from 'next/link';
import Image from 'next/image';
import journalIcon from 'public/bookmark.svg';
import liveIcon from 'public/fluent_live-24-filled.svg';
import donateIcon from 'public/monetization_on.svg';
import profileIcon from 'public/user.svg';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center py-4">
          <Link href="/">
            <a className="text-lg font-semibold text-gray-900">One Accord</a>
          </Link>
          <div className="hidden sm:flex flex-row justify-between items-center">
            <NavLinks />
          </div>
          <div className="sm:hidden relative flex flex-row my-4">
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks() {
  return (
    <div className="flex flex-row justify-between items-center">
      <Link href="/journal">
        <a className="text-lg font-semibold text-gray-900 mr-4">
            <Image src={journalIcon} width="24" height="24" alt={'Journal Icon'}></Image>
            Journal</a>
      </Link>
      <Link href="/live">
        <a className="text-lg font-semibold text-gray-900 mr-4">
        <Image src={liveIcon} width="24" height="24" alt={'Live Icon'}></Image>Live</a>
      </Link>
      <Link href="/donate">
        <a className="text-lg font-semibold text-gray-900 mr-4">
            <Image src={donateIcon} width="24" height="24" alt={'Donate Icon'}></Image>Donate</a>
      </Link>
      <Link href="/profile">
        <a className="text-lg font-semibold text-gray-900 mr-4">
        <Image src={profileIcon} width="24" height="24" alt={'Profile Icon'}></Image>Profile</a>
      </Link>
    </div>
  );
}

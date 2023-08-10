'use client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function DropDownImage({
    className
  }: {
    className: string;
  }) {

    let locale = 'en-US';

    const pathname = usePathname()

    locale = pathname.split('/')[1]

    let localeArr = locale.split('-')
    
    let country: string;

    if (localeArr.length === 2) {
        country = locale.split('-')[1]
    } else {
        country = 'US';
    }
    
    return(
        <Image className={className} alt="flag for us" src={`/flags/${country.toLowerCase()}.png`} width={35} height={35} />
    )
}
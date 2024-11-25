'use client';
import { menuItems } from '@/data/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Nav() {
    const pathname = usePathname();

    return (
        <>
            {menuItems.map((item, index) =>
                item.links.length === 1 ? (
                    // If there's only one link, don't show dropdown
                    <li
                        key={index}
                        className={`${
                            item.links[0].href.split('/')[1] ===
                            pathname.split('/')[1]
                                ? 'current'
                                : ''
                        }`}
                    >
                        <Link href={item.links[0].href}>{item.title}</Link>
                    </li>
                ) : (
                    // Show dropdown for multiple links
                    <li
                        key={index}
                        className={`dropdown2 ${
                            item.links.some(
                                (el) =>
                                    el.href.split('/')[1] ==
                                    pathname.split('/')[1]
                            )
                                ? 'current'
                                : ''
                        }`}
                    >
                        <a>{item.title}</a>
                        <ul>
                            {item.links.map((link, linkIndex) => (
                                <li
                                    key={linkIndex}
                                    className={
                                        link.href.split('/')[1] ==
                                        pathname.split('/')[1]
                                            ? 'current'
                                            : ''
                                    }
                                >
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="dropdown2-btn"></div>
                    </li>
                )
            )}
        </>
    );
}

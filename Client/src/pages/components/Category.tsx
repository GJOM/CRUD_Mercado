import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';


export function Category() {

    const [nestedRoutes, setNestedRoutes] = useState<string[]>([]);
    const { pathname } = useRouter();

    useEffect(() => {
        const routes = pathname.split('/').filter(route => {
            if (route != '') return route
        })
        setNestedRoutes(routes);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className='h-20 flex flex-col gap-2 mb-8'>
            <div className='flex gap-2 justify-center'>
                {nestedRoutes.map((route, key) => (
                    <React.Fragment key={"route" + key}>
                        <span  className='first-letter:uppercase tracking-wider text-gray-300'>{route}</span>
                        {key + 1 < nestedRoutes.length && <span key={`key${key}`} className='text-gray-300'>/</span>}
                    </React.Fragment>
                ))}
            </div>
        </section>
    )
}
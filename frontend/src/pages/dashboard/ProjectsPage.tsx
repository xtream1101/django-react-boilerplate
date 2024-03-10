import React from 'react';
import { observer } from 'mobx-react-lite';

const ProjectsPage = observer(() => {
    return (
        <div className="flex flex-col py-10 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Projects
                </h2>
            </div>
            <div className="flex flex-col">
            </div>
        </div>
    )
});

export default ProjectsPage;

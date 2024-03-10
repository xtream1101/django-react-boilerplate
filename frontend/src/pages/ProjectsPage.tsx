import React from 'react';
import { observer } from 'mobx-react-lite';

const ProjectsPage = observer(() => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 className="text-3xl font-bold underline">
                Projects Page
            </h1>
        </div>
    )
});

export default ProjectsPage;

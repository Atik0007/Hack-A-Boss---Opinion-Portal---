import './OpinionList.scss';

import { Opinion } from '../opinion/Opinion';
import { useState } from 'react';

export const OpinionList = ({
    opinions,
    removeOpinion,
    setOpinions,
    loadOpinions,
}) => {
    const [keyword, setKeyword] = useState('');
    return opinions ? (
        <ul>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                ></input>
            </div>

            {opinions
                .filter((opinion) =>
                    opinion.text.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((opinion) => (
                    <Opinion
                        key={opinion.id}
                        opinion={opinion}
                        removeOpinion={removeOpinion}
                        setOpinions={setOpinions}
                        opinions={opinions}
                        loadOpinions={loadOpinions}
                    />
                ))}
        </ul>
    ) : (
        <p>No opinions yet</p>
    );
};

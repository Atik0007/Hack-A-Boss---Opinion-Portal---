import './OpinionList.scss';

import { Opinion } from '../opinion/Opinion';
import { useState } from 'react';

export const OpinionList = ({ opinions, removeOpinion, updateOpinion }) => {
    const [keyword, setKeyword] = useState('');
    return opinions?.opinions ? (
        <ul>
            <div className="container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                ></input>
                <div className="search"></div>
            </div>

            {opinions.opinions
                .filter((opinion) =>
                    opinion.text.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((opinion) => (
                    <Opinion
                        key={opinion.id}
                        opinion={opinion}
                        removeOpinion={removeOpinion}
                        updateOpinion={updateOpinion}
                    />
                ))}
        </ul>
    ) : (
        <p>No opinions yet</p>
    );
};

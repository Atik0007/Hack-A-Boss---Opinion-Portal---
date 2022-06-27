import './OpinionList.scss';

import { Opinion } from '../opinion/Opinion';
import { useState } from 'react';

export const OpinionList = ({ opinions, removeOpinion, updateOpinion }) => {
    console.log(opinions.opinions);
    const [keyword, setKeyword] = useState('');
    return opinions?.opinions ? (
        <ul>
            <form className="opinion-form">
                <input
                    type="text"
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
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

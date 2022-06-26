import './OpinionList.scss';

import { Opinion } from '../opinion/Opinion';

export const OpinionList = ({ opinions, removeOpinion }) => {
    return opinions?.opinions ? (
        <ul>
            {opinions.opinions.map((opinion) => (
                <li key={opinion.id}>
                    {
                        <Opinion
                            opinion={opinion}
                            removeOpinion={removeOpinion}
                        />
                    }
                </li>
            ))}
        </ul>
    ) : (
        <p>No opinions yet</p>
    );
};

import React from 'react';

const Results = ({ eligibility }) => {
    return (
        <div>
            {eligibility ? (
                <h2>User is eligible!</h2>
            ) : (
                <h2>User is not eligible.</h2>
            )}
        </div>
    );
};

export default Results;

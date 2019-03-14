import React from 'react';

export default ({hours, minutes, seconds}) => {
    return(
        <div>
            <h1>
                {hours>=10 ? hours : '0' + hours}:
                {minutes>=10 ? minutes : '0' + minutes}:
                {seconds>=10 ? seconds : '0' + seconds}
            </h1>
        </div>
    )
}
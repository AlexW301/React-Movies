import React,{ useState } from "react";
//Styles
import { Wrapper } from "./Rate.styles";


const Rate = ({ callback }) => {
    const [value, setValue] = useState(8);

    return (
        <Wrapper>
            <div className="set-rating">
            <input
            type='range'
            min='1'
            max='10'
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            />
            {value}
            </div>
            <button onClick={() => callback(value)}>Rate</button>
        </Wrapper>
    )
}

export default Rate;
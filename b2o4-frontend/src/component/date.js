import React, { useState } from 'react';

const DateTest = () => {

    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0,10);
    const [saleStartDate, setSaleStartDate] = useState(today);
    return (
        <div>
            <h1>date</h1>
        
            <form>
                <label>
                    예약 날짜 지정
                    <br/>
                    <input type='date' min="2024-07-25" max="2024-08-01" required />
                </label>
            </form>
            
            <h1>---------------------</h1>

            <input
                id="date"
                label="판매 시작일"
                type="date"
                defaultValue={today}
                onChange={(e) => setSaleStartDate(e.target.value)}
                inputProps={{ min: today }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
        </div>
    )
}

export default DateTest;
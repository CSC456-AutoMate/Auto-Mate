import { useState, useEffect } from "react";

const Test = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/test", {
            'methods':'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    return ( 
        <div>
            <ul>
                <li>{data.username}</li>
                <li>{data.email}</li>
            </ul>
        </div>
    );
}
 
export default Test;
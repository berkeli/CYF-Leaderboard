import axios from "axios";

const fetchFromCodeWars = (username) =>  {
    axios(`https://www.codewars.com/api/v1/users/${username}`).then((res) => {
        console.log(res.data)
    }).catch(err=> {
        console.log(err.message)
    })
}

export default async () => {
    fetchFromCodeWars("BerkeliH")
}


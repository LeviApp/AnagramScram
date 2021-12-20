import axios from "axios";

let math = {
    add: (x,y) => x + y,
    isNull: () => null,
    value: (v) => v,
    createUser: (first, last, num) => {
        const user = {id: num + 1, firstName: first, lastName: last}

        return user;
    },

    greaterThanNegativeOne: (val) => val - 1,
    email: (val) => {
        let result = val.split('@')[1]
        return result
    },

    fetchWorking: () =>   {
        return axios.get("https://excess-mat.herokuapp.com/EM/api/all-posts-4/?page=1", {headers: {order: "id"}})
        .then(res => res.data)
        .catch(e => console.log(e, "this is failed"))
    },

    emptyFetch: () =>   {
        return axios.get("https://excess-mat.herokuapp.com/EM/api/")
        .then(res => res.data)
        .catch(e => console.log(e, "this is failed"))
    },

    power: () => {

        return Math.pow(6, 2)
        console.log("Yes")
    },

    alternate: (val) => {
        let newVal = ""

        for (let i = 0; i < val.length; i++) {
            if (i % 2 === 0) {
                newVal+=val[i].toUpperCase()
            }

            else {
                newVal+=val[i].toLowerCase()
            }
        }

        return newVal
    },

    numArray: (val) => {
        let newArr = [];
        let otherArr = [];
        let index = 1;
        let num = 1;

        while ( index <= val ) {
            if (otherArr.length < index) {
                otherArr.push(num)
                num++
            }

            else {
                newArr.push(otherArr)
                otherArr = []
                index++
            }
        }

        return newArr;

    }
 
}

module.exports = math;

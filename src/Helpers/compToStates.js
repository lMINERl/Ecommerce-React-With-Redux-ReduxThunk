//returns false if the two states are diffrent - true otherwise
function dataComp(data, next, index = 0, result = true) {
    //result as exit condition and data&next shouldn't be undefinded
    if (result && data !== undefined && next !== undefined && next !== null && data !== null) {
        //if the data is same type of next but they are diffrent in amount of object keys
        if (typeof (data) === typeof (next) && Object.keys(data).length !== Object.keys(next).length) {
            result = false;
        }
        else if (typeof (data) === "string") {
            //compare it all together if the 2 vals are string
            if (data !== next)
                result = false;
        }
        else if (Object.keys(data).length > 0 && index < Object.keys(data).length) {
            //compare the children of data & next object as long as nothing diffrent
            result = dataComp(data[Object.keys(data)[index]], next[Object.keys(data)[index]], 0, result);
            //reset the result if one of the data are finished
            result = dataComp(data, next, index + 1, result);
        }
        else {
            //all compares are available except the type object
            if (typeof (data) !== "object" && data !== next) {
                result = false;
            }
        }
    }
    return result;
}

export default dataComp;
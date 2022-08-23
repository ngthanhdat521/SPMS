function isEmptyKey(obj) {
    for (var value in obj) if (!obj[value]) return true;
    return false;
}

function isEmptyKeys(obj, arr) {
    for (var key of arr) if (!obj[key]) return true;
    return false;
}

function doArrHasANegativeNumber(arr,key) {
    for (var item of arr) if (item[key] < 0) return true;
    return false;
}

export default { isEmptyKey, isEmptyKeys, doArrHasANegativeNumber };

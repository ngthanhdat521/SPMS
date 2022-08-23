module.exports = (obj) =>{
    if(obj && typeof obj === 'object' && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype)
        return false;
    return true;
} 
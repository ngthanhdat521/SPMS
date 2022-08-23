function countByValue(arr, name, value) {
    let count = 0;

    arr.map((item) => {
        if (item[name] === value) count++;
    });

    return count;
}

function countByNameArr(arr, name, value) {
    let count = 0;
    
    arr.map((item) => {
        let i = { ...item };
        name.map((n) => {
            if (i) i = i[n];
        });
        if (i && i === value) count++;
    });

    return count;
}

export default { countByValue, countByNameArr };

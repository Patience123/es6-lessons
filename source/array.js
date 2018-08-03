{
    let arr = Array.of(1, 3, 4, 5, 7);
    console.log('arr=', arr);  // [1, 3, 4, 5, 7]
    let empty = Array.of();
    console.log(empty);  // []
    // 模拟
    function Arrayof() {
        return [].slice.call(arguments);
    }
}

{
    let p = document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach((item) => {
        console.log(item);
    });
    console.log(Array.from(new Set([2, 5])));

    console.log(Array.from([1, 3, 5], (item) => item * 2));  // [2, 6, 10]
}

{
    console.log('fill-7', [1, 'a', undefined, true].fill(7)) // [7, 7, 7, 7]
    console.log('fill-pos', [1, 'a', 'b', 'c'].fill(7, 1, 3)) // [1, 7, 7, 'c']
}

{
    for(let item of ['a', 'b', 'c'].keys()) {
        console.log(item);  // 0   1   2
    }
    for(let item of ['a', 'b', 'c'].values()) {
        console.log(item);  // a   b   c
    }
    for(let [key, value] of ['a', 'b', 'c'].entries()) {
        console.log(key, value);
    }
}

{
    console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)) // [4, 2, 3, 4, 5]
}

{
    console.log([1, 2, 3, 4, 5].find((item) => {
        return item > 3
    }));  // 4
    console.log([1, 2, 3, 4, 5].findIndex((item) => {
        return item > 3
    }));  // 3

    function f(v) {
        return v > this.number;
    }
    let num = {
        number: 20
    }
    console.log([2, 12, 24, 48].find(f, num));
}

{
    console.log('number', [1, 2, NaN].includes(1));  // true
    console.log('number', [1, 2, NaN].includes(NaN));  // true
}

{
    // 实现数组的reduce方法
    function reduce(array, callback, initValue) {
        let arr = (initValue === undefined ? [] : [initValue]).concat(array);
        while(arr.length > 1) {
            arr.splice(0, 2, callback(arr[0], arr[1]));
        }
        return arr[0];
    }

    let result = reduce([1, 2, 4], function(a, b) {
        return a * b
    }, 10);
    console.log(result);
}

{
    // 扁平化数组
    function flatten(arr) {
        let newArr = [];
        function flat(arr) {
            arr.forEach(element => {
                if(Array.isArray(element)) {
                    flat(element);
                } else {
                    newArr.push(element);
                }
            });
        }
        flat(arr);
        return newArr;
    }

    function flatten2(arr) {
        return arr.reduce(function(initValue, currentValue) {
            return (initValue.concat(Array.isArray(currentValue) ? flatten2(currentValue) : currentValue));
        }, []);
    }

    let arr = [3, [2, -4, [5, 7]], -3, ['aa', [['bb']]]];
    let arr2 = flatten(arr);
    let arr3 = flatten2(arr);

    console.log(arr2);
    console.log(arr3);
}
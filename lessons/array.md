#### 1. Array.of()

该方法用来将一组值转换为数组，基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。当参数为空的时候，返回空数组。另外可以用slice方法来模拟Array.of()。


```
    let arr = Array.of(1, 3, 4, 5, 7);
    console.log('arr=', arr);  // [1, 3, 4, 5, 7]
    let empty = Array.of();
    console.log(empty);  // []
    // 模拟
    function Arrayof() {
        return [].slice.call(arguments);
    }
```

#### 2. Array.from()

该方法用于将类似数组的对象和可遍历的对象转为真正的数组。所谓类似数组的对象，本质特征只有一点，即必须有length属性。因此，任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。可遍历的对象即为部署了Iterator接口的数据结构


```
    let p = document.querySelectorAll('p');
    let pArr = Array.from(p);
    pArr.forEach((item) => {
        console.log(item);
    });
    console.log(Array.from(new Set([2, 5])));
```

Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。


```
console.log(Array.from([1, 3, 5], (item) => item * 2));  // [2, 6, 10]
```

### 3. 数组实例的fill()

该方法用给定的值去填充数组，用于空数组的初始化非常方便，还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。


```
    console.log('fill-7', [1, 'a', undefined, true].fill(7)) // [7, 7, 7, 7]
    console.log('fill-pos', [1, 'a', 'b', 'c'].fill(7, 1, 3)) // [1, 7, 7, 'c']
```

> 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。

```
    let arr = new Array(3).fill({name: "Mike"});
    arr[0].name = "sheng";
    arr
    // [{name: "sheng"}, {name: "sheng"}, {name: "sheng"}]

    let arr = new Array(3).fill([]);
    arr[0].push(7);
    arr
    // [[7], [7], [7]]
```

### 4. 数组实例的keys(), values(), entries()

这三个新的方法用于遍历数组。它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。


```
    for(let item of ['a', 'b', 'c'].keys()) {
        console.log(item);  // 0   1   2
    }
    for(let item of ['a', 'b', 'c'].values()) {
        console.log(item);  // a   b   c
    }
    for(let [key, value] of ['a', 'b', 'c'].entries()) {
        console.log(key, value);
    }
```

### 5. 数组实例的copyWithin()

在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。


```
Array.prototype.copyWithin(target, start = 0, end = this.length)
```
> target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。


```
console.log([1, 2, 3, 4, 5].copyWithin(0, 3, 4)) // [4, 2, 3, 4, 5]
```

### 6. 数组实例的find()和findIndex()

- 该方法用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
- findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。


```
    console.log([1, 2, 3, 4, 5].find((item) => {
        return item > 3
    }));  // 4
    console.log([1, 2, 3, 4, 5].findIndex((item) => {
        return item > 3
    }));  // 3
```

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。


```
    function f(v) {
        return v > this.number;
    }
    let num = {
        number: 20
    }
    console.log([2, 12, 24, 48].find(f, num));
```

### 7. 数组实例的includes()

该方法返回一个布尔值，表示某个数组是否包含给定的值。该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。


```
    console.log('number', [1, 2, NaN].includes(1));  // true
    console.log('number', [1, 2, NaN].includes(NaN));  // true
```

### 8. 扩展运算符

将一个数组转为用逗号分隔的参数序列。

[扩展运算符的应用](http://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E5%BA%94%E7%94%A8)






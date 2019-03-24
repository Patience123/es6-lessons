{
    let obj = {
        time: '2018-03-24',
        name: 'chuxuan',
        _age: 21
    };

    let monitor = new Proxy(obj, {
        // 拦截对象属性的读取
        get(target, key) {
            return target[key].replace('2018', '2019');
        },
        // 拦截对象属性的设置
        set(target, key, value) {
            if (key === 'name') {
                return target[key] = value;
            }
            else {
                return target[key];
            }
        },
        // 拦截key in object操作
        has(target, key) {
            if (key === 'name') {
                return target[key];
            }
            else {
                return false;
            }
        },
        // 拦截delete
        deleteProperty(target, key) {
            if (key.indexOf('_') !== -1) {
                delete target[key];
                return true;
            }
            else {
                return target[key];
            }
        },
        // 拦截Object.keys，Object.getOwnPropertySymbols，Object.getOwnPropertyNames
        ownKeys(target) {
            return Object.keys(target).filter(item => item !== 'time');
        }
    });

    console.log('get', monitor.time);

    monitor.time = '2020-03-24';
    monitor.name = 'wsheng';
    console.log('set', monitor);

    console.log('has', 'name' in monitor, 'time' in monitor);

    // delete monitor.name;
    // console.log('delete', monitor);
    // delete monitor._age;
    // console.log('delete', monitor);

    console.log('ownKeys', Object.keys(monitor));
}

{
    let obj = {
        time: '2018-03-24',
        name: 'chuxuan',
        _age: 21
    };

    // proxy有的方法Reflect都有
    console.log('get', Reflect.get(obj, 'time'));
    Reflect.set(obj, 'name', 'wsheng');
    console.log('set', obj);
    console.log('has', Reflect.has(obj, '_age'));
}

{
    // 使用场景
    function validator(target, validator) {
        return new Proxy(target, {
            _validator: validator,
            set(target, key, value, proxy) {
                if (target.hasOwnProperty(key)) {
                    let va = this._validator[key];
                    if (!!va(value)) {
                        return Reflect.set(target, key, value, proxy);
                    }
                    else {
                        throw Error(`不能设置${key}到${value}`);
                    }
                }
                else {
                    throw Error(`${key} 不存在`);
                }
            }
        })
    }

    const personValidators = {
        name(val) {
            return typeof(val) === 'string';
        },
        age(val) {
            return typeof(val) === 'number' && val >= 18;
        },
        phone(val) {
            return typeof(val) === 'string' && val.length === 11;
        }
    }

    class Person {
        constructor(name, age, phone) {
            this.name = name;
            this.age = age;
            this.phone = phone
            return validator(this, personValidators);
        }
    }

    let wsheng = new Person('wsheng', 22, '18821711890');
    console.log(wsheng);
    wsheng.name = 'wangsheng';
    // wsheng.age = 17;
    // wsheng.phone = '66765295';
    console.log(wsheng);
}
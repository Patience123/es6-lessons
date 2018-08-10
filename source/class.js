{
    // es5
    function MathAdd(x, y) {
        this.x = x;
        this.y = y;
    }

    MathAdd.prototype.add = function() {
        return this.x + this.y;
    }

    let a1 = new MathAdd(1, 2);
    console.log(a1.add());

    console.log(typeof MathAdd); // 'function'
    console.log(MathAdd.prototype.constructor === MathAdd); // true
    console.log(a1.__proto__ === MathAdd.prototype) // true
}

{
    // es6
    class MathAdd {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        add() {
            return this.x + this.y;
        }
    }

    let a2 = new MathAdd(1, 2);
    console.log(a2.add());

    console.log(typeof MathAdd); // 'function'
    console.log(MathAdd.prototype.constructor === MathAdd); // true
    console.log(a2.__proto__ === MathAdd.prototype) // true
}


{
    // 继承(es5)
    function Person(name) {
        this.name = name;
    }

    Person.prototype.walk = function() {
        console.log(`${this.name} can walk`);
    }

    function Student(name, className) {
        Person.call(this, name);
        this.className = className;
    }

    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;

    Student.prototype.mission = function() {
        console.log(`${this.name} is in ${this.className}, He should study`);
    }

    let sd1 = new Student('wsheng', 'class1');
    sd1.walk();
    sd1.mission();
    console.log(sd1.__proto__, sd1.__proto__.__proto__);
    console.log(Object.getOwnPropertyNames(sd1));
}

{
    // 继承(es6)
    class Person {
        constructor(name) {
            this.name = name;
        }

        walk() {
            console.log(`${this.name} can walk`);
        }
    }

    class Student extends Person {
        constructor(name, className) {
            super(name);
            this.className = className;
        }

        mission() {
            console.log(`${this.name} is in ${this.className}, He should study`);
        }
    }

    let sd2 = new Student('xiaoming', 'class2');
    sd2.walk();
    sd2.mission();
    console.log(sd2.__proto__, sd2.__proto__.__proto__);
    console.log(Object.getOwnPropertyNames(sd2));
    console.log(Student.__proto__ === Person);  // true
    console.log(Student.prototype.__proto__ === Person.prototype); // true
}

{
    // 原型在实际开发中的应用
    function Element(id) {
        this.ele = document.getElementById(id);
    }

    Element.prototype.html = function(value) {
        if(value) {
            this.ele.innerHTML = value;
            return this;
        } else {
            return this.ele.innerHTML; 
        }
    }

    Element.prototype.on = function(type, callback) {
        this.ele.addEventListener(type, callback);
    }

    // var div1 = new Elem('div1');
    // div1.html('<p>Hello world!</p>').on('click', function () {
    //     alert('Hello world!');
    // })

}
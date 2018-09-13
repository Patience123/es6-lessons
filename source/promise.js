{
    function loadImg(src, callback, fail) {
        let img = document.createElement('img');
        img.onload = function() {
            console.log(img);
            callback(img);
        }
        img.onerror = function() {
            fail();
        }
        img.src = src;
    }

    let src = 'https://s3.mogucdn.com/mlcdn/c45406/171222_55lfd9j44d5h548jag4j71h670kca_1600x1200.jpg'
    loadImg(src, function(img) {
        console.log(img.width);
    }, function() {
        console.log('fail to load img');
    });
}

{
    function loadImg(src) {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img');
            // throw Error('自定义错误');
            img.onload = function() {
                resolve(img);
            }
            img.onerror = function() {
                reject('图片加载失败');
            }
            img.src = src;
        });
    }

    let src = 'https://s3.mogucdn.com/mlcdn/c45406/171222_55lfd9j44d5h548jag4j71h670kca_1600x1200.jpg';
    let result = loadImg(src);
    result.then((img) => {
        console.log(img.width);
        return img;
    }).then((img) => {
        console.log(img.height);
    }).catch((err) => {
        console.log(err);
    })
}
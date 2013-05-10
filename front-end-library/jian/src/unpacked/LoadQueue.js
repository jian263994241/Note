function LoadQueue(){
        var f = this;
        f.picArr = [];
        f.loadManifest = function(arrImg,complete,single){
            var imgs = arrImg,
                loadedImages= 0,
                img;
            for(var i = 0;i< imgs.length;i++){
                img = new Image();
                if(!+[1,]){
                    img.onreadystatechange = function(){
                        if(img.readyState=="complete"||img.readyState=="loaded"){
                            loadImgAfter();
                        }
                    };
                    img.onerror = loadImgAfter;
                }else{
                    img.onload = loadImgAfter;
                    img.onerror = loadImgAfter;
                }
                img.src = imgs[i].src;
                f.picArr.push(imgs[i]);
            };
            function loadImgAfter(){
                if(complete&&!single)
                {
                    if(++loadedImages>=imgs.length)
                    {
                        complete.apply(this,[f.picArr]);
                    }
                }else{
                    complete.apply(this,[++loadedImages/imgs.length]);
                }
            }
        };
        f.get = function(id){
            var m ;
            for(var i=0;i<f.picArr.length;i++){
                if(f.picArr[i].id == id){
                    m = document.createElement('img');
                    m.src = f.picArr[i].src;
                    break;
                }
            };
            return m;
        }
    }
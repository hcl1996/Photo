(function($){
    var index=0;
    var all=15;
    var curImg=$(".large").find("img");
    function render(){
        var dom="",
            pics=$(".pics");
        var col=4;
        var mar=2;
        var imgW=($(window).width()-(col-1)*mar)/col;
        for(var i=1;i<all;i++){
            var m = i%col==0 ? 0 : mar;
            dom+="<li class='animated zoomIn' style='width:"+imgW+"px;height:"+imgW+"px;margin-right:"+m+"px'><canvas id='cvs"+i+"'width="+imgW+"px height="+imgW+"px>can not canvas</canvas></li>"
            var imgObj = new Image();//创建图形对象
            (function(n){
                imgObj.onload = function(){//加载图片
                    var cxt = $("#cvs"+n)[0].getContext("2d");
                    var x=(this.width-imgW)/2;
                    var y=(this.height-imgW)/2;
                    cxt.drawImage(this, -x, -y, this.width, this.height);
                }
            })(i);
            imgObj.src = "images/"+i+".jpg";//图片路径
        }
        pics.html(dom);
    }
    render();
    bindEvent();
    $(window).resize(render)//窗口改变时重新加载图片

    function bindEvent(){
        $(".pics").on("tap","li",function(){
            var num=$(this).index()+1;
            index=num;
            showLarge(num)
        })
        $(".large").on("tap",function(){
            $(this).hide();
        })
        $(".large").on("swipeLeft",function(){
                index++;
            if(index>=all){
                index=all;
            }
            showLarge(index,function(){
                curImg.addClass("animated bounceInRight").on("webkitAnimationEnd",function(){
                    $(this).removeClass().off("webkitAnimationEnd");
                });
            })
        }).on("swipeRight",function(){
            index--;
            if(index<=1){
                index=1;
            }
            showLarge(index,function(){
                curImg.addClass("animated bounceInLeft").on("webkitAnimationEnd",function(){
                    $(this).removeClass().off("webkitAnimationEnd");
                });
            })
        })
    }
    function showLarge(num,callback){
        var src="images/"+num+".large.jpg";
        console.log(src)

        var img=$(".large").find("img");
        var larImg=new Image();
        larImg.onload=function(){
            $(".large").show().find("img").attr("src",src);
            var imgWid=this.width;
            var imgHei=this.height;
            if(imgWid>imgHei){
                img.css({
                    "width":"100%",
                    "height":"auto"
                }).css({
                    "marginTop":($(window).height()-img.height())/2+"px",
                    "marginLeft":0
                })
            }else{
                img.css({
                    "width":"auto",
                    "height":"100%"
                }).css({
                    "marginLeft":($(window).width()-img.width())/2+"px",
                    "marginTop":0
                })
            }

        }
        larImg.src=src;
        callback && callback()
    }
})(Zepto);
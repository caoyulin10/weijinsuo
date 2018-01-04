$(function(){
    /*动态响应式轮播图*/
    banner();
    /*初始化tabs页*/
    initTabs();
    /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip()

});
/*动态响应式轮播图*/
function banner(){
    /*申明全局的变量  接受数据  缓存在内存当中*/
    var myData;
    /*1.获取后台的轮播路  图片数据*/
    var getData = function(callback){
        if(myData){
            callback && callback(myData);
            return false;
        }
        $.ajax({
            url:'js/index.json',
            data:{},
            type:'get',
            dataType:'json',
            success:function(data){
                myData  = data;
                callback && callback(myData);
            }
        });
    }

    /*渲染的方法*/
    var renderHtml = function(){
        getData(function(data){
            var width = $(window).width();
            var isMobile = false;
            if(width < 768 ){
                isMobile = true;
            }
            /*点的模板对象*/
            var tempaltePoint = _.template($('#template_point').html());
            /*图片模板对象*/
            var templateImage = _.template($('#template_item').html());
            /*渲染成html字符  解析成html*/
            /*传入数据  根据模板解析  返回html字符*/
            var pointHtml = tempaltePoint({model:data});
            var imageData = {
                list:data,
                isMobile:isMobile
            };
            var imageHtml = templateImage({model:imageData});
            /*渲染页面*/
            $(".carousel-indicators").html(pointHtml);
            $(".carousel-inner").html(imageHtml);
        });
    }

    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');
    var startX = 0;
    var moveX =0;
    var distanceX = 0;
    var isMove = false;
    /*绑定事件*/
    $('.wjs_banner').on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    });
    $('.wjs_banner').on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX-startX;
        isMove = true;
        console.log(distanceX);
    });
    $('.wjs_banner').on('touchend',function(e){
        if(Math.abs(distanceX) > 50 && isMove){
            if(distanceX < 0){
                /*向左滑动  下一张*/
                $('.carousel').carousel('next');
            }else{
                /*向右滑动  上一张*/
                $('.carousel').carousel('prev');
            }
        }
        /*参数重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
    });

}
/*初始化tabs*/
function initTabs(){
    var ul = $('.wjs_product .nav-tabs');
    var lis = ul.find('li');
    var width = 0;
    $.each(lis,function(i,o){
        width += $(o).innerWidth();
    })
    ul.width(width);
    /*滑动*/
    itcast.iScroll({
        swipeDom:$(".wjs_product_tabsParent").get(0),
        swipeType:"x",
        swipeDistance:50
    });



}
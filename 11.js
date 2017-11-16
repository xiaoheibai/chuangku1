function waterfall(data,box,box1) {
    this.data=data;
    this.box=box;
    this.box1=box1;
    this.boxWidth=this.box.eq(0).width();
    this.num=Math.ceil(($(window).width()-342) / (this.boxWidth));
    this.boxArr=[];
    this.boxHeight=null;
}
waterfall.prototype={
    // constructor: waterfall,
    constructor:waterfall,
    position () {
        this.num=Math.ceil(($(window).width()-342) / (this.boxWidth));
        this.box1.css("width",this.num*220+"px");
        let that=this;
        this.box.each(function (index,value) {
            that.boxHeight=that.box.eq(index).height();
            if(index<that.num){
                $(value).removeAttr("style");
                that.boxArr[index]=that.boxHeight;
            }
            else {
                that.minHeight = Math.min(...that.boxArr);
                that.minIndex=$.inArray(that.minHeight,that.boxArr);
                $(value).css({
                    "position":"absolute",
                    "top":that.minHeight,
                    "left":that.box.eq(that.minIndex).position().left
                });
//                    console.log(that.box.eq(that.minIndex))
                that.boxArr[that.minIndex]+=that.box.eq(index).height();

            }
        })
    },
    slidescroll(){
        this.documentHeight=$(document).height();
        this.windowHeight=$(window).height();
        this.scoller=null;
        this.scoller=$(window).scrollTop();
        return this.scoller<this.windowHeight+this.documentHeight;
    },
    bind(){
        let that = this;
        window.onscroll = function () {
            console.log(that.slidescroll())
            if (that.slidescroll()) {
                $.each(that.data, function (index, value) {
                    that.box1.append(`<div><img width="220" src="${$(value).attr("src")}"></div>>`)
                    that.box = $(".box");
                    that.position();
                });
            }
        }
    }
};
$(window).on("load", function () {
    const data = [{"src": "1.jpg"}, {"src": "2.jpg"}, {"src": "3.jpg"}, {"src": "4.jpg"}, {"src": "5.jpg"}];
    let box = $(".box");
    let container = $("#box1");
    let obj = new waterfall(data, box, container);
    obj.position();
    obj.slidescroll();
    obj.bind();
});

//        function position() {
//            var box=$(".box");
//            var boxWidth=box.eq(0).width();
//            console.log($(window).width());
//            var num=Math.ceil(($(window).width()-342)/boxWidth);
//            var arr=[];
//            $("#box1").css("width",num*220+"px");
//            Array.prototype.forEach.call(box,function (value,index) {
////            console.log(index)
//                if(index<num){
//                var boxheight = box.eq(index).height();
//                 console.log(boxheight);
//                 arr[index]=boxheight;
//                }
//                else {
//                   var minboxheight=Math.min.apply(null,arr);
//                   var minboxindex=$.inArray(minboxheight,arr);
////                    console.log(minboxindex);
//                    $(value).css({
//                        "position":"absolute",
//                        "top":minboxheight,
//                        "left":box.eq(minboxindex).position().left
//                    });
//                    arr[minboxindex]+=box.eq(index).height()
//                }
//
//            })
//        }

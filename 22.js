function waterfall(data,box,box1) {
    this.data=data;
    this.box=box;
    this.box1=box1;
    this.boxArr=[];
    this.boxWidth=this.box.eq(0).width();
    this.num=Math.ceil(($(window).width()-342)/ this.boxWidth);
    this.boxHeight=null;
}
waterfall.prototype={
    constructor:waterfall,
    position () {
        this.num=Math.ceil(($(window).width()-342)/ this.boxWidth);
        this.box1.css("width",this.num*220+"px")
        let that=this;
        this.box.each(function (index,value) {
            that.boxHeight=that.box.eq(index).height();
            if(index<that.num){
                $(value).removeAttr("style");
                that.boxArr[index]=that.boxHeight;
            }
            else {
                that.minHeight=Math.min(...that.boxArr);
                that.minIndex=$.inArray(that.minHeight,that.boxArr);
                $(value).css({
                    "position":"absolute",
                    "top":that.minHeight,
                    "left":that.box.eq(that.minIndex).position().left
                })
                that.boxArr[that.minIndex]+=that.box.eq(index).height();
            }
        })
    },
    sildsrcroll(){
        this.documentHeight=$(document).height();
        this.windowHeight=$(window).height();
        this.scroll=null;
        this.scroll=$(window).scrollTop();
        return this.documentHeight<this.scroll+this.windowHeight+400; 
    },
    bind(){
        let that=this;
        window.onscroll=function () {
            if(that.sildsrcroll()){
              $.each(that.data,function (index,value) {
                  console.log(index);
                  that.box1.append(`<div class="box">
                  <img width="220px" src="${$(value).attr("src")}">
                  </div>`);
                  that.box=$(".box");
                  that.position ();
              })
            }
        };
        window.onresize=function () {
            that.position()
        }
    }
};
window.onload=function () {
    this.data=[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}];
    this.box=$(".box");
    this.box1=$("#box1");
    let obj = new waterfall(data,box,box1);
    obj.position();
    obj.sildsrcroll();
    obj.bind();
};
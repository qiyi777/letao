

; (function () {

  //图片轮播
  //进入页面自动轮播  简单明了
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；  
  });

}())
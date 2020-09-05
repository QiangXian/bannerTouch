let items = document.getElementsByClassName("item");
let list = document.querySelector('.list');
let container = document.querySelector(".container");
let widthUnit = window.innerWidth;
console.log(widthUnit);

//适配移动端屏幕宽度
//动态根据图片生成小点
let pointWrap = document.querySelector(".point");
let points = [] ;
for(let i = 0 ; i < items.length ; i ++){
	items[i].style.width = window.innerWidth + 'px';
	//生成白点
	_creatPoint(i);
	
}
list.style.width = items.length * window.innerWidth + 'px';

//动态根据图片生成小点
function _creatPoint(i){
	let pointDom = document.createElement("li");
	pointDom.classList.add('point-item');
	if( i === 0){
		pointDom.classList.add('active');
	}
	points.push(pointDom);
	pointWrap.appendChild(pointDom);
}

//小点随着index变化
var _dot = function(){
	let dots = document.getElementsByClassName('point-item');
	for(let i = 0 ; i < dots.length ; i++ ){
		dots[i].className = "point-item";
	}
	dots[state.index].className = "point-item active";
}

//触摸开始，touchstart
//当手指摸到屏幕的时候触发
//click
let state = {
	beginX : 0 ,
	endX:0 ,
	nowX:0 ,
	index:0 ,
}


//复位
var _reset = function(){
	//需要过渡让复位效果更自然
	list.style.transition = 'all,0.3s'; 
	//现在在第几张就复位到第几张
	list.style.marginLeft = - state.index * widthUnit + 'px' ;
	_dot();
}


//上一张
var _goPrev = function(){
	if(state.index > 0){
		state.index-- ;
		list.style.transition = 'all,0.3s'; 
		list.style.marginLeft = - state.index * widthUnit + 'px';
		_dot();
	}else{
		//复位
		_reset();
	}
}

//下一张
var _goNext = function(){
	if(state.index < items.length - 1){
		state.index++ ;
		list.style.transition = 'all,0.3s'; 
		list.style.marginLeft = -state.index * widthUnit + 'px';
		_dot();
	}else{
		//复位
		_reset();
	}
}

//根据滑动距离判断应当是上还是下一张，或者复位
var _judgeMove = function(){
	let deltaX = state.endX - state.beginX ;
	console.log(deltaX)
	if(deltaX <= -window.innerWidth * 2/5 ){
		//下一张
		console.log("下一张");
		_goNext();
	}else if(deltaX >= window.innerWidth * 2/5 ){
		//上一张
		console.log("上一张");
		_goPrev();
	}else{
		//不动
		console.log('不动');
		_reset();
	}
}

//滑动图片时应当切换的当前图片位置，可能出现滑动时跳转至第一张图片的bug
var _slice = function(){
	let deltaX = state.nowX - state.beginX;
	list.style.marginLeft= (- state.index * widthUnit) + deltaX + "px" ;
}




//获取滑动开始时的初始位置
container.addEventListener('touchstart',function(e){
	//去除过渡效果
	list.style.transition = "none";
	state.beginX = e.touches[0].clientX;
});

//触摸移动，获取滑动的距离
container.addEventListener('touchmove',function(e){

	let nowX = e.changedTouches[0].clientX;
	state.nowX = nowX ;//记录nowX
	_slice();
});

//触摸结束，获取结束时的位置
container.addEventListener('touchend',function(e){
	state.endX = e.changedTouches[0].clientX;
	_judgeMove()
});

setInterval(function(){
		_goNext();
	},4000)

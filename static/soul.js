window.onload = getContent("suiyue");

$('.button').bind('click', function(){
	pageName = this.getAttribute("id");
	if (this.className.indexOf("selected") >=0) {
		return;
	}else{
		var btns = getByClass("topic","button");
		for(var j = 0, len = btns.length; j < len; j++){
				btns[j].className = "button";
			}
		this.className += " selected";
		getContent(pageName);
	}
})



//通过class获取元素
function getByClass(oParent,clsName){
	var oParent = document.getElementById(oParent);
	var classArr =[];
	var tagArr = oParent.getElementsByTagName("*");
	for(var i = 0, len = tagArr.length; i < len; i++){
		if (tagArr[i].className.indexOf(clsName) >=0){
			classArr.push(tagArr[i]);
		};
	}
	return classArr;
}


/*获取内容*/
function getContent(content){
	var request;
	if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	}else{
		request = new ActiveXObject("Microsoft XMLHTTP");
	};
	request.open("GET", "static/"+content+".js");
	request.send();
	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200) {
			var article = JSON.parse(request.responseText).data,
			len = article.length;
			var lists = getByClass("main","roll");
			var tits = getByClass("main", "listtit");
			for(var i = 0; i < len ; i++){
				lists[i].innerHTML = "";
				tits[i].innerHTML = article[i].TITLE;
				lilen = article[i].LEN; 
				var pagecount = lilen;
				var ullist = document.createElement("ul");
				ullist.style.width = 1197 * lilen + "px";
				ullist.innerHTML = article[i].CONTENT;
				lists[i].appendChild(ullist);
			}

		};
	}
}


/*滑动列表*/
$(function(){
	var page = 1;
	$(".rightarr").click(function(){
		var parent = $(this).parent();
		var loop = parent.data("loop");
		var rool = $(this).next();
		var ul = rool.find("ul");
		var li = ul.find("li");
		if (!ul.is(":animated")) {
			if (loop == li.length-1) {
				loop = 0;
				ul.animate({left: -loop*1197+ "px"}, "slow");
			}else{
				loop++;
				ul.animate({left: -loop*1197+ "px"}, "slow");
			}
		}
		// console.log(loop);
		parent.data("loop", loop);
	})
	$(".leftarr").click(function(){
		var parent = $(this).parent();
		var loop = parent.data("loop");
		var rool = $(this).next().next();
		var ul = rool.find("ul");
		var li = ul.find("li");
		if (!ul.is(":animated")) {
			if (loop == 0) {
				loop = li.length-1;
				ul.animate({left: -loop*1197+ "px"}, "slow");
			}else{
				loop--;
				ul.animate({left: -loop*1197+ "px"}, "slow");
			}
		}
		// console.log(loop);
		parent.data("loop", loop);
	})
})
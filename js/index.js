//遍历中
function ergodicState(arr) {
	var index = 0;
	arr[index].className += " " + "ergodicState"; //正在遍历中
	
	var result = document.getElementById("result");
	result.textContent += arr[index].getElementsByTagName("b")[0].textContent + '';
	
	var timer = setInterval(function(){
		if (index <arr.length - 1){
			arr[index].className = arr[index].className.replace(/ergodicState/,'');//不在遍历
			index++;
			arr[index].className += " " + "ergodicState"; //正在遍历中
			result.textContent += arr[index].getElementsByTagName("b")[0].textContent + '';
		}else{
			clearInterval(timer);
			arr[index].className = arr[index].className.replace(/ergodicState/,'');
			var dlr = document.getElementById("preOrder");
			var ldr = document.getElementById("inOrder");
			var lrd = document.getElementById("postOrder");
			lrd.className = "";
			dlr.className = "";
			ldr.className = "";
			lrd.removeAttribute("disabled");
			dlr.removeAttribute("disabled");
			ldr.removeAttribute("disabled");
		}
	},1000);
}

//exist 判断dom中是否有这个节点
Object.prototype.exist = function() {
	if(typeof this != "undefined" && this.length >= 1) {
		return true;
	}
	return false;
};

//emptyResult 清空此前遍历次序结果
function emptyResult(p) {
	p.textContent = "遍历次序";
}

//preOrder 先遍历二叉树
function preOrder(data) {
	var dlr = document.getElementById("preOrder");
	var ldr = document.getElementById("inOrder");
	var lrd = document.getElementById("postOrder");
	
	dlr.className = "ergodicState";
	ldr.className = "unergodicState";
	lrd.className = "unergodicState";
	
	dlr.setAttribute("disabled","disabled");
	lrd.setAttribute("disabled","disabled");
	ldr.setAttribute("disabled","disabled");
	
	ergodicState(data);
	return false;
}

//inOrder 中序遍历二叉树
function inOrder(data) {
	var dlr = document.getElementById("preOrder");
	var ldr = document.getElementById("inOrder");
	var lrd = document.getElementById("postOrder");
	dlr.className = "unergodicState";
	ldr.className = "ergodicState";
	lrd.className = "unergodicState";
	dlr.setAttribute("disabled","disabled");
	lrd.setAttribute("disabled","disabled");
	ldr.setAttribute("disabled","disabled");
	
	var stack = [],sortResult = [],i = 0;
	while(true) {
		if (i === data.length) {
			ergodicState(sortResult);
			return false;
		}
		if(data[i].getElementsByTagName("div").exist()) { //非叶子节点
			stack.push(data[i]);
		}else{ //叶子结点
			sortResult.push(data[i]);
			if(stack.length != 0) {
				sortResult.push(stack.pop());
			}
		}
		i++;
	}
}

//后期遍历二叉树
function postOrder(data) {
	var dlr = document.getElementById("preOrder");
	var ldr = document.getElementById("inOrder");
	var lrd = document.getElementById("postOrder");
	dlr.className = "unergodicState";
	ldr.className = "unergodicState";
	lrd.className = "ergodicState";
	dlr.setAttribute("disabled","disabled");
	lrd.setAttribute("disabled","disabled");
	ldr.setAttribute("disabled","disabled"); 
	
	var stack = [],sortResult = [],i=0;
	var pushs = function() {
		for (var j = len - 1 ; j >= 0 ; j--) {
			if (typeof stack[j] != "underfined") {
				var d = stack[j][0].getElementsByTagName("div").length + 1;
				if(stack[j][1] >= d) {
					sortResult.push(stack[j][0]);
					delete stack[j];
				}
			}
		}
	};
	
	while(true) {
		var arr = [];
		var len = stack.length;
		
		if(len != 0) {
			for (var j in stack){
				stack[j][1] += 1;
			}
		}
		
		if(i>= data.length) {
			pushes();
			ergodicState(sortResult);
			return false;
		}
		
		if(data[i].getElementsByTagName("div").exist()) {//非叶子结点
			arr[0] = data[i];
			arr[1] = 0;
			stack.push(arr);
		}else{ //叶子结点
			if(len!=0){
				pushes();
			}
			sortResult.push(data[i]);
		}
		i++;
	}
}

//emptyReslt 清空此前遍历次序结果
function emptyResult(p) {
	p.textContent = "遍历次序";
}

/*
 * queryElement 
 * 点击按钮时，开始在树中以动画形式查找节点内容和输入框中内容一致的节点
 * 找到后以特殊样式显示该节点，找不到的话 给出找不到的提示
 */
function queryElement(data) {
	var dlr = document.getElementById("preOrder");
	var ldr = document.getElementById("inOrder");
	var lrd = document.getElementById("postOrder");
	dlr.className = "unergodicState";
	ldr.className = "unergodicState";
	lrd.className = "unergodicState";
	dlr.setAttribute("disabled","disabled");
	lrd.setAttribute("disabled","disabled");
	ldr.setAttribute("disabled","disabled");
	
	var text = document.getElementsByTagName("input")[0].value.trim();
	var index = 0;
	data[index].calssName += " " +"ergodicState"; //正在遍历中
	var result = document.getElementById("result");
	result.textContent += data[index].getElementsByTagName("b")[0].textContent + '';
	
	var timer = setInterval(function(){
		if(index <data.length - 1){
			data[index].className = data[index].className.replace(/ergodicState/,'');//不在遍历
			if(data[index].getElementsByTagName("span")[0].textContent ===text) {
				data[index].className += " " +"findTarget";
				return;
			}
			index++;
			data[index].className += " " + "ergodicState";//正在遍历中
			result.textContent += data[index].getElementsByTagName("b")[0].textContent + '';
		}else{
			clearInterval(timer);
			data[index].className = data[index].className.replace(/ergodicState/,'');
			var dlr = document.getElementById("preOrder");
			var ldr = document.getElementById("inOrder");
			var lrd = document.getElementById("postOrder");
			lrd.className = "";
			lrd.removeAttribute("disabled");
			dlr.className = "";
			dlr.removeAttribute("disabled");
			ldr.className = "";
			ldr.removeAttribute("disabled");
			if(text) {
				alert("未找到");
			}
		}
	},1000);
}

function init() {
	var root = document.getElementById("rootNode");
	var p = document.getElementById("result");
	var data = [root];
	data.push.apply(data,root.getElementsByTagName("div"));
	
	document.getElementById("queryBtn").onclick = function(){
		emptyResult(p);
		queryElement(data);
	}
	document.getElementById("preOrder").onclick = function() {
		emptyResult(p);
		preOrder(data);
	}

	document.getElementById("inOrder").onclick = function() {
		emptyResult(p);
		inOrder(data);
	}

	document.getElementById("postOrder").onclick = function() {
		emptyResult(p);
		postOrder(data);
	}
}

init();

















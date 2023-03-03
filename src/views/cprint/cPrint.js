var pageW = 210; //210
var pageH = 297; //318.03
var pageMarginTop = 25.4;
var pageMarginBottom = 25.4;
var pageMarginLeft = 19.1;
var pageMarginRigt = 19.1;
// 页边距普通:25.4 31.8;  适中:25.4 19.1; 窄:12.7 12.7; 宽:25.4 50.8

var contentW = pageW-pageMarginLeft-pageMarginRigt;
var contentH = pageH - pageMarginTop - pageMarginBottom;

var headerTop = 12;
var headerMarginLeft = 15;
var headerTextAlign = "left";
var footerBottom = 6;
var footerMarginLeft = 0;
var footerTextAlign = "center";
var originalHTML;
$(function() {
	$(document).keydown((e)=>{ if(e.keyCode==80 && e.ctrlKey){c_Print(); return false;}});
	$("body").css("width", pageW+"mm");
	var tmpDiv = $("<div id='tmpDiv'></div>");
	$("body").children().wrapAll(tmpDiv);
	$("body").prepend(initPrintArea());
	$("#PrintContentArea").append($("#tmpDiv"));
	

	tableReRender();
});

function refreshPrintContentArea(){
	originalHTML = $("#tmpDiv").clone(true);
	$("#PrintArea").remove();
	$("body").prepend(initPrintArea());
	$("#PrintContentArea").append(originalHTML);
}

function c_Print() {
	setPageSettings();
	refreshPrintContentArea();
	add_H_F(()=>{
		window.print();
		location.reload(true);
	});
}

function customPageCntChange(e){
	var pageCnt = $("#customPageCnt").val();
	var ex = /[1-9]+\d*/;
	if(pageCnt != '自动' && !ex.test(pageCnt)){
		$("#customPageCntTip").html("请设置正整数 或 '自动'.");
	}else{
		$("#customPageCntTip").html("");
	}
}

function setPageSettings(){
	pageMarginTop = $("#marginU").val();
	pageMarginBottom = $("#marginB").val();
	pageMarginLeft = $("#marginL").val();
	pageMarginRigt = $("#marginR").val();
	contentW = pageW-pageMarginLeft-pageMarginRigt;
	contentH = pageH - pageMarginTop - pageMarginBottom;

	var h_textAlign = $('input[type=radio][name=h_textAlign]:checked').val();
	headerTop = $("#h_marginU").val();
	headerMarginLeft = $("#h_marginL").val();
	headerTextAlign = h_textAlign;
	
	var f_textAlign = $('input[type=radio][name=f_textAlign]:checked').val();
	footerBottom =$("#f_marginB").val();
	footerMarginLeft = $("#f_marginL").val();
	footerTextAlign = f_textAlign;
}

function tableReRender() {
	$("table:not(.print-container)").each(function(i){
		$(this).children().wrapAll("<tbody></<tbody>");
		$(this).prepend(
			"<thead>" +
			"	<tr class = 'head-tr'>" +
			"		<td class='head-td' colspan='100'></td>" +
			"	</tr>" +
			"</thead>" +
			"<tfoot >" +
			"	<tr class = 'foot-tr'>" +
			"		<td class='foot-td' colspan='100'></td>" +
			"	</tr>" +
			"</tfoot>"
		);
	});
}

function initPrintArea(){
	var html = 
	"<div id='PrintArea' style='width: "+contentW+"mm; "+" padding:0mm " + pageMarginRigt + "mm 0mm " + pageMarginLeft + "mm;'>" +
		"<header style='width: "+contentW+"mm; height: "+pageMarginTop+"mm; line-height:"+pageMarginTop+"mm;'>"+
			"<h5></h5>"+
		"</header>"+
		"<footer style='width: "+contentW+"mm; height: "+pageMarginBottom+"mm; line-height:"+pageMarginBottom+"mm;'>"+
			"<h5></h5>"+
		"</footer>"+
		"<table style='width: 100%;' class='print-container'>"+
			"<thead class='print-header'>"+
				"<tr>"+
					"<td class='print-header-cell' style='height: "+pageMarginTop+"mm;'>"+
						"<div class='header-info'>"+
						"</div>"+
					"</td>"+
				"</tr>"+
			"</thead>"+
			"<tfoot class='print-footer'>"+
				"<tr>"+
					"<td class='print-footer-cell' style='height: " + pageMarginBottom + "mm;'>"+
						"<div class='footer-info'>"+
						"</div>"+
					"</td>"+
				"</tr>"+
			"</tfoot>"+
			"<tbody class='print-content'>"+
				"<tr>"+
					"<td id='PrintContentArea' class='print-content-cell'>"+
					"</td>"+
				"</tr>"+
			"</tbody>"+
		"</table>"+
	"</div>";
	
	return $(html);
}

function add_H_F(callback){
	var PAGE_H_F_Html = "<div class='PAGE_H_F' id='PAGE_H_F'></div>";
	$("body").prepend(PAGE_H_F_Html);
	
	var headerText = "";
	if($(".title").length == 0 || $(".title").html().length <= 0){
		var docTitle = $("title");
		if(docTitle.length > 0 && docTitle.html().length > 0){
			headerText = docTitle.html();
		}
	}else{
		headerText = $(".title").html();
	}
	var footerText = "";
	var pageCnt = $("#customPageCnt").val();
	var ex = /[1-9]+\d*/;
	if(pageCnt == '自动' || !ex.test(pageCnt)){
		pageCnt = getPageCnt();
	}
	var fineTune = 0.185;
	var pageOrient = $('input[type=radio][name=pageOrient]:checked').val();
	if(pageOrient == 'Portrait'){//纵向
		fineTune= -0.13;
	}
	
	for(var i=1; i<=pageCnt; i++){
		footerText = "-第"+i+"页-";
		var PAGE_H_F_Idx = "<div class='content' id='content' style='width: "+pageW+"mm; height: "+(pageH-fineTune)+"mm;'>"+
		" <span class='PAGE_H' style='text-align:"+headerTextAlign+"; width: "+(pageW-headerMarginLeft)+"mm; top:0mm; padding-top:"+headerTop+"mm; padding-left: "+headerMarginLeft+"mm;'>"+headerText+"</span>"+
		" <span class='PAGE_F' style='text-align:"+footerTextAlign+"; width: "+(pageW-footerMarginLeft)+"mm; bottom:0mm; padding-bottom:"+footerBottom+"mm; padding-left: "+footerMarginLeft+"mm;'>"+footerText+"</span>"+
		"</div>"
		$("#PAGE_H_F").append(PAGE_H_F_Idx);
	}
	
	callback && callback(true);
}

function getPageCnt(){
	var cnt = 0;
	var printAreaHeight = $("#PrintArea").outerHeight(true);
	var titleClassHeight = 0;
	if($(".title").length > 0){
		titleClassHeight = $(".title").outerHeight(true);
	}
	
	printAreaHeight = px2mm(printAreaHeight - titleClassHeight);
	var cnt = Math.ceil(printAreaHeight / (pageH-pageMarginTop-pageMarginBottom+7));
	
	return cnt;
}

function px2mm(px) {
	var dpi = getDPI();
	var mm = parseFloat(px) * 25.4 / dpi[0];
	return mm;
}
function getDPI() {
	var arrDPI = new Array();
	if (window.screen.deviceXDPI != undefined) { //ie 9
		arrDPI[0] = window.screen.deviceXDPI;
		arrDPI[1] = window.screen.deviceYDPI;
	} else { //chrome firefox
		var tmpNode = document.createElement("DIV");
		tmpNode.style.cssText = "width:1in; height:1in; position:absolute; left:0px; top:0px; z-index:99; visibility:hidden;";
		document.body.appendChild(tmpNode);
		arrDPI[0] = parseInt(tmpNode.offsetWidth);
		arrDPI[1] = parseInt(tmpNode.offsetHeight);
		tmpNode.parentNode.removeChild(tmpNode);
	}
	return arrDPI;
}

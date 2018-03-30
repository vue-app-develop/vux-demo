///交互消息类型
if (typeof msgType == "undefined") {
  var msgType = {};
  msgType.showObjectSelect = "showObjectSelect";//弹出对象选择器
  msgType.objectSelectCallback = "objectSelectCallback";    //对象选择器回掉
  msgType.close = "close";  //关闭该子应用
  msgType.refresh = "refresh"; //刷新到入口页面
}

if (typeof objType == "undefined") {
  var objType = {};
  objType.building = "building";//楼栋
  objType.floor = "floor";//楼层
  objType.room = "room";   //房间
  objType.device = "device";  //设备
  objType.alarm = "alarm";    //告警
  objType.singal = "singal";  //信号
  objType.command = "command";   //命令
}

//弹出对象选择器
function ShowObjectSelector(){
  var msg = {
    msgType: msgType.showObjectSelector,
    objType: objType.device
  }
  window.parent.postMessage(msg, '*');
}
//回调函数
function ApiCallback(e) {
  // e.data = {
  //     msgType: msgType.objectSelectCallback,
  //     objType: objType.device
  //     msgValue: "1323656"
  // }
  //console.log(e.data);
  if (e.data.msgType==msgType.device)
  {
    //todo 根据e.data.objType和e.data.msgValue获得对象id值
  }
}
window.addEventListener('message', ApiCallback);

//获取所有浏览器url参数
function GetParams(){
  var urlParameters={};
  if (document.URL.indexOf("?") > 0) {
    let splitURL = document.URL.split("?");
    let splitParams = splitURL[1].split("&");
    for (let i in splitParams) {
      let singleURLParam  = splitParams[i].split('=');
      urlParameters[singleURLParam[0]] = singleURLParam[1];
    }
  }
  return urlParameters;
}
//获取token
function GetToken(){
  var params=GetParams();
  return params["token"];
}
//获取loginid
function GetLoginUserId() {
  var params = GetParams();
  return params["loginUserId"];
}
//获取默认多语言
function GetDefaultLang(){
  var params = GetParams();
  return params["defaultLang"];
}
//刷新到入口页面
function  RefreshPortPage() {
  var msg = {
    msgType: msgType.refresh
  }
  window.parent.postMessage(msg, '*');
}
//关闭当前子功能页面
function ClosePage() {
  console.log(111)
  var msg = {
    msgType: msgType.close
  }
  window.parent.postMessage(msg, '*');
}

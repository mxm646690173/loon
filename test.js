// 定义一个函数来处理请求
//function handleRequest(request) {
//    console.log(request)
//}

// 监听请求
//$loon.onRequest(handleRequest);
function Notify_Demo()
{
    var Title,SubTitle,Content;
    TItle = "我是主标题";
    SubTitle  = "我是子标题";
    Content = "我是要推送的内容";
    $notification.post(Title,SubTitle,Content);
}
//Call Function
Notify_Demo()

// 定义一个函数来处理请求
function handleRequest(request) {
    Notify_Demo(request)
}

// 监听请求
$loon.onRequest(handleRequest);
function Notify_Demo(request)
{
    var Title,SubTitle,Content;
    TItle = "我是主标题";
    SubTitle  = "我是子标题";
    Content = request;
    $notification.post(Title,SubTitle,Content);
}
//Call Function


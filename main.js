var http = require('http');
var fs = require('fs');
var url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    //parse=>url문자열을 입력하면 url객체를 만든다.
    var queryData=url.parse(_url,true).query;//쿼리데이터만 추출
    var pathname=url.parse(_url,true).pathname;//경로만 추출
    if(pathname == '/'){
        if(queryData.id===undefined){//쿼리데이터가없는 기본홈
            var template=`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>마음의 안식</title>
                </head>
                <body>
                    <h1><a href="/">마음의 안식</a></h1>
                    <ul>
                        <li><a href="/?id=hello">hello</a></li>
                    </ul>
                    <h2>Blog And Schedule Management</h2>
                    <p>
                        우리는 마음의 안식을 얻기위해 다양한노력을 기울인다.
                        나는 나의 생각을 정리하고, 좀 더 조밀한 삶을 살아가기위해 일상을 계획한다.
                    </p>
                </body>
                </html>
            `;
            response.writeHead(200);
            response.end(template);
        }
        else{
            var title=queryData.id;
            fs.readFile(`data/${title}`,'utf8',function(error,description){
                var template=`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>마음의 안식</title>
                    </head>
                    <body>
                        <h1><a href="/">마음의 안식</a></h1>
                        <ul>
                            <li><a href="/?id=hello">hello</a></li>
                        </ul>
                        <h2>${title}</h2>
                        <p>
                            ${description}
                        </p>
                    </body>
                    </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        }
    }
    else{
        response.writeHead(404);
        response.end("NOT FOUND");
    }
    
});
app.listen(3000);
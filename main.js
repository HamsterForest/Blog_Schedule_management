var http = require('http');
var fs = require('fs');
var url = require('url');

var template={
    homepage:function(bloglist,schlist){
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>마음의 안식</title>
            </head>
            <body>
                <h1><a href="/">마음의 안식</a></h1>
                <h3>블로그</h3>
                <ul>
                    ${bloglist}
                </ul>
                <h3>소소한 인생 계획</h3>
                <ul>
                    ${schlist}
                </ul>
                <h2>Blog And Schedule Management</h2>
                <p>
                    우리는 마음의 안식을 얻기위해 다양한노력을 기울인다.
                    나는 나의 생각을 정리하고, 좀 더 조밀한 삶을 살아가기위해 일상을 계획한다.
                </p>
            </body>
            </html>
        `;
    },
    subpage:function(bloglist,schlist,title,description){
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>마음의 안식</title>
            </head>
            <body>
                <h1><a href="/">마음의 안식</a></h1>
                <h3>블로그</h3>
                <ul>
                    ${bloglist}
                </ul>
                <h3>소소한 인생 계획</h3>
                <ul>
                    ${schlist}
                </ul>
                <h2>${title}</h2>
                <p>
                    ${description}
                </p>
            </body>
            </html>
        `;
    },
    listmaker:function(filelist){
        //목록형성(블로그)
        var list='<ul>';
        var i=0;
        while(i<filelist.length){
            list+=`<li><a href=/?id=${filelist[i]}>${filelist[i]}</a></li>`;
            i+=1;
        }
        list+='</ul>';
        return list;
    }
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    //parse=>url문자열을 입력하면 url객체를 만든다.
    var queryData=url.parse(_url,true).query;//쿼리데이터만 추출
    var pathname=url.parse(_url,true).pathname;//경로만 추출
    if(pathname == '/'){
        if(queryData.id===undefined){//쿼리데이터가없는 기본홈
            fs.readdir('blog',function(error,bloglist){//목록형성을 위해 특정폴더안의 파일리스트를 불러온다.
                fs.readdir('schedule',function(error,schlist){
                    _bloglist=template.listmaker(bloglist);
                    _schlist=template.listmaker(schlist);
                    page=template.homepage(_bloglist,_schlist);

                    response.writeHead(200);
                    response.end(page);
                });
            });
        }
        else{
            var title=queryData.id;
            //파일이 블로그파일인지 일정관리 파일인지 판별한다. 일정관련 모든파일은 앞에 일정이란 단어를 붙인다.
            var inspect=title.substring(0,2);
            if(inspect=="일정"){
                //파일안의 내용을 읽어온다. 그 내용은 description
                fs.readFile(`schedule/${title}`,'utf8',function(error,description){
                    //목록형성을 위해 특정폴더안의 파일리스트를 불러온다.
                    fs.readdir('blog',function(error,bloglist){
                        fs.readdir('schedule',function(error,schlist){
                            _bloglist=template.listmaker(bloglist);
                            _schlist=template.listmaker(schlist);
                            page=template.subpage(_bloglist,_schlist,title,description);
        
                            response.writeHead(200);
                            response.end(page);
                        });
                    });
                });
            }
            else{
                //파일안의 내용을 읽어온다. 그 내용은 description
                fs.readFile(`blog/${title}`,'utf8',function(error,description){
                    //목록형성을 위해 특정폴더안의 파일리스트를 불러온다.
                    fs.readdir('blog',function(error,bloglist){
                        fs.readdir('schedule',function(error,schlist){
                            _bloglist=template.listmaker(bloglist);
                            _schlist=template.listmaker(schlist);
                            page=template.subpage(_bloglist,_schlist,title,description);
        
                            response.writeHead(200);
                            response.end(page);
                        });
                    });
                });
            }
        }
    }
    else{
        response.writeHead(404);
        response.end("NOT FOUND");
    }
    
});
app.listen(3000);
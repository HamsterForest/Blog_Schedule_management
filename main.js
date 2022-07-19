var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template=require('./lib/template.js');
var style=require('./lib/style.js')

var app = http.createServer(function(request,response){
    var _url = request.url;
    //parse=>url문자열을 입력하면 url객체를 만든다.
    var queryData=url.parse(_url,true).query;//쿼리데이터만 추출
    var pathname=url.parse(_url,true).pathname;//경로만 추출
    if(pathname === "/"){
        if(queryData.id===undefined){//쿼리데이터가없는 기본홈
            fs.readdir('blog',function(error,bloglist){//목록형성을 위해 특정폴더안의 파일리스트를 불러온다.
                fs.readdir('schedule',function(error,schlist){
                    _bloglist=template.listmaker(bloglist);
                    _schlist=template.listmaker(schlist);
                    page=template.homepage(_bloglist,_schlist,style.sheet());

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
                            page=template.subpage(_bloglist,_schlist,title,description,style.sheet());
        
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
                            page=template.subpage(_bloglist,_schlist,title,description,style.sheet());
        
                            response.writeHead(200);
                            response.end(page);
                        });
                    });
                });
            }
        }
    }
    else if(pathname==="/createblog"){
        fs.readdir('blog',function(error,bloglist){//목록형성을 위해 특정폴더안의 파일리스트를 불러온다.
            fs.readdir('schedule',function(error,schlist){
                _bloglist=template.listmaker(bloglist);
                _schlist=template.listmaker(schlist);
                page=template.createpage(_bloglist,_schlist,style.sheet(),"blog");//블로그페이지 생성

                response.writeHead(200);
                response.end(page);
            });
        });
    }
    else if(pathname==="/createsch"){
        fs.readdir('blog',function(error,bloglist){//목록형성을 위해 특정폴더안의 파일리스트를 불러온다.
            fs.readdir('schedule',function(error,schlist){
                _bloglist=template.listmaker(bloglist);
                _schlist=template.listmaker(schlist);
                page=template.createpage(_bloglist,_schlist,style.sheet(),"sch");//블로그페이지 생성

                response.writeHead(200);
                response.end(page);
            });
        });
    }
    else if(pathname==="/create_blogprocess"){
        var body="";
        request.on("data",function(data){
            body+=data;
        });
        request.on("end",function(){
            var post=qs.parse(body);
            var title=post.title;
            var description=post.description;
            fs.writeFile(`blog/${title}`,description,"utf8",function(error){
                response.writeHead(302,{Location:encodeURI(`/?id=${title}`)});
                response.end();
            });
        });
    }
    else if(pathname==="/create_schprocess"){
        var body="";
        request.on("data",function(data){
            body+=data;
        });
        request.on("end",function(){
            var post=qs.parse(body);
            var title=post.title;
            var description=post.description;
            fs.writeFile(`schedule/${title}`,description,"utf8",function(error){
                response.writeHead(302,{Location:encodeURI(`/?id=${title}`)});
                response.end();
            });
        });
    }
    else{
        response.writeHead(404);
        response.end("NOT FOUND");
    }
    
});
app.listen(3000);
module.exports={
    homepage:function(bloglist,schlist,stylesheet){
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>마음의 안식</title>
                ${stylesheet}
            </head>
            <body>
                <h1><a href="/">마음의 안식</a></h1>
                <header>
                    <div>
                        <h3>블로그</h3>
                        <ul>
                            ${bloglist}
                        </ul>
                    </div>
                    <div>
                        <h3>소소한 인생 계획</h3>
                        <ul>
                            ${schlist}
                        </ul>
                    </div>
                </header>
                <main>
                    <h2>Blog And Schedule Management</h2>
                    <p>
                        우리는 마음의 안식을 얻기위해 다양한노력을 기울인다.
                        나는 나의 생각을 정리하고, 좀 더 조밀한 삶을 살아가기위해 일상을 계획한다.
                    </p>
                </main>
            </body>
            </html>
        `;
    },
    subpage:function(bloglist,schlist,title,description,stylesheet){
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>마음의 안식</title>
                ${stylesheet}
            </head>
            <body>
                <h1><a href="/">마음의 안식</a></h1>
                <header>
                    <div>
                        <h3>블로그</h3>
                        <ul>
                            ${bloglist}
                        </ul>
                    </div>
                    <div>
                        <h3>소소한 인생 계획</h3>
                        <ul>
                            ${schlist}
                        </ul>
                    </div>
                </header>
                <main>
                    <h2>${title}</h2>
                    <p>
                        ${description}
                    </p>
                </main>
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
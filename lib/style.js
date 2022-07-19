module.exports={
    sheet:function(){
        return `
            <style>
                body{
                    background-color: gainsboro;
                }
                header{
                    display:flex;
                    justify-content: left;
                }
                div{
                    background-color: white;
                    margin: 10px;
                    padding: 5px;
                    border: 2px solid black;
                }
                ul{
                    padding-left: 8px;
                    padding-right: 8px;
                }
                a{
                    color:black;
                }
                .mainlink{
                    position: relative;
                    left: 10px;
                    top: 10px;
                    background-color: white;
                    padding: 5px;
                }
            </style>
        `;
    },
}
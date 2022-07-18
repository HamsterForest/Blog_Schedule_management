module.exports={
    css:function(){
        return `
            <style>
                body{
                    background-color:yellowgreen;
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
            </style>
        `;
    },
}
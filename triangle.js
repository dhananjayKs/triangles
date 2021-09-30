function main(){
    let coordinates=[]
    
    let canvas=document.getElementById('canvas')
    ctx = canvas.getContext('2d');
    canvas.addEventListener('click',getPosition)
    ctx.width=canvas.clientWidth
    ctx.height=canvas.clientHeight
    console.log(ctx.width)
    console.log(ctx.height)

    let points= document.getElementById('points')

    function pointDisplay(arr,n){
        points.innerHTML=''
        arr.forEach((ele,i)=>{
            let pt= document.createElement('p')
            pt.className='point'
            pt.innerText=`Point ${i}=> X: ${ele[0].toFixed(0)}, Y: ${ele[1].toFixed(0)} `
            points.appendChild(pt)
        })
        
    }

    function clear(){
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        points.innerHTML=''
        coordinates=[]
    }
    function getPosition(e){
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left; //x position within the element.
        var y = e.clientY - rect.top;  //y position within the element.
        addCoordinates([x,y])
        
    }
    function errorMsg(){
        points.innerHTML=''
        coordinates=[]

        let error=document.createElement('p')
        error.className='err'
        error.innerHTML='Two points cannot be same'
        points.appendChild(error)
    }
    function addCoordinates(arr){
        if(coordinates.length<2){
            coordinates.push(arr)
            pointDisplay(coordinates)
            //drawPoints(arr,coordinates.length)
            if(coordinates.length===2){
                if(coordinates[0][0].toFixed(0)===coordinates[1][0].toFixed(0) && coordinates[0][1].toFixed(0)===coordinates[1][1].toFixed(0)){
                    errorMsg()
                }else{
                    pointDisplay(coordinates)
                }
            }
            
            
        }else{
            coordinates.push(arr)

            //drawPoints(arr,coordinates.length)
            pointDisplay(coordinates)
            console.log(coordinates)
            if((coordinates[0][0].toFixed(0)===coordinates[2][0].toFixed(0) && coordinates[0][1].toFixed(0)===coordinates[2][1].toFixed(0)) || coordinates[1][0].toFixed(0)===coordinates[2][0].toFixed(0) && coordinates[1][1].toFixed(0)===coordinates[2][1].toFixed(0) ){
                errorMsg()
            }
            draw()
        }
    }

    function draw(){
        let triangle= new Path2D()
        let min=0
        let max=255
        for (let i=0; i<coordinates.length;i++){
            if(i===0){
                
                console.log(`${coordinates[0][0].toFixed(0)},${coordinates[0][1].toFixed(0)}`)
                triangle.moveTo(coordinates[0][0].toFixed(0),coordinates[0][1].toFixed(0));
                
            }
            if(i===1){
                
                console.log(`${coordinates[1][0].toFixed(0)},${coordinates[1][1].toFixed(0)}`)
                triangle.lineTo(coordinates[1][0].toFixed(0),coordinates[1][1].toFixed(0));
                if(coordinates[0][0].toFixed(0)===coordinates[1][0].toFixed(0)){

                }
                
            }
            if(i===2){
                
                console.log(`${coordinates[2][0].toFixed(0)},${coordinates[2][1].toFixed(0)}`)
                if(coordinates[0][0].toFixed(0)===coordinates[1][0].toFixed(0)){
                    
                }
                
                triangle.lineTo(coordinates[2][0].toFixed(0),coordinates[2][1].toFixed(0));
                triangle.lineTo(coordinates[0][0].toFixed(0),coordinates[0][1].toFixed(0));
                
                ctx.fillStyle=`rgb(${Math.floor(Math.random() * (max - min) + min)},${Math.floor(Math.random() * (max - min) + min)},${Math.floor(Math.random() * (max - min) + min)})`
                ctx.fill(triangle)
                coordinates=[]
            }
        }
        
    }
    
    // function drawPoints(arr,num){
    //     p=new Path2D()
    //     // ctx.beginPath()
    //     // ctx.arc(Math.floor(arr[0]),Math.floor(arr[1]),4,0,Math.PI *2)
    //     // ctx.stroke()
    //     p.arc(Math.floor(arr[0]),Math.floor(arr[1]),1,0,Math.PI *2)
    //     ctx.fill(p)
    // }
    let clearBtn= document.getElementById('clearBtn')
    clearBtn.addEventListener('click', clear)
    
}
main()
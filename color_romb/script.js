
class Printer
{

    printer
    left
    top
    rombWidth
    areaWidth
    rombClass
    colors

    constructor(rombClass, areaWidth, rombWidth, colors){

        this.printer = document.getElementById("printer");
        this.rombWidth = rombWidth
        this.areaWidth = areaWidth
        this.endPoint = areaWidth - rombWidth
        this.rombClass = rombClass
        this.colors = colors
        
    }

    setLocation(){
        
        const printerStyle = window.getComputedStyle(this.printer)

        this.left = parseInt(printerStyle.marginLeft)
        this.top =  parseInt(printerStyle.marginTop)
    }  

    moveLeft(){

        if( this.left > 0 ){                       
            this.printer.style.marginLeft = ( this.left - this.rombWidth ) + "px"
        }
    }
    moveRight(){

        if( this.left < this.endPoint ){
            this.printer.style.marginLeft = ( this.left + this.rombWidth ) + "px"
        }
    }
    moveUp(){

        if( this.top > 0 ){
            this.printer.style.marginTop = ( this.top - this.rombWidth ) + "px"
        } 
    }
    moveDown(){

        if( this.top < this.endPoint ){
            this.printer.style.marginTop = ( this.top + this.rombWidth ) + "px"
        }
    }

    rombIsset(e){

        return this.rombClass.isset(e, this.left, this.top)
    }

    changeRomb(){

        this.rombClass.change(this.colors)
    }

    createRomb(){

        this.rombClass.create(this.top, this.left)
    }

}

class Romb 
{

    romb

    isset(e, left, top){

        var data = {}
        data['isset'] = false;
        const rombs = document.getElementsByClassName("romb");

        for(let romb of rombs){

            var rombStyle = window.getComputedStyle(romb)
            var rombLeft = parseInt(rombStyle.marginLeft)
            var rombTop = parseInt(rombStyle.marginTop)

            if( left == rombLeft && top == rombTop ){

                data['isset'] = true
                data['element'] = romb 
            }
        }

        this.romb = data['element']
        return  data['isset']
    }

    create(top, left){

        var wrap = document.getElementById("wrap")
        var new_romb = document.createElement("div")
        new_romb.className = "romb"
        new_romb.style.marginTop = top + "px"
        new_romb.style.marginLeft = left + "px"
        wrap.appendChild(new_romb);
    }

    change(colors){

        const currentColor = window.getComputedStyle(this.romb).backgroundColor;

        for (let index = 0; index < colors.length; index++) {

            if ( currentColor == colors[index] ){
                    
                var colorIndex = index

                colorIndex++ 

                if( colorIndex ==  colors.length ){
                    colorIndex = 0
                }   
                                        
                this.romb.style.backgroundColor = colors[colorIndex]                       
            }                 
        }               
    }
}

class RombGame {

    Printer

    constructor(Printer){

        this.Printer = Printer
    }

    move(e){

        this.Printer.setLocation()

        switch(e.key){
            case "ArrowLeft":

                this.Printer.moveLeft()
                break

            case "ArrowUp":

                this.Printer.moveUp()                  
                break

            case "ArrowDown":

                this.Printer.moveDown()
                break

            case "ArrowRight":

                this.Printer.moveRight()
                break

            case "Enter":
            
                if(this.Printer.rombIsset()){

                    this.Printer.changeRomb()

                }else{

                    this.Printer.createRomb()
                }
            
                break 
            case "Delete":

               if(rombCatch['catch']){
                    rombCatch['element'].remove()
               } 
               
               break
        }
    }
}


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
   
    rombIsset(){

        return this.rombClass.isset(this.left, this.top)
    }

    changeRomb(){

        this.rombClass.change(this.colors)
    }

    createRomb(){

        this.rombClass.create(this.top, this.left)
    }

    deleteRomb(){
        this.rombClass.delete(this.top, this.left)
    }
    
}

class Romb
{

    romb
    stateMap = {}

    setMapValue(top, left, element){

        let kay = top + "-" + left

        if( this.stateMap[kay] == undefined ){

            this.stateMap[kay] = element
        }     
    }

    printPoint(){

        var wrap = document.getElementById("wrap")
        var printer = document.getElementById("printer")
        wrap.innerHTML = '';

        for( let element in this.stateMap ){

            wrap.appendChild(this.stateMap[element]);
        }

        wrap.appendChild(printer);
    }

    isset(left, top){

        let key = top + "-" + left

        if( this.stateMap.hasOwnProperty(key)){

            this.romb = this.stateMap[key] 

            return true
            
        }else{

            return false
        }       
    }

    create(top, left){

        var new_romb = document.createElement("div")
        
        new_romb.style.marginTop = top + "px"
        new_romb.style.marginLeft = left + "px"
        new_romb.className = "romb"

        this.setMapValue(top, left, new_romb)
        this.printPoint()
    }

    change(colors){

        const currentColor = window.getComputedStyle(this.romb).backgroundColor;

        for (let index = 0; index < colors.length; index++) {

            if ( currentColor == colors[index] ){
                    
                var colorIndex = index

                if( ++colorIndex ==  colors.length ){
                    colorIndex = 0
                }   
                                        
                this.romb.style.backgroundColor = colors[colorIndex]                       
            }                 
        } 
    }

    delete(top, left){

        let key = top + "-" + left

        if( this.stateMap.hasOwnProperty(key)){

            delete this.stateMap[key] 
        }
        
        this.printPoint()
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

                if(this.Printer.rombIsset()){

                    this.Printer.deleteRomb()
                }
               
               break
        }
    }
}

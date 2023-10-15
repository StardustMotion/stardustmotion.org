import GUI from "./GUI.js";

export default class BabylonGUI extends GUI{

    constructor(gui){
        super(gui)
        this.baseGUI=undefined;
    }


    getGUI(){
        return this.baseGUI;
    }
    
    createGui(){
        super.createGui()
        this.baseGUI = this.gui.AdvancedDynamicTexture.CreateFullscreenUI("UI");
         
    }

    add (element) {
        super.add(element)
        this.baseGUI.addControl(element)
    }

    decor(element,height="40px",width="200px",color = "Orange",thickness = 4,background = "green",style){
        element.height=height
        element.width=width
        element.color=color
        element.thickness=thickness
        element.background=background
        element.style=style

    }

    decorText(text,color = "RED",fontSize =  48,fontWeight = "bold"){
        text.color=color;
        text.fontSize=fontSize;
        text.fontWeight=fontWeight;

    }

    positionElement(element,verticalAlignment = this.gui.Control.VERTICAL_ALIGNMENT_TOP,horizontalAlignment = this.gui.Control.HOIRIZONTAL_ALIGNMENT_TOP){
        element.verticalAlignment=verticalAlignment
        element.horizontalAlignment=horizontalAlignment
    }




    destroy(){
        super.destroy()
        this.baseGUI.dispose()
    }

    
    

   
}
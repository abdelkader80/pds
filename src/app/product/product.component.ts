import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


            let canvas = new fabric.Canvas('tshirt-canvas');

            function updateTshirtImage(imageURL){
                fabric.Image.fromURL(imageURL, function(img) {
                    img.scaleToHeight(300);
                    img.scaleToWidth(300);
                    canvas.centerObject(img);
                    canvas.add(img);
                    canvas.renderAll();
                });
            }
            var btn = document.getElementById("btn");
btn.addEventListener("click", function() {
  //Do something here
  canvas.add(new fabric.IText('Tap and Type', {
    left: 0,
    top:   0,
    fontFamily: 'arial black',
    fill: '#555',
    fontSize: 20,

}));
}, false);



            // Update the TShirt color according to the selected color by the user
            (document.getElementById("tshirt-color") as HTMLInputElement).addEventListener("change", function(){
                document.getElementById("tshirt-div").style.backgroundColor = this.value ;


            }, false);

            // Update the TShirt color according to the selected color by the user
            (document.getElementById("tshirt-design") as HTMLInputElement).addEventListener("change", function(){

                // Call the updateTshirtImage method providing as first argument the URL
                // of the image provided by the select
                updateTshirtImage(this.value);
            }, false);

            // When the user clicks on upload a custom picture
            document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
                var reader = new FileReader();

                reader.onload = function (event){
                    var imgObj:any = new Image();
                    imgObj.src = event.target.result;

                    // When the picture loads, create the image in Fabric.js
                    imgObj.onload = function () {
                        var img = new fabric.Image(imgObj);

                        img.scaleToHeight(300);
                        img.scaleToWidth(300);
                        canvas.centerObject(img);
                        canvas.add(img);
                        canvas.renderAll();
                    };
                };

                // If the user selected a picture, load it
                if( (<HTMLInputElement>e.target).files[0]){
                    reader.readAsDataURL((<HTMLInputElement>e.target).files[0]);
                }
            }, false);

            // When the user selects a picture that has been added and press the DEL key
            // The object will be removed !
            document.addEventListener("keydown", function(e) {
                var keyCode = e.keyCode;

                if(keyCode == 46){
                    console.log("Removing selected element on Fabric.js on DELETE key !");
                    canvas.remove(canvas.getActiveObject());
                }
            }, false);

  }


}


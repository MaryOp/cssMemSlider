let img_place = document.querySelector(".img")

class Mem {
    constructor(id, url, legend) {
        this.url = url;
        this.id = id;
        this.legend = legend;
    }

    createMem() {

        let image = new element("img", "slide_"+this.id, "", "img");
        image.create();
        let imageSlide = document.querySelector(".slide_"+this.id);

        let legend_span = new element("span", "legend-span_" + this.id, "", "legend");
        legend_span.create();
        let legendSpan = document.querySelector(".legend-span_" + this.id);

        imageSlide.src = this.url;
        legendSpan.innerText = this.legend;
    }
}


class element {
    constructor(tag, classname, value, parent) {
        this.tag = tag;
        this.classname = classname;
        this.value = value;
        this.parent = parent
    }

   create() {
   
    let r = document.createElement(this.tag);
        r.className = this.classname;
        r.value = this.value;
        if (this.parent!="document.body") {
            parent = document.querySelector("."+ this.parent);
            parent.appendChild(r);
        }
        else {
            document.body.appendChild(r);
        }
   } 
}

let wrapper = new element("div", "wrapper", "", "document.body");
wrapper.create();
let image_block = new element("div", "img", "", "wrapper");
image_block.create();

let toggle_wrapper = new element("div", "toggler-wrapper", "", "wrapper");
toggle_wrapper.create();
let toggler = new element("div", "toggler", "", "toggler-wrapper")
toggler.create();
let legend = new element("div", "legend", "", "toggler-wrapper");
legend.create();


let request = new XMLHttpRequest();
   request.open("GET", "./mems.json", false);
   request.send(null);
let mems = JSON.parse(request.responseText);

for(key in mems) {
    let order_num = (key.slice(3));

    let mem = new Mem (mems[key]["id"],mems[key]["url"],mems[key]["legend"]); 

    mem.createMem();
    let MemImg = document.querySelector(".slide_" + order_num);
    let MemLegend = document.querySelector(".legend-span_" + order_num);
    MemImg.classList.add("disabled");
    MemLegend.classList.add("disabled");

    let input_label = new element("label", "label_" + order_num, "", "toggler");
    input_label.create();
    let input = new element("input", "input_" + order_num, order_num, "label_" + order_num);
    
    input.create();
    let dom_input =  document.querySelector(".input_" + order_num);

    dom_input.type="radio";
    dom_input.name = "toggle";
}

document.querySelector(".input_1").setAttribute("checked", true);

let activeMemImg = document.querySelector(".slide_1");
let activeMemLegend = document.querySelector(".legend-span_1");
activeMemImg.classList.add("active");
activeMemImg.classList.remove("disabled");
activeMemLegend.classList.add("active");
activeMemLegend.classList.remove("disabled");


document.querySelectorAll('input').forEach((elem) => {
    elem.addEventListener("change", function(event) {

        let currentNumber = document.querySelector(".active").classList[0].slice(6);
        let currentImage = document.querySelector(".slide_" + currentNumber);
        
        for(key in mems) {
            let order_num = (key.slice(3)); 
            let image =  document.querySelector(".slide_"+order_num);
            let legend = document.querySelector(".legend-span_" + order_num);
            image.classList.remove("active");
            image.classList.add("disabled");
            legend.classList.remove("active");
            legend.classList.add("disabled");
        }
        
        let count = document.querySelector("input:checked").value;
        let activeMemImg = document.querySelector(".slide_" + count);
        let activeMemLegend = document.querySelector(".legend-span_" + count);
        activeMemImg.classList.add("active");
        activeMemImg.classList.remove("disabled");
        activeMemLegend.classList.add("active");
        activeMemLegend.classList.remove("disabled");

    })
})


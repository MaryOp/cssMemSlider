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


// console.log(mem1)

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
        let value = this.value;
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
    // let mem_lenght = order_num;
    let mem1 = new Mem (mems[key]["id"],mems[key]["url"],mems[key]["legend"]); 

    mem1.createMem();
}

console.log(mems["mem1"]["legend"]);
// imageSlide.src = "./assets/1.jpg";
// legendSpan.innerText = mems["mem1"]["legend"];
// console.log(mem_lenght)
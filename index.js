var xhr = new XMLHttpRequest();

xhr.open("GET", "data.json", true);

xhr.send();

xhr.onreadystatechange = function () {
    console.log(xhr.readyState)
    console.log(xhr.statusText);
}

const barChart = document.querySelector(".barChart");



xhr.onload = function (cData) {
    if (xhr.status === 200) {
        let cData = JSON.parse(xhr.responseText);
        console.log(cData);

        const bar_width =  ((318+10)/7) -10;
        let currentWidth = 0
        
        for (let i = 0; i < 7; i++) {
            let div = document.createElement("div");
            let par = document.createElement("p");
            let value = document.createElement("p");

            barChart.append(div);
            barChart.append(par);
            barChart.append(value);

            div.classList.add("bar");
            par.classList.add("day");
            
            value.classList.add("value");

            let bar_height = cData[i].amount * 2.5;
            let value_height = (bar_height + 35);

            value.innerText = `$${cData[i].amount}`

            par.innerText = `${cData[i].day}`;
            let p_width = par.offsetWidth;
            let inset = (bar_width - p_width) / 2;
            let totalInset = currentWidth + inset;

            div.style.height = `${bar_height}px`;
            div.style.width = `${bar_width}px`;
            div.style.left = `${currentWidth}px`;

            let value_width = value.offsetWidth;
            let value_inset = (value_width - bar_width) / 2;
            let value_total_inset = currentWidth - value_inset;

            par.style.left = `${totalInset}px`;
            value.style.left = `${value_total_inset}px`;
            value.style.bottom = `${value_height}px`;
            currentWidth += bar_width + 10;
            value.classList.add("hidden");

            if (i === 2) {
                div.style.backgroundColor = 'hsl(186, 34%, 60%)'
            }

            div.addEventListener("mouseover", () => {
                value.classList.remove("hidden");
            })

            div.addEventListener("mouseleave", () => {
                value.classList.add("hidden")
            })
        }
        

        // cData.forEach((data) => {
        //     barChart.append(div);
        //     div.innerText = "Hello World"
        // })
    }
}

const myForm = document.getElementById("handleForm");
const csvFile = document.getElementById("input");
const p = document.getElementById("p");
let a1 = document.getElementById('a1')
let a0 = document.getElementById('a0')

if (p.innerText == 'No data to show!') {
    a1.style.display = 'none'
    a0.style.display = 'none'
} else {
    a1.style.display = 'block'
    a0.style.display = 'block'
}

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    a1.style.display = 'block'
    a0.style.display = 'block'

    const input = csvFile.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        p.innerHTML = text;

        let initialArr = p.innerText.split(',')

        let newArr = [];
        for (let i of initialArr) {
            if (i.includes(' ID')) {
                newArr.push(i.split(' ID').join(',ID'))
            } else {
                newArr.push(i)
            }
        }
        let fullArr = newArr.join(',').split(',')

        let Arr2D = []
        for (let i = 0; i < fullArr.length; i++) {
            Arr2D.push(fullArr.splice(i, 4))
        }

        let brands = []
        for (let i = 0; i < fullArr.length; i++) {
            brands.push(fullArr.splice(i, 5))
        }

        let everyItem = []
        for (let i = 0; i < Arr2D.length; i++) {
            everyItem.push(Arr2D[i][2])

        }

        let everyItemSet = new Set(everyItem)
        everyItemSet = [...everyItemSet]

        let f = 0;
        let s = 0;

        let final = []
        let mostPopular = []
        for (let i = 0; i < everyItem.length; i++) {
            if (Arr2D[i][2].includes(everyItemSet[0])) {
                f += Number(Arr2D[i][3])

            } else {
                s += Number(Arr2D[i][3])
            }
        }
        final.push([everyItemSet[0] + ',' + f / everyItem.length])
        final.push([everyItemSet[1] + ',' + s / everyItem.length])

        // most popular 
        var mf = 1;
        var m = 0;
        var item;
        for (var i = 0; i < brands[0].length; i++) {
            for (var j = i; j < brands[0].length; j++) {
                if (brands[0][i] == brands[0][j])
                    m++;
                if (mf < m) {
                    mf = m;
                    item = brands[0][i];
                }
            }
            m = 0;
        }

        mostPopular.push([`${Arr2D[brands[0].indexOf(item)][2]},${item}`])

        a0.addEventListener('click', function () {
            let csv = ''
            final.forEach(function (row) {
                csv += row.join(',');
                csv += "\n";
            });

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';

            hiddenElement.download = '0_order_log00.csv';
            hiddenElement.click();
        })

        a1.addEventListener('click', function () {
            let csv = ''
            mostPopular.forEach(function (row) {
                csv += row.join(',');
                csv += "\n";
            });

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';

            hiddenElement.download = '1_order_log00.csv';
            hiddenElement.click();
        })

    };
    reader.readAsText(input);
});
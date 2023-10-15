// https://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
var tableGetCellValue = function (tr: any, idx: number) {
    return tr.children[idx].innerText || tr.children[idx].textContent;
}

var tableCompare = function (idx: number, asc: any) {
    return function (a: any, b: any) {
        return function (v1, v2) {
            return v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2);
        }(tableGetCellValue(asc ? a : b, idx), tableGetCellValue(asc ? b : a, idx));
    }
};

export function tableSort(id:string) {
    Array.prototype.slice.call(document.querySelectorAll(id+'th')).forEach(function (th) {
        th.addEventListener('click', function (this: any) {
            var table = th.parentNode
            while (table.tagName.toUpperCase() != 'TABLE') table = table.parentNode;
            Array.prototype.slice.call(table.querySelectorAll(id+'tr:nth-child(n+2)'))
                .sort(tableCompare(Array.prototype.slice.call(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(function (tr) { table.appendChild(tr) });
        })
    })
};
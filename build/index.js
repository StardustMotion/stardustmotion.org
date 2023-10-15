'use strict';
//import { module as moduleHome } from "./src/home.js";
import { module as moduleWorks } from "./src/works.js";
import { module as moduleContact } from "./src/contact.js";
import jpDict from "./i18n/ja.js";
import frDict from "./i18n/fr.js";
main();
function main() {
    window.onload = onPageLoaded;
    window.onhashchange = update;
}
function onPageLoaded() {
    var i18n = document.getElementById("i18n");
    var langDrop = i18n.children[1];
    i18n.children[0].addEventListener("mouseup", function () { return toggleDropdown(); });
    var langLinks = document.querySelectorAll("header li");
    langLinks[1].onclick = function () { return switchLanguage(1); };
    langLinks[2].onclick = function () { return switchLanguage(2); };
    translate("nav");
    update();
    ////////////////////////////////////////////////////////////////
    function toggleDropdown() {
        if (langDrop.classList.contains("show"))
            document.removeEventListener('mousedown', checkOutsideClick);
        else
            document.addEventListener('mousedown', checkOutsideClick);
        langDrop.classList.toggle("show");
    }
    var checkOutsideClick = function (e) {
        if (!i18n.contains(e.target))
            toggleDropdown();
    };
    function switchLanguage(newLang) {
        lang = newLang;
        translate("nav");
        translate(page);
        toggleDropdown();
        return false;
    }
}
function update() {
    var radical = window.location.hash.substring(1);
    if (!radical)
        updateHTML("home");
    else if (routes.indexOf(radical) != -1)
        updateHTML(radical);
    else
        updateHTML("404");
    function updateHTML(radical) {
        var url = 'src/' + radical + ".html";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var main_1 = document.querySelector("main");
                main_1.id = "menu-".concat(radical);
                main_1.innerHTML = xhttp.responseText;
                page = radical;
                switch (page) {
                    //case "home": moduleHome.run(); break;
                    case "works":
                        moduleWorks.run();
                        break;
                    case "contact":
                        moduleContact.run();
                        break;
                }
                translate(page);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}
function translate(radical) {
    document.querySelector("html").setAttribute("lang", Lang[lang].toLowerCase());
    var dict;
    switch (lang) {
        case Lang.FR:
            dict = frDict;
            break;
        case Lang.JA:
            dict = jpDict;
            break;
        default: return;
    }
    document.querySelectorAll("#menu-".concat(radical, " [data-lang]")).forEach(function (e) {
        var id = e.dataset.lang;
        if (id)
            e.innerHTML = dict[radical][id];
    });
    if (radical == "contact")
        moduleContact.runLang(); // Special case for now
}
var routes = [
    "works", "contact" // "about", "resources"
];
var Lang;
(function (Lang) {
    Lang[Lang["EN"] = 0] = "EN";
    Lang[Lang["FR"] = 1] = "FR";
    Lang[Lang["JA"] = 2] = "JA";
})(Lang || (Lang = {}));
globalThis.lang = Lang.EN;
var page = "home";

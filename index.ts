'use strict';

//import { module as moduleHome } from "./src/home.js";
import { module as moduleWorks } from "./src/works.js";
import { module as moduleContact } from "./src/contact.js";
import jpDict from "./i18n/ja.js";
import frDict from "./i18n/fr.js";
import i18nDict from "./i18n/i18nDict.js";

main();
function main() {
    window.onload = onPageLoaded;
    window.onhashchange = update;
}

function onPageLoaded() {
    let i18n = document.getElementById("i18n")!;
    let langDrop = i18n.children![1];
    i18n.children[0].addEventListener("mouseup", () => toggleDropdown());

    const langLinks = document.querySelectorAll("header li");
    (langLinks[1] as HTMLElement).onclick = () => switchLanguage(1);
    (langLinks[2] as HTMLElement).onclick = () => switchLanguage(2);
    
    translate("nav");
    update();
    
    ////////////////////////////////////////////////////////////////
    
    function toggleDropdown() {
        if (langDrop.classList.contains("show")) document.removeEventListener('mousedown', checkOutsideClick);
        else document.addEventListener('mousedown', checkOutsideClick);
        langDrop.classList.toggle("show");
    }
    const checkOutsideClick = (e: any) => { 
        if (!i18n.contains(e.target)) toggleDropdown(); 
    }    
    function switchLanguage(newLang: Lang) {
        lang = newLang;
        translate("nav");
        translate(page);
        toggleDropdown();
        return false;
    }
}

function update() {
    let radical = window.location.hash.substring(1);
    if (!radical) updateHTML("home")
    else if (routes.indexOf(radical)!=-1) updateHTML(radical)
    else updateHTML("404");

    function updateHTML(radical: string) {
        let url = 'src/' + radical + ".html";
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const main = document.querySelector("main");
                main!.id = `menu-${radical}`;
                main!.innerHTML = xhttp.responseText;
                page = radical;
                switch(page) {
                    //case "home": moduleHome.run(); break;
                    case "works": moduleWorks.run(); break;
                    case "contact": moduleContact.run(); break;
                }
                translate(page);
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}

function translate(radical: string) {
    document.querySelector("html")!.setAttribute("lang", Lang[lang].toLowerCase());
    let dict: i18nDict;
    switch(lang) {
        case Lang.FR: dict = frDict; break;
        case Lang.JA: dict = jpDict; break;
        default: return;
    }
    document.querySelectorAll(`#menu-${radical} [data-lang]`).forEach((e) => {
        const id = (e as HTMLElement).dataset.lang;
        if (id)
            (e as HTMLElement).innerHTML = dict[radical][id];
    })
    if (radical=="contact") moduleContact.runLang(); // Special case for now
}

const routes = [
    "works", "contact" // "about", "resources"
]

declare global {
    var lang: Lang;
}

enum Lang {
    EN, FR, JA
}

globalThis.lang=Lang.EN;
var page = "home";










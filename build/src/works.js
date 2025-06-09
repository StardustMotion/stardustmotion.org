var res = "/res/works/";
var id = "#menu-works ";
import { tableSort } from './utils.js';
export var module = {
    run: function () {
        var _a;
        var works = document.querySelectorAll(id + ".works tr:not(:first-child)");
        var details = (_a = document.querySelector(id + ".details")) === null || _a === void 0 ? void 0 : _a.children;
        var _loop_1 = function (i) {
            works[i].addEventListener("mouseover", function () { return mugshotUpdate(i); });
            works[i].addEventListener("mouseleave", function () { return mugshotUpdate(-1); });
            works[i].addEventListener("mousedown", function () { return unfold(i); });
        };
        for (var i = 0; i < works.length; i++) {
            _loop_1(i);
        }
        var workLinks = document.querySelectorAll(id + ".work-links a *");
        worksLinks.forEach(function (work, i) {
            var isIcon = workLinks[i].tagName == 'IMG';
            if (isIcon) {
                workLinks[i].classList.add("icon");
                workLinks[i].classList.add(WorkIcon[work.icon]);
            }
            workLinks[i].insertAdjacentHTML("beforebegin", "<span ".concat(work.lang ? 'data-lang=' + work.lang : '', " class=\"starmo-tooltip").concat(!isIcon ? " big" : "", "\">").concat(work.info, "</span>"));
        });
        var selected = -1;
        mugshotUpdate(-1);
        tableSort(id);
        /*document.querySelectorAll(id + ".details a").forEach(link =>
            { link.setAttribute('target', '_blank');
        })*/
        ////////////////////////////////////////////////////////////////
        function mugshotUpdate(i) {
            var mugshot = document.querySelector(id + ".mugshot > img");
            if (i == -1 && selected != -1)
                i = selected;
            mugshot.src = "".concat(res + 'mugshot' + (i + 1) + '.gif');
        }
        function unfold(j) {
            if (selected != -1) {
                details[selected].style.display = "none";
                works[selected].classList.toggle('selected');
            }
            if (j == selected)
                selected = -1;
            else {
                selected = j;
                details[selected].style.display = "inline";
                works[j].classList.toggle('selected');
            }
        }
    }
};
var WorkIcon;
(function (WorkIcon) {
    WorkIcon[WorkIcon["LINK"] = 0] = "LINK";
    WorkIcon[WorkIcon["VIDEO"] = 1] = "VIDEO";
    WorkIcon[WorkIcon["GIT"] = 2] = "GIT";
    WorkIcon[WorkIcon["CODE"] = 3] = "CODE";
    WorkIcon[WorkIcon["THREAD"] = 4] = "THREAD";
    WorkIcon[WorkIcon["BUILD"] = 5] = "BUILD";
    WorkIcon[WorkIcon["DOWNLOAD"] = 6] = "DOWNLOAD";
})(WorkIcon || (WorkIcon = {}));
var WorkLink = /** @class */ (function () {
    function WorkLink(icon, info, lang) {
        if (icon === void 0) { icon = WorkIcon.LINK; }
        if (info === void 0) { info = "<no info>"; }
        this.icon = icon;
        this.info = info;
        this.lang = lang;
    }
    return WorkLink;
}());
var worksLinks = [
    // XW
    new WorkLink(WorkIcon.BUILD, "Production:<br>9 months", "xoverBuild"),
    new WorkLink(undefined, "Base sprites and sound effects from external games", "xoverCredit"),
    new WorkLink(WorkIcon.CODE, "Code example", "xoverCode"),
    new WorkLink(WorkIcon.THREAD, "Forum thread", "xoverThread"),
    new WorkLink(WorkIcon.VIDEO, "Latest trailer", "xoverVideo"),
    // A bout de bras
    new WorkLink(WorkIcon.BUILD, "Production:<br>2 months", "bur00Build"),
    new WorkLink(undefined, "Textures made from various tilesets, music from external source", "bur00Credit"),
    new WorkLink(WorkIcon.VIDEO, "View", "bur00Video"),
    // Casinopolis
    new WorkLink(WorkIcon.BUILD, "Production:<br>One week", "casinopolisBuild"),
    new WorkLink(undefined, "Uses Bumper Engine.<br>Textures upscaled from the original Sonic game with an externally trained ESRGAN neural network", "casinopolisCredit"),
    new WorkLink(WorkIcon.VIDEO, "View", "casinopolisVideo"),
    // Blacksmith
    new WorkLink(WorkIcon.BUILD, "Production:<br>One week", "blacksmithBuild"),
    new WorkLink(undefined, "Graphic/sounds from external works", "blacksmithCredit"),
    new WorkLink(WorkIcon.DOWNLOAD, "Windows version", "blacksmithDownload"),
    // Seascape
    new WorkLink(WorkIcon.BUILD, "Production:<br>One month", "seascapeBuild"),
    new WorkLink(undefined, "Made with two other devs. Textures/models/audio from external works", "seascapeCredit"),
    new WorkLink(WorkIcon.GIT, "Source code", "seascapeCode"),
    new WorkLink(undefined, "Play", "seascapePlay"),
    // Voxel
    // new WorkLink(WorkIcon.BUILD, "Production:<br>A few days", "voxelBuild"),
    // new WorkLink(undefined, "opengl-tutorial.org for the guides", "voxelCredit"),
    // new WorkLink(WorkIcon.DOWNLOAD, "Source code", "voxelCode"),
    // SRB2
    new WorkLink(WorkIcon.BUILD, "Production:<br>A few day/weeks, per map", "srb2Build"),
    new WorkLink(undefined, "-", undefined),
    new WorkLink(WorkIcon.VIDEO, "'Dangerous Volcano Zone'", "srb2Volcano"),
    new WorkLink(WorkIcon.VIDEO, "'Lost Feelings Island'", "srb2Island"),
    new WorkLink(WorkIcon.VIDEO, "'Golden Palace Zone'", "srb2Palace")
];

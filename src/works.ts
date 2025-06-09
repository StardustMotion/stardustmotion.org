const res = "/res/works/";
const id = "#menu-works ";
import { tableSort } from './utils.js'

export var module = {
    run: function () {
        const works: NodeList = document.querySelectorAll(id + ".works tr:not(:first-child)");
        const details: HTMLCollection|undefined = document.querySelector(id + ".details")?.children;
        for (let i = 0; i < works.length; i++) {
            works[i].addEventListener("mouseover", () => mugshotUpdate(i));
            works[i].addEventListener("mouseleave", () => mugshotUpdate(-1));
            works[i].addEventListener("mousedown", () => unfold(i));
        }
        let workLinks = document.querySelectorAll(id + ".work-links a *");
        worksLinks.forEach((work, i) => {
            const isIcon = workLinks[i].tagName=='IMG';
            if (isIcon) {
                workLinks[i].classList.add("icon");
                workLinks[i].classList.add(WorkIcon[work.icon]);
            }
            workLinks[i].insertAdjacentHTML("beforebegin", 
                `<span ${work.lang ? 'data-lang=' + work.lang : ''
                } class="starmo-tooltip${!isIcon ? " big" : ""}">${work.info}</span>`);
        });
        let selected = -1;
        mugshotUpdate(-1);
        tableSort(id);
        
        /*document.querySelectorAll(id + ".details a").forEach(link =>
            { link.setAttribute('target', '_blank'); 
        })*/
        
        ////////////////////////////////////////////////////////////////

        function mugshotUpdate(i: number): void {
            let mugshot = document.querySelector(id + ".mugshot > img") as HTMLImageElement;
            if (i == -1 && selected != -1)
                i = selected;
            mugshot.src = `${res + 'mugshot' + (i + 1) + '.gif'}`;
        }

        function unfold(j: number): void {
            if (selected != -1) {
                (details![selected] as HTMLElement).style.display = "none";
                (works[selected] as HTMLElement).classList.toggle('selected');
            }
            if (j == selected)
                selected = -1;
            else {
                selected = j;
                (details![selected] as HTMLElement).style.display = "inline";
                (works[j] as HTMLElement).classList.toggle('selected');
            }
        }
    }
}

enum WorkIcon {
    LINK, VIDEO, GIT, CODE, THREAD, BUILD, DOWNLOAD
}

class WorkLink {
    icon; info; lang;
    constructor(icon: WorkIcon = WorkIcon.LINK, info: string = "<no info>", lang: string | undefined) {
        this.icon = icon;
        this.info = info;
        this.lang = lang;
    }
}

const worksLinks: WorkLink[] = [
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

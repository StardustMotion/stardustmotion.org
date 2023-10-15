var id = "#menu-contact ";
import jpDict from "../i18n/ja.js";
import frDict from "../i18n/fr.js";
export var module = {
    run: function () {
        var _a;
        email = document.getElementById("contactEmail");
        message = document.getElementById("contactMessage");
        window.turnstile.render('#contactTurnstile');
        var formButton = document.querySelector(".formButton");
        formButton.addEventListener("mousedown", function () {
            document.querySelector("form").classList.toggle("show");
            document.getElementById("intro").classList.toggle("show");
            formButton.classList.toggle("selected");
        });
        var fileUpload = (_a = document.getElementById("contactFile")) === null || _a === void 0 ? void 0 : _a.children;
        var __upload = fileUpload[1];
        __upload.addEventListener("change", fileInputUpdate, false);
        var uploadIcon = fileUpload[2].children[0].classList;
        fileUpload[2].addEventListener("mousedown", function () {
            if (uploadIcon.contains("withdraw")) {
                fileUpload[2].children[1].innerHTML = "";
                uploadIcon.toggle("withdraw");
                __upload.value = '';
                __upload.setCustomValidity("");
            }
            else
                __upload.click();
            return false;
        });
        this.runLang();
        ////////////////////////////////////////////////////////////////
        function fileInputUpdate() {
            var files = __upload.files;
            if (files) {
                fileUpload[2].children[1].innerHTML = files[0].name;
                uploadIcon.toggle("withdraw");
                if (files[0].size > 10000000) {
                    __upload.setCustomValidity(dicts[lang].uploadFileMax);
                    __upload.reportValidity();
                    __upload.checkValidity();
                }
                else
                    __upload.setCustomValidity("");
            }
        }
    },
    runLang: function () {
        email.removeEventListener("input", this.emailValidity);
        email.addEventListener("input", this.emailValidity);
        this.emailValidity();
        message.removeEventListener("input", this.messageValidity);
        message.addEventListener("input", this.messageValidity);
        this.messageValidity();
        message.placeholder = dicts[lang].messageLength;
    },
    emailValidity: function () {
        var res;
        if (email.validity.typeMismatch)
            res = dicts[lang].emailFormat;
        else if (email.validity.valueMissing)
            res = dicts[lang].emailUndefined;
        else
            res = "";
        email.setCustomValidity(res);
    },
    messageValidity: function () {
        var res;
        // if (message.validity.tooLong) res = dicts[lang].messageLength;
        if (message.validity.valueMissing)
            res = dicts[lang].messageUndefined;
        else
            res = "";
        message.setCustomValidity(res);
    }
};
// !
var dicts = [{
        emailFormat: "Invalid email",
        emailUndefined: "Email is required to receive an answer",
        messageLength: "max. 3000 characters",
        messageUndefined: "Required",
        uploadFileMax: "The file exceeds 10MB",
    },
    frDict.contact,
    jpDict.contact
];
var email;
var message;

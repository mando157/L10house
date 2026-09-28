// * AJAX to Get Data
async function getData(dataName) {

    const response = await $.ajax({
        type: "GET",
        url: `https://semicode.tech/api/v1/l10nhouse/${dataName}`
    });

    return response;
}

// * Get Date of services section

let serviceData = null,
    index = 0;

async function servicesDate() {
    serviceData = await getData("services");

    serviceData.forEach(service => {
        $("#Services .content").append(serviceComponent(service, index));
        index++;
    });

}

// * Edit Description
function editDescription(description) {
    let regex = /L10N House/gmi;

    return description.replace(regex, `<span class="fw-medium"><span class="mainColor">L10N</span> <span class="secondaryColor">House</span></span>`);
}

// * Service Component
function serviceComponent(service, index) {
    return `
        <div class="box col-lg-6">
            <div class="item wow ${(index % 2 == 0) ? "animate__backInLeft" : "animate__backInRight"}">
                <div class="image">
                    <img src="./images/${service.icon}" class="img-fluid" alt="service">
                </div>
                <h3 class="my-3">${service.title}</h3>
                <p>${editDescription(service.description.slice(0, 150))}... <button onclick="showService(${index})">Read More</button>
                </p>
            </div>
        </div>
    `
}

function showService(serviceIndex) {
    let service = serviceData[serviceIndex];
    $(".popup-element.service").html(serviceContentComponent(service, serviceIndex));

    openPopup('service');
}

function serviceContentComponent(service, serviceIndex) {
    return `
        <div class="popup-title">
                <h4>service</h4>
                <i class="fa-solid fa-xmark" onclick="closePopup('service')"></i>
        </div>
        <div class="popup-content">
            <h3>${service.title}</h3>
            <div class="row mb-5">
                <div class="part-1 col-lg-6">
                    <p>
                        ${editDescription(service.description)}
                    </p>
                </div>
                <div class="part-2 col-lg-6">
                    <div class="image">
                        <img src="./images/${service.img}" class="img-fluid" alt="service">
                    </div>
                </div>
            </div>

            ${createSections(serviceIndex)}

        </div>
    `
}

function createSections(serviceIndex) {
    let sections = serviceData[serviceIndex].sections,
        item = "";

    sections.forEach(function (section) {
        item += `
            <div class="section">
                <h5 class="mb-3">${section.title}</h5>
                <ol>
                    ${createSectionLi(section)}
                </ol>
            </div>
        `
    })
    return item;
}

function createSectionLi(section) {
    let li = "";

    section.points.forEach(function (point) {
        li += `<li>${point}</li>`
    });

    return li;
}

// * Get Date of Languages section
async function languagesDate() {
    let languageData = await getData("languages");

    languageData.forEach(language => {
        $(".languages").append(languagesPopupComponent(language));
    });

}

function languagesPopupComponent(language) {
    return `    
        <div class="section">
            <h4>${language.continent}</h4>
            <ul class="list-unstyled">
                ${createLanguageLiElement(language)}
            </ul>
        </div>
        `
}

function createLanguageLiElement(language) {
    let liEle = "";

    language.languages.forEach(function (li) {
        liEle += `
            <li><i class="fa-regular fa-circle-dot"></i> <p>${li}</p></li>
            `;
    });

    return liEle;
}

// * Get Date of sectors section
async function sectorsDate() {
    let sectorData = await getData("sectors");

    sectorData.forEach(function (sector) {
        $(".popup[data-popup-name='sectors'] .content .row").append(sectorsPopupComponent(sector));
    });
}

function sectorsPopupComponent(sector) {
    return `
        <div class="box col-lg-3">
            <div class="item">
                <img src="./images/sec/${sector.icon}" class="img-fluid" alt="sector">
                <p>${sector.name}</p>
            </div>
        </div>
    `
}

function openPopup(popupName) {
    $("body").css("overflow-y" , "hidden");

    if (popupName == "languages") {
        $(`.popup[data-popup-name='languages'] `).fadeIn(500);
        $(".popup[data-popup-name='languages'] .languages").delay(1000).addClass("appear");

    } else {
        $(`.popup[data-popup-name='${popupName}'] `).fadeIn(500);
    }
}

function closePopup(popupName) {
    $("body").css("overflow-y" , "");
    
    if (popupName == "languages") {
        $(`.popup[data-popup-name='languages'] `).delay(500).fadeOut(500);
        $(".popup[data-popup-name='languages'] .languages").removeClass("appear");

    } else {
        $(`.popup[data-popup-name='${popupName}'] `).fadeOut(500);
    }
}

// * AJAX to Get Data
async function getData(dataName) {

    if (dataName == "services") {
        const response = await $.ajax({
            type: "GET",
            url: "https://semicode.tech/api/v1/l10nhouse/services"
        });

        return response;
    }
    else if (dataName == "sectors") {
        const response = await $.ajax({
            type: "GET",
            url: "https://semicode.tech/api/v1/l10nhouse/sectors"
        });

        return response;
    }
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
            <div class="item">
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
                    ${createLi(section)}
                </ol>
            </div>
        `
    })
    return item;
}

function createLi(section) {
    let li = "";

    section.points.forEach(function (point) {
        li += `<li>${point}</li>`
    });

    return li;
}

// * Get Date of sectors section
async function sectorsDate() {
    let sectorData = await getData("sectors");

}

function openPopup(popupName) {
    $(`.popup[data-popup-name='${popupName}'] `).fadeIn(500);
}

function closePopup(popupName) {
    $(`.popup[data-popup-name='${popupName}'] `).fadeOut(500);
}
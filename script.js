document.documentElement.classList.add("js");

// K.P Fashion Part 3 JavaScript

var products = [];

function setCurrentYear() {
    var yearElements = document.querySelectorAll(".current-year");
    for (var i = 0; i < yearElements.length; i++) {
        yearElements[i].textContent = new Date().getFullYear();
    }
}

function setGreeting() {
    var greeting = document.getElementById("greeting");
    if (!greeting) return;

    var hour = new Date().getHours();
    var message = "Welcome to K.P Fashion.";

    if (hour < 12) {
        message = "Good morning and welcome to K.P Fashion.";
    } else if (hour < 18) {
        message = "Good afternoon and welcome to K.P Fashion.";
    } else {
        message = "Good evening and welcome to K.P Fashion.";
    }

    greeting.textContent = message;
}

function setUpRevealAnimation() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
        items.forEach(function (item) {
            item.classList.add("visible");
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(function (item) {
        observer.observe(item);
    });
}

function setUpTabs() {
    var buttons = document.querySelectorAll(".tab-button");
    if (!buttons.length) return;

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var panelId = button.getAttribute("data-tab");
            var panels = document.querySelectorAll(".tab-panel");

            buttons.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });

            panels.forEach(function (panel) {
                panel.classList.remove("active");
                panel.hidden = true;
            });

            button.classList.add("active");
            button.setAttribute("aria-selected", "true");

            var selectedPanel = document.getElementById(panelId);
            if (selectedPanel) {
                selectedPanel.hidden = false;
                selectedPanel.classList.add("active");
            }
        });
    });
}

function openLightbox(imageSource, caption) {
    var dialog = document.getElementById("lightbox");
    var image = document.getElementById("lightbox-image");
    var text = document.getElementById("lightbox-caption");

    if (!dialog || !image || !text) return;

    image.src = imageSource;
    image.alt = caption;
    text.textContent = caption;

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        dialog.setAttribute("open", "open");
    }
}

function setUpLightbox() {
    var dialog = document.getElementById("lightbox");
    var closeButton = document.getElementById("lightbox-close");
    var galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            openLightbox(item.getAttribute("data-image"), item.getAttribute("data-caption"));
        });
    });

    if (closeButton && dialog) {
        closeButton.addEventListener("click", function () {
            dialog.close();
        });
    }

    if (dialog) {
        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    }
}

function productCard(product) {
    var sizes = product.sizes.join(", ");
    var query = new URLSearchParams({ product: product.name }).toString();

    return `
        <article class="product-card">
            <button class="product-image-button" type="button" data-image="${product.image}" data-caption="${product.name}">
                <img src="${product.image}" alt="${product.name} from K.P Fashion" loading="lazy">
            </button>
            <p class="product-category">${product.category}</p>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price:</strong> R${product.price}</p>
            <p><strong>Availability:</strong> ${product.availability}</p>
            <p><strong>Sizes:</strong> ${sizes}</p>
            <a class="primary-button inline-button" href="enquiries.html?${query}">Enquire</a>
        </article>`;
}

function showProducts() {
    var grid = document.getElementById("dynamic-product-grid");
    if (!grid) return;

    var search = document.getElementById("product-search");
    var category = document.getElementById("category-filter");
    var sort = document.getElementById("product-sort");
    var count = document.getElementById("product-count");

    var searchText = search ? search.value.toLowerCase().trim() : "";
    var categoryValue = category ? category.value : "all";
    var sortValue = sort ? sort.value : "name-asc";

    var matches = products.filter(function (product) {
        var textMatch = product.name.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);
        var categoryMatch = categoryValue === "all" || product.category === categoryValue;
        return textMatch && categoryMatch;
    });

    matches.sort(function (a, b) {
        if (sortValue === "price-low") return a.price - b.price;
        if (sortValue === "price-high") return b.price - a.price;
        return a.name.localeCompare(b.name);
    });

    if (!matches.length) {
        grid.innerHTML = '<p class="no-results">No products match your search.</p>';
    } else {
        grid.innerHTML = matches.map(productCard).join("");
    }

    if (count) {
        count.textContent = "Showing " + matches.length + " of " + products.length + " products";
    }

    var productImages = grid.querySelectorAll(".product-image-button");
    productImages.forEach(function (button) {
        button.addEventListener("click", function () {
            openLightbox(button.getAttribute("data-image"), button.getAttribute("data-caption"));
        });
    });
}

async function loadProducts() {
    var grid = document.getElementById("dynamic-product-grid");
    var enquirySelect = document.getElementById("enquiry-product");

    if (!grid && !enquirySelect) return;

    try {
        var response = await fetch("data/products.json");
        if (!response.ok) throw new Error("Could not load product data.");
        products = await response.json();

        if (grid) {
            showProducts();
            ["product-search", "category-filter", "product-sort"].forEach(function (id) {
                var control = document.getElementById(id);
                if (control) {
                    control.addEventListener(id === "product-search" ? "input" : "change", showProducts);
                }
            });
        }

        if (enquirySelect) {
            products.forEach(function (product) {
                var option = document.createElement("option");
                option.value = product.name;
                option.textContent = product.name + " - R" + product.price;
                enquirySelect.appendChild(option);
            });

            var params = new URLSearchParams(window.location.search);
            var selectedProduct = params.get("product");
            if (selectedProduct) {
                enquirySelect.value = selectedProduct;
            }
        }
    } catch (error) {
        if (grid) {
            grid.innerHTML = '<p class="load-error">The product list could not be loaded. Please run the site using Live Server or GitHub Pages.</p>';
        }
    }
}

function setUpAccordion() {
    var buttons = document.querySelectorAll(".accordion-button");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var panel = button.nextElementSibling;
            var expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            panel.hidden = expanded;
        });
    });
}

function getErrorElement(field) {
    return document.getElementById(field.id + "-error");
}

function showFieldError(field, message) {
    var error = getErrorElement(field);
    field.classList.add("invalid-field");
    field.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
}

function clearFieldError(field) {
    var error = getErrorElement(field);
    field.classList.remove("invalid-field");
    field.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
}

function validateField(field) {
    clearFieldError(field);

    if (field.type === "checkbox") {
        if (field.required && !field.checked) {
            showFieldError(field, "Please confirm this option before continuing.");
            return false;
        }
        return true;
    }

    if (!field.checkValidity()) {
        var message = "Please check this field.";
        if (field.validity.valueMissing) message = "This field is required.";
        else if (field.validity.typeMismatch) message = "Please enter a valid value.";
        else if (field.validity.tooShort) message = "Please enter at least " + field.minLength + " characters.";
        else if (field.validity.patternMismatch) message = field.title || "Please use the correct format.";
        showFieldError(field, message);
        return false;
    }

    return true;
}

function validateForm(form) {
    var fields = form.querySelectorAll("input:not([type='hidden']):not(.honeypot), select, textarea");
    var valid = true;

    fields.forEach(function (field) {
        if (!validateField(field)) valid = false;
    });

    return valid;
}

function setUpLiveValidation(form) {
    if (!form) return;
    var fields = form.querySelectorAll("input:not([type='hidden']):not(.honeypot), select, textarea");
    fields.forEach(function (field) {
        field.addEventListener("blur", function () {
            validateField(field);
        });
        field.addEventListener("input", function () {
            if (field.classList.contains("invalid-field")) validateField(field);
        });
        field.addEventListener("change", function () {
            if (field.classList.contains("invalid-field")) validateField(field);
        });
    });
}

async function handleEnquiry(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var responseBox = document.getElementById("enquiry-response");

    if (!validateForm(form)) {
        var firstInvalid = form.querySelector(".invalid-field");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    var selectedName = document.getElementById("enquiry-product").value;
    var selectedProduct = products.find(function (product) {
        return product.name === selectedName;
    });

    var localMessage = "Thank you, " + document.getElementById("enquiry-name").value + ". ";
    if (selectedProduct) {
        localMessage += selectedProduct.name + " is currently listed at R" + selectedProduct.price + " and its availability is: " + selectedProduct.availability + ". ";
    } else {
        localMessage += "Your general enquiry has been checked. ";
    }
    localMessage += "K.P Fashion will reply using the contact details you provided.";

    var formData = new FormData(form);
    var payload = {};
    formData.forEach(function (value, key) {
        if (key !== "_honey") payload[key] = value;
    });

    var submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
        var response = await fetch(form.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Submission service unavailable.");
        responseBox.innerHTML = "<h3>Enquiry Submitted</h3><p>" + localMessage + "</p>";
        form.reset();
    } catch (error) {
        responseBox.innerHTML = "<h3>Enquiry Checked</h3><p>" + localMessage + "</p><p><strong>Note:</strong> The online email service could not be reached during this test. Your form validation and product response are working.</p>";
    } finally {
        responseBox.classList.remove("is-hidden");
        submitButton.disabled = false;
        submitButton.textContent = "Submit Enquiry";
    }
}

function handleContact(event) {
    event.preventDefault();
    var form = event.currentTarget;

    if (!validateForm(form)) {
        var firstInvalid = form.querySelector(".invalid-field");
        if (firstInvalid) firstInvalid.focus();
        return;
    }

    var name = document.getElementById("contact-name").value.trim();
    var email = document.getElementById("contact-email").value.trim();
    var phone = document.getElementById("contact-phone").value.trim();
    var type = document.getElementById("contact-type").value;
    var message = document.getElementById("contact-message").value.trim();

    var subject = "K.P Fashion - " + type + " from " + name;
    var body = "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Contact number: " + phone + "\n" +
        "Message type: " + type + "\n\n" +
        "Message:\n" + message;

    var mailto = "mailto:Kamran7@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    document.getElementById("preview-to").textContent = "Kamran7@gmail.com";
    document.getElementById("preview-subject").textContent = subject;
    document.getElementById("preview-body").textContent = body;
    document.getElementById("send-email-link").href = mailto;
    document.getElementById("email-preview").classList.remove("is-hidden");
}

function setUpMap() {
    var mapElement = document.getElementById("map");
    if (!mapElement || typeof L === "undefined") return;

    var braamfontein = [-26.1929, 28.0305];
    var map = L.map("map").setView(braamfontein, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    L.marker(braamfontein).addTo(map)
        .bindPopup("K.P Fashion - Braamfontein area")
        .openPopup();
}

function setUpForms() {
    var enquiryForm = document.getElementById("enquiry-form");
    var contactForm = document.getElementById("contact-form");

    if (enquiryForm) {
        setUpLiveValidation(enquiryForm);
        enquiryForm.addEventListener("submit", handleEnquiry);
    }

    if (contactForm) {
        setUpLiveValidation(contactForm);
        contactForm.addEventListener("submit", handleContact);
    }
}

setCurrentYear();
setGreeting();
setUpRevealAnimation();
setUpTabs();
setUpLightbox();
loadProducts();
setUpAccordion();
setUpForms();

window.addEventListener("load", setUpMap);

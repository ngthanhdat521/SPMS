const query = (tag) => {
    let array = document.querySelectorAll(tag);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let boxShadow = window
            .getComputedStyle(element, null)
            .getPropertyValue("box-shadow");
        if (boxShadow !== "none") {
            // element.style.boxShadow = "0 0 5px 0 rgba(0, 0, 0, 0.3)";
            element.style.border = "1px solid rgba(255, 255, 255, 0.1)";
            element.style.background = "#212121";
        }
    }
};

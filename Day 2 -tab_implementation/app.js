const tabs = document.querySelectorAll(".tabs li");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        tabs.forEach(tab => tab.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        // Add active class to the clicked tab and corresponding content
        tab.classList.add("active");
        contents[index].classList.add("active");
    });
});

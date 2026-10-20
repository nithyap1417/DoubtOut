
document.addEventListener("DOMContentLoaded", async () => {
    const sidebarContainer = document.getElementById("student-sidebar");

    if (!sidebarContainer) {
        console.error("Sidebar container #student-sidebar not found");
        return;
    }

    try {
        const response = await fetch("components/student_sidebar.html");

        if (!response.ok) {
            throw new Error(`Failed to load sidebar: ${response.status}`);
        }

        sidebarContainer.innerHTML = await response.text();

        const currentPage = window.location.pathname.split("/").pop();

        document.querySelectorAll("#student-sidebar [data-page]").forEach(link => {
            link.classList.remove("active");

            if (link.dataset.page === currentPage) {
                link.classList.add("active");
            }
        });

        const logoutLink = document.getElementById("student-logout");

        if (logoutLink) {
            logoutLink.addEventListener("click", () => {
                localStorage.removeItem("doubtoutUser");
            });
        }
    } catch (error) {
        console.error("Could not load student sidebar:", error);
        sidebarContainer.textContent = "Navigation failed to load. Please refresh.";
    }
});

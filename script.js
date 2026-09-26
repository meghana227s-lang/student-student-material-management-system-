// ========================================
// STUDYMATE
// STUDENT STUDY MANAGEMENT SYSTEM
// ========================================


// ========================================
// 1. LOAD DATA
// ========================================

let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

let materials =
    JSON.parse(localStorage.getItem("materials")) || [];


// ========================================
// 2. SAMPLE DATA
// ========================================

// Only create sample subjects if there is no data.

if (subjects.length === 0) {

    subjects = [

        {
            id: 1,

            name: "Web Programming",

            icon: "💻",

            topics: [

                {
                    name: "HTML Basics",
                    completed: true
                },

                {
                    name: "CSS",
                    completed: true
                },

                {
                    name: "JavaScript",
                    completed: false
                },

                {
                    name: "DOM Manipulation",
                    completed: false
                }

            ]
        },


        {
            id: 2,

            name: "Software Engineering",

            icon: "📘",

            topics: [

                {
                    name: "Software Process",
                    completed: true
                },

                {
                    name: "Requirements",
                    completed: false
                },

                {
                    name: "Software Design",
                    completed: false
                }

            ]
        },


        {
            id: 3,

            name: "Cryptography",

            icon: "🔐",

            topics: [

                {
                    name: "Introduction",
                    completed: true
                },

                {
                    name: "Encryption",
                    completed: false
                }

            ]
        }

    ];

}


// ========================================
// 3. SAVE DATA
// ========================================

function saveData() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    localStorage.setItem(
        "materials",
        JSON.stringify(materials)
    );

}


// ========================================
// 4. SUBJECT PROGRESS
// ========================================

function getSubjectProgress(subject) {

    if (
        !subject.topics ||
        subject.topics.length === 0
    ) {

        return 0;

    }


    let completed = 0;


    for (let topic of subject.topics) {

        if (topic.completed === true) {

            completed++;

        }

    }


    return Math.round(
        (completed / subject.topics.length) * 100
    );

}


// ========================================
// 5. OVERALL PROGRESS
// ========================================

function getOverallProgress() {

    let totalTopics = 0;

    let completedTopics = 0;


    for (let subject of subjects) {

        if (!subject.topics) {

            continue;

        }


        totalTopics += subject.topics.length;


        for (let topic of subject.topics) {

            if (topic.completed === true) {

                completedTopics++;

            }

        }

    }


    if (totalTopics === 0) {

        return 0;

    }


    return Math.round(
        (completedTopics / totalTopics) * 100
    );

}


// ========================================
// 6. UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    let overallProgress =
        getOverallProgress();


    let completedTopics = 0;


    for (let subject of subjects) {

        if (!subject.topics) {

            continue;

        }


        for (let topic of subject.topics) {

            if (topic.completed === true) {

                completedTopics++;

            }

        }

    }


    document.getElementById(
        "totalSubjects"
    ).textContent = subjects.length;


    document.getElementById(
        "totalMaterials"
    ).textContent = materials.length;


    document.getElementById(
        "overallProgress"
    ).textContent =
        overallProgress + "%";


    document.getElementById(
        "completedTopics"
    ).textContent =
        completedTopics;


    document.getElementById(
        "progressText"
    ).textContent =
        overallProgress + "%";


    document.getElementById(
        "overallProgressBar"
    ).style.width =
        overallProgress + "%";


    document.getElementById(
        "progressPageBar"
    ).style.width =
        overallProgress + "%";


    document.getElementById(
        "circleProgress"
    ).textContent =
        overallProgress + "%";


    let circle =
        document.querySelector(
            ".progress-circle"
        );


    if (circle) {

        circle.style.background =
            "conic-gradient(#6c4cff " +
            (overallProgress * 3.6) +
            "deg, #eeeeF7 0deg)";

    }

}


// ========================================
// 7. CREATE SUBJECT CARD
// ========================================

function createSubjectCard(subject) {

    let progress =
        getSubjectProgress(subject);


    let subjectMaterials =
        materials.filter(function(material) {

            return (
                Number(material.subjectId) ===
                Number(subject.id)
            );

        });


    return `

        <div class="subject-card">


            <div class="subject-top">

                <div class="subject-icon">
                    ${subject.icon}
                </div>


                <button
                    class="delete-btn"
                    onclick="deleteSubject(${subject.id})"
                >
                    ×
                </button>

            </div>


            <h3>
                ${subject.name}
            </h3>


            <p class="subject-info">

                ${subject.topics.length}
                topics

                •

                ${subjectMaterials.length}
                materials

            </p>


            <div class="subject-progress">

                <span>
                    Progress
                </span>

                <span>
                    ${progress}%
                </span>

            </div>


            <div class="progress-bar">

                <div
                    style="width:${progress}%"
                ></div>

            </div>


            <div class="resource-links">


                <div
                    class="resource-link"
                    onclick="showSubjectMaterials(${subject.id})"
                    style="cursor:pointer"
                >
                    📂
                    ${subjectMaterials.length}
                    Materials
                </div>


                <div
                    class="resource-link"
                    onclick="filterSubjectMaterials(${subject.id}, 'Textbook')"
                    style="cursor:pointer"
                >
                    📖 Textbook
                </div>


                <div
                    class="resource-link"
                    onclick="filterSubjectMaterials(${subject.id}, 'Solution')"
                    style="cursor:pointer"
                >
                    📝 Solutions
                </div>


                <div
                    class="resource-link"
                    onclick="openTopicModal(${subject.id})"
                    style="cursor:pointer"
                >
                    ➕ Add Topic
                </div>

            </div>


            <button
                class="open-btn"
                onclick="openSubjectDetails(${subject.id})"
            >
                Open Subject →
            </button>


        </div>

    `;

}


// ========================================
// 8. DISPLAY SUBJECTS
// ========================================

function renderSubjects() {

    let dashboard =
        document.getElementById(
            "dashboardSubjects"
        );


    let allSubjects =
        document.getElementById(
            "allSubjects"
        );


    if (subjects.length === 0) {

        let message = `

            <div class="empty-state">

                <div class="empty-icon">
                    📚
                </div>

                <h3>
                    No subjects yet
                </h3>

                <p>
                    Add your first subject
                    to start studying.
                </p>

            </div>

        `;


        dashboard.innerHTML =
            message;

        allSubjects.innerHTML =
            message;

        return;

    }


    let cards = "";


    for (let subject of subjects) {

        cards +=
            createSubjectCard(subject);

    }


    dashboard.innerHTML =
        cards;


    allSubjects.innerHTML =
        cards;

}


// ========================================
// 9. ADD SUBJECT
// ========================================

let subjectForm =
    document.getElementById(
        "subjectForm"
    );


if (subjectForm) {

    subjectForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let name =
                document.getElementById(
                    "subjectName"
                ).value.trim();


            let icon =
                document.getElementById(
                    "subjectIcon"
                ).value;


            if (name === "") {

                alert(
                    "Please enter a subject name."
                );

                return;

            }


            let newSubject = {

                id: Date.now(),

                name: name,

                icon: icon,

                topics: []

            };


            subjects.push(
                newSubject
            );


            saveData();

            renderAll();

            closeSubjectModal();


            subjectForm.reset();

        }
    );

}


// ========================================
// 10. DELETE SUBJECT
// ========================================

function deleteSubject(id) {

    let answer =
        confirm(
            "Are you sure you want to delete this subject?"
        );


    if (!answer) {

        return;

    }


    subjects =
        subjects.filter(
            function(subject) {

                return (
                    subject.id !== id
                );

            }
        );


    materials =
        materials.filter(
            function(material) {

                return (
                    Number(material.subjectId) !==
                    Number(id)
                );

            }
        );


    saveData();

    renderAll();

}


// ========================================
// 11. SUBJECT MODAL
// ========================================

function openSubjectModal() {

    document
        .getElementById(
            "subjectModal"
        )
        .classList.add("show");

}


function closeSubjectModal() {

    document
        .getElementById(
            "subjectModal"
        )
        .classList.remove("show");

}


// ========================================
// 12. TOPIC MODAL
// ========================================

function openTopicModal(subjectId) {

    document.getElementById(
        "topicSubjectId"
    ).value = subjectId;


    document
        .getElementById(
            "topicModal"
        )
        .classList.add("show");

}


function closeTopicModal() {

    document
        .getElementById(
            "topicModal"
        )
        .classList.remove("show");

}


// ========================================
// 13. ADD TOPIC
// ========================================

let topicForm =
    document.getElementById(
        "topicForm"
    );


if (topicForm) {

    topicForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let subjectId =
                Number(
                    document.getElementById(
                        "topicSubjectId"
                    ).value
                );


            let topicName =
                document.getElementById(
                    "topicName"
                ).value.trim();


            if (topicName === "") {

                alert(
                    "Please enter a topic."
                );

                return;

            }


            let subject =
                subjects.find(
                    function(subject) {

                        return (
                            subject.id ===
                            subjectId
                        );

                    }
                );


            if (!subject) {

                alert(
                    "Subject not found."
                );

                return;

            }


            subject.topics.push({

                name: topicName,

                completed: false

            });


            saveData();

            renderAll();

            closeTopicModal();

            topicForm.reset();

        }
    );

}


// ========================================
// 14. COMPLETE / UNCOMPLETE TOPIC
// ========================================

function toggleTopic(
    subjectId,
    topicIndex
) {

    let subject =
        subjects.find(
            function(subject) {

                return (
                    subject.id ===
                    subjectId
                );

            }
        );


    if (!subject) {

        return;

    }


    if (!subject.topics[topicIndex]) {

        return;

    }


    subject.topics[
        topicIndex
    ].completed =
        !subject.topics[
            topicIndex
        ].completed;


    saveData();

    renderAll();

    showSubjectDetails(
        subjectId
    );

}


// ========================================
// 15. OPEN SUBJECT
// ========================================

function openSubjectDetails(id) {

    showSubjectDetails(id);

}


function showSubjectDetails(id) {

    let subject =
        subjects.find(
            function(subject) {

                return (
                    subject.id === id
                );

            }
        );


    if (!subject) {

        return;

    }


    let topicHTML = "";


    if (
        !subject.topics ||
        subject.topics.length === 0
    ) {

        topicHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📝
                </div>

                <h3>
                    No topics added
                </h3>

                <p>
                    Add topics to track
                    your progress.
                </p>

            </div>

        `;

    }

    else {

        for (
            let i = 0;
            i < subject.topics.length;
            i++
        ) {

            let topic =
                subject.topics[i];


            topicHTML += `

                <div class="material-item">


                    <div class="material-info">

                        <div class="file-icon">

                            ${
                                topic.completed
                                    ? "✅"
                                    : "⭕"
                            }

                        </div>


                        <div>

                            <strong>
                                ${topic.name}
                            </strong>

                            <small>

                                ${
                                    topic.completed
                                        ? "Completed"
                                        : "Not completed"
                                }

                            </small>

                        </div>

                    </div>


                    <button
                        class="open-btn"
                        style="width:auto;margin:0"
                        onclick="toggleTopic(${subject.id}, ${i})"
                    >

                        ${
                            topic.completed
                                ? "Undo"
                                : "Complete"
                        }

                    </button>

                </div>

            `;

        }

    }


    document.getElementById(
        "materialsList"
    ).innerHTML = `

        <div class="card-heading">

            <div>

                <h2>

                    ${subject.icon}
                    ${subject.name}

                </h2>

                <p>

                    ${
                        getSubjectProgress(
                            subject
                        )
                    }%
                    completed

                </p>

            </div>


            <button
                class="primary-btn"
                onclick="openTopicModal(${subject.id})"
            >
                + Add Topic
            </button>

        </div>


        ${topicHTML}

    `;


    document.getElementById(
        "resourceListTitle"
    ).textContent =
        "Topics and progress for " +
        subject.name;


    showSection(
        "materials"
    );

}


// ========================================
// 16. ADD MATERIAL
// ========================================

let materialForm =
    document.getElementById(
        "materialForm"
    );


if (materialForm) {

    materialForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let subjectId =
                Number(
                    document.getElementById(
                        "materialSubject"
                    ).value
                );


            let name =
                document.getElementById(
                    "materialName"
                ).value.trim();


            let type =
                document.getElementById(
                    "materialType"
                ).value;


            let fileInput =
                document.getElementById(
                    "materialFile"
                );


            let file =
                fileInput.files[0];


            if (name === "") {

                alert(
                    "Please enter a material name."
                );

                return;

            }


            if (!file) {

                alert(
                    "Please choose a file."
                );

                return;

            }


            let reader =
                new FileReader();


            reader.onload = function() {

                let material = {

                    id: Date.now(),

                    subjectId:
                        subjectId,

                    name:
                        name,

                    type:
                        type,

                    fileName:
                        file.name,

                    fileData:
                        reader.result,

                    fileType:
                        file.type,

                    fileSize:
                        file.size

                };


                materials.push(
                    material
                );


                try {

                    saveData();

                }

                catch (error) {

                    console.error(
                        error
                    );


                    materials.pop();


                    alert(
                        "This file is too large to store in the browser. Please try a smaller file."
                    );

                    return;

                }


                renderAll();


                materialForm.reset();


                alert(
                    "Study material added successfully!"
                );

            };


            reader.onerror =
                function() {

                    alert(
                        "There was a problem reading the file."
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


// ========================================
// 17. MATERIAL SUBJECT DROPDOWN
// ========================================

function renderMaterialSubjects() {

    let select =
        document.getElementById(
            "materialSubject"
        );


    if (!select) {

        return;

    }


    if (subjects.length === 0) {

        select.innerHTML = `

            <option value="">
                No subjects available
            </option>

        `;

        return;

    }


    let options = "";


    for (let subject of subjects) {

        options += `

            <option value="${subject.id}">

                ${subject.icon}
                ${subject.name}

            </option>

        `;

    }


    select.innerHTML =
        options;

}


// ========================================
// 18. GET MATERIAL ICON
// ========================================

function getMaterialIcon(type) {

    if (type === "Textbook") {

        return "📖";

    }


    if (type === "Solution") {

        return "📝";

    }


    if (type === "Notes") {

        return "📄";

    }


    if (type === "PDF") {

        return "📕";

    }


    if (type === "Presentation") {

        return "📊";

    }


    if (type === "Video") {

        return "🎥";

    }


    return "📎";

}


// ========================================
// 19. DISPLAY MATERIALS
// ========================================

function renderMaterials() {

    renderMaterialList(
        materials,
        "All Resources"
    );

}


// ========================================
// 20. DISPLAY FILTERED MATERIALS
// ========================================

function renderMaterialList(
    list,
    title
) {

    let container =
        document.getElementById(
            "materialsList"
        );


    if (!container) {

        return;

    }


    document.getElementById(
        "resourceListTitle"
    ).textContent =
        title;


    if (list.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📂
                </div>

                <h3>
                    No resources found
                </h3>

                <p>
                    Add a resource to this category.
                </p>

            </div>

        `;

        return;

    }


    let html = "";


    for (let material of list) {


        let subject =
            subjects.find(
                function(subject) {

                    return (
                        Number(subject.id) ===
                        Number(material.subjectId)
                    );

                }
            );


        let fileAvailable =
            !!material.fileData;


        html += `

            <div class="material-item">


                <div class="material-info">


                    <div class="file-icon">

                        ${getMaterialIcon(
                            material.type
                        )}

                    </div>


                    <div>

                        <strong>
                            ${material.name}
                        </strong>


                        <small>

                            ${
                                subject
                                    ? subject.name
                                    : "Unknown Subject"
                            }

                            •

                            ${material.type}

                            ${
                                material.fileName
                                    ? " • " +
                                      material.fileName
                                    : ""
                            }

                        </small>

                    </div>

                </div>


                <div
                    style="
                        display:flex;
                        gap:8px;
                        flex-wrap:wrap;
                        justify-content:flex-end;
                    "
                >

                    ${
                        fileAvailable

                        ?

                        `

                        <button
                            class="open-btn"
                            style="width:auto;margin:0"
                            onclick="openMaterial(${material.id})"
                        >
                            Open
                        </button>

                        `

                        :

                        `

                        <button
                            class="open-btn"
                            style="
                                width:auto;
                                margin:0;
                                opacity:0.5;
                            "
                            onclick="alert('This is an old sample resource. Please upload the actual file again.')"
                        >
                            No File
                        </button>

                        `
                    }


                    <button
                        class="remove-material"
                        onclick="deleteMaterial(${material.id})"
                    >
                        Remove
                    </button>

                </div>


            </div>

        `;

    }


    container.innerHTML =
        html;

}


// ========================================
// 21. FILTER MATERIALS
// ========================================

function filterMaterials(type) {

    let filtered =
        materials.filter(
            function(material) {

                return (
                    material.type === type
                );

            }
        );


    let title =
        "";


    if (type === "Textbook") {

        title =
            "📖 Textbooks";

    }

    else if (type === "Solution") {

        title =
            "📝 Solutions";

    }

    else if (type === "Notes") {

        title =
            "📄 Study Notes";

    }

    else {

        title =
            type;

    }


    renderMaterialList(
        filtered,
        title
    );


    showSection(
        "materials"
    );

}


// ========================================
// 22. FILTER BY SUBJECT + TYPE
// ========================================

function filterSubjectMaterials(
    subjectId,
    type
) {

    let filtered =
        materials.filter(
            function(material) {

                return (
                    Number(material.subjectId) ===
                        Number(subjectId)

                    &&

                    material.type === type
                );

            }
        );


    let subject =
        subjects.find(
            function(subject) {

                return (
                    Number(subject.id) ===
                    Number(subjectId)
                );

            }
        );


    let title =
        subject
            ? subject.name +
              " - " +
              type
            : type;


    renderMaterialList(
        filtered,
        title
    );


    showSection(
        "materials"
    );

}


// ========================================
// 23. SHOW SUBJECT MATERIALS
// ========================================

function showSubjectMaterials(
    subjectId
) {

    let filtered =
        materials.filter(
            function(material) {

                return (
                    Number(material.subjectId) ===
                    Number(subjectId)
                );

            }
        );


    let subject =
        subjects.find(
            function(subject) {

                return (
                    Number(subject.id) ===
                    Number(subjectId)
                );

            }
        );


    let title =
        subject
            ? "📂 " + subject.name + " Materials"
            : "Materials";


    renderMaterialList(
        filtered,
        title
    );


    showSection(
        "materials"
    );

}


// ========================================
// 24. OPEN ACTUAL FILE
// ========================================

function openMaterial(id) {

    let material =
        materials.find(
            function(material) {

                return (
                    Number(material.id) ===
                    Number(id)
                );

            }
        );


    if (!material) {

        alert(
            "Material not found."
        );

        return;

    }


    if (!material.fileData) {

        alert(
            "This material does not have a saved file. Please upload it again."
        );

        return;

    }


    let newWindow =
        window.open(
            "",
            "_blank"
        );


    if (!newWindow) {

        alert(
            "The browser blocked the new tab. Please allow pop-ups for this site."
        );

        return;

    }


    newWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                ${material.name}
            </title>

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <style>

                html,
                body {

                    margin:0;

                    width:100%;

                    height:100%;

                    overflow:hidden;

                    font-family:Arial,sans-serif;

                    background:#f5f5f5;

                }

                iframe {

                    width:100%;

                    height:100%;

                    border:none;

                }

            </style>

        </head>

        <body>

            <iframe
                src="${material.fileData}"
                title="${material.name}"
            ></iframe>

        </body>

        </html>

    `);


    newWindow.document.close();

}


// ========================================
// 25. DELETE MATERIAL
// ========================================

function deleteMaterial(id) {

    let answer =
        confirm(
            "Are you sure you want to remove this material?"
        );


    if (!answer) {

        return;

    }


    materials =
        materials.filter(
            function(material) {

                return (
                    Number(material.id) !==
                    Number(id)
                );

            }
        );


    saveData();

    renderAll();

}


// ========================================
// 26. PROGRESS PAGE
// ========================================

function renderProgress() {

    let container =
        document.getElementById(
            "progressSubjects"
        );


    if (!container) {

        return;

    }


    if (subjects.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📊
                </div>

                <h3>
                    No subjects yet
                </h3>

                <p>
                    Add subjects to track progress.
                </p>

            </div>

        `;

        return;

    }


    let html = "";


    for (let subject of subjects) {

        let progress =
            getSubjectProgress(
                subject
            );


        let topicsHTML = "";


        for (
            let i = 0;
            i < subject.topics.length;
            i++
        ) {

            let topic =
                subject.topics[i];


            topicsHTML += `

                <div class="material-item">


                    <span>

                        ${
                            topic.completed
                                ? "✅"
                                : "⭕"
                        }

                        ${topic.name}

                    </span>


                    <button
                        class="remove-material"
                        onclick="toggleTopic(${subject.id}, ${i})"
                    >

                        ${
                            topic.completed
                                ? "Undo"
                                : "Complete"
                        }

                    </button>

                </div>

            `;

        }


        html += `

            <div class="progress-subject">


                <div class="progress-subject-top">

                    <strong>

                        ${subject.icon}
                        ${subject.name}

                    </strong>


                    <strong>
                        ${progress}%
                    </strong>

                </div>


                <div class="progress-bar">

                    <div
                        style="width:${progress}%"
                    ></div>

                </div>


                <div
                    style="margin-top:15px"
                >

                    ${topicsHTML}

                </div>

            </div>

        `;

    }


    container.innerHTML =
        html;

}


// ========================================
// 27. NAVIGATION
// ========================================

function showSection(
    sectionId
) {

    let sections =
        document.querySelectorAll(
            ".section"
        );


    for (let section of sections) {

        section.classList.remove(
            "active-section"
        );

    }


    let selectedSection =
        document.getElementById(
            sectionId
        );


    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    let buttons =
        document.querySelectorAll(
            ".nav-item"
        );


    for (let button of buttons) {

        button.classList.remove(
            "active"
        );

    }


    if (
        sectionId ===
        "dashboard"
    ) {

        if (buttons[0]) {

            buttons[0].classList.add(
                "active"
            );

        }

    }

    else if (
        sectionId ===
        "subjects"
    ) {

        if (buttons[1]) {

            buttons[1].classList.add(
                "active"
            );

        }

    }

    else if (
        sectionId ===
        "materials"
    ) {

        if (buttons[2]) {

            buttons[2].classList.add(
                "active"
            );

        }

    }

    else if (
        sectionId ===
        "progress"
    ) {

        if (buttons[3]) {

            buttons[3].classList.add(
                "active"
            );

        }

    }


    closeSidebar();


    if (
        sectionId ===
        "progress"
    ) {

        renderProgress();

    }

}


// ========================================
// 28. SEARCH
// ========================================

function searchContent() {

    let input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    let search =
        input.value
            .toLowerCase()
            .trim();


    let container =
        document.getElementById(
            "dashboardSubjects"
        );


    if (search === "") {

        renderSubjects();

        return;

    }


    let results =
        subjects.filter(
            function(subject) {

                let subjectFound =
                    subject.name
                        .toLowerCase()
                        .includes(search);


                let materialFound =
                    materials.some(
                        function(material) {

                            return (

                                Number(
                                    material.subjectId
                                ) ===
                                    Number(
                                        subject.id
                                    )

                                &&

                                material.name
                                    .toLowerCase()
                                    .includes(
                                        search
                                    )

                            );

                        }
                    );


                return (
                    subjectFound ||
                    materialFound
                );

            }
        );


    if (results.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>
                    No results found
                </h3>

                <p>
                    Try another subject
                    or material.
                </p>

            </div>

        `;

        return;

    }


    let html = "";


    for (let subject of results) {

        html +=
            createSubjectCard(
                subject
            );

    }


    container.innerHTML =
        html;

}


// ========================================
// 29. MOBILE SIDEBAR
// ========================================

function toggleSidebar() {

    document
        .getElementById(
            "sidebar"
        )
        .classList.toggle(
            "open"
        );

}


function closeSidebar() {

    document
        .getElementById(
            "sidebar"
        )
        .classList.remove(
            "open"
        );

}


// ========================================
// 30. RENDER EVERYTHING
// ========================================

function renderAll() {

    renderSubjects();

    renderMaterialSubjects();

    renderMaterials();

    renderProgress();

    updateDashboard();

}


// ========================================
// 31. START APPLICATION
// ========================================

renderAll();
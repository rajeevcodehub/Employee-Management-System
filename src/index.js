
(async function() {
    const data = await fetch("./src/data.json");
    const res = await data.json();
    let employees = res;
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employeeNameList");
    const employeeInfo = document.querySelector(".employeeNameInfo");

    const addEmployeeModel = document.querySelector(".addEmployee");
    const addEmployeeCreate = document.querySelector(".addEmployeeCreate");
    const addEmployeeBtn = document.querySelector(".addEmployeeBtn");

    addEmployeeBtn.addEventListener('click', () => {
        addEmployeeModel.style.display = "flex";
    })

    addEmployeeModel.addEventListener('click', (event) => {
        if(event.target.className === "addEmployee"){
            addEmployeeModel.style.display = "none";
        }
    })

    addEmployeeCreate.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(addEmployeeCreate)
        const values = [...formData.entries()];
        console.log(values);
    })

    employeeList.addEventListener('click', (event) => {
        if(event.target.tagName === "SPAN" && selectedEmployeeId != event.target.id){
            selectedEmployeeId = event.target.id;
            console.log(event.target.id);
            renderEmployeeList();
            renderSingleEmployee();
        }
    })
    

    const renderEmployeeList = () => {
       
        employees.forEach(emp => {
            const employee = document.createElement("span");
            employee.classList.add("employeeNameItem");

            if(parseInt(selectedEmployeeId, 10) === emp.id) {
                employee.classList.add("selected");
                selectedEmployee = emp;
            }

            employee.setAttribute("id", emp.id);
            employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">❌</i>` 

            employeeList.appendChild(employee);
        });
    }

    const renderSingleEmployee = () => {
        employeeInfo.innerHTML = `
            <img src = "${selectedEmployee.imageUrl}"/>
            <span class="employeeSingleHeading" > 
                ${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}
            </span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>${selectedEmployee.contactNumber}</span>
            <span>${selectedEmployee.dob}</span>
        `;
    }

    if(selectedEmployee) {
        renderSingleEmployee();
    }

    renderEmployeeList();
})()

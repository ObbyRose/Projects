import { createId, EmployeeService } from "./model.js";
import { renderEmployees, toggleForm, clearForm, editForm, 
        saveEmployeeBtn, cancelBtn, currentEmployeeId, 
        addButton,firstNameInput,lastNameInput,salaryInput,startDateInput,ageInput,
        departmentFormSelect, nameFilter, salaryFilterInput, departmentFilter, 
        startDateQuery , employeeForm} from "./view.js";

function init() {
    const employees = EmployeeService.getEmployees();
    renderEmployees(employees);
}
// Add Employee
employeeForm.addEventListener(`submit`, () => {
    const employee = {
        id: currentEmployeeId || createId.makeId(),
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        age: parseInt(ageInput.value),
        startDate: startDateInput.value,
        department: departmentFormSelect.value,
        salary: parseFloat(salaryInput.value),
    };
    if(currentEmployeeId){
        EmployeeService.updateEmployee(currentEmployeeId, employee)
    }
    else{
        EmployeeService.addEmployee(employee)
    }
    clearForm()
    employeeForm.classList.add(`hidden`)
    renderEmployees(EmployeeService.getEmployees())
})
// Delete Employee
document.querySelector('.employee-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        EmployeeService.deleteEmployee(id);
        renderEmployees(EmployeeService.getEmployees());
    }
});

// Edit Employee // TO DO: Make the edit not be done in the form but on the card itself and make the edit/save button the functional button to edit and save the new info
document.querySelector('.employee-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const id = e.target.getAttribute('data-id');
        const employee = EmployeeService.getEmployees().find(emp => emp.id === id);
        employeeForm.classList.toggle(`hidden`)
        editForm(employee);
    }
    // if (e.target.textContent === 'Edit') {
    //     e.target.textContent = 'Save';
    // }else if (e.target.textContent === 'Save') {
    //     e.target.textContent = 'Edit'
    // }
});

nameFilter.addEventListener('input', filterEmployees);

departmentFilter.addEventListener('change', filterEmployees);

startDateQuery.addEventListener(`change`, filterEmployees)


salaryFilter.addEventListener('input', () => {
    salaryValue.textContent = `$${salaryFilter.value}`;
    filterEmployees();
});


function filterEmployees() {
    const nameQuery = nameFilter.value.trim().toLowerCase();
    const dateQuery = startDateQuery.value;
    const departmentQuery = departmentFilter.value;
    const maxSalary = parseFloat(salaryFilterInput.value);

    // the filtering based on the selected criteria
    let filteredEmployees = EmployeeService.getEmployees();

    if (nameQuery) {
        filteredEmployees = filteredEmployees.filter(emp =>
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(nameQuery)
        );
    }


    if (departmentQuery) {
        filteredEmployees = filteredEmployees.filter(emp => emp.department === departmentQuery);
    }

    if (maxSalary) //Made it so the default of all salaries is 0 meaning no filter is applied
    filteredEmployees = filteredEmployees.filter(emp => emp.salary <= maxSalary);

    // Filter by start date 
    if (dateQuery) {
        filteredEmployees = filteredEmployees.filter(emp => {
            const employeeStartDate = new Date(emp.startDate);
            const selectedStartDate = new Date(dateQuery);

            return employeeStartDate >= selectedStartDate;
        });
    }


    renderEmployees(filteredEmployees);
}

cancelBtn.addEventListener('click', () => {
    employeeForm.classList.add(`hidden`)
    clearForm()
})

addButton.addEventListener('click', toggleForm());


init();
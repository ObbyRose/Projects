export const addButton = document.getElementById('Add');
const employeeForm = document.getElementById('employeeForm');
export const saveEmployeeBtn = document.getElementById('saveEmployeeBtn');
export const cancelBtn = document.getElementById('cancelBtn');
export const firstNameInput = document.getElementById('firstName');
export const lastNameInput = document.getElementById('lastName');
export const ageInput = document.getElementById('age');
export const startDateInput = document.getElementById('startDate');
export const startDateQuery = document.getElementById('startDateFilter');
const departmentSelect = document.getElementById('department');
export const salaryInput = document.getElementById('salary');
export const salaryFilterInput = document.getElementById('salaryFilter');
const salaryValueSpan = document.getElementById('salaryValue');
const employeeListDiv = document.querySelector('.employee-list');
export const nameFilter = document.getElementById('nameFilter');
export const departmentFilter = document.getElementById('departmentFilter');
export const departmentFormSelect = document.getElementById('departmentForm');

export let currentEmployeeId = null; 

export function toggleForm () {addButton.addEventListener (`click`, () => {
    employeeForm.classList.toggle(`hidden`);
})
}

export function cancelForm () {cancelBtn.addEventListener(`click`, () => {
    employeeForm.classList.add(`hidden`)
})}

salaryFilterInput.addEventListener(`input`, (event) => {
    salaryValueSpan.textContent = `$${event.target.value}`;
})

export function clearForm () {
    firstNameInput.value = ``;
    lastNameInput.value = ``;
    ageInput.value = ``;
    startDateInput.value = ``;
    salaryInput.value = ``;
    departmentFormSelect.value = `engineering`;
    currentEmployeeId = null;
}

export function renderEmployees (employees) {
    employeeListDiv.innerHTML = ''

    employees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.classList.add('employee-card')
        employeeCard.innerHTML = `
            <h3>${employee.firstName} ${employee.lastName}</h3>
            <p>Age: ${employee.age}</p>
            <p>Start Date: ${employee.startDate}</p>
            <p>Department: ${employee.department}</p>
            <p>Salary: $${employee.salary}</p>
            <button class="edit-btn" data-id="${employee.id}">Edit</button>
            <button class="delete-btn" data-id="${employee.id}">Delete</button>
        `;
        employeeListDiv.appendChild(employeeCard)
    })
}

export function editForm (employee) {
firstNameInput.value = employee.firstName;
lastNameInput.value = employee.lastName;
ageInput.value = employee.age;
startDateInput.value = employee.startDate;
salaryInput.value = employee.salary
departmentFormSelect.value = employee.department
currentEmployeeId = employee.id
};
const EMPLOYEE_STORAGE_KEY = 'employees';


// Utility functions
export const createId = {
    makeId() {
        let id = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return id;
    },
    getFromStorage(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    saveToStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

// Employee CRUD operations
export const EmployeeService = {
    getEmployees() {
        return createId.getFromStorage(EMPLOYEE_STORAGE_KEY);
    },
    addEmployee(employee) {
        const employees = this.getEmployees();
        employees.push(employee);
        createId.saveToStorage(EMPLOYEE_STORAGE_KEY, employees);
    },
    deleteEmployee(id) {
        const employees = this.getEmployees().filter(emp => emp.id !== id);
        createId.saveToStorage(EMPLOYEE_STORAGE_KEY, employees);
    },
    updateEmployee(id, updatedEmployee) {
        const employees = this.getEmployees().map(emp => emp.id === id ? updatedEmployee : emp);
        createId.saveToStorage(EMPLOYEE_STORAGE_KEY, employees);
    },
};

// In-memory store for employees (example)
let employees = [
  { id: '1', name: 'Mohamed Sayed' },
];

// Get all employees
exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employees }); // Return the employee list
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the employee ID from the URL parameters

    // Ensure id is a string for comparison
    const employeeIndex = employees.findIndex(emp => emp.id === id);

    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Remove the employee from the array
    employees.splice(employeeIndex, 1);

    // Respond with success message
    return res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the employee' });
  }
};


// Create a new employee
exports.createEmployee = async (req, res, next) => {
  try {
    const { name, id } = req.body;

    // Validation: Ensure both name and id are provided
    if (!name || !id) {
      return res.status(400).json({ error: 'Name and ID are required' });
    }

    // Check if the employee already exists by ID (ensure string comparison)
    const existingEmployee = employees.find(emp => emp.id === id);
    if (existingEmployee) {
      return res.status(409).json({ error: 'Employee with this ID already exists' });
    }

    // Create new employee object
    const newEmployee = { id, name };

    // Simulate saving the employee to the "database" (push to the array)
    employees.push(newEmployee);

    // Return the newly created employee
    return res.status(201).json({
      message: 'Employee created successfully',
      data: newEmployee
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the employee' });
  }
};


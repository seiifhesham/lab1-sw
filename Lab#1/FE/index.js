// Fetch and display all employees
function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = ''; // Clear the table before appending new rows

      const list = data.data;
      list.forEach(item => {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        
        // Add delete event listener
        deleteButton.addEventListener('click', function() {
          deleteEmployee(item.id);
        });

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching employees:', error));
}

// Add employee on form submit
document.getElementById('employeeForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  createEmployee(); // Call createEmployee when form is submitted
});

// Create a new employee
function createEmployee() {
  const nameInput = document.getElementById('employeeName');
  const idInput = document.getElementById('employeeId');
  
  const name = nameInput.value;
  const id = idInput.value;

  if (!name || !id) return alert('Both name and ID are required!');

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, id }),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to create employee');
    }
    nameInput.value = ''; // Clear the input fields
    idInput.value = '';
    fetchEmployees(); // Refresh the employee list
  })
  .catch((error) => console.error('Error creating employee:', error));
}

// Delete employee by ID
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Employee deleted successfully') {
      fetchEmployees(); // Refresh the employee list after deletion
    } else {
      alert('Failed to delete employee');
    }
  })
  .catch((error) => console.error('Error deleting employee:', error));
}

// Fetch employees on page load
fetchEmployees();

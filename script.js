const employeeList = [];

document.getElementById("addUserBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const profession = document.getElementById("profession").value.trim();
  const age = document.getElementById("age").value.trim();
  const messageElement = document.getElementById("message");
  const noEmployeesText = document.getElementById("noEmployees");

  if (!name || !profession || !age) {
    messageElement.textContent =
      "Error: Please make sure all the fields are filled before adding an employee.";
    messageElement.className = "error";
    return;
  }

  const employeeId = employeeList.length + 1;

  const employee = {
    id: employeeId,
    name,
    profession,
    age: parseInt(age, 10),
  };
  employeeList.push(employee);
  renderEmployees();

  messageElement.textContent = "Success: Employee added!";
  messageElement.className = "success";

  document.getElementById("name").value = "";
  document.getElementById("profession").value = "";
  document.getElementById("age").value = "";

  noEmployeesText.style.display = "none";
});

function renderEmployees() {
  const employeeListContainer = document.getElementById("employeeList");
  employeeListContainer.innerHTML = "";

  if (employeeList.length === 0) {
    document.getElementById("noEmployees").style.display = "block";
    return;
  }

  employeeList.forEach((employee) => {
    const employeeBox = document.createElement("div");
    employeeBox.className = "employee-box";
    employeeBox.innerHTML = `
      <span class="employee-number">${employee.id}. </span>
      <span>Name: ${employee.name}</span>
      <span>Profession: ${employee.profession}</span>
      <span>Age: ${employee.age}</span>
    `;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete User";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteEmployee(employee.id);

    const employeeWrapper = document.createElement("div");
    employeeWrapper.className = "employee-wrapper";
    employeeWrapper.appendChild(employeeBox);
    employeeWrapper.appendChild(deleteBtn);

    employeeListContainer.appendChild(employeeWrapper);
  });
}

function deleteEmployee(id) {
  const index = employeeList.findIndex((employee) => employee.id === id);
  if (index !== -1) {
    employeeList.splice(index, 1);
    renderEmployees();
  }
}

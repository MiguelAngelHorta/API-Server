// Function to fetch controls initially and on subsequent updates
function fetchControls() {
  fetch('http://localhost:3000/controls')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Clear existing rows before populating
      const tableBody = document.querySelector('#crudTable tbody');
      tableBody.innerHTML = '';

      // Ensure data is an array before iterating
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of controls');
      }

      // Populate table with fetched controls
      data.forEach(control => {
          const row = `<tr>
              <td>${control.mainID}</td>
              <td>${control.mainDescription}</td>
              <td>${control.domain}</td>
              <td>${control.scope}</td>
              <td>
                  <button class="btn btn-warning btn-sm" onclick="updateData('${control.mainID}')">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteControl('${control.mainID}')">Delete</button>
              </td>
          </tr>`;
          tableBody.innerHTML += row;
        });
    })
    .catch((error) => {
      console.error('Error fetching controls:', error);
      alert('Error fetching controls. Please check server logs.'); // Inform user
    });
}

  
  // Function to add control with error handling and success message
  function AddData() {
    const mainID = document.getElementById("mainID").value.toLowerCase(); // Convert to lowercase
    const mainDescription = document.getElementById("mainDescription").value;
    const domain = document.getElementById("domain").value;
    const scope = document.getElementById("scope").value;
  
    const newControl = {
      mainID,
      mainDescription,
      domain,
      scope
    };
  
    fetch('http://localhost:3000/controls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newControl)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            alert(`Error adding control: ${error.message}`);
          });
        }
        alert('Control added successfully!');
        // Clear form fields and refetch controls to update table
        document.getElementById("mainID").value = '';
        document.getElementById("mainDescription").value = '';
        document.getElementById("domain").value = '';
        document.getElementById("scope").value = '';
        fetchControls();
      })
      .catch((error) => {
        console.error('Error adding control:', error);
        alert('Error adding control. Please check server logs.'); // Inform user
      });
}

  
  function updateData(id) {
    // Prompt for confirmation
    if (confirm('Are you sure you want to update this data?')) {
        // Fetch all controls
        fetch('http://localhost:3000/controls')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch controls');
                }
                return response.json();
            })
            .then(data => {
                // Find the control with the desired ID
                const control = data.find(control => control.mainID === id);
                if (!control) {
                    throw new Error('Control not found');
                }
                // Populate form fields with fetched data
                document.getElementById("mainID").value = control.mainID;
                document.getElementById("mainDescription").value = control.mainDescription;
                document.getElementById("domain").value = control.domain;
                document.getElementById("scope").value = control.scope;

                // Disable mainID input field
                document.getElementById("mainID").disabled = true;

                // Add highlight to the currently edited row
                var rows = document.querySelectorAll("#crudTable tbody tr");
                rows.forEach(row => {
                    if (row.cells[0].innerText === id) { // Assuming mainID is in the first column
                        row.classList.add("edit-highlight");
                    } else {
                        row.classList.remove("edit-highlight");
                    }
                });

                // Disable all delete buttons
                var deleteButtons = document.querySelectorAll("#crudTable tbody .btn-danger");
                deleteButtons.forEach(button => {
                    button.disabled = true;
                });

                // Change button text and style to 'Update'
                document.getElementById("Add Control").style.display = "none";
                document.getElementById("Update").style.display = "block";
                
            })
            .catch(error => {
                console.error('Error fetching control data:', error);
                alert('Error fetching control data. Please check server logs.');
            });
    }
}

function updateControl(id) {
  const updatedControl = {
      mainID: document.getElementById("mainID").value,
      mainDescription: document.getElementById("mainDescription").value,
      domain: document.getElementById("domain").value,
      scope: document.getElementById("scope").value
  };

  // Validate if required fields are filled
  if (!updatedControl.mainID || !updatedControl.mainDescription || !updatedControl.domain || !updatedControl.scope) {
      alert('Please fill in all fields.');
      return;
  }

  fetch(`http://localhost:3000/controls/${updatedControl.mainID}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedControl)
  })
      .then(response => {
          if (!response.ok) {
              if (response.status === 409) {
                  // Duplicate main ID
                  throw new Error('Duplicate main ID. Please choose a different one.');
              } else {
                  throw new Error('Failed to update control');
              }
          }
          // Show success notification
          alert('Control updated successfully.');

          // Once update is successful, refetch controls to update table
          return fetchControls();
      })
      .then(() => {
          // clear form
          document.getElementById("mainID").value = "";
          document.getElementById("mainDescription").value = "";
          document.getElementById("domain").value = "";
          document.getElementById("scope").value = "";

          // Remove highlight from all rows
          var rows = document.querySelectorAll("#crudTable tbody tr");
          rows.forEach(row => {
              row.classList.remove("edit-highlight");
          });

          // Disable all delete buttons
          var deleteButtons = document.querySelectorAll("#crudTable tbody .btn-danger");
          deleteButtons.forEach(button => {
              button.disabled = false;
          });

          // Change button back to 'Add Control'
          document.getElementById("Add Control").style.display = "block";
          document.getElementById("Update").style.display = "none";

         // Re-enable mainID input field when update button is clicked
          document.getElementById("mainID").disabled = false;
      })
      .catch(error => {
          console.error('Error updating control:', error);
          alert(error.message);
      });
}



  // Function to delete control with confirmation and error handling
  function deleteControl(id) {
    if (confirm('Are you sure you want to delete this control?')) {
      fetch(`http://localhost:3000/controls/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              alert(`Error deleting control: ${error.message}`);
            });
          }
          alert('Control deleted successfully!');
          fetchControls(); // Refetch controls to update table
        })
        .catch((error) => {
          console.error('Error deleting control:', error);
          alert('Error deleting control. Please check server logs.'); // Inform user
        });
    }
  }
  
  // Call fetchControls initially to populate the table on page load
  fetchControls();
  
  
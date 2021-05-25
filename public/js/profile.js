const newFormHandler = async (event) => {
    event.preventDefault();
  
    //Collect values from form fields
  
    const name = document.querySelector("#blog-name").value.trim();
    const full_text = document.querySelector("#blog-desc").value.trim();
    if (name && full_text) {
        const response = await fetch(`/api/blogs`, {
          method: 'POST',
          body: JSON.stringify({ name, full_text }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert('Failed to create project');
        }
      }

      const delButtonHandler = async (event) => {
        if (event.target.hasAttribute('data-id')) {
          const id = event.target.getAttribute('data-id');
      
          const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert('Failed to delete project');
          }
        }
      };

  };
  
    
  document
    .querySelector(".new-blog-form")
    .addEventListener("submit", newFormHandler);
  
  document
    .querySelector(".project-list")
    .addEventListener('click', delButtonHandler);
  
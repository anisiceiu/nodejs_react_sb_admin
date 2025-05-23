import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../features/departmentSlice';
import { updateEmployee} from '../features/employeeSlice';
import { toast } from 'react-toastify';
import { Link,useParams } from 'react-router-dom';

const EditEmployeeForm = () => {
  const [employee, setEmployee] = useState({
    Name: '',
    Email: '',
    Position: '',
    Salary: '',
    HireDate: '',
    DepartmentId: 0
  });

  const { id } = useParams();

  // Fetch the department to edit
    const employeeObj = useSelector((state) =>
      state.employee.employees.find((emp) => emp.id === parseInt(id))
    );
    
    useEffect(()=>{
      if(employeeObj)
      {
        //const date = new Date(employeeObj.hireDate);
        //const formattedDate = date.toISOString().split('T')[0]; 
        //let hireDate=new Date(formattedDate);
        setEmployee({...employeeObj,HireDate:new Date(employeeObj.HireDate).toISOString().split('T')[0]});
      }
    },[employeeObj]);

  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const status = useSelector((state) => state.department.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDepartments());
    }
  }, [status, dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend or handle it as needed
    try {
      dispatch(updateEmployee({...employee,department:{Name:departments.find(d=> d.id === parseInt(employee.departmentId))?.Name}})).unwrap();
      setEmployee({
        Name: '',
        Email: '',
        Position: '',
        Salary: '',
        HireDate: '',
        DepartmentId: 0
      });
      toast.success('Department added successfully!');
    }
    catch (error) {
      toast.error('Failed to add department');
    }
  };

  return (
    <div className='col-6'>
      <h1>Edit Employee</h1>
      <Link to='/employee-list'>Back To List</Link>
      <hr/>
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employee.Name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.Email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position:</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={employee.Position}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={employee.Salary}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Hire Date:</label>
          <input
            type="date"
            className="form-control"
            name="hireDate"
            value={employee.HireDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-select form-control"
            name="departmentId"
            value={employee.DepartmentId}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.Name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update Employee</button>
      </form>
    </div>
  )

}

export default EditEmployeeForm;
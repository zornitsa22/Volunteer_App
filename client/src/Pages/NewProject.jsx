import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosInstance';
import { AuthContextOrg } from '../context/AuthOrg';
import { useContext } from 'react';

const NewProject = () => {
  const navigate = useNavigate();
  const { organization } = useContext(AuthContextOrg);

  // Initialization of the state for the input fields
  const [project, setProject] = useState({
    title: '',
    description: '',
    location: '',
    skills: '',
    ocurrence: '',
    cause: '',
    image: '',
    capacity: '',
    contactEmail: '',
    tasks: '',
    latitude: '',
    longitude: '',
  });

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Destructuring values of the project state
    const {
      title,
      description,
      location,
      skills,
      ocurrence,
      cause,
      capacity,
      contactEmail,
      tasks,
      latitude,
      longitude,
      image,
    } = project;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('skills', skills);
    formData.append('ocurrence', ocurrence);
    formData.append('cause', cause);
    formData.append('capacity', capacity);
    formData.append('contactEmail', contactEmail);
    formData.append('tasks', tasks);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('organizationId', organization?.organizationId);
    formData.append('image', image);

    axios
      .post(`/api/projects`, formData)
      .then((res) => navigate('/projects'))
      .catch((e) => console.log(e));
  };

  // Function to handle changes in the form input fields
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // If the input is an image, set the selected image file
      setProject({ ...project, image: e.target.files[0] });
    } else {
      // If the input is not an image, update the state with the new value
      setProject({ ...project, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className='bg-gradient-to-r from-violet-200 to-pink-200max-w-full mx-auto px-4 py-12'>
      <div className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-16'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-bold mb-4'>
            Welcome{' '}
            <span className='text-cyan-500'>{organization.organizationName}</span>
          </h2>
          <p className='text-lg mb-8'>
            Please add your project and make a positive impact!
          </p>
        </div>
      </div>
      <div className='max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
          Add a New Project
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='title' className='block text-gray-600'>
              Title
            </label>
            <input
              type='text'
              name='title'
              value={project.title}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='location' className='block text-gray-600'>
              Location
            </label>
            <input
              type='text'
              name='location'
              value={project.location}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='skills' className='block text-gray-600'>
              Skills
            </label>
            <input
              type='text'
              name='skills'
              value={project.skills}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='tasks' className='block text-gray-600'>
              Tasks
            </label>
            <input
              type='text'
              name='tasks'
              value={project.tasks}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='ocurrence' className='block text-gray-600'>
              Time required
            </label>
            <input
              type='text'
              name='ocurrence'
              value={project.ocurrence}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='cause' className='block text-gray-600'>
              Cause
            </label>
            <input
              type='text'
              name='cause'
              value={project.cause}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='capacity' className='block text-gray-600'>
              Capacity
            </label>
            <input
              type='number'
              name='capacity'
              value={project.capacity}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='contactEmail' className='block text-gray-600'>
              Contact
            </label>
            <input
              type='email'
              name='contactEmail'
              value={project.contactEmail}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='latitude' className='block text-gray-600'>
              Latitude
            </label>
            <input
              type='number'
              name='latitude'
              value={project.latitude}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='longitude' className='block text-gray-600'>
              Longitude
            </label>
            <input
              type='number'
              name='longitude'
              value={project.longitude}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block text-gray-600'>
              Description
            </label>
            <textarea
              rows='5'
              name='description'
              value={project.description}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              required
            ></textarea>
          </div>
          <div className='mb-4'>
            <label htmlFor='image' className='block text-gray-600'>
              Image
            </label>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;



 import { useState } from 'react';

const ApplyProject = ({ projectId, onApplicationSubmitted }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please upload a file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/projects/${projectId}/apply`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { updatedProject, updatedVolunteer } = await response.json();
        onApplicationSubmitted(updatedProject, updatedVolunteer);
      } else {
        setError('Error applying for the project');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Apply for Project</h2>
      {error && <p>{error}</p>}
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Applying...' : 'Apply'}
      </button>
    </div>
  );
};

export default ApplyProject;


import React, { useState } from 'react';

function TournamentForm() {
  const [formData, setFormData] = useState({
    tournamentName: '',
    tournamentDate: '',
    tournamentLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/create-tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Tournament created successfully');
        setFormData({
          tournamentName: '',
          tournamentDate: '',
          tournamentLocation: '',
        });
      } else {
        console.error('Error creating tournament');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div>
      <h2>Create a New Tournament</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tournament Name:</label>
          <input
            type="text"
            name="tournamentName"
            value={formData.tournamentName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tournament Date:</label>
          <input
            type="date"
            name="tournamentDate"
            value={formData.tournamentDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tournament Location:</label>
          <input
            type="text"
            name="tournamentLocation"
            value={formData.tournamentLocation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Tournament</button>
      </form>
    </div>
  );
}

export default TournamentForm;

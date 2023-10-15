import React, { Component } from 'react';
import './App.css';
import TournamentForm from './TournamentForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingTournaments: [],
      ongoingTournaments: [],
      showTournamentForm: false,
    };
  }

  componentDidMount() {
    fetch('/upcoming-tournaments')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ upcomingTournaments: data });
      })
      .catch((error) => {
        console.error('Error fetching upcoming tournaments:', error);
      });
  }

  toggleTournamentForm = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    this.setState((prevState) => ({
      showTournamentForm: !prevState.showTournamentForm,
    }));
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>Poker Tournament Website</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/" onClick={this.toggleTournamentForm}>Create</a></li>
            </ul>
          </nav>
        </header>
        <main>
          {this.state.showTournamentForm && (
            <TournamentForm />
          )}
          {!this.state.showTournamentForm && (
            <>
              <section className="upcoming-tournaments">
                <h2>Upcoming Tournaments</h2>
                <ul>
                  {this.state.upcomingTournaments.map((tournament) => (
                    <li key={tournament._id}>
                      <h3>{tournament.tournamentName}</h3>
                      <p>Date: {new Date(tournament.tournamentDate).toDateString()}</p>
                      <p>Location: {tournament.tournamentLocation}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="ongoing-tournaments">
                <h2>Ongoing Tournaments</h2>
                <ul>
                  {this.state.ongoingTournaments.map((tournament) => (
                    <li key={tournament._id}>
                      {/* Render tournament details here */}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </main>
      </div>
    );
  }
}

export default App;

import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [weeks, setWeeks] = useState([]);
  const [activeWeek, setActiveWeek] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [editingPlayerName, setEditingPlayerName] = useState('');

  const handleWeekButtonClick = () => {
    const newWeek = {
      id: weeks.length + 1,
      players: [],
      count: 0
    };
    setWeeks([...weeks, newWeek]);
  };

  const handleAddPlayerClick = (weekId) => {
    if (weeks.find(week => week.id === weekId)?.count < 13) {
      const newPlayer = {
        id: Math.random().toString(36).substr(2, 9), 
        name: newPlayerName
      };
      setWeeks(weeks.map(week => {
        if (week.id === weekId) {
          return {
            ...week,
            players: [...week.players, newPlayer],
            count: week.count + 1
          };
        }
        return week;
      }));
      setNewPlayerName('');
    }
  };

  const handleUpdatePlayerName = (weekId, playerId, newName) => {
    setWeeks(weeks.map(week => {
      if (week.id === weekId) {
        return {
          ...week,
          players: week.players.map(player => {
            if (player.id === playerId) {
              return {
                ...player,
                name: newName
              };
            }
            return player;
          })
        };
      }
      return week;
    }));
    setEditingPlayerId(null);
    setEditingPlayerName('');
  };

  const handleDeletePlayer = (weekId, playerId) => {
    setWeeks(weeks.map(week => {
      if (week.id === weekId) {
        return {
          ...week,
          players: week.players.filter(player => player.id !== playerId),
          count: week.count - 1
        };
      }
      return week;
    }));
  };

  const handleDeleteWeek = (weekId) => {
    setWeeks(weeks.filter(week => week.id !== weekId));
    setActiveWeek(null);
  };

  const handleWeekItemClick = (weekId) => {
    setActiveWeek(weekId === activeWeek ? null : weekId);
  };

  return (
    <div className="home-container">
      <div className="weeks-container">
        <h1>Weeks</h1>
        {weeks.map(week => (
          <div key={week.id} className={`week-item ${week.id === activeWeek ? 'active' : ''}`} onClick={() => handleWeekItemClick(week.id)}>
            Week {week.id} ({week.count}/13)
            <button onClick={() => handleDeleteWeek(week.id)}>Delete</button>
          </div>
        ))}
        <button onClick={handleWeekButtonClick}>Create Week</button>
      </div>
      <div className="players-container">
        <h1>Players</h1>
        {activeWeek !== null && (
          <div>
            <h2>Week {activeWeek}</h2>
            <table>
              <thead>
                <tr className='trclass'>
                  <th>Player Name</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {weeks.find(week => week.id === activeWeek)?.players.map(player => (
                  <tr key={player.id}>
                    <td>
                      {editingPlayerId === player.id ? (
                        <input
                          type="text"
                          value={editingPlayerName}
                          onChange={(e) => setEditingPlayerName(e.target.value)}
                        />
                      ) : (
                        player.name
                      )}
                    </td>
                    <td>
                      {editingPlayerId === player.id ? (
                        <button onClick={() => handleUpdatePlayerName(activeWeek, player.id, editingPlayerName)}>Save</button>
                      ) : (
                        <button onClick={() => {setEditingPlayerId(player.id); setEditingPlayerName(player.name);}}>Update</button>
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleDeletePlayer(activeWeek, player.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <input type="text" placeholder="Enter player name" value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} />
              <button onClick={() => handleAddPlayerClick(activeWeek)}>Add Player</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

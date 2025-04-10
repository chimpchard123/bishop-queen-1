// Import better-sqlite3
const sqlite3 = require('better-sqlite3');

// Create a connection to the SQLite database (this will create the file if it doesn't exist)
const db = new sqlite3('database.db');  // Path to your SQLite database file

// Create User Table
db.exec(`
  CREATE TABLE IF NOT EXISTS User (
    user_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    name        TEXT NOT NULL,
    role        TEXT NOT NULL CHECK (role IN ('user', 'admin'))
  );
`);

// Create Movie Table
db.exec(`
  CREATE TABLE IF NOT EXISTS Movie (
    movie_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    duration     INTEGER NOT NULL, -- in minutes
    poster_url   TEXT,
    trailer_url  TEXT,
    description  TEXT
  );
`);

// Create Theatre Table
db.exec(`
  CREATE TABLE IF NOT EXISTS Theatre (
    theatre_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    rows           INTEGER NOT NULL,
    seats_per_row  INTEGER NOT NULL
  );
`);

// Create Seat Table
db.exec(`
  CREATE TABLE IF NOT EXISTS Seat (
    seat_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    theatre_id   INTEGER NOT NULL,
    row          INTEGER NOT NULL,
    seat_number  INTEGER NOT NULL,
    FOREIGN KEY (theatre_id) REFERENCES Theatre(theatre_id) ON DELETE CASCADE,
    UNIQUE(theatre_id, row, seat_number)
  );
`);

// Create Showing Table
db.exec(`
  CREATE TABLE IF NOT EXISTS Showing (
    showing_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id     INTEGER NOT NULL,
    theatre_id   INTEGER NOT NULL,
    start_time   TEXT NOT NULL, -- ISO 8601 datetime
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (theatre_id) REFERENCES Theatre(theatre_id) ON DELETE CASCADE
  );
`);

// Create Booking Table
db.exec(`
  CREATE TABLE IF NOT EXISTS Booking (
    booking_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER NOT NULL,
    showing_id      INTEGER NOT NULL,
    booking_number  TEXT NOT NULL UNIQUE,
    total_price     REAL NOT NULL,
    booking_time    TEXT NOT NULL, -- ISO 8601 datetime
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (showing_id) REFERENCES Showing(showing_id) ON DELETE CASCADE
  );
`);

// Create Ticket Table
db.exec(`
  CREATE TABLE IF NOT EXISTS Ticket (
    ticket_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_id  INTEGER NOT NULL,
    seat_id     INTEGER NOT NULL,
    price       REAL NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES Seat(seat_id) ON DELETE CASCADE,
    UNIQUE (booking_id, seat_id)
  );
`);

// Export db connection for use in other files
module.exports = db;

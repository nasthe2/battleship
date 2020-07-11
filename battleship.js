let model = {
  boardSize: 10,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
    },
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
    },
    {
      locations: [0, 0, 0],
      hits: ["", "", ""],
    }
  ],

  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);
      
      if (ship.hits[index] === "hit") {
        view.displayMessage("Вы уже сюда стреляли!");
        return true
      } else if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Удар нанесен!");

        if (this.isSunk(ship)) {
          view.displayMessage("Корабль потоплен!");
          this.shipsSunk++;
        }
        return true
      }
    }
    view.displayMiss(guess);
    view.displayMessage("Мимо...");
    return false
  },

  isSunk: function(ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== "hit") {
        return false;
      }
      return true;
    }
  },

  generateShipLocations: function() {
    let locations;

    for (let i = 0; i < numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].hitslocations = locations;
    }
    console.log("Ships array: ");
    console.log(this.ships);
  },

  generateShip: function() {
    let direction = Math.floor(Math.random() * 2);
    let row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      col = Math.floor(Math.random() * this.boardSize);
    }

    let newShipLocations = [];
    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations
  },

  collision: function(locations) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      for (let j = 0; i < locations.length; i++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true
        }
      }
    }
    return false;
  }
}

let view = {
  displayMessage: function(msg) {
    let messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function(location) {
    let cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
}
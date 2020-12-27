/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

let rooms = {
  // ceg: {
  //   name: 'ceg',
  //   words: [
  //     {text: 'hello', type: 'blue', checked: false},
  //     {text: 'hello', type: 'blue', checked: false},
  //     {text: 'hello', type: 'blue', checked: false},
  //     {text: 'hello', type: 'blue', checked: false},
  //     {text: 'hello', type: 'blue', checked: false},
  //     {text: 'hello', type: 'blue', checked: false},
  //   ],
  // },
};

let gameInMemory = {};

export let db = {
  getAllRooms() {
    return Object.entries(rooms).map((entry) => ({
      id: entry[0],
      name: entry[1].name,
    }));
  },
  get(roomId) {
    return rooms[roomId] ?? null;
  },
  delete(roomId) {
    delete rooms[roomId];
  },
  update(roomId, data) {
    console.log(data);
    rooms[roomId] = data;
  },
};

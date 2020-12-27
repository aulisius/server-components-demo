/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {fetch} from 'react-fetch';

import {db} from './db.server';
import CreateGame from './CreateGame.client';
import SidebarRoom from './SidebarRoom';
import {useMemo} from 'react';

export default function RoomList({searchText}) {
  console.log(db.getAllRooms());
  let validRooms = useMemo(
    () => db.getAllRooms().filter((room) => room.name.includes(searchText)),
    [searchText]
  );
  return validRooms.length > 0 ? (
    <ul className="notes-list">
      {validRooms.map((room) => (
        <li key={room.id}>
          <SidebarRoom room={room} />
        </li>
      ))}
    </ul>
  ) : (
    <div className="notes-empty">
      {searchText ? (
        <>
          Create new room: {searchText}.<CreateGame>New</CreateGame>
        </>
      ) : (
        'No rooms created yet!'
      )}{' '}
    </div>
  );
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {db} from './db.server';
import GameEditor from './GameEditor.client';
import PlayGame from './PlayGame.client';

export default function Game({selectedId, gameMode, isGameActive, searchText}) {
  const room = selectedId != null ? db.get(selectedId) : null;
  if (room === null) {
    if (gameMode === 'admin') {
      return <GameEditor initialTitle={searchText} />;
    } else {
      return (
        <div className="note--empty-state">
          <span className="note-text--empty-state">
            Create or join a room to get the fun started! 🥳
          </span>
        </div>
      );
    }
  }
  return <PlayGame id={selectedId} room={room} gameMode={gameMode} />;
}

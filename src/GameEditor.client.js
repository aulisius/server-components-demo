/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import _ from 'lodash';
import {unstable_useTransition} from 'react';
import {fetch} from 'react-fetch';
import {createFromReadableStream} from 'react-server-dom-webpack';
import {useRefresh} from './Cache.client';
import {useLocation} from './LocationContext.client';
import {useMutation} from './useMutation.client';

export default function GameEditor({noteId, initialTitle, gameMode}) {
  const refresh = useRefresh();
  const [location, setLocation] = useLocation();
  const [startNavigating, isNavigating] = unstable_useTransition();
  const [isSaving, addRoom] = useMutation({endpoint: `/rooms`, method: 'POST'});
  let range = _.range(25);
  let blueWords = _.sampleSize(range, 8);
  let redWords = _.sampleSize(_.difference(range, blueWords), 8);
  const {words} = fetch('http://localhost:4000/words').json();
  let gameWords = [];
  function getType(index) {
    if (blueWords.includes(index)) {
      return 'blue';
    } else if (redWords.includes(index)) {
      return 'red';
    } else {
      return 'yellow';
    }
  }
  words.forEach((word, index) => {
    gameWords.push({
      text: word,
      type: getType(index),
      checked: false,
    });
  });

  async function handleSave() {
    const payload = {name: initialTitle, words: gameWords};
    const requestedLocation = {
      selectedId: initialTitle,
      gameMode,
      searchText: '',
    };
    const response = await addRoom(payload, requestedLocation);
    navigate(response);
  }

  function navigate(response) {
    const cacheKey = response.headers.get('X-Location');
    const nextLocation = JSON.parse(cacheKey);
    const seededResponse = createFromReadableStream(response.body);
    startNavigating(() => {
      refresh(cacheKey, seededResponse);
      setLocation(nextLocation);
    });
  }

  return (
    <div className="note-editor">
      <h1 className="note-title">{initialTitle}</h1>
      <p>Game is ready...</p>
      <div className="note-editor-preview">
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={isSaving || isNavigating}
            onClick={() => handleSave()}
            role="menuitem">
            <img
              src="checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

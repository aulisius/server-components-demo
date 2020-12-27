/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_useTransition} from 'react';
import {createFromReadableStream} from 'react-server-dom-webpack';
import {useRefresh} from './Cache.client';
import {useLocation} from './LocationContext.client';
import {useMutation} from './useMutation.client';

export default function PlayGame({id, room, gameMode}) {
  let {name, words} = room;
  const refresh = useRefresh();
  const [location, setLocation] = useLocation();
  const [startNavigating, isNavigating] = unstable_useTransition();
  const [isUpdating, updateRoom] = useMutation({
    endpoint: `/rooms/${id}`,
    method: 'PUT',
  });

  async function handleUpdate(word) {
    const payload = {word};
    const requestedLocation = {
      selectedId: id,
      gameMode,
      searchText: location.searchText,
    };
    const response = await updateRoom(payload, requestedLocation);
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
      <h1 className="note-title">{name}</h1>
      <div className="grid-parent">
        {words.map((word) => {
          let classNames = ['grid-child'];
          if (word.checked || gameMode === 'admin') {
            classNames.push(word.type);
          }
          if (word.checked) {
            classNames.push('grid-child--checked');
          }
          return (
            <div id={word.text} className={classNames.join(' ')}>
              {word.text}
            </div>
          );
        })}
      </div>
      <button
        className="note-editor-done"
        disabled={isUpdating || isNavigating}
        onClick={() => handleUpdate()}
        role="menuitem">
        <img
          src="checkmark.svg"
          width="14px"
          height="10px"
          alt=""
          role="presentation"
        />
        End Turn
      </button>
    </div>
  );
}

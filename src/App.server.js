/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense} from 'react';

import Game from './Game.server';
import RoomList from './RoomList.server';
import SearchField from './SearchField.client';
import GameSkeleton from './NoteSkeleton';
import NoteListSkeleton from './NoteListSkeleton';

export default function App({selectedId, gameMode, searchText}) {
  return (
    <div className="main">
      <section className="col sidebar">
        <section className="sidebar-header">
          <img
            className="logo"
            src="logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>codewordsgame</strong>
        </section>
        <section className="sidebar-menu" role="menubar">
          <SearchField />
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <RoomList searchText={searchText} />
          </Suspense>
        </nav>
      </section>
      <section key={selectedId} className="col note-viewer">
        <Suspense fallback={<GameSkeleton isGameActive={selectedId !== null} />}>
          <Game selectedId={selectedId} gameMode={gameMode} searchText={searchText} />
        </Suspense>
      </section>
    </div>
  );
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {format, isToday} from 'date-fns';

import ClientSidebarNote from './SidebarNote.client';

export default function SidebarRoom({room}) {
  return (
    <ClientSidebarNote id={room.id} title={room.name}>
      <header className="sidebar-note-header">
        <strong>{room.name}</strong>
      </header>
    </ClientSidebarNote>
  );
}
